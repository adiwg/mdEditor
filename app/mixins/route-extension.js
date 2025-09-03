/**
 * Mixin for routes that need currentRouteModel method
 * Modern replacement for Route.reopen()
 */
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Get the current route's model
   * @returns {*} The model for this route
   */
  currentRouteModel() {
    return this.modelFor(this.routeName);
  },
});
