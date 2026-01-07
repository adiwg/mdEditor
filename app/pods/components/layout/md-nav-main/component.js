import Component from '@ember/component';

export default Component.extend({
  /*didInsertElement: function () {
    const tooltips = this.element.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach((el) => {
      // Initialize Bootstrap tooltips if needed
      // bootstrap.Tooltip.getOrCreateInstance(el);
    });
  },*/
  actions: {
    toggleSidebar() {
      const wrapper = document.getElementById('md-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('toggled');
      }

      //hack to force reflow
      const navList = document.querySelector('#md-navbar-main-collapse ul');
      if (navList) {
        navList.style.display = 'none';
        // Force reflow
        navList.offsetHeight;
        navList.style.display = '';
      }
    }
  }
});
