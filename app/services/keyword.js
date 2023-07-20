import Service from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import ISO from 'mdcodes/resources/js/iso_topicCategory';
import axios from 'axios';
import ENV from 'mdeditor/config/environment';

let service = EmberObject.create({
  thesaurus: A(),
  findById(id) {
    return this.thesaurus
      .find(function(t) {
        return t.citation.identifier[0].identifier === id;
      });
  },
  loadVocabularies() {
    if (ENV.vocabulariesUrl) {
      axios.get(ENV.vocabulariesUrl).then((response) => {
        response.data.forEach((vocabulary) => {
          service.get('thesaurus').pushObject(vocabulary);
        });
      });
    }
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
  
export default Service.extend(service);
