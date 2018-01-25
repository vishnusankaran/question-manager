# Question Manager

This is a micro service that can generate questions from a given topic and serve them.


## Getting Started & Installing
Run Cassandra.
Run Redis.

`
npm install
npm start
`

## Events
topicAdded: This app listens to topicAdded event from the social module
message bus - NOT IMPLEMENTED

## API
GET /topics/{topic}/questions

RETURNS
{
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
}

## Data Models
Question:
{
    question: "string",
    answer: [ 
        {
            value: "string",
            isCorrect: boolean
        }
    ],
    topic: "string"
}

## Built With

* [wikidata](https://query.wikidata.org/) - Graph API for Wikipedia

## Author
Michael Packiyaraj <mpackiyaraj@sapient.com>
Sree Lakshmi Rangavazzula <srangavazzula@sapient.com>
Sathya Manoj Vakacharla <svakacharla@sapient.com>
Vishnu Sankaran <vsankaran@sapient.com>