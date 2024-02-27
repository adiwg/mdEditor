import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MdPouchRecordDeleteButtonComponent extends Component {
  @service pouch;

  @action
  async delete(record) {
    await record.destroyRecord();
    await record.unloadRecord();
  }
}