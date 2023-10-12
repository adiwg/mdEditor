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

  async addThesaurus(thesaurus) {
    let keywords = null;
    if (thesaurus.keywordsUrl) {
      const response = await axios.get(`${thesaurus.keywordsUrl}`);
      keywords = response.data;
    }
    if (keywords && keywords.length > 0) {
      thesaurus.keywords = keywords;
    }
    this.thesaurus.pushObject(thesaurus);
  },

  async loadThesauri() {
    if (!ENV.thesauriManifestUrl) return;
    try {
      const response = await axios.get(ENV.thesauriManifestUrl);
      this.manifest = response.data;
      const promises = this.manifest.map((thesaurus) => {
        if (!thesaurus.url) return;
        return axios.get(`${thesaurus.url}`);
      });
      const responses = await Promise.all(promises);
      for (const [index, response] of responses.entries()) {
        if (!response) continue;
        const thesaurus = response.data;
        await this.addThesaurus(thesaurus);
        this.manifest[index].identifier = thesaurus.citation.identifier[0].identifier;
        this.manifest[index].isDefault = true;
      }
      this.manifest.pushObject({
        identifier: 'ISO 19115 Topic Category',
        name: 'ISO 19115 Topic Category',
        isDefault: true,
        url: null
      });
      // const customProfiles = this.store.peekAll('custom-profile');
    } catch (error) {
      console.error(error);
    }
  },
});

const isoKeywords = ISO.codelist.map((topic) => ({
  label: topic.codeName,
  definition: topic.description,
  uuid: topic.code
}));

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
    label: 'ISO Topic Category',
    keywordsUrl: null
  });
  
export default Service.extend(service);
