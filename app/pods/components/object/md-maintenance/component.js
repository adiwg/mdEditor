/**
 * @module mdeditor
 * @submodule components-object
 */

import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { setProperties, get, set } from '@ember/object';
import { once } from '@ember/runloop';

const formatMaint = function (model) {
  setProperties(model, {
    date: get(model, 'date') ?? [],
    scope: get(model, 'scope') ?? [],
    note: get(model, 'note') ?? [],
    contact: get(model, 'contact') ?? [],
  });

  return model;
};

@classic
export default class MdMaintenanceComponent extends Component {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function () {
      set(this, 'model', get(this, 'model') || {});
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
        scopeCode: itm,
      };
    });
    set(this, 'model.scope', map);
  }
}

export { formatMaint };
