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
      let Template = this.get('templateClass');
      if(Template) {
        let owner = getOwner(this);

        property.forEach((item, idx, items) => {
          run.once(() => {
            items.replace(idx, 1, merge(Template.create(owner.ownerInjection()),
              item));
          });
        });
      }
    } else {
      this.set(propertyName, A());
    }

    return this.get(propertyName);
  }
});
