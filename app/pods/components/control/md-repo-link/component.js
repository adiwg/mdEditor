import { computed } from '@ember/object';
import Component from '@ember/component';
import config from 'mdeditor/config/environment';

const {
  APP: {
    repository,
    version
  }
} = config;

export default Component.extend({
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
  hash: computed('version', function () {
    let idx = this.version
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
  href: computed('repository', 'hash', function () {
    let repo = this.repository;
    let hash = this.hash;

    return `${repo}/tree/${hash}`;
  }),
});
