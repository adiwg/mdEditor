/**
 * @module mdeditor
 * @submodule mixins
 */

import Mixin from '@ember/object/mixin';

import { getOwner } from '@ember/application';
import { A, isArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';

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
    let Template = this.templateClass;

    if (Template) {
      let owner = getOwner(this);

      return assign(
        {},
        Template.create(owner.ownerInjection(), defaults || {}),
        value
      );
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
    let Template = this.templateClass;

    if (!isArray(property)) {
      return A();
    }

    if (Template) {
      let owner = getOwner(this);
      return A(
        property.map((item) => {
          return Template.create(owner.ownerInjection(), {
            ...defaults,
            ...item,
          });
        })
      );
    }

    return property;
  },
  // TODO: 'This is a hack to get the template to work with the object-template mixin.  It is not a good solution.'
  applyObjectTemplateArray(propertyName, defaults) {
    let property = this.get(propertyName);

    if (isArray(property)) {
      let Template = this.templateClass;
      if (Template) {
        let owner = getOwner(this);

        run.once(this, () => {
          property.forEach((item, idx, items) => {
            //items.removeAt(idx);

            let newItem = assign(
              Template.create(owner.ownerInjection(), defaults || {}),
              item
            );

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
  },
});
