import Ember from 'ember';

const {
  Component,
  set,
  get,
  getWithDefault,
  run: {
    once
  }
} = Ember;

const formatCitation = function(model) {
  set(model, 'responsibleParty', getWithDefault(model,
    'responsibleParty', []));
  set(model, 'date', getWithDefault(model,
    'date', []));
  set(model, 'alternateTitle', getWithDefault(model,
    'alternateTitle', []));
  set(model, 'presentationForm', getWithDefault(model,
    'presentationForm', []));
  set(model, 'onlineResource', getWithDefault(model,
    'onlineResource', []));
  set(model, 'identifier', getWithDefault(model, 'identifier', []));
  set(model, 'otherCitationDetails', getWithDefault(model,
    'otherCitationDetails', []));
  set(model, 'graphic', getWithDefault(model, 'graphic', []));
  set(model, 'series', getWithDefault(model, 'series', {}));

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
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-citation-array
   * @constructor
   */

  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function() {
      formatCitation(model);
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
   * Indicates whether the citation identifier Component should be rendered using
   * the inline form: md-identifier-object-table.
   *
   * @property simpleIdentifier
   * @type {Boolean}
   * @default "false"
   */
  simpleIdentifier: false
});

export {
  formatCitation,
  theComp as
  default
};
