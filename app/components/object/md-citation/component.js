import Component from '@ember/component';
import { set, get } from '@ember/object';
import { once } from '@ember/runloop';

const formatCitation = function (model) {
  set(
    model,
    'responsibleParty',
    get(model, 'responsibleParty') !== undefined
      ? get(model, 'responsibleParty')
      : [],
  );
  set(
    model,
    'date',
    get(model, 'date') !== undefined ? get(model, 'date') : [],
  );
  set(
    model,
    'alternateTitle',
    get(model, 'alternateTitle') !== undefined
      ? get(model, 'alternateTitle')
      : [],
  );
  set(
    model,
    'presentationForm',
    get(model, 'presentationForm') !== undefined
      ? get(model, 'presentationForm')
      : [],
  );
  set(
    model,
    'onlineResource',
    get(model, 'onlineResource') !== undefined
      ? get(model, 'onlineResource')
      : [],
  );
  set(
    model,
    'identifier',
    get(model, 'identifier') !== undefined ? get(model, 'identifier') : [],
  );
  set(
    model,
    'otherCitationDetails',
    get(model, 'otherCitationDetails') !== undefined
      ? get(model, 'otherCitationDetails')
      : [],
  );
  set(
    model,
    'graphic',
    get(model, 'graphic') !== undefined ? get(model, 'graphic') : [],
  );
  set(
    model,
    'series',
    get(model, 'series') !== undefined ? get(model, 'series') : {},
  );

  return model;
};

const theComp = Component.extend({
  /**
   * mdEditor class for input and edit of mdJSON 'citation' objects.
   *
   * ```handlebars
   * \{{object/md-citation
   *  model=citation
   *  profilePath="path"
   *  simpleIdentifier=false
   *  embedded=false
   * }}
   * ```
   * @module mdeditor
   * @submodule components-object
   * @class md-citation
   * @constructor
   */

  didReceiveAttrs() {
    this._super(...arguments);

    //let model = getWithDefault(this, 'model', {}) || {};

    once(this, function () {
      this.set(
        'model',
        get(this, 'model') !== undefined ? get(this, 'model') : {},
      );
      formatCitation(this.model);
    });
  },
  tagName: 'form',

  /**
   * The string representing the path in the profile object for the citation.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the citation.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * Indicates whether the citation is embedded and should prevent recursion.
   *
   * @property embedded
   * @type {Boolean}
   * @default "false"
   */
  embedded: false,

  /**
   * The data-spy title, set to false to hide.
   *
   * @property data-spy
   * @type {String}
   * @default "Citation"
   */
  'data-spy': 'Citation',

  /**
   * Indicates whether the citation identifier Component should be rendered using
   * the inline form: md-identifier-object-table.
   *
   * @property simpleIdentifier
   * @type {Boolean}
   * @default "false"
   */
  simpleIdentifier: false,
});

export { formatCitation, theComp as default };
