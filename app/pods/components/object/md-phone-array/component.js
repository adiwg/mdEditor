import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * mdEditor class for input and edit of mdJSON 'phone' object.
   * The class manages the maintenance of an array of phone objects.
   *
   * @class md-phone-array
   * @constructor
   */

  /**
   * An array of mdJSON phone objects.
   *
   * @property phoneBook
   * @type Array
   * @required
   */

  /**
   * Indicates the initial panel collapsed state.
   *
   * @property isCollapsed
   * @type Boolean
   */

  mdCodes: Ember.inject.service('codelist'),
  phoneServices: Ember.computed(function () {
    let mdCodelist = this.get('mdCodes')
      .get('telephone')
      .codelist;
    let serviceType = [];
    mdCodelist.forEach(function (telephone) {
      serviceType.push(telephone['codeName']);
    });
    return serviceType;
  }),

  //is this neccessary? Can this be used instead: $(this)[0].get('elementId')
  //or just this.$('.panel-collapse') if you just need to add a listener to
  //the show.bs.* events
  panelId: Ember.computed(function () {
    return Ember.generateGuid(null, 'panel');
  }),

  //uses isCollapsed if defined, otherwise inspects array length
  collapsed: Ember.computed('isCollapsed', function () {
    let isCollapsed = this.get('isCollapsed');

    if(isCollapsed !== undefined) {
      return isCollapsed;
    } else if(this.get('phoneBook')
      .length > 0) {
      return false;
    } else {
      return true;
    }
  }),

  //focus the added row, or the last row on deletion
  phoneBookChanged: Ember.observer('phoneBook.[]', function () {
    //https://guides.emberjs.com/v2.6.0/applications/run-loop/
    Ember.run.schedule('afterRender', this, function () {
      let panel = this.$('.panel-collapse');
      let input = this.$('.panel-collapse tbody tr:last-of-type input').first();

      if(panel.hasClass('in')){
        input.focus();
      } else { //add a one-time listener to wait until panel is open
        panel.one('shown.bs.collapse', function () {
          input.focus();
        });
        panel.collapse('show');
      }
    });
  }),

  didInsertElement: function () {
    console.info($(this)[0].get('elementId'));
    console.info(this.$('.panel-collapse'));
    /*let panel = this.get('panelId');
    let panelBtn = panel + '-btn';

    $('#' + panel)
      .on('show.bs.collapse', function () {
        $('#' + panelBtn)
          .removeClass('invisible');
      });
    $('#' + panel)
      .on('hidden.bs.collapse', function () {
        $('#' + panelBtn)
          .addClass('invisible');
      });*/
  },

  actions: {
    addPhone: function (phoneBook) {
      phoneBook.pushObject(Ember.Object.create({
        phoneName: "",
        phoneNumber: "",
        service: []
      }));
    },

    deletePhone: function (phoneBook, idx) {
      phoneBook.removeAt(idx);
    }
  }

});
