import { once } from '@ember/runloop';
import Picker from 'ember-bootstrap-datetimepicker/components/bs-datetimepicker';

export default Picker.extend({
  didReceiveAttrs() {
    // let arg=arguments;
    // once(this, () => {
    //   this._super(...arg);
    // });
    once(this, this._updateDateTimePicker);
  },
});
