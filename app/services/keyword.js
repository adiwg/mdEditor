import Ember from 'ember';
import GCMD from 'npm:gcmd-keywords';

let service = Ember.Object.create({
  thesaurus: Ember.A(),
  findById(id) {
    return this.get('thesaurus')
      .find(function (t) {
        return t.citation.identifier[0].identifier === id;
      });
  }
});

let type = {
    'Platforms': 'platform',
    'Instruments': 'instrument'
  };

  Object.keys(GCMD)
  .forEach(function (key) {
    if(Array.isArray(GCMD[key])) {
      service.get('thesaurus')
        .pushObject({
          citation: {
            date: [{
              date: GCMD.version.date,
              dateType: 'revision'
            }],
            title: 'Global Change Master Directory (GCMD) ' + GCMD[key][0].label,
            edition: 'Version ' + GCMD.version.edition,
            onlineResource: [{
              uri: 'https://earthdata.nasa.gov/gcmd-forum'
            }],
            identifier: [{
              identifier: GCMD[key][0].uuid
            }]
          },
          keywords: GCMD[key][0].children,
          keywordType: type[GCMD[key][0].label] || 'theme',
          label: 'GCMD ' + GCMD[key][0].label
        });
    }
  });

export default Ember.Service.extend(service);
