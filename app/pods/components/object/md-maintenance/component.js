/**
 * @module mdeditor
 * @submodule components-object
 */

import Component from '@ember/component';

import { computed, setProperties, get, set } from '@ember/object';
import { once } from '@ember/runloop';

const formatMaint = function (model) {
  setProperties(model, {
    date: get(model, 'date', []),
    scope: get(model, 'scope', []),
    note: get(model, 'note', []),
    contact: get(model, 'contact', []),
  });

  return model;
};

const theComp = Component.extend({
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

    once(this, function () {
      set(this, 'model', get(this, 'model') || {});
      formatMaint(this.model);
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
          scopeCode: itm,
        };
      });
      set(this, 'model.scope', map);
      return value;
    },
  }),
});

export { formatMaint, theComp as default };
