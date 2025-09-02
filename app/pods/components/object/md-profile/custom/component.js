import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { alias, setDiff } from '@ember/object/computed';
import Component from '@ember/component';
import { later } from '@ember/runloop';

@classic
@tagName('form')
export default class Custom extends Component {
  @service('profile')
  definitions;

  @service
  schemas;

  @setDiff('schemas.schemas', 'record.schemas')
  notSelected;

  @alias('record.schemas')
  selected;

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
      this.record.save();
    }, 250);
  }

  @action
  deselectItem(item) {
    // item.set('_selected', false);
    later(this, function () {
      this.selected.removeObject(item);
      this.record.save();
    }, 250);
  }
}
