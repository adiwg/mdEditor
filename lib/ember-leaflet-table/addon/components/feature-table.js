import Table from 'ember-models-table/components/models-table';

export default Table.extend({
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
    template: 'components/leaflet-table/actions',
    className: 'text-center text-nowrap'
  }],
  customIcons: {
    'sort-asc': 'fa fa-caret-up',
    'sort-desc': 'fa fa-caret-down',
    'column-visible': 'fa fa-check-square-o',
    'column-hidden': 'fa fa-square-o',
    'nav-first': 'fa fa-fast-backward',
    'nav-prev': 'fa fa-backward',
    'nav-next': 'fa fa-forward',
    'nav-last': 'fa fa-fast-forward',
    'caret': 'fa fa-caret-down'
  },
  customClasses: {
    'table': 'table table-striped table-bordered table-condensed table-hover'
  },
  rowTemplate: 'components/leaflet-table/row',
  actions: {
    mouseEnter(row) {
      if(!row.state) {
        row.set('state', 'hover');
      }
    },
    mouseLeave(row) {
      if(row.state === 'hover') {
        row.set('state', '');
      }
    },
    zoomTo(row) {
      let layer = row._layer;
      let bnds = layer.getBounds();

      layer._map.fitBounds(bnds, {
        maxZoom: 14
      });
    },
    deleteFeature(row) {
      let layer = row._layer;
      let draw = layer._map.drawControl;

      this.get('data')
        .removeObject(row);

      if(draw && draw.options.edit.featureGroup === layer) {
        draw.remove();
      }

      layer.clearLayers()
        .remove();


    }
  }
});
