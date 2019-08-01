import EmberObject from '@ember/object';

export default function createRecord(total) {

  const records = [];

  for(let i = 0; i < total; i++) {

    const record = EmberObject.create({

      json: {
        schema: {
          name: 'mdJson',
          version: '2.6.0'
        },
        contact: [],
        "metadata": {
          "metadataInfo": {
            "metadataIdentifier": {
              "identifier": 'r' +i,
              "type": "uuid"
            }
          },
          "resourceInfo": {
            "resourceType": [{
              "type": "project"
            }],
            "citation": {
              "title": "My Record"+ i,
              "date": [{
                "date": new Date()
                  .toISOString(),
                "dateType": "creation"
              }]
            },
            "pointOfrecord": [],
            "abstract": "An abstract.",
            "status": ["completed"],
            "language": ["eng; USA"]
          },
          "resourceDistribution":[]
        }
      },
      title: 'My Record' + i,
      icon: 'project'
    });

    records.push(record);

  }

  return records;

}
