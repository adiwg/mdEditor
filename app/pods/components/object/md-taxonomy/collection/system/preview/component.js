import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
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
@tagName('')
export default class Preview extends Component.extend(Validations) {
  @alias('item')
  model;

  @alias('model.modifications')
  modifications;

  @alias('model.citation.title')
  title;
}
