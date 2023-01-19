//import Ember from 'ember';
import Row from 'ember-models-table/components/models-table/row';
import layout from 'ember-models-table/templates/components/models-table/row';

export default Row.extend({
  layout,

  mouseEnter() {
    let row = this.get('record');

    if(!row.state) {
      row.set('state', 'hover');
    }
  },

  mouseLeave() {
    let row = this.get('record');

    if(row.state === 'hover') {
      row.set('state', '');
    }
  },

  doubleClick() {
    this.showForm(this.get('record'));
  }
});
