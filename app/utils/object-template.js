/**
 * @module mdeditor
 * @submodule utils
 */

import { getOwner } from '@ember/application';
import { A, isArray } from '@ember/array';
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
    if (!owner || owner.isDestroyed || owner.isDestroying) {
      return value;
    }

    return Object.assign(
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
    if (!owner || owner.isDestroyed || owner.isDestroying) {
      return property;
    }

    return A(
      property.map((item) => {
        let instance = templateClass.create(owner.ownerInjection(), defaults || {});
        if (item) {
          let keys = Object.keys(item);
          let hash = {};
          keys.forEach((key) => {
            hash[key] = item[key];
          });
          instance.setProperties(hash);
        }
        return instance;
      })
    );
  }

  return property;
}

/**
 * Apply the object template to each object in an array, modifying in place.
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
    // Only proceed if some item still needs templateClass applied.
    // didReceiveAttrs() (this function's only caller) fires on every
    // parent re-render, not just once - unconditionally replacing every
    // item here regardless of whether it already had the template
    // applied turns into a self-sustaining loop: replace ->
    // notifyPropertyChange -> re-render -> didReceiveAttrs fires again ->
    // replace again, forever. With no consumer passing an explicit
    // {{#each ... key=}}, Ember's default identity-based keying then
    // tears down and recreates every child component bound to a row on
    // every single pass - which made it impossible to keep focus/an
    // in-progress selection in an input inside one of those rows (e.g.
    // input/md-select-contacts inside object/md-party-array's rows), since
    // the DOM was being destroyed out from under the interaction.
    let needsTemplate =
      templateClass && property.some((item) => !(item instanceof templateClass));

    if (needsTemplate) {
      let owner = getOwner(context);

      once(context, () => {
        if (!owner || owner.isDestroyed || owner.isDestroying) {
          return;
        }

        property.forEach((item, idx, items) => {
          if (item instanceof templateClass) {
            return;
          }

          let newItem = Object.assign(
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
