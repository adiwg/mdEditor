import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['aria-checked:isSelected'],

  actions: {
    clickOnRow(index, record, event) {
      this.clickOnRow(index, record);
      event.stopPropagation();
    }
  }
});
