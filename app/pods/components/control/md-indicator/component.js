import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),
   /**
    * Domain indicator's tooltip value for the name of the domain name
    *
    * @property domainName
    * @type {String}
    */


    //!Need to grab model data from dictionary.show route
   domainName: computed(function () {
     let model = this.modelFor('dictionary.show')
     console.log(model);
   }),

   /**
    * Render only if route is "dictionary.show.edit.entity"
    *
    * @property  entityRoute
    * @type {Boolean}
    *
    */
   entityRoute: computed('router.currentRouteName', function() {
     return "dictionary.show.edit.entity.edit.index" === this.router.currentRouteName
   })
});
