import Ember from 'ember';

const {
  Service,
  setProperties
} = Ember;

export default Service.extend({
  show: false,
  elementId: undefined,
  setTarget(id) {
    setProperties(this, {
      show: true,
      elementId: id
    });
  }
});
