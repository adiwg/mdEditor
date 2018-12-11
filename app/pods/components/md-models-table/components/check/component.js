import Component from '@ember/component';

export default Component.extend({
  actions: {
    clickOnRow(index, record, event) {
      this.clickOnRow(index, record);
      event.stopPropagation();
    }
  }
});
