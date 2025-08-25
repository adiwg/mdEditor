import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Mixin.create({
  settings: service(),

  /**
   * The default target when cancelling the form
   * @type {String}
   */
  cancelRoute: 'index',

  /**
   * Clear the form
   */
  clearModel() {},

  /**
   * Helper method to transition correctly whether in a route or controller
   * @param {String} routeName - The route to transition to
   * @private
   */
  _transition(routeName) {
    // Check if we're in a route or controller context
    if (typeof this.transitionTo === 'function') {
      // We're in a route
      this.transitionTo(routeName);
    } else if (typeof this.transitionToRoute === 'function') {
      // We're in a controller
      this.transitionToRoute(routeName);
    } else {
      console.error('Unable to transition - no transition method found');
    }
  },

  actions: {
    cancelForm() {
      // Get the model - either from the context or from 'this'
      const model = this.currentRouteModel
        ? this.currentRouteModel()
        : this.get('model');

      if (!model) {
        console.error('No model found for cancelForm action');
        this._transition('record.show');
        return;
      }

      // Safely check properties using get helper to avoid errors
      const isNew =
        typeof model.get === 'function'
          ? model.get('isNew')
          : get(model, 'isNew');
      const autoSave = this.get('settings.data.autoSave');

      if (isNew) {
        if (autoSave) {
          // For new records with auto-save, we need to delete the record from the store
          if (typeof model.deleteRecord === 'function') {
            model.deleteRecord();
          }
          this._transition('list');
          return;
        }
        this.clearModel();
        this._transition('list');
        return;
      }

      // Safely check dirty status
      const hasDirtyAttributes =
        typeof model.get === 'function'
          ? model.get('hasDirtyAttributes')
          : get(model, 'hasDirtyAttributes');

      const hasDirtyHash =
        typeof model.get === 'function'
          ? model.get('hasDirtyHash')
          : get(model, 'hasDirtyHash');

      if (hasDirtyAttributes || hasDirtyHash) {
        // If auto-save is on, we need to reload the record from the store
        if (autoSave) {
          if (typeof model.rollbackAttributes === 'function') {
            model.rollbackAttributes();
          }

          // Reload the model to ensure it's in a clean state
          if (typeof model.reload === 'function') {
            return model
              .reload()
              .then(() => {
                // After reload, transition to show route
                this._transition('record.show');
              })
              .catch((error) => {
                console.error('Error reloading model after cancel:', error);
                // Still try to transition even if reload fails
                this._transition('record.show');
              });
          } else {
            // If reload not available, just transition
            this._transition('record.show');
            return;
          }
        }

        // Standard behavior for non-auto-save
        if (typeof model.rollbackAttributes === 'function') {
          model.rollbackAttributes();
        }
        this._transition('record.show');
        return;
      }

      this._transition('record.show');
    },
  },
});
