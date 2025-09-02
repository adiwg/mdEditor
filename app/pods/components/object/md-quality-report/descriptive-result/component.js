import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault } from '@ember/object';

@classic
export default class DescriptiveResult extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(model, 'scope', getWithDefault(model, 'scope', {}));
      });
    }
  }

  name = '';

  @alias('model.scope.scopeCode')
  scopeCode;
}
