import Ember from 'ember';

const {
  Mixin,
  isArray,
  A,
  merge
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
   * @module mdeditor
   * @submodule mixins
   */

  /**
   * Apply the object 'template' to each object in the array.
   *
   * @method applyTemplate
   * @param {Array} propertyName The array of objects to apply the template to.
   * @return {Array}
   */
  applyTemplate(propertyName) {
    let property = this.get(propertyName);

    if(isArray(property)) {
      let template = this.get('templateClass');
      if(template) {
        property.forEach((item, idx, items) => {
          items.replace(idx, 1, merge(template.create(), item));
        });
      }
    } else {
      this.set(propertyName, A());
    }

    return this.get(propertyName);
  }
});
