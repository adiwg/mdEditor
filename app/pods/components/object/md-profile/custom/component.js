import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { setDiff, alias } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Component.extend({
  tagName: 'form',
  definitions: service('profile'),
  schemas: service(),
  notSelected: setDiff('schemas.schemas', 'record.schemas'),
  selected: alias('record.schemas'),
  // profileOptions: alias('profile.profiles'),
  actions: {
    setValue(selected) {
      this.record.set('profileId', selected ? selected.codeId : null);
    },
    selectItem(item) {
      // item.set('_animate', true);
      // item.set('_selected', true);
      later(
        this,
        function () {
          this.selected.pushObject(item);
          this.record.save();
        },
        250
      );
    },
    deselectItem(item) {
      // item.set('_selected', false);
      later(
        this,
        function () {
          this.selected.removeObject(item);
          this.record.save();
        },
        250
      );
    },
  },
});
