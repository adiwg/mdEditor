import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

/**
 * Copyable mixin provides copy functionality to models as a replacement for ember-copy Copyable mixin
 * 
 * Usage:
 * import Copyable from 'mdeditor/mixins/copyable';
 * 
 * class MyModel extends Model.extend(Copyable) {
 *   // Model implementation
 * }
 */
export default Mixin.create({
  copyService: service('copy'),

  /**
   * Creates a copy of this model. 
   * Override this method in your model to customize copy behavior.
   * @returns {Object} A copy of this model
   */
  copy() {
    return this.copyService.copy(this);
  }
});
