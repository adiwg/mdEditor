import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { set } from '@ember/object';
import { once } from '@ember/runloop';

@classic
export default class VerticalComponent extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    let model = this.model;
    once(this, function () {
      if (model.description === undefined) {
        set(model, 'description', null);
      }
      if (model.minValue === undefined) {
        set(model, 'minValue', null);
      }
      if (model.maxValue === undefined) {
        set(model, 'maxValue', null);
      }
      if (!model.crsId) {
        set(model, 'crsId', {});
      }
    });
  }
}
