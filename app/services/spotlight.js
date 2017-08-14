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
      setProperties(this, {
        show: false,
        elementId: undefined
      });

      return;
    }
    setProperties(this, {
      show: true,
      elementId: id
    });
  }
});
