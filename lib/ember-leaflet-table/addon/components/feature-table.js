import Ember from 'ember';
import Table from 'mdeditor/pods/components/md-models-table/component';
import Theme from 'mdeditor/pods/components/md-models-table/themes/bootstrap3';

const {
  getWithDefault,
  set
} = Ember;

export default Table.extend({
  init() {
    this._super(...arguments);

    let data = this.get('data');

    data.forEach((item, idx) => {
      set(item, 'properties', getWithDefault(item, 'properties', {}));
      set(item, 'properties.name', getWithDefault(item,
        'properties.name', 'Feature' + (idx + 1)));
    });

  },
  themeInstance: Theme.create({
    components: {
      row: 'leaflet-table-row'
    }
  }),
  classNames: ['feature-table'],
  columns: [{
    propertyName: 'id',
    title: 'ID'
  }, {
    propertyName: 'properties.name',
    title: 'Name'
  }, {
    propertyName: 'properties.description',
    title: 'Description'
  }, {
    title: '',
    disableFiltering: true,
    disableSorting: true,
    component: 'leaflet-table-row-actions',
    className: 'text-center text-nowrap'
  }],

  // sendAction(action, row) {
  //   this.actions[action].call(this, row);
  // },

  actions: {
    // mouseEnter(row) {
    //   if(!row.state) {
    //     row.set('state', 'hover');
    //   }
    // },
    // mouseLeave(row) {
    //   if(row.state === 'hover') {
    //     row.set('state', '');
    //   }
    // },
    // zoomTo(row) {
    //   let layer = row._layer;
    //   let bnds = layer.getBounds();
    //
    //   layer._map.fitBounds(bnds, {
    //     maxZoom: 14
    //   });
    // },
    // showForm(row) {
    //   this.get('showForm')(row);
    // },
    // deleteFeature(row) {
    //   let layer = row._layer;
    //   let draw = layer._map.drawControl;
    //
    //   this.get('data')
    //     .removeObject(row);
    //
    //   if(draw && draw.options.edit.featureGroup === layer) {
    //     draw.remove();
    //   }
    //
    //   layer.clearLayers()
    //     .remove();
    //
    // }
  }
});
