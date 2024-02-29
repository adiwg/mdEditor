import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdPouchAddComponent extends Component {
  @service pouch;
  @tracked adding = false;
  @tracked value = null;

  @action
  addNew(type) {
    this.adding = true;
  }

  @action
  close() {
    this.adding = false;
    this.value = null;
  }

  @action
  async saveNew(type) {
    await this.pouch.createPouchRecord(type, this.value);
    this.close();
  }
}