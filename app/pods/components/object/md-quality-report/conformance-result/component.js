import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, getWithDefault, computed } from '@ember/object';

@classic
export default class ConformanceResult extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(model, 'scope', getWithDefault(model, 'scope', {}));
        set(model, 'pass', getWithDefault(model, 'pass', false));
        set(model, 'specification', getWithDefault(model, 'specification', {}));
      });
    }
  }

  name = '';

  @alias('model.scope.scopeCode')
  scopeCode;

  @computed('model.pass')
  get resultText() {
    return this.get('model.pass')
      ? 'The result passes conformance.'
      : 'The result does not pass conformance.';
  }
}
