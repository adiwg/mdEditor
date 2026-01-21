/**
 * @module mdeditor
 * @submodule utils
 */

import { getOwner } from '@ember/application';
import { A, isArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import { once } from '@ember/runloop';

/**
 * Apply a template to an object.
 *
 * @function applyTemplate
 * @param {Object} context The context object (component/route) with owner
 * @param {Object} object The object to apply the template to
 * @param {Object} templateClass The template class to use
 * @param {Object} defaults Default values
 * @return {Object}
 */
export function applyTemplate(context, object, templateClass, defaults) {
  let value = object || {};
  let Template = templateClass;

  if (Template) {
    let owner = getOwner(context);

    return assign(
      {},
      Template.create(owner.ownerInjection(), defaults || {}),
      value
    );
  }

  return object;
}

/**
 * Apply the object template to each object in an array.
 *
 * @function applyTemplateArray
 * @param {Object} context The context object (component/route) with owner
 * @param {Array} property The array of objects to apply the template to
 * @param {Object} templateClass The template class to use
 * @param {Object} defaults Default values
 * @return {Array}
 */
export function applyTemplateArray(context, property, templateClass, defaults) {
  if (!isArray(property)) {
    return A();
  }

  if (templateClass) {
    let owner = getOwner(context);
    return A(
      property.map((item) => {
        return templateClass.create(owner.ownerInjection(), {
          ...defaults,
          ...item,
        });
      })
    );
  }

  return property;
}

/**
 * Apply the object template to each object in an array, modifying in place.
 * Note: This is a hack to get the template to work with the object-template mixin.
 *
 * @function applyObjectTemplateArray
 * @param {Object} context The context object with get/set/notifyPropertyChange
 * @param {String} propertyName The property name of the array
 * @param {Object} templateClass The template class to use
 * @param {Object} defaults Default values
 * @return {Array}
 */
export function applyObjectTemplateArray(
  context,
  propertyName,
  templateClass,
  defaults
) {
  let property = context.get(propertyName);

  if (isArray(property)) {
    if (templateClass) {
      let owner = getOwner(context);

      once(context, () => {
        property.forEach((item, idx, items) => {
          let newItem = assign(
            templateClass.create(owner.ownerInjection(), defaults || {}),
            item
          );

          items.set(`${idx}`, newItem);
        });
        context.notifyPropertyChange(propertyName);
      });
    }
  } else {
    once(context, () => {
      context.set(propertyName, A());
    });
  }

  return context.get(propertyName);
}
