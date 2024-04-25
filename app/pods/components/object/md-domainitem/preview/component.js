import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { Validations } from '../component';

export default Component.extend(Validations, {
  tagName: '',
  model: alias('item'),
  name: alias('model.name'),
  value: alias('model.value'),
  definition: alias('model.definition'),
});
