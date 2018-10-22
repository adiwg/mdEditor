import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'title': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  tagName: '',
  model: alias('item'),
  modifications: alias('model.modifications'),
  title: alias('model.citation.title')
});
