import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject, { set } from '@ember/object';
import { once } from '@ember/runloop';

@classic
export default class MdLineageComponent extends Component {
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

  tagName = 'form';

  // Passed-in actions
  editProcessStep = null;
  editSource = null;
  editCitation = null;

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property stepTemplateClass
   * @type Ember.Object
   */
  stepTemplateClass = EmberObject.extend({
    init() {
      this._super(...arguments);
      this.set('timePeriod', {});
    }
  });

  sourceTemplate = EmberObject.extend();

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function() {
      set(model, 'scope', model.scope ?? {});
      set(model, 'citation', model.citation ?? []);
      set(model, 'processStep', model.processStep ?? []);
      set(model, 'source', model.source ?? []);
    });
  }
}
