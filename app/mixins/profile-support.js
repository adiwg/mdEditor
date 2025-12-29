/**
 * Mixin for components that need profile support
 * Modern replacement for Component.reopen() profile functionality
 */
import Mixin from '@ember/object/mixin';
import { computed, defineProperty, getWithDefault } from '@ember/object';
import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';

export default Mixin.create({
  init() {
    this._super(...arguments);

    let profile = this.profile;
    let path = this.profilePath;
    let visibility = this.visibility;
    let isVisible = isNone(visibility) ? true : visibility;

    if (path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');

      // generate profile definition
      // path.split('.').reduce((acc, curr, idx) => {
      //   let pp = idx ? `${acc}.${curr}` : curr;
      //   window.console.log(pp);
      //   if(!get(window.mdProfile, pp)) {
      //     set(window.mdProfile, pp, {
      //       //visible: true
      //     });
      //   }
      //   return pp;
      // }, '');

      defineProperty(
        this,
        'isVisible',
        computed('profile.active', function () {
          if (!profile.activeComponents) {
            return isVisible;
          }

          return getWithDefault(profile.activeComponents, path, isVisible);
        })
      );
    }
  },
});
