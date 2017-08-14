import Ember from 'ember';

const {
  Service,
  setProperties
} = Ember;

export default Service.extend({
  show: false,
  elementId: undefined,
  setTarget(id) {
    if(id === this.get('elementId')) {
      this.close();

      return;
    }
    setProperties(this, {
      show: true,
      elementId: id
    });
  },
  close() {
    setProperties(this, {
      show: false,
      elementId: undefined
    });
  }
});
