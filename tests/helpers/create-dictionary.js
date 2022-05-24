import EmberObject from '@ember/object';

let createDictionary = function (total) {

  const dictionaries = [];

  for(let i = 0; i < total; i++) {

    const dictionary = EmberObject.create({

      json: {
        "dataDictionary": {
          "citation": {
            "title": "My Dictionary" + i,
            "date": [{
              "date": new Date()
                .toISOString(),
              "dateType": "creation"
            }]
          },
          "description": "Data dictionary." + i,
          subject: [],
          responsibleParty: {},
          domain: createDomain(2),
          entity: createEntity(2)
        },
      },
      title: 'My Dictionary' + i,
      icon: 'book'
    });

    dictionaries.push(dictionary);

  }

  return dictionaries;

};

let createDomain = function (total) {

  const domains = [];

  for(let i = 0; i < total; i++) {

    const domain = EmberObject.create({
      "domainId": "domainId" + i,
      "commonName": "commonName" + i,
      "codeName": "codeName" + i,
      "description": "description" + i,
      "domainItem": [{
        "name": "name" + i,
        "value": "value" + i,
        "definition": "definition" + i
      }]
    });

    domains.push(domain);

  }
  return domains;

};

let createAttribute = function (total) {

  const attributes = [];

  for(let i = 0; i < total; i++) {

    const attribute = EmberObject.create({
      "commonName": "attributeCommonName" + i,
      "codeName": "attributeCodeName0-" + i,
      "alias": [
        "attributeAlias0-" + i
      ],
      "definition": "definition" + i,
      "dataType": "dataType" + i,
      "allowNull": true,
      "units": "units" + i,
      "domainId": "domainId" + i,
      "minValue": "0" + i,
      "maxValue": "99"
    });

    attributes.push(attribute);

  }
  return attributes;

}

let createEntity = function (total) {

  const entities = [];

  for(let i = 0; i < total; i++) {

    const entity = EmberObject.create({
      "entityId": "entityId" + i,
      "commonName": "commonName" + i,
      "codeName": "codeName" + i,
      "alias": [
        "alias0-" + i,
        "alias1-" + i,
      ],
      "definition": "definition" + i,
      "primaryKeyAttributeCodeName": [
        "primaryKeyAttributeCodeName0-" + i,
        "primaryKeyAttributeCodeName1-" + i,
      ],
      "index": [{
        "codeName": "attributeIndex0-" + i,
        "allowDuplicates": false,
        "attributeCodeName": [
          "attributeCodeName0-" + i
        ]
      }],
      "attribute": createAttribute(3),
      "foreignKey": [{
        "localAttributeCodeName": [
          "attributeCommonName0-" + i
        ],
        "referencedEntityCodeName": "referencedEntityCodeName0" + i,
        "referencedAttributeCodeName": [
          "referencedAttributeCodeName0-" + i
        ]
      }],
      "fieldSeparatorCharacter": ",",
      "numberOfHeaderLines": 9,
      "quoteCharacter": "\""
    });

    entities.push(entity);

  }

  return entities;

};

export { createDomain, createEntity, createAttribute, createDictionary };
