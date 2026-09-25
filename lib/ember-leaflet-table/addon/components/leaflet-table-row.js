import Row from 'ember-models-table/components/models-table/themes/default/row';
import { setComponentTemplate } from '@ember/component';
import { action } from '@ember/object';
import layout from '../templates/components/leaflet-table-row';

class LeafletTableRow extends Row {
  @action
  onEnter() {
    let row = this.args.record;

    if (row && !row.state) {
      row.set('state', 'hover');
    }
  }

  @action
  onLeave() {
    let row = this.args.record;

    if (row && row.state === 'hover') {
      row.set('state', '');
    }
  }
}

export default setComponentTemplate(layout, LeafletTableRow);
