import Component from '@ember/component';
import { computed, get}  from '@ember/object';
import { inject as service } from '@ember/service';


export default Component.extend({
  router: service(),
  /**
   *
   * @property indicatorDomainName
   * @type {String}
   * @default null
   */
  indicatorDomainName: null,

  /**
   *
   * @property userCurrentRoute
   * @type {String}
   * @default null
   */
  userCurrentRoute: computed('router', function () {
    let router = get(this, 'router')
    return router.currentRouteName === "dictionary.show.edit.entity.edit.index"
  })
});
