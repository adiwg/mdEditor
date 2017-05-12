/**
 * @module mdeditor
 * @submodule components-object
 */
import Ember from 'ember';
import {
  regex
} from '../md-online-resource/component';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  isArray,
  computed,
  Component
} = Ember;

const Validations = buildValidations({
  'onlineResource': [
    validator('format', {
      regex: regex,
      isWarning: true,
      message: 'This field should be a valid, resolvable uri.',
      dependentKeys: ['onlineResource', 'model.thesaurus.onlineResource.0.uri']
    })
  ],
  title: validator('presence', {
    presence: true,
    ignoreBlank: true,
  })
});

export default Component.extend(Validations, {
  disabled: computed('model.thesaurus.identifier.0.identifier',
    function() {
      return this.get('model.thesaurus.identifier.0.identifier') !==
        'custom';
    }),
  title: computed.alias('model.thesaurus.title'),
  onlineResource: computed('model.thesaurus.onlineResource.0.uri', {
    get() {
      return this.get('model.thesaurus.onlineResource.0.uri');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.onlineResource');
      if (!isArray(ol)) {
        this.set('model.thesaurus.onlineResource', [{}]);
      }
      this.set('model.thesaurus.onlineResource.0.uri', value);
      return value;
    }
  }),
  date: computed('model.thesaurus.date.0.date', {
    get() {
      return this.get('model.thesaurus.date.0.date');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.date');
      if (!isArray(ol)) {
        this.set('model.thesaurus.date', [{}]);
      }
      this.set('model.thesaurus.date.0.date', value.toISOString());
      return value;
    }
  }),
  dateType: computed('model.thesaurus.date.0.dateType', {
    get() {
      return this.get('model.thesaurus.date.0.dateType');
    },
    set(key, value) {
      let ol = this.get('model.thesaurus.date');
      if (!isArray(ol)) {
        this.set('model.thesaurus.date', [{}]);
      }
      this.set('model.thesaurus.date.0.dateType', value);
      return value;
    }
  })
});
