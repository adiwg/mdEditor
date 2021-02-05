import EmberObject from '@ember/object';

export default function createProfile(total) {
  const profiles = [];

  for (let i = 0; i < total; i++) {
    const profile = EmberObject.create({
      uri: 'https://jlblcc.github.io/test-profile/profiles/minimal.json',
      alias: 'My alias' + i,
      altDescription: 'alternate decscription' + i,
      remoteVersion: '0.0.1',
      components: {
        record: {
          main: {
            recordId: false,
            purpose: false,
            environmentDescription: false,
            supplementalInfo: false,
            credit: false,
            timePeriod: {
              id: false,
              description: false,
              periodName: false,
              duration: false,
              interval: false,
            },
            citation: {
              edition: false,
              onlineResource: {
                protocol: false,
              },
              presentationForm: false,
              otherCitationDetails: false,
              graphic: false,
              series: false,
              identifier: false,
              graphicOverview: false,
            },
            graphicOverview: false,
          },
          metadata: {
            identifier: {
              identifier: true,
              namespace: true,
              version: false,
              description: false,
              authority: false,
            },
            parentMetadata: false,
            alternateMetadataReference: false,
            defaultLocale: false,
            maintenance: false,
          },
        },
      },
      description: 'A Minimalist Profile' + i,
      hasUpdate: true,
      identifier: 'minimal',
      localVersion: '0.0.0',
      namespace: 'org.adiwg.profile',
      nav: {
        record: [
          {
            title: 'Basic Info',
            target: 'record.show.edit.main',
            tip: 'This is a customized tip.',
          },
          {
            title: 'About Metadata',
            target: 'record.show.edit.metadata',
            tip: 'Information about the metadata for the resource.',
          },
          {
            title: 'Keywords',
            target: 'record.show.edit.keywords',
            tip: 'Terms used to describe the resource.',
          },
          {
            title: 'Boundaries',
            target: 'record.show.edit.extent',
            tip: 'Information describing the bounds of the resource.',
          },
          {
            title: 'Distribution',
            target: 'record.show.edit.distribution',
            tip: 'Information about obtaining the resource.',
          },
        ],
        dictionary: [
          {
            title: 'Main',
            target: 'dictionary.show.edit.index',
            tip: 'Basic information about the dictionary.',
          },
          {
            title: 'Citation',
            target: 'dictionary.show.edit.citation',
            tip: 'The citation for the dictionary.',
          },
          {
            title: 'Tables',
            target: 'dictionary.show.edit.entity',
            tip:
              'Information about entities(tables) and attributes(columns or fields).',
          },
        ],
      },
      title: 'Minimal',
      config: JSON.parse(
        '{"identifier":"minimal","namespace":"org.adiwg.profile","alternateId":[],"title":"Minimal","description":"A Minimalist Profile","version":"0.0.0","components":{"record":{"main":{"recordId":false,"purpose":false,"environmentDescription":false,"supplementalInfo":false,"credit":false,"timePeriod":{"id":false,"description":false,"periodName":false,"duration":false,"interval":false},"citation":{"edition":false,"onlineResource":{"protocol":false},"presentationForm":false,"otherCitationDetails":false,"graphic":false,"series":false,"identifier":false,"graphicOverview":false},"graphicOverview":false},"metadata":{"identifier":{"identifier":true,"namespace":true,"version":false,"description":false,"authority":false},"parentMetadata":false,"alternateMetadataReference":false,"defaultLocale":false,"maintenance":false}}},"nav":{"record":[{"title":"Basic Info","target":"record.show.edit.main","tip":"This is a customized tip."},{"title":"About Metadata","target":"record.show.edit.metadata","tip":"Information about the metadata for the resource."},{"title":"Keywords","target":"record.show.edit.keywords","tip":"Terms used to describe the resource."},{"title":"Boundaries","target":"record.show.edit.extent","tip":"Information describing the bounds of the resource."},{"title":"Distribution","target":"record.show.edit.distribution","tip":"Information about obtaining the resource."}],"dictionary":[{"title":"Main","target":"dictionary.show.edit.index","tip":"Basic information about the dictionary."},{"title":"Citation","target":"dictionary.show.edit.citation","tip":"The citation for the dictionary."},{"title":"Tables","target":"dictionary.show.edit.entity","tip":"Information about entities(tables) and attributes(columns or fields)."}]}}'
      ),
    });

    profiles.push(profile);
  }

  return profiles;
}
