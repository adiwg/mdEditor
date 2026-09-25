import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';

@classic
export default class MdMediumComponent extends Component {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function() {
      model.mediumSpecification = model.mediumSpecification ?? {};
      model.identifier = model.identifier ?? {};
      model.mediumFormat = model.mediumFormat ?? [];
    });
  }

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  @alias('model.mediumSpecification.title') title;
}
