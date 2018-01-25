const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const http = require('https');
const redis = require('redis');
const request = require('superagent');

/* Create Redis client*/
let client = redis.createClient();
client.on('connect', function(){
    console.log('Connected to Redis..');
})

const listen = () => {
    const questionObject = {
        topic: "cricket",
        query: `SELECT ?personLabel ?placeOfBirthLabel ?countryOfBirthLabel ?countryOfBirth
                    WHERE {
                        ?person wdt:P106 wd:Q12299841.
                        ?person wdt:P19 ?placeOfBirth.
                        ?placeOfBirth wdt:P17
                        ?countryOfBirth.
                    
                    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
                } LIMIT 10`,
        questionTemplate: 'Where was {{query.personLabel}} born?',
        answerTemplate: '{{query.placeOfBirthLabel}}',
        distractors: {
            count: 3,
            query: `SELECT ?placeLabel ?countryLabel
                        WHERE {
                            ?place wdt:P31 wd:Q515.
                            ?place wdt:P17 {{questionQuery.countryOfBirthLabel}}.
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
                    } LIMIT 3`,
            distractorTemplate: '{{query.placeOfBirthLabel}}'
        }
    };
    queryData(questionObject);
}

const queryData = ({ query, questionTemplate, topic, answerTemplate, distractors }) => {          
    const url = "https://query.wikidata.org/sparql";

    request.get(url)
        .set('Accept', 'application/sparql-results+json')
        .query({ query })
        .end((err, res) => {
            if(err) { console.error('ERR:', err); process.exit(-1); }
            let results = res.body.results.bindings.forEach((r) => {
                request.get(url)
                    .set('Accept', 'application/sparql-results+json')
                    .query({ query: distractors.query.replace('{{questionQuery.countryOfBirthLabel}}', `wd:${r.countryOfBirth.value.split('/')[4]}`) })
                    .end((err, dist) => {
                        let distractorArray = dist.body.results.bindings.filter((d, i) => i < distractors.count).map((d, i) => {
                            return distractors.distractorTemplate.replace('{{query.placeOfBirthLabel}}',d.placeLabel.value);
                        });
                        let results = {
                            question: questionTemplate.replace("{{query.personLabel}}",r.personLabel.value),
                            answer: answerTemplate.replace('{{query.placeOfBirthLabel}}',r.placeOfBirthLabel.value),
                            topic,
                            distractors: distractorArray
                        };
                        client.lpush('questions', JSON.stringify(results));
                    });
            });
        });
}

export default { listen };