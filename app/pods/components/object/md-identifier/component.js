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

  @action
  toggleCollapse() {
    this.toggleProperty('collapse');
  }
}

MdIdentifierComponent.reopen({
  isCollapsed: and('collapsible', 'collapse'),

  effectiveModel: computed('model', '_localModel', function () {
    return get(this, 'model') || this._localModel;
  }),

  identifier: computed('effectiveModel.identifier', {
    get() {
      return get(this, 'effectiveModel.identifier');
    },

    set(key, value) {
      set(this, 'effectiveModel.identifier', value);
    },
  }),

  namespace: computed('effectiveModel.namespace', {
    get() {
      return get(this, 'effectiveModel.namespace');
    },

    set(key, value) {
      set(this, 'effectiveModel.namespace', value);
    },
  }),
});

export { Validations };
