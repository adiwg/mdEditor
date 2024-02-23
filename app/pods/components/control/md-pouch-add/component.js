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
  cancel() {
    this.adding = false;
    this.value = null;
  }

  @action
  saveNew(type) {
    this.pouch.savePouchModel(type, this.value);
  }
}