import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  computed,
  set,
  get,
  getWithDefault
} from '@ember/object';
import {
  or
} from '@ember/object/computed';
import {
  isArray,
  A
} from '@ember/array';
import {
  later
} from '@ember/runloop';
import {
  assert
} from '@ember/debug';
import moment from 'moment';
import {
  formatCitation
} from '../../object/md-citation/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    set(this, 'selected', []);
    assert('No taxonomy object supplied', this.taxonomy);
  },
  tagName: 'form',
  classNames: ['md-itis'],
  itis: service(),
  flashMessages: service(),
  searchString: null,
  kingdom: null,
  total: null,
  isLoading: false,
  limit: 25,
  resultTitle: computed('limit', 'total', 'searchResult.[]', function () {
    let total = this.total;
    let result = this.get('searchResult.length');
    let limit = this.limit;

    return total <= limit ? result : `${result} of ${total}`;
  }),
  notFound: computed('searchResult', function () {
    let result = this.searchResult;

    return isArray(result) && result.length === 0;
  }),
  found: or('selected.length', 'searchResult.length'),
  submit() {
    let itis = this.itis;

    this.set('isLoading', true);
    this.set('searchResult', null);

    itis.sendQuery(this.searchString, this.kingdom, this.limit).then(response => {

      if(!response) {
        return;
      }

      let docs = response.response.docs;
      let data = docs.map(doc => itis.parseDoc(doc));

      this.set('searchResult', data);
      this.set('total', response.response.numFound);
      this.set('isLoading', false);
    });
  },
  actions: {
    search() {
      this.submit.call(this);
    },
    selectItem(item) {
      item.set('animate', true);
      item.set('selected', true);
      later(this, function () {
        this.searchResult.removeObject(item);
        this.selected.pushObject(item);
      }, 250);
    },
    deselectItem(item) {
      item.set('selected', false);
      later(this, function () {
        this.selected.removeObject(item);
        this.searchResult.pushObject(item);
      }, 250);
    },
    importTaxa(taxa) {
      let taxonomy = this.taxonomy;
      let itisCitation = this.get('itis.citation');

      let classification = set(taxonomy, 'taxonomicClassification', (taxonomy.taxonomicClassification === undefined ? [] : taxonomy.taxonomicClassification));
      let systems= set(taxonomy, 'taxonomicSystem', (taxonomy.taxonomicSystem === undefined ? [{citation:{}}] : taxonomy.taxonomicSystem));
      let system = systems.findBy('citation.title', itisCitation.title);

      let allTaxa = taxa.reduce((acc, itm) => acc.pushObjects(itm.taxonomy), []);
      let today = moment().format('YYYY-MM-DD');
      let dateObj = {
        date: today,
        dateType: 'transmitted',
        description: 'Taxa imported from ITIS'
      };

      allTaxa.forEach(itm => this.itis.mergeTaxa(itm, classification));

      if(!system) {
        itisCitation.get('date').pushObject(dateObj);
        systems.pushObject({
          citation: itisCitation
        });
      } else {
        let citation = set(system, 'citation', (system.citation === undefined ? {} : system.citation));
        formatCitation(citation);

        let date = A(citation.date);

        if(!date.findBy('date', today)) {
          date.pushObject(dateObj);
        }
      }

      this.flashMessages
        .success(
          `Successfully imported ${ allTaxa.length } taxa from ITIS.`
        );
    }
  }
});
