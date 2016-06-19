import Ember from 'ember';

export default Ember.Component.extend({
  mdCodes: Ember.inject.service('codelist'),
  phoneServices: Ember.computed(function() {
    let mdCodelist = this.get('mdCodes')
        .get('telephone')
        .codelist;
    let serviceType = [];
    mdCodelist.forEach(function(telephone) {
      serviceType.push(telephone['codeName']);
    });
    return serviceType;
  }),
  
  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),
  
  didInsertElement: function() {
    let panel = this.get('panelId');
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('md-button-hide');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('md-button-hide');
    });
  },
  
  actions: {
    addPhone: function(phoneBook) {
      phoneBook.pushObject(Ember.Object.create({
        phoneName: "",
        phoneNumber: "",
        service: []
      }));
    },
    
    deletePhone: function(phoneBook, idx) {
      phoneBook.removeAt(idx);
    }
  }
  
});
