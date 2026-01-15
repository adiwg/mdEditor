import Component from '@ember/component';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

export default class DescriptiveResultComponent extends Component {
  name = '';

  @alias('model.scope.scopeCode') scopeCode;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        model.scope = model.scope ?? {};
      });
    }
  }
}
