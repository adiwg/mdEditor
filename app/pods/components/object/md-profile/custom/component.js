import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

@classic
export default class CustomComponent extends Component {
  tagName = 'form';

  @service('profile') definitions;
  @service schemas;

  get notSelected() {
    return this.schemas.schemas.filter(schema =>
      !this.record.schemas.includes(schema)
    );
  }

  get selected() {
    return this.record.schemas;
  }

  // profileOptions: alias('profile.profiles'),

  @action
  setValue(selected) {
    this.record.set('profileId', selected ? selected.codeId : null);
  }

  @action
  selectItem(item) {
    // item.set('_animate', true);
    // item.set('_selected', true);
    later(this, function () {
      this.selected.pushObject(item);
      this.record.updateTimestamp();
      this.record.save();
    }, 250);
  }

  @action
  deselectItem(item) {
    // item.set('_selected', false);
    later(this, function () {
      this.selected.removeObject(item);
      this.record.updateTimestamp();
      this.record.save();
    }, 250);
  }
}
