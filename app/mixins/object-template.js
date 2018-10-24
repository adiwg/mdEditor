/**
 * @module mdeditor
 * @submodule mixins
 */

import Ember from 'ember';

const {
  Mixin,
  isArray,
  getOwner,
  A,
  merge,
  run
} = Ember;

export default Mixin.create({
  /**
   * Use this mixin to apply 'templates' to an array of objects. Especially useful
   * when the object must support setting arrays that are not passed during
   * initialization.
   *
   * @class object-template
   * @constructor
   * @static
   */

  /**
   * Apply the 'template' to the object.
   *
   * @method applyTemplate
   * @param {Object} object The object to apply the template to.
   * @return {Ember.Object}
   */
  applyTemplate(object, defaults) {
    let value = object || {};
    let Template = this.get('templateClass');

    if(Template) {
      let owner = getOwner(this);

      return merge(Template.create(owner.ownerInjection(), defaults || {}),
        value);

    }

    return object;
  },

  /**
   * Apply the object 'template' to each object in the array.
   *
   * @method applyTemplateArray
   * @param {Array} propertyName The array of objects to apply the template to.
   * @return {Array}
   */
  applyTemplateArray(propertyName, defaults) {
    let property = this.get(propertyName);

    if(isArray(property)) {
      let Template = this.get('templateClass');
      if(Template) {
        let owner = getOwner(this);

        run.once(this, () => {
          property.forEach((item, idx, items) => {
            //items.removeAt(idx);

            let newItem = merge(Template.create(owner.ownerInjection(),
                defaults || {}),
              item);

            //items.insertAt(idx, newItem);
            items.set(`${idx}`, newItem);
          });
          this.notifyPropertyChange(propertyName);
        });
      }
    } else {
      run.once(this, () => {
        this.set(propertyName, A());
      });
    }

    return this.get(propertyName);
  }
});
