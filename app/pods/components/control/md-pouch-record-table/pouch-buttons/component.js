import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MdPouchRecordTablePouchButtonsComponent extends Component {
  @service pouch;

  @tracked relatedRecord = null;

  constructor() {
    super(...arguments);
    const { record } = this.args;
    this.pouch.queryRelatedRecord(record).then((relatedRecord) => {
      this.relatedRecord = relatedRecord;
    })
  }
}