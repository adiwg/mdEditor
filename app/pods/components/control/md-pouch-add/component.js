import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdPouchAddComponent extends Component {
  @service pouch;
  @tracked value = null;
  @tracked adding = false;
  @tracked options = [];

  constructor() {
    super(...arguments);
    const { section: { meta } } = this.args;
    if (this.pouch.options && this.pouch.options[meta.type]) {
      this.options = this.pouch.options[meta.type];
    }
  }

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