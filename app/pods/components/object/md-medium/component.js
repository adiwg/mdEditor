import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { getWithDefault, get, set } from '@ember/object';
import { once } from '@ember/runloop';

@classic
@tagName('form')
export default class MdMedium extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function() {
      set(model, 'mediumSpecification', getWithDefault(model,
        'mediumSpecification', {}));
      set(model, 'identifier', getWithDefault(model, 'identifier', {}));
      set(model, 'mediumFormat', getWithDefault(model, 'mediumFormat', []));
    });
  }

  /**
   * The profile path for the component
   *
   * @property profilePath
   * @type {String}
   */

  @alias('model.mediumSpecification.title')
  title;
}
