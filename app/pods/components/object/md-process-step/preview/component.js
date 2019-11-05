import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: '',
  model: alias('item'),
  name: alias('model.description')
});
