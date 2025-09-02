import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { set, get, getWithDefault } from '@ember/object';

@classic
export default class Vertical extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    let model = get(this, 'model');
    once(this, function () {
      set(model, 'description', getWithDefault(model, 'description', null));
      set(model, 'minValue', getWithDefault(model, 'minValue', null));
      set(model, 'maxValue', getWithDefault(model, 'maxValue', null));
      set(model, 'crsId', getWithDefault(model, 'crsId', {}));
    });
  }
}
