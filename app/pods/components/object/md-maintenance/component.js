/**
 * @module mdeditor
 * @submodule components-object
 */

import Ember from 'ember';

const {
  Component,
  set,
  get,
  getWithDefault,
  setProperties,
  computed,
  run: {
    once
  }
} = Ember;

export default Component.extend({
  /**
   * mdEditor class for input and edit of mdJSON 'maintenance' objects.
   *
   * @class md-maintenance
   * @constructor
   *   myClass = new MyClass()
   */

  tagName: 'form',

  /**
   * The string representing the path in the profile object.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * Setup default values for the model.
   *
   * @method didReceiveAttrs
   */
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function () {
      setProperties(model, {
        'date': getWithDefault(model, 'date', []),
        'scope': getWithDefault(model, 'scope', []),
        'note': getWithDefault(model, 'note', []),
        'contact': getWithDefault(model, 'contact', [])
      });
    });
  },

  scopes: computed('scope', {
    get() {
      let scope = get(this, 'model.scope');
      return scope ? scope.mapBy('scopeCode') : [];
    },
    set(key, value) {
      let map = value.map((itm) => {
        return {
          scopeCode: itm
        };
      });
      set(this, 'model.scope', map);
      return value;
    }
  })
});
