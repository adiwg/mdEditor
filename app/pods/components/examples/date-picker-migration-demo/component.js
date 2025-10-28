/**
 * Simple component to demonstrate gradual migration from jQuery-based
 * date picker to modern jQuery-free implementation
 */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DatePickerMigrationDemo extends Component {
  @service datePicker;

  // You can force a specific implementation for testing
  forceModern = false;
  forceLegacy = false;

  @action
  toggleImplementation() {
    if (this.forceModern) {
      this.set('forceModern', false);
      this.set('forceLegacy', true);
    } else {
      this.set('forceModern', true);
      this.set('forceLegacy', false);
    }
  }

  get currentImplementation() {
    if (this.forceModern) return 'modern';
    if (this.forceLegacy) return 'legacy';
    return this.datePicker.implementation;
  }
}
