import { A } from '@ember/array';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import axios from 'axios';
import ISO from 'mdcodes/resources/js/iso_topicCategory';
import ENV from 'mdeditor/config/environment';
import Keywords from 'mdkeywords';

let service = EmberObject.create({
  thesaurus: A(),
  findById(id) {
    return this.thesaurus
      .find(function(t) {
        return t.citation.identifier[0].identifier === id;
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

// ISO Topic Category
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

// LCC thesauri
service.get('thesaurus').pushObjects(Keywords.asArray());

// external config file
if (ENV.keywords) {
  if (ENV.keywords.thesaurusListUrl) {
    var thesaurusListUrl = ENV.keywords.thesaurusListUrl;
    axios.get(thesaurusListUrl).then((response) => {
        response.data.forEach((thesaurus) => {
          service.get('thesaurus').pushObject(thesaurus);
        });
      });
    }
}

export default Service.extend(service);
