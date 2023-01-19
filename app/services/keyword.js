import Service from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { GCMD } from 'gcmd-keywords';
import Keywords from 'mdkeywords';
import ISO from 'mdcodes/resources/js/iso_topicCategory';

let service = EmberObject.create({
  thesaurus: A(),
  findById(id) {
    return this.thesaurus
      .find(function(t) {
        return t.citation.identifier[0].identifier === id;
      });
  }
});

let type = {
  'Platforms': 'platform',
  'Instruments': 'instrument'
};

Object.keys(GCMD)
  .forEach(function(key) {
    if (Array.isArray(GCMD[key])) {
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

let isoKeywords = ISO.codelist.map((topic) => {
  return {
    label: topic.codeName,
    definition: topic.description,
    uuid: topic.code
  };

});

service.get('thesaurus')
  .pushObject({
    citation: {
      date: [{
        date: '2014-04',
        dateType: 'revision'
      }],
      title: 'ISO 19115 Topic Category',
      edition: 'ISO 19115-1:2014',
      onlineResource: [{
        uri: 'https://doi.org/10.18123/D6RP4M'
      }],
      identifier: [{
        identifier: 'ISO 19115 Topic Category'
      }]
    },
    keywords: isoKeywords,
    keywordType: 'isoTopicCategory',
    label: 'ISO Topic Category'
  });

service.get('thesaurus').pushObjects(Keywords.asArray());

export default Service.extend(service);
