import { and } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
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

const theComp = Component.extend(Validations, {
  init() {
    this._super(...arguments);
    this._localModel = {};
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model') || this._localModel;

    once(this, function () {
      set(model, 'authority', get(model, 'authority') ?? {});
    });
  },

  classNames: ['md-identifier'],
  attributeBindings: ['data-spy'],

  /**
   * The identifier object to render
   *
   * @property model
   * @type {object}
   * @required
   */

  /**
   * Render short form of the identifier template, i.e. no authority
   *
   * @property short
   * @type {Boolean}
   */

  /**
   * Determines whether to render identifier field with confirmation button
   *
   * @property confirmIdentifier
   * @type {Boolean}
   */

  effectiveModel: computed('model', '_localModel', function () {
    return get(this, 'model') || this._localModel;
  }),

  identifier: computed('effectiveModel.identifier', {
    get() {
      return get(this, 'effectiveModel.identifier');
    },

    set(_key, value) {
      set(this, 'effectiveModel.identifier', value);
      return value;
    },
  }),

  namespace: computed('effectiveModel.namespace', {
    get() {
      return get(this, 'effectiveModel.namespace');
    },

    set(_key, value) {
      set(this, 'effectiveModel.namespace', value);
      return value;
    },
  }),
  collapsible: false,
  collapse: true,
  isCollapsed: and('collapsible', 'collapse'),

  actions: {
    toggleCollapse() {
      this.toggleProperty('collapse');
    }
  }
});

export { Validations, theComp as default };
