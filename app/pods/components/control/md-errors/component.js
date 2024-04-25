import Component from '@ember/component';

export default Component.extend({
  classNames: ['md-error-list'],

  /**
   *  Error objects to render grouped by validation schema or profile. The group
   *  object must have a `title` and `errors` property. Error objects iwthin the
   *  group must have a `message` property. `dataPath` is optional.
   *
   * @property errors
   * @type {Array}
   * @required
   */
});
