import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import layout from '../templates/components/feature-table';

class FeatureTable extends Component {
  @service('emt-themes/mdeditor-leaflet-table') themeInstance;

  columns = [
    {
      propertyName: 'id',
      title: 'ID',
    },
    {
      propertyName: 'properties.name',
      title: 'Name',
    },
    {
      propertyName: 'properties.description',
      title: 'Description',
    },
    {
      title: 'Actions',
      disableFiltering: true,
      disableSorting: true,
      component: 'leaflet-table-row-actions',
      className: 'text-center text-nowrap',
    },
  ];

  constructor() {
    super(...arguments);

    this.args.data.forEach((item, idx) => {
      set(item, 'properties', get(item, 'properties') || {});
      set(
        item,
        'properties.name',
        get(item, 'properties.name') || 'Feature' + (idx + 1)
      );
    });
  }
}

export default setComponentTemplate(layout, FeatureTable);
