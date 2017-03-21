/**
 * @module mdeditor
 * @submodule components-object
 */

import Ember from 'ember';

export default Ember.Component.extend({
  disabled: Ember.computed('model.thesaurus.identifier.0.identifier',
    function () {
      return this.get('model.thesaurus.identifier.0.identifier') !==
        'custom';
    }),
  onlineResource: Ember.computed('model.thesaurus.onlineResource.0.uri', {
    get() {
      return this.get('model.thesaurus.onlineResource.0.uri');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.onlineResource');
      if(!Array.isArray(ol)) {
        this.set('model.thesaurus.onlineResource', [{}]);
      }
      this.set('model.thesaurus.onlineResource.0.uri', value);
      return value;
    }
  }),
  date: Ember.computed('model.thesaurus.date.0.date', {
    get() {
      return this.get('model.thesaurus.date.0.date');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.date');
      if(!Array.isArray(ol)) {
        this.set('model.thesaurus.date', [{}]);
      }
      this.set('model.thesaurus.date.0.date', value);
      return value;
    }
  }),
  dateType: Ember.computed('model.thesaurus.date.0.dateType', {
    get() {
      return this.get('model.thesaurus.date.0.dateType');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.date');
      if(!Array.isArray(ol)) {
        this.set('model.thesaurus.date', [{}]);
      }
      this.set('model.thesaurus.date.0.dateType', value);
      return value;
    }
  })
});
