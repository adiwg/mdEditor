import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MdPouchRecordDeleteButtonComponent extends Component {
  @service pouch;

  @action
  async delete(record) {
    await this.pouch.deletePouchModel(record)
  }
}