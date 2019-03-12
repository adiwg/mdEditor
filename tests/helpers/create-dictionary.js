import EmberObject from '@ember/object';

export default function createDictionary(total) {

  const dictionaries = [];

  for(let i = 0; i < total; i++) {

    const dictionary = EmberObject.create({

      json:  {
        "dataDictionary": {
          "citation": {
            "title": "My Dictionary",
            "date": [{
              "date": new Date()
                .toISOString(),
              "dateType": "creation"
            }]
          },
          "description": "Data dictionary.",
          subject: [],
          responsibleParty: {},
          domain: [],
          entity: []
        },
      },
      title: 'My Dictionary' + i,
      icon: 'book'
    });

    dictionaries.push(dictionary);

  }

  return dictionaries;

}
