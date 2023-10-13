/**
 * @module mdeditor
 * @submodule components-object
 */
import { alias } from '@ember/object/computed';

import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import {
  regex
} from '../md-online-resource/component';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

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
    ignoreBlank: true
  })
});

export default Component.extend(Validations, {
  disabled: computed('model.thesaurus.identifier.0.identifier',
    function() {
      return this.get('model.thesaurus.identifier.0.identifier') !==
        'custom';
    }),
  title: alias('model.thesaurus.title'),
  onlineResource: computed('model.thesaurus.onlineResource.0.uri', {
    get() {
      return this.get('model.thesaurus.onlineResource.0.uri');
    },
    set(key, value) {
      let onlineResourceArray = this.get('model.thesaurus.onlineResource');
      if (!Array.isArray(onlineResourceArray)) {
        onlineResourceArray = [{}];
      }
      onlineResourceArray[0].uri = value;
      this.set('model.thesaurus.onlineResource', onlineResourceArray);
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
      this.set('model.thesaurus.date.0.date', value);
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
