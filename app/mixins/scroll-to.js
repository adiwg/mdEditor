/**
 * @module mdeditor
 * @submodule mixins
 */

import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    scrollTo: {
      replace: true
    }
  },
  setScrollTo(scrollTo) {
    this.controller.set('scrollTo', scrollTo || '');
  },
  actions: {
    setScrollTo(scrollTo) {
      this.setScrollTo(scrollTo);
    }
  }
});
