import Service, { inject as service } from '@ember/service';
import { storageSize } from 'mdeditor/utils/md-object-size';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.percent;
  },

  flashMessages: service(),

  /**
   * Percent value of storage against it's storage capacity
   *
   * @property percent
   * @type {Number}
   * @default 0
   */
  percent: storageSize().percent,

  showWarning(msg) {
    return this.flashMessages.warning(msg || `Warning! Your local storage is at ${this.percent}% of your browser's local storage capacity. Please back up records and clear storage cache.`, {
      timeout: 15000,
      preventDuplicates: true
    })
  },

  showDanger(msg) {
    return this.flashMessages.danger(msg || `Danger! Your local storage is at ${this.percent}% of your browser's local storage capacity. Please back up records and clear storage cache`,
      { sticky: true,
        preventDuplicates: true,
        destroyOnClick: true,
      })
  },

  showMessage() {
    if(this.percent >= 80 && this.percent < 90) {
      this.showWarning()
    } else if (this.percent >= 90) {
      this.showDanger()
    }
  }

});
