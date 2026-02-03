import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

@classic
export default class QuantitativeResultComponent extends Component {
  name = '';

  @alias('model.valueUnits') units;
  @alias('model.scope.scopeCode') scopeCode;

  get quantitativeValue() {
    const valueArray = this.model?.value;
    return valueArray && valueArray.length > 0 ? valueArray[0] : null;
  }

  set quantitativeValue(value) {
    const valueArray = this.model?.value;
    if (valueArray && valueArray.length > 0) {
      valueArray[0] = parseInt(value);
    } else {
      this.model.value = [parseInt(value)];
    }
    return value;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        model.scope = model.scope ?? { scopeDescription: [] };
        model.value = model.value ?? [];
      });
    }
  }
}
