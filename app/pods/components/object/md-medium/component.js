import Ember from 'ember';

const {
  Component,
  set,
  get,
  getWithDefault,
  run: {
    once
  },
  computed: {
    alias
  }
} = Ember;

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function() {
      set(model, 'mediumSpecification', getWithDefault(model,
        'mediumSpecification', {}));
      set(model, 'identifier', getWithDefault(model, 'identifier', {}));
      set(model, 'mediumFormat', getWithDefault(model, 'mediumFormat', []));
    });
  },
  tagName: 'form',

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  title: alias('model.mediumSpecification.title')
});
