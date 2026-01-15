import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { set } from '@ember/object';
import { once } from '@ember/runloop';

const formatCitation = function(model) {
  model.responsibleParty = model.responsibleParty ?? [];
  model.date = model.date ?? [];
  model.alternateTitle = model.alternateTitle ?? [];
  model.presentationForm = model.presentationForm ?? [];
  model.onlineResource = model.onlineResource ?? [];
  model.identifier = model.identifier ?? [];
  model.otherCitationDetails = model.otherCitationDetails ?? [];
  model.graphic = model.graphic ?? [];
  model.series = model.series ?? {};

  return model;
};

const theComp = class MdCitationComponent extends Component {
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

  tagName = 'form';

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
  embedded = false;

  /**
   * The data-spy title, set to false to hide.
   *
   * @property data-spy
   * @type {String}
   * @default "Citation"
   */
  'data-spy' = 'Citation';

  /**
   * Indicates whether the citation identifier Component should be rendered using
   * the inline form: md-identifier-object-table.
   *
   * @property simpleIdentifier
   * @type {Boolean}
   * @default "false"
   */
  simpleIdentifier = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function() {
      this.model = this.model ?? {};
      formatCitation(this.model);
    });
  }
};

export {
  formatCitation,
  theComp as
  default
};
