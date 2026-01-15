import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

export default class ConformanceResultComponent extends Component {
  name = '';

  @alias('model.scope.scopeCode') scopeCode;

  get resultText() {
    return this.model?.pass
      ? 'The result passes conformance.'
      : 'The result does not pass conformance.';
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        model.scope = model.scope ?? {};
        model.pass = model.pass ?? false;
        model.specification = model.specification ?? {};
      });
    }
  }
}
