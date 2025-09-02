import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
/**
 * @module mdeditor
 * @submodule components-object
 */

import Component from '@ember/component';

import {
  setProperties,
  getWithDefault,
  get,
  set,
  computed
} from '@ember/object';
import { once } from '@ember/runloop';

const formatMaint = function(model) {
  setProperties(model, {
    'date': getWithDefault(model, 'date', []),
    'scope': getWithDefault(model, 'scope', []),
    'note': getWithDefault(model, 'note', []),
    'contact': getWithDefault(model, 'contact', [])
  });

  return model;
};

@classic
@tagName('form')
class theComp extends Component {
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
    super.didReceiveAttrs(...arguments);

    once(this, function() {
      this.set('model', getWithDefault(this, 'model', {}));
      formatMaint(this.model);
    });
  }

  @computed('scope')
  get scopes() {
    let scope = get(this, 'model.scope');
    return scope ? scope.mapBy('scopeCode') : [];
  }

  set scopes(value) {
    let map = value.map((itm) => {
      return {
        scopeCode: itm
      };
    });
    set(this, 'model.scope', map);
    return value;
  }
}

export {
  formatMaint,
  theComp as
  default
};
