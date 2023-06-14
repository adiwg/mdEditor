import EmberObject from '@ember/object';

let createRecord = (total) => {
  const records = [];

  for (let i = 0; i < total; i++) {
    const record = EmberObject.create({
      json: {
        schema: {
          name: 'mdJson',
          version: '2.7.0',
        },
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: 'r' + i,
              type: 'uuid',
            },
          },
          associatedResource: [],
          resourceInfo: {
            resourceType: [
              {
                type: 'project',
              },
            ],
            citation: {
              title: 'My Record' + i,
              date: [
                {
                  date: new Date().toISOString(),
                  dateType: 'creation',
                },
              ],
            },
            pointOfContact: [
              {
                role: 'administrator',
              },
            ],
            pointOfrecord: [],
            abstract: 'An abstract.',
            status: ['completed'],
            language: ['eng; USA'],
          },
          resourceDistribution: [],
        },
      },
      title: 'My Record' + i,
      icon: 'project',
    });

    records.push(record);
  }

  return records;
};

let createCoverageDescription = (total) => {
  const coverageDescriptions = [];

  for (let i = 0; i < total; i++) {
    const coverageDescription = EmberObject.create({
      coverageName: 'coverageName' + i,
      coverageDescription: 'coverageDescription' + i,
      attributeGroup: [
        {
          attributeContentType: ['attributeContentType' + i],
          attribute: createAttribute(1).attributeDescription,
        },
      ],
      processingLevelCode: {
        identifier: 'identifier' + i,
        namespace: 'namespace' + i,
      },
      imageDescription: {
        illuminationElevationAngle: i.toString(),
        illuminationAzimuthAngle: i.toString(),
        imagingCondition: 'imagingCondition' + i,
        imageQualityCode: {
          identifier: 'identifier' + i,
          namespace: 'namespace' + i,
        },
        cloudCoverPercent: i.toString(),
        compressionQuantity: i.toString(),
        triangulationIndicator: true,
        radiometricCalibrationAvailable: false,
        cameraCalibrationAvailable: true,
        filmDistortionAvailable: false,
        lensDistortionAvailable: false,
      },
    });

    coverageDescriptions.push(coverageDescription);
  }

  return coverageDescriptions;
};

let createAttribute = (total) => {
  const attributes = [];

  for (var i = 0; i < total; i++) {
    const attribute = EmberObject.create({
      attributeDescription: 'attributeDescription' + i,
      attributeIdentifier: [
        {
          identifier: 'identifier' + i,
          namespace: 'namespace' + i,
        },
      ],
      bandBoundaryDefinition: ['bandBoundaryDefinition' + i],
      transferFunctionType: ['transferFunctionType' + i],
      transmittedPolarization: ['transmittedPolarization' + i],
      detectedPolarization: ['detectedPolarization' + i],
      sequenceIdentifier: 'sequenceIdentifier' + i,
      sequenceIdentifierType: 'sequenceIdentifierType' + i,
      minValue: i.toString(),
      maxValue: i.toString(),
      units: 'units' + i,
      scaleFactor: i.toString(),
      offset: i.toString(),
      meanValue: i.toString(),
      numberOfValues: i.toString(),
      standardDeviation: i.toString(),
      bitsPerValue: i.toString(),
      boundMin: i.toString(),
      boundMax: i.toString(),
      boundUnits: i.toString(),
      peakResponse: i.toString(),
      toneGradations: i.toString(),
      nominalSpatialResolution: i.toString(),
    });

    attributes.push(attribute);
  }

  return attributes;
};

export { createRecord, createCoverageDescription, createAttribute };
