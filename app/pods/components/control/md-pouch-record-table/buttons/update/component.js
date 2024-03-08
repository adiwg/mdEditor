import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MdPouchRecordUpdateButtonComponent extends Component {
  @service pouch;

  get updated() {
    const { record, relatedRecord } = this.args;
    return this.pouch.checkIfPouchRecordChanged(record, relatedRecord);
  }

  @action
  async update() {
    const { record, relatedRecord } = this.args;
    await this.pouch.updateRelatedRecord(record, relatedRecord);
  }
}