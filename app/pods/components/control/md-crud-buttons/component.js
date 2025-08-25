import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  settings: service(),

  classNames: ['md-crud-buttons'],

  /**
   * True if save actions should be displayed
   *
   * @property doSave
   * @type {Boolean|Function}
   * @default false
   */
  doSave: false,

  /**
   * True if delete action should be displayed
   *
   * @property showDelete
   * @type {Boolean}
   * @default false
   */
  showDelete: false,

  /**
   * True if copy action should be displayed
   *
   * @property showCopy
   * @type {Boolean}
   * @default false
   */
  showCopy: false,

  /**
   * Cancel action from route-action helper
   *
   * @property doCancel
   * @type {Function}
   * @default null
   */
  doCancel: null,

  /**
   * Delete action from route-action helper
   *
   * @property doDelete
   * @type {Function}
   * @default null
   */
  doDelete: null,

  /**
   * Copy action from route-action helper
   *
   * @property doCopy
   * @type {Function}
   * @default null
   */
  doCopy: null,

  displaySaveButtons: computed('doSave', function () {
    // If doSave is a boolean, use it directly
    if (typeof this.doSave === 'boolean') {
      return this.doSave;
    }

    // If doSave is a function, assume we should show the buttons
    if (typeof this.doSave === 'function') {
      return true;
    }

    // Default to false
    return false;
  }),

  /**
   * Computed property to determine if the save button should be disabled.
   * With auto-save ON, the button should still be enabled.
   *
   * @property saveButtonDisabled
   * @type {Boolean}
   */
  saveButtonDisabled: computed(
    'model.hasDirtyHash',
    'settings.data.autoSave',
    function () {
      const autoSave = this.get('settings.data.autoSave');
      const hasDirtyHash = this.get('model.hasDirtyHash');

      // When auto-save is ON, always enable the save button
      if (autoSave) {
        return false; // Never disable when auto-save is on
      }

      // Standard behavior - disable if not dirty
      return !hasDirtyHash;
    }
  ),

  actions: {
    save() {
      // Set a flag on the model to remember it was manually saved
      if (this.get('model')) {
        this.set('model.wasManualSave', true);
      }

      // Execute the provided function from route-action
      if (typeof this.doSave === 'function') {
        this.doSave();
      } else {
        console.warn('No save action provided to md-crud-buttons component');
      }
    },

    cancel() {
      if (typeof this.doCancel === 'function') {
        this.doCancel();
      } else {
        console.warn('No cancel action provided to md-crud-buttons component');
      }
    },

    delete() {
      if (typeof this.doDelete === 'function') {
        this.doDelete();
      } else {
        console.warn('No delete action provided to md-crud-buttons component');
      }
    },

    copy() {
      if (typeof this.doCopy === 'function') {
        this.doCopy();
      } else {
        console.warn('No copy action provided to md-crud-buttons component');
      }
    },
  },
});
