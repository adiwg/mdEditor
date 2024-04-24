import EmberObject from '@ember/object';

export default function createCitation(total) {
  const citations = [];

  for (let i = 0; i < total; i++) {
    const citation = EmberObject.create({
      title: 'title' + i,
      alternateTitle: ['alternateTitle0', 'alternateTitle1'],
      date: [
        {
          date: '2016-10-13',
          dateType: 'dateType',
        },
        {
          date: '2016-10-22',
          dateType: 'dateType',
        },
      ],
      edition: 'edition',
      responsibleParty: [
        {
          role: 'role',
          roleExtent: [
            {
              temporalExtent: [
                {
                  timePeriod: {
                    startDateTime: '2016-10-24T11:10:15.2-10:00',
                  },
                },
              ],
            },
          ],
          party: [
            {
              contactId: 'individualId0',
            },
          ],
        },
        {
          role: 'role',
          roleExtent: [
            {
              temporalExtent: [
                {
                  timePeriod: {
                    startDateTime: '2016-10-24T11:10:15.2-10:00',
                  },
                },
              ],
            },
          ],
          party: [
            {
              contactId: 'individualId0',
            },
          ],
        },
      ],
      presentationForm: ['presentationForm0', 'presentationForm1'],
      identifier: [
        {
          identifier: 'identifier' + i,
          authority: {
            title: 'title',
          },
        },
        {
          identifier: 'identifier-' + i,
        },
      ],
      series: {
        seriesName: 'seriesName',
      },
      otherCitationDetails: ['otherCitationDetails0', 'otherCitationDetails1'],
      onlineResource: [
        {
          uri: 'http://adiwg.org',
        },
        {
          uri: 'http://mdeditor.org',
        },
      ],
      graphic: [
        {
          fileName: 'fileName',
        },
        {
          fileName: 'fileName',
        },
      ],
    });

    citations.push(citation);
  }

  return citations;
}
