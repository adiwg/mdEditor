import Ember from 'ember';

const {
  Service,
  setProperties,
  $,
  isPresent
} = Ember;

export default Service.extend({
  show: false,
  elementId: undefined,

  setTarget(id) {
    let el = this.get('elementId');

    if(id === el) {
      this.close();

      return;
    }

    if(id && id !== el) {
      $('#' + el).removeClass('md-spotlight-target');
    }

    setProperties(this, {
      show: true,
      elementId: id
    });

    $('body').addClass('md-no-liquid');
    $('#' + id).addClass('md-spotlight-target');
  },

  close() {
    let id = this.get('elementId');

    if(isPresent(id)) {
      $('body').removeClass('md-no-liquid');
      $('#' + id).removeClass('md-spotlight-target');
    }

    setProperties(this, {
      show: false,
      elementId: undefined
    });
  }
});
