/**
 * @module mdeditor
 * @submodule components-object
 */
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

export default class MdKeywordCitationComponent extends Component.extend(Validations) {
  @alias('model.thesaurus.title') title;

  get disabled() {
    return this.model?.thesaurus?.identifier?.[0]?.identifier !== 'custom';
  }

  get onlineResource() {
    return this.model?.thesaurus?.onlineResource?.[0]?.uri;
  }

  set onlineResource(value) {
    let onlineResourceArray = this.model?.thesaurus?.onlineResource;
    if (!Array.isArray(onlineResourceArray)) {
      onlineResourceArray = [{}];
    }
    onlineResourceArray[0].uri = value;
    this.model.thesaurus.onlineResource = onlineResourceArray;
    return value;
  }

  get date() {
    return this.model?.thesaurus?.date?.[0]?.date;
  }

  set date(value) {
    let ol = this.model?.thesaurus?.date;
    if (!isArray(ol)) {
      this.model.thesaurus.date = [{}];
    }
    this.model.thesaurus.date[0].date = value;
    return value;
  }

  get dateType() {
    return this.model?.thesaurus?.date?.[0]?.dateType;
  }

  set dateType(value) {
    let ol = this.model?.thesaurus?.date;
    if (!isArray(ol)) {
      this.model.thesaurus.date = [{}];
    }
    this.model.thesaurus.date[0].dateType = value;
    return value;
  }
}
