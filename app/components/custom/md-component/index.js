import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed, defineProperty } from '@ember/object';
import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';

export default class MdComponent extends Component {
  @tracked isVisible;

  constructor() {
    super(...arguments);

    let profile = this.args.profile;
    let path = this.args.profilePath;
    let visibility = this.args.visibility;
    let isVisible = isNone(visibility) ? true : visibility;

    if (path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');

      defineProperty(
        this,
        'isVisible',
        computed('args.profile.active', function () {
          if (!profile.activeComponents) {
            return isVisible;
          }

          return profile.activeComponents && profile.activeComponents[path]
            ? profile.activeComponents[path]
            : isVisible;
        }),
      );
    }
  }
}
