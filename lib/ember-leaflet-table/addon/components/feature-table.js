import Component from '@ember/component';
import { set, get } from '@ember/object';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';

@classic
@classNames('feature-table')
export default class FeatureTable extends Component {
  @service('emt-themes/md-bootstrap3') themeInstance;

  init() {
    super.init(...arguments);

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
      title: 'Actions',
      disableFiltering: true,
      disableSorting: true,
      component: 'leaflet-table-row-actions',
      className: 'text-center text-nowrap'
    }];

    let data = this.data;

    if (data) {
      data.forEach((item, idx) => {
        set(item, 'properties', get(item, 'properties') || {});
        set(item, 'properties.name', get(item,
          'properties.name') || 'Feature' + (idx + 1));
      });
    }
  }

  @action
  handleRowHover(index, record) {
    if (record && !record.state) {
      set(record, 'state', 'hover');
    }
  }

  @action
  handleRowOut(index, record) {
    if (record && get(record, 'state') === 'hover') {
      set(record, 'state', '');
    }
  }

  @action
  handleRowDoubleClick(index, record) {
    if (this.showForm) {
      this.showForm(record);
    }
  }
}
