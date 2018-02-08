# Question Manager

This is a micro service that can generate questions from a given topic and serve them.


## Getting Started & Installing
Setup the database hosts and ports in `configs/index.js`

`
npm install
`

Run Cassandra, Redis and Mongo servers.

`
npm start
`

## API

### Create Stubs
POST `/topics/{topic}/stubs`

BODY - 

Example:

`
    {
        "stubs": [{
            "topic": "cricket",
            "query": "SELECT ?personLabel ?placeOfBirthLabel ?countryOfBirthLabel ?countryOfBirth WHERE { ?person wdt:P106 wd:Q12299841. ?person wdt:P19 ?placeOfBirth. ?placeOfBirth wdt:P17 ?countryOfBirth. SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" } } LIMIT 10",
            "questionTemplate": "Where was {{query.personLabel}} born?",
            "answerTemplate": "{{query.placeOfBirthLabel}}",
            "distractors": {
                "count": 3,
                "query": "SELECT ?placeLabel ?countryLabel WHERE { ?place wdt:P31 wd:Q515. ?place wdt:P17 {{questionQuery.countryOfBirthLabel}}. SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" } } LIMIT 3",
                "distractorTemplate": "{{query.placeOfBirthLabel}}"
            }
        }]
    }
    `

RETURNS
`{
    question: "Where was Atul Bedade born?",
    answer: [{
            value: "Mumbai",
            iscorrect: true
        },
        {
            value: "Dehradun",
            iscorrect: false
        },
        {
            value: "Guwahati",
            iscorrect: false
        },
        {
            value: "Visakhapatnam",
            iscorrect: false
        }],
    topic: "cricket"
}`


### Fetch Questions

GET `/topics/{topic}/questions`

RETURNS
`{
    question: "Where was Atul Bedade born?",
    answer: [{
            value: "Mumbai",
            iscorrect: true
        },
        {
            value: "Dehradun",
            iscorrect: false
        },
        {
            value: "Guwahati",
            iscorrect: false
        },
        {
            value: "Visakhapatnam",
            iscorrect: false
        }],
    topic: "cricket"
}`


## Events

### Topic Added
This app listens to the Redis. The Social Module is expected to 'lpush' new topic names into the list - 'topics' so that the app can generate questions. The expected item in the list a string - topic name.

## Data Models
### QUESTION
`{

    question: "string",

    answer: [ 

        {

            value: "string",

            isCorrect: boolean

        }

    ],

    topic: "string"
    
}`

### STUB
`{

    stubs: [{

	    "topic": "string",

	    "query": "string",

	    "questionTemplate": "string",

	    "answerTemplate": "string",

	    "distractors": {

	        "count": "number",

	        "query": "string",

	        "distractorTemplate": "string"

	    }

	}]

}`

## Built With

* [wikidata](https://query.wikidata.org/) - Graph API for Wikipedia

## Author
Michael Packiyaraj <mpackiyaraj@sapient.com>

Sree Lakshmi Rangavazzula <srangavazzula@sapient.com>

Sathya Manoj Vakacharla <svakacharla@sapient.com>

Vishnu Sankaran <vsankaran@sapient.com>