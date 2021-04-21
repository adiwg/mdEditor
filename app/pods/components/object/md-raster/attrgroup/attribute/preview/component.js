  import Component from '@ember/component';
  import { alias } from '@ember/object/computed';

  export default Component.extend({
    tagName: '',
    item: alias('model'),
    attrDesc: alias('model.attrbuteDescription')
  });
