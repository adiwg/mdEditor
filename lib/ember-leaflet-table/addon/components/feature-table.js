import { get } from '@ember/object';
import { set, getWithDefault } from '@ember/object';
import Table from 'mdeditor/pods/components/md-models-table/component';
import Theme from 'mdeditor/pods/components/md-models-table/themes/bootstrap3';

export default Table.extend({
  init() {
    this.columns = [{
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
    }];

    this.themeInstance = Theme.create({
      components: {
        row: 'leaflet-table-row'
      }
    });

    this._super(...arguments);

    let data = this.data;

    data.forEach((item, idx) => {
      set(item, 'properties', (item.properties === undefined ? {} : item.properties));
      set(item, 'properties.name', (get(item, 'properties.name') === undefined ? 'Feature' + (idx + 1) : get(item, 'properties.name')));
    });

  },

  classNames: ['feature-table']
});
