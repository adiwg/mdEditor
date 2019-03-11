import EmberObject from '@ember/object';

export default function createRecord(total) {

  const records = [];

  for(let i = 0; i < total; i++) {

    const record = EmberObject.create({

      json: {
        "version": {
          "name": "mdJson",
          "version": "2.0.0"
        },
        "record": [],
        "metadata": {
          "metadataInfo": {
            "metadataIdentifier": {
              "identifier": 'r' +i,
              "type": "uuid"
            }
          },
          "resourceInfo": {
            "resourceType": null,
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
            "status": "completed",
            "language": ["eng; USA"]
          }
        }
      },
      title: 'My Record' + i,
      icon: 'project'
    });

    records.push(record);

  }

  return records;

}
