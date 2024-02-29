import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdPouchRecordUpdateButtonComponent extends Component {
  @service pouch;

  @tracked updated = false;

  constructor() {
    super(...arguments);
    const { record, relatedRecord } = this.args;
    this.updated = this.pouch.checkIfPouchRecordChanged(record, relatedRecord);
  }

  @action
  async update() {
    const { record, relatedRecord } = this.args;
    await this.pouch.updatePouchRecord(record, relatedRecord);
    this.updated = true;
  }
}