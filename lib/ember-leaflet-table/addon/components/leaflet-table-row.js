//import Ember from 'ember';
import Row from 'ember-models-table/components/models-table/row';
import layout from 'ember-models-table/templates/components/models-table/row';

export default Row.extend({
  layout,

  mouseEnter() {
    //this.sendAction('mouseEnter', this.get('record'));
    let row = this.get('record');

    if(!row.state) {
      row.set('state', 'hover');
    }
  },

  mouseLeave() {
    //this.sendAction('mouseLeave', this.get('record'));
    let row = this.get('record');

    if(row.state === 'hover') {
      row.set('state', '');
    }
  },

  doubleClick() {
    this.sendAction('showForm', this.get('record'));
    //this.showForm(this.get('record'));
  }//,

  // actions: {
  //   zoomTo(record) {
  //     this.zoomTo(record);
  //   },
  //   showForm(record) {
  //     this.showForm(record);
  //   },
  //   deleteFeature(record) {
  //     this.deleteFeature(record);
  //   }
  // }
});
