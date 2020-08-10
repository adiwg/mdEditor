import EmberObject from '@ember/object';

let createRecord = (total) => {

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
          "associatedResource": [],
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

let createCoverageDescription = (total) => {

  const coverageDescriptions = [];

  for (let i = 0; i < total; i++) {

    const coverageDescription = EmberObject.create({
      "coverageName": "coverageName" + i,
      "coverageDescription": "coverageDescription" + i,
      "attributeGroup": [{
        "attributeContentType": ["attributeContentType" + i],
        "attribute": [{
          "attributeDescription": "attributeDescription" + i,
        }]
      }],
      "processingLevelCode": {
        "identifier": "identifier" + i,
        "namespace": "namespace" + i
      },
      "imageDescription": {
        "imageQualityCode": {
          "identifier": "identifier" + i,
          "namespace": "namespace" + i
        },
        "illuminationElevationAngle": i,
        "illuminationAzimuthAngle": i,
        "imagingCondition": "imagingCondition" + i,
        "cloudCoverPercent": i,
        "compressionQuantity": i,
        "triangulationIndicator": true,
        "radiometricCalibrationAvailable": false,
        "cameraCalibrationAvailable": true,
        "filmDistortionAvailable": false,
        "lensDistortionAvailable": false
      }
    })

    coverageDescriptions.push(coverageDescription);
  }

  return coverageDescriptions;

}


export { createRecord, createCoverageDescription };
