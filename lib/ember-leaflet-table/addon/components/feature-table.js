import { set, get } from '@ember/object';
import Table from 'mdeditor/pods/components/md-models-table/component';
import Theme from 'mdeditor/pods/components/md-models-table/themes/bootstrap3';
import classic from 'ember-classic-decorator'
import { classNames } from '@ember-decorators/component';

@classic
@classNames('feature-table')
export default class FeatureTable extends Table {
  constructor() {
    super(...arguments);

    this.columns = [{
      propertyName: 'id',
      title: 'ID'
    }, {
      propertyName: 'properties.name',
      title: 'Name'
    }, {
      propertyName: 'properties.description',
      title: 'Description'
    },{
      title: 'Actions',
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

    let data = this.get('data');

    data.forEach((item, idx) => {

      set(item, 'properties', get(item, 'properties', {}));
      set(item, 'properties.name', get(item,
        'properties.name', 'Feature' + (idx + 1)));
    });
  }
}
