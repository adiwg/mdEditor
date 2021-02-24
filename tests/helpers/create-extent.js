import EmberObject from '@ember/object';

export default function createExtent(total) {
  const contacts = [];

  for (let i = 0; i < total; i++) {
    const contact = EmberObject.create({
      description: 'description' + i,
      geographicExtent: [
        {
          description: 'description' + i,
          boundingBox: {
            westLongitude: -87.52179241764053,
            eastLongitude: -85.30119385960293,
            southLatitude: 29.640690610830635,
            northLatitude: 30.42485959910817,
          },
          containsData: false,
          geographicElement: [
            {
              type: 'Point',
              coordinates: [100, 0],
            },
            {
              type: 'LineString',
              coordinates: [
                [100, 0],
                [101, 1],
              ],
            },
          ],
        },
        {
          geographicElement: [
            {
              type: 'Point',
              coordinates: [100, 0],
            },
          ],
        },
      ],
      temporalExtent: [
        {
          timeInstant: {
            description: 'description' + i,
            dateTime: '2016-10-24T11:10:15.2-10:00',
          },
        },
        {
          timePeriod: {
            description: 'description' + i,
            startDateTime: '2016-10-24T11:10:15.2-10:00',
          },
        },
      ],
      verticalExtent: [
        {
          description: 'description' + i,
          minValue: 9.9,
          maxValue: 9.9,
          crsId: {
            referenceSystemType: 'referenceSystemType',
            referenceSystemIdentifier: {
              identifier: 'identifier',
            },
          },
        },
        {
          minValue: 9.9,
          maxValue: 9.9,
          crsId: {
            referenceSystemType: 'referenceSystemType',
            referenceSystemIdentifier: {
              identifier: 'identifier',
            },
          },
        },
      ],
    });

    contacts.push(contact);
  }

  return contacts;
}
