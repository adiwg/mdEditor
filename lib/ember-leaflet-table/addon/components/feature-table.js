import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import { inject as service } from '@ember/service';
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
      // Plain assignment, not set() - these run in the constructor, before
      // this component's own initial render has read anything on `item`,
      // but ember-models-table's setup (a sibling in the same render pass)
      // can still read `properties`/`properties.name` first depending on
      // timing. set()'s explicit dirty-tracking then trips Ember's
      // backtracking-rerender assertion ("attempted to update X after using
      // it in the same computation"); a plain JS write does not go through
      // that tracking path, so it's safe here regardless of read order.
      item.properties = item.properties || {};
      item.properties.name = item.properties.name || 'Feature' + (idx + 1);
    });
  }
}

export default setComponentTemplate(layout, FeatureTable);
