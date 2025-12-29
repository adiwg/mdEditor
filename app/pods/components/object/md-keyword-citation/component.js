import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

import { isArray } from '@ember/array';
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

@classic
export default class MdKeywordCitation extends Component.extend(Validations) {
  @computed('model.thesaurus.identifier.0.identifier')
  get disabled() {
    return this.get('model.thesaurus.identifier.0.identifier') !==
      'custom';
  }

  @alias('model.thesaurus.title')
  title;

  @computed('model.thesaurus.onlineResource.0.uri')
  get onlineResource() {
    return this.get('model.thesaurus.onlineResource.0.uri');
  }

  set onlineResource(value) {
    let onlineResourceArray = this.get('model.thesaurus.onlineResource');
    if (!Array.isArray(onlineResourceArray)) {
      onlineResourceArray = [{}];
    }
    onlineResourceArray[0].uri = value;
    this.set('model.thesaurus.onlineResource', onlineResourceArray);
    return value;
  }

  @computed('model.thesaurus.date.0.date')
  get date() {
    return this.get('model.thesaurus.date.0.date');
  }

  set date(value) {
    let ol = this.get('model.thesaurus.date');
    if (!isArray(ol)) {
      this.set('model.thesaurus.date', [{}]);
    }
    this.set('model.thesaurus.date.0.date', value);
    return value;
  }

  @computed('model.thesaurus.date.0.dateType')
  get dateType() {
    return this.get('model.thesaurus.date.0.dateType');
  }

  set dateType(value) {
    let ol = this.get('model.thesaurus.date');
    if (!isArray(ol)) {
      this.set('model.thesaurus.date', [{}]);
    }
    this.set('model.thesaurus.date.0.dateType', value);
    return value;
  }
}
