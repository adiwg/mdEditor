import Ember from 'ember';
import Picker from 'ember-bootstrap-datetimepicker/components/bs-datetimepicker';

const {
  run: {
    once
  }
} = Ember;

export default Picker.extend({
  didReceiveAttrs() {
    // let arg=arguments;
    // once(this, () => {
    //   this._super(...arg);
    // });
    once(this, this._updateDateTimePicker);
  },
});
