import Component from '@ember/component';
import classic from 'ember-classic-decorator';
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

@classic
export default class PreviewComponent extends Component.extend(Validations) {
  tagName = '';
}

PreviewComponent.reopen({
  model: alias('item'),
  modifications: alias('model.modifications'),
  title: alias('model.citation.title'),
});
