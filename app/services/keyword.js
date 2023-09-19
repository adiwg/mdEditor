import { A } from '@ember/array';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import axios from 'axios';
import ISO from 'mdcodes/resources/js/iso_topicCategory';
import ENV from 'mdeditor/config/environment';

let service = EmberObject.create({
  thesaurus: A(),

  manifest: null,

  findById(id) {
    return this.thesaurus
      .find(function(t) {
        return t.citation.identifier[0].identifier === id;
      });
  },

  async loadVocabularies() {
    if (ENV.keywordsBaseUrl) {
      try {
        const manifestUrl = `${ENV.keywordsBaseUrl}${ENV.manifestPath}`;
        const response = await axios.get(manifestUrl);
        this.manifest = response.data;
        const promises = this.manifest.map((vocabulary) => {
          return axios.get(`${ENV.keywordsBaseUrl}${vocabulary.citationUrl}`);
        });
        const responses = await Promise.all(promises);
        responses.forEach((response, index) => {
          const thesaurus = response.data;
          if (thesaurus && thesaurus.citation) {
            thesaurus.keywords = null;
            thesaurus.keywordsUrl = this.manifest[index].keywordsUrl;
            this.thesaurus.pushObject(thesaurus);
          }
        });
      } catch (error) {
        console.error(error);
      }
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
