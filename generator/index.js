import express  from 'express';
import bodyParser from 'body-parser';
import request from 'superagent';
import path from "path";
import http from 'https';
import redis from 'redis';
import mongoose from 'mongoose';
import config from '../config';
import StubModel from '../api/v1/topics/entity/stub';

const app = express();
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis..');
});

mongoose.connect(config.MONGO.URL);
mongoose.connection.on('connected', function() {
    console.log('Mongoose is now connected to ', config.MONGO.URL);
});

const listen = () => {
    redisClient.brpop('topics', 200, (list, [ listName, topic ]) => {
        if (topic) {
            StubModel.find({ topic }, (err, stubs) => {
                if (err) throw err;
                stubs.forEach(stub => queryData(stub));
            }); 

            process.nextTick(listen);
        }
    });
}

const queryData = ({ query, questionTemplate, topic, answerTemplate, distractors }) => {          
    const url = "https://query.wikidata.org/sparql";

    request.get(url)
        .set('Accept', 'application/sparql-results+json')
        .query({ query: query.replace(/\"/g, '"') })
        .end((err, res) => {
            console.log('Results recieved');
            if(err) { console.error('ERR:', err); process.exit(-1); }
            let results = res.body.results.bindings.forEach((r) => {
                request.get(url)
                    .set('Accept', 'application/sparql-results+json')
                    .query({ query: distractors.query.replace('{{questionQuery.countryOfBirthLabel}}', `wd:${r.countryOfBirth.value.split('/')[4]}`) })
                    .end((err, dist) => {
                        if(err) { console.error('ERR:', err); process.exit(-1); }
                        let distractorArray = dist.body.results.bindings.filter((d, i) => i < distractors.count).map((d, i) => {
                            return distractors.distractorTemplate.replace('{{query.placeOfBirthLabel}}',d.placeLabel.value);
                        });
                        let results = {
                            question: questionTemplate.replace("{{query.personLabel}}",r.personLabel.value),
                            answer: answerTemplate.replace('{{query.placeOfBirthLabel}}',r.placeOfBirthLabel.value),
                            topic,
                            distractors: distractorArray
                        };
                        redisClient.lpush('questions', JSON.stringify(results));
                    });
            });
        });
}

export default { listen };