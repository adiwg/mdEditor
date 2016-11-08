import Ember from 'ember';
import config from 'mdeditor/config/environment';

const {
  APP: {
    repository,
    version
  }
} = config;

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],
  classNames: ['md-fa-link'],

  /**
   * Application repository URL.
   *
   * @property repository
   * @type string
   */
  repository,

  /**
   * Link target, open in new window by default.
   *
   * @property target
   * @type string
   */
  target: '_blank',

  /**
   * Application version.
   *
   * @property version
   * @type string
   */
  version,

  /**
   * The commit hash reference.
   *
   * @property hash
   * @type {Ember.computed}
   * @return string
   */
  hash: Ember.computed('version', function () {
    let idx = this.get('version')
      .indexOf('+') + 1;

    return version.substring(idx);
  }),

  /**
   * The url link
   *
   * @property href
   * @type {Ember.computed}
   * @return string
   */
  href: Ember.computed('repository', 'hash', function () {
    let repo = this.get('repository');
    let hash = this.get('hash');

    return `${repo}/tree/${hash}`;
  }),
});
