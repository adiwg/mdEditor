import Component from '@ember/component';
import { once } from '@ember/runloop';

export default class VerticalComponent extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    let model = this.model;
    once(this, function () {
      model.description = model.description ?? null;
      model.minValue = model.minValue ?? null;
      model.maxValue = model.maxValue ?? null;
      model.crsId = model.crsId ?? {};
    });
  }
}
