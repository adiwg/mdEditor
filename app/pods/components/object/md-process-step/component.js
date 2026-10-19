import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import EmberObject from '@ember/object';
import { once } from '@ember/runloop';

@classic
export default class MdProcessStepComponent extends Component {
  /**
   * The string representing the path in the profile object for the processStep.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the processStep.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName = 'form';

  // Passed-in actions
  editCitation = null;

  sourceTemplate = EmberObject.extend();

  init() {
    super.init(...arguments);

    let model = this.model;

    once(this, function() {
      model.timePeriod = model.timePeriod ?? {};
    });
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function() {
      model.stepId = model.stepId ?? this.itemId;
      model.timePeriod = model.timePeriod ?? {};
      model.scope = model.scope ?? {};
      model.reference = model.reference ?? [];
      model.processor = model.processor ?? [];
      model.stepSource = model.stepSource ?? [];
      model.stepProduct = model.stepProduct ?? [];
    });
  }
}
