import Ember from 'ember';
import GCMD from 'npm:gcmd-keywords';
import UUID from 'npm:node-uuid';

let service = Ember.Object.create({
  thesaurus: Ember.A()
});

const GcmdCitation = Ember.Object.extend({
  "date": [{
    "date": GCMD.version.date,
    "dateType": "revision"
  }],
  "title": "Global Change Master Directory (GCMD) Keywords",
  "edition": "Version " + GCMD.version.edition,
  "onlineResource": [{
    "uri": "https://earthdata.nasa.gov/gcmd-forum"
  }]
});

Object.keys(GCMD)
  .forEach(function (key) {
    if(Array.isArray(GCMD[key])) {
      service.get('thesaurus')
        .pushObject({
          citation: GcmdCitation.create({
            identifier: [{
              identifier: GCMD[key][0].uuid
            }]
          }),
          keywords: GCMD[key][0].children,
          label: 'GCMD ' + GCMD[key][0].label
        });
    }
  });

export default Ember.Service.extend(service);
