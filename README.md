# Question Manager

This is a micro service that can generate questions from a given topic and serve them.

## Data Models

###Question
{
    value: <String>,
    answers: <Array>
}

###Topics
{
  topic: “Cricketer”,
  questionQuery: “SELECT ?personLabel ?placeOfBirthLabel ?countryOfBirthLabel ?countryOfBirth WHERE { ?person wdt:P106 wd:Q12299841. ?person wdt:P19 ?placeOfBirth. ?placeOfBirth wdt:P17 ?countryOfBirth. SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
  questionStub: “Where was {{questionQuery.personLabel}} born?”
  correctResponse: “{{questionQuery.placeOfBirthLabel}}, {{questionQuery.countryLabel}}”
  distractors: {
    numberOfDistractors: 3,
    distractorQuery: “SELECT ?placeLabel ?countryLabel WHERE { ?place wdt:P31 wd:Q515. ?place wdt:P17 {{questionQuery.countryOfBirth}} . SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
    distractor: “{{distractorQuery.placeLabel}}, {{distractorQuery.countryLabel}}”
  }
}

## Getting Started & Installing

## Running the tests

## Built With

* [wikidata](https://query.wikidata.org/) - Graph API for Wikipedia

## Author

## Acknowledgments