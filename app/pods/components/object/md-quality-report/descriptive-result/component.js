import Component from '@ember/component';

export default Component.extend({
  actions: {
    remove() {
      this.remove(...arguments)
    }
  }

})
