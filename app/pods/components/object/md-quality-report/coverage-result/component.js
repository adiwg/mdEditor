import Component from '@ember/component';
import { once } from '@ember/runloop';

export default class CoverageResultComponent extends Component {
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
