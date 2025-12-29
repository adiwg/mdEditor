import classic from 'ember-classic-decorator';
import { attributeBindings, classNames, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import config from 'mdeditor/config/environment';

const {
  APP: {
    repository,
    version
  }
} = config;

@classic
@tagName('a')
@attributeBindings('href', 'target')
@classNames('md-fa-link')
export default class MdRepoLink extends Component {
  /**
   * Application repository URL.
   *
   * @property repository
   * @type string
   */
  repository = repository;

  /**
   * Link target, open in new window by default.
   *
   * @property target
   * @type string
   */
  target = '_blank';

  /**
   * Application version.
   *
   * @property version
   * @type string
   */
  version = version;

  /**
   * The commit hash reference.
   *
   * @property hash
   * @type {Ember.computed}
   * @return string
   */
  @computed('version')
  get hash() {
    let idx = this.version
      .indexOf('+') + 1;

    return version.substring(idx);
  }

  /**
   * The url link
   *
   * @property href
   * @type {Ember.computed}
   * @return string
   */
  @computed('repository', 'hash')
  get href() {
    let repo = this.repository;
    let hash = this.hash;

    return `${repo}/tree/${hash}`;
  }
}
