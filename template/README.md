#Michael

[{
  topic: “Cricketer”,
  query: “SELECT ?personLabel ?placeOfBirthLabel ?countryOfBirthLabel ?countryOfBirth WHERE { ?person wdt:P106 wd:Q12299841. ?person wdt:P19 ?placeOfBirth. ?placeOfBirth wdt:P17 ?countryOfBirth. SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
  template: “Where was {{questionQuery.personLabel}} born?”
  answer: “{{questionQuery.placeOfBirthLabel}}, {{questionQuery.countryLabel}}”
  distractors: {
    count: 3,
    query: “SELECT ?placeLabel ?countryLabel WHERE { ?place wdt:P31 wd:Q515. ?place wdt:P17 {{questionQuery.countryOfBirth}} . SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
    distractors: [“{{distractorQuery.placeLabel}}, {{distractorQuery.countryLabel}}”]
  }
},
{
  topic: “Cricketer”,
  query: “SELECT ?personLabel ?placeOfBirthLabel ?countryOfBirthLabel ?countryOfBirth WHERE { ?person wdt:P106 wd:Q12299841. ?person wdt:P19 ?placeOfBirth. ?placeOfBirth wdt:P17 ?countryOfBirth. SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
  template: “Where was {{questionQuery.personLabel}} born?”
  answer: “{{questionQuery.placeOfBirthLabel}}, {{questionQuery.countryLabel}}”
  distractors: {
    count: 3,
    query: “SELECT ?placeLabel ?countryLabel WHERE { ?place wdt:P31 wd:Q515. ?place wdt:P17 {{questionQuery.countryOfBirth}} . SERVICE wikibase:label { bd:serviceParam wikibase:language “en” } }“,
    distractors: [“{{distractorQuery.placeLabel}}, {{distractorQuery.countryLabel}}”]
  }
}]

getQueries(topic);

getTemplates(topic);