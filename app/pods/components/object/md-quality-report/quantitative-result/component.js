import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, computed } from '@ember/object';

@classic
export default class QuantitativeResult extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(
          model,
          'scope',
          getWithDefault(model, 'scope', { scopeDescription: [] })
        );
        set(model, 'value', getWithDefault(model, 'value', []));
      });
    }
  }

  name = '';

  @computed('model.value.[]')
  get quantitativeValue() {
    const valueArray = this.get('model.value');
    return valueArray && valueArray.length > 0 ? valueArray[0] : null;
  }

  set quantitativeValue(value) {
    const valueArray = this.get('model.value');
    if (valueArray && valueArray.length > 0) {
      valueArray[0] = parseInt(value);
    } else {
      this.set('model.value', [parseInt(value)]);
    }
    return value;
  }

  @alias('model.valueUnits')
  units;

  @alias('model.scope.scopeCode')
  scopeCode;
}
