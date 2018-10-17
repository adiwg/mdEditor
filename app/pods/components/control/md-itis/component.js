import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  computed
} from '@ember/object';
import {
  or
} from '@ember/object/computed';
import {
  isArray
} from '@ember/array';
import {
  later
} from '@ember/runloop';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.selected = [];
  },
  tagName: 'form',
  // classNames: ['form-horizontal'],
  itis: service(),
  searchString: null,
  kingdom: null,
  total: null,
  isLoading: false,
  limit: 25,
  resultTitle: computed('total', function () {
    let total = this.get('total');
    let limit = this.get('limit');

    return total <= limit ? total : `${limit} of ${total}`;
  }),
  notFound: computed('searchResult', function () {
    let result = this.get('searchResult');

    return isArray(result) && result.length === 0;
  }),
  found: or('selected.length', 'searchResult.length'),
  submit() {
    let itis = this.get('itis');

    this.set('isLoading', true);
    this.set('searchResult', null);

    itis.sendQuery(this.get('searchString'), this.get(
      'kingdom'), this.get('limit')).then(response => {
      console.log(response);

      if(!response) {
        return;
      }

      let docs = response.response.docs;
      let data = docs.map(doc => itis.parseDoc(doc));
      console.log(data);

      this.set('searchResult', data);
      this.set('total', response.response.numFound);
      this.set('isLoading', false);
    });
  },
  actions: {
    search() {
      this.get('submit').call(this);
    },
    selectItem(item) {
      item.set('animate', true);
      item.set('selected', true);
      later(this, function () {
        this.get('searchResult').removeObject(item);
        this.get('selected').pushObject(item);
      }, 250);
    },
    deselectItem(item) {
      item.set('selected', false);
      later(this, function () {
        this.get('selected').removeObject(item);
        this.get('searchResult').pushObject(item);
      }, 250);
    }
  }
});
