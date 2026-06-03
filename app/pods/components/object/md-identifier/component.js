import { and } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action, computed, get, set } from '@ember/object';
import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  identifier: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

@classic
export default class MdIdentifierComponent extends Component.extend(Validations) {
  classNames = ['md-identifier'];
  attributeBindings = ['data-spy'];

  collapsible = false;
  collapse = true;

  isCollapsed = and('collapsible', 'collapse');

  init() {
    super.init(...arguments);
    this._localModel = {};
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = get(this, 'model') || this._localModel;

    once(this, function () {
      set(model, 'authority', get(model, 'authority') ?? {});
    });
  }

  @computed('model', '_localModel')
  get effectiveModel() {
    return get(this, 'model') || this._localModel;
  }

  @computed('effectiveModel.identifier')
  get identifier() {
    return get(this, 'effectiveModel.identifier');
  }

  set identifier(value) {
    set(this, 'effectiveModel.identifier', value);
  }

  @computed('effectiveModel.namespace')
  get namespace() {
    return get(this, 'effectiveModel.namespace');
  }

  set namespace(value) {
    set(this, 'effectiveModel.namespace', value);
  }

  @action
  toggleCollapse() {
    this.toggleProperty('collapse');
  }
}

export { Validations };
