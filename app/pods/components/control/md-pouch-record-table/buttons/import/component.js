import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdPouchRecordImportButtonComponent extends Component {
  @service pouch;

  @tracked imported = false;

  @action
  async import() {
    const { record } = this.args;
    await this.pouch.createRelatedRecord(record);
    this.imported = true;
  }
}