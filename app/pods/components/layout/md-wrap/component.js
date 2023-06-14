import Component from '@ember/component';

export default Component.extend({
  /**
   * Component used as a wrapper, data-spy enabled.
   *
   * ```handlebars
   * \{{#layout/md-wrap
   *   data-spy="Wrap"
   *   shadow=true
   * }}
   *   Content
   * {{/layout/md-wrap}}
   * ```
   * @module mdeditor
   * @submodule components-layout
   * @class md-wrap
   * @constructor
   */
  attributeBindings: ['data-spy'],
});
