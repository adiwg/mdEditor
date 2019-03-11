import Component from '@ember/component';

export default Component.extend({
  classNames: ['md-error-list'],

  /**
  *  Array of error objects to render. Errror objects must have a `message`
  *  property. `dataPath` is optional.
  *
  * @property errors
  * @type {Array}
  * @required
  */
});
