import Component from '@ember/component';
import NativeArray from '@ember/array';
import EmberObject from '@ember/object';
import {
  set,
  computed,
  getWithDefault,
  get
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  once
} from '@ember/runloop';
import {
  assert
} from '@ember/debug';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import uuidV4 from "npm:uuid/v4";

const Validations = buildValidations({
  'codeName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'definition': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);
    assert(`You must supply a dictionary for ${this.toString()}.`, get(this,
      'dictionary'));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(this, function () {
      set(model, 'entityId', getWithDefault(model, 'entityId', uuidV4()));
      set(model, 'alias', getWithDefault(model, 'alias', []));
      set(model, 'primaryKeyAttributeCodeName', getWithDefault(model,
        'primaryKeyAttributeCodeName', []));
      set(model, 'index', getWithDefault(model, 'index', []));
      set(model, 'attribute', getWithDefault(NativeArray.apply(model),
        'attribute', []));
      set(model, 'foreignKey', getWithDefault(model, 'foreignKey', []));
      set(model, 'entityReference', getWithDefault(model,
        'entityReference', []));
    });
  },

  /**
   * The string representing the path in the profile object for the entity.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The parent dictionary object for this entity used to lookup references.
   *
   * @property dictionary
   * @type {Object}
   * @required
   */

  /**
   * The object to use as the data model for the entity.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName: 'form',

  foreignKeyTemplate: EmberObject.extend(buildValidations({
    'referencedEntityCodeName': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      })
    ],
    'localAttributeCodeName': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('array-required', {
        track: []
      })
    ],
    'referencedAttributeCodeName': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      }),
      validator('array-required', {
        track: []
      })
    ]
  }), {
    init() {
      this._super(...arguments);
      this.set('localAttributeCodeName', []);
      this.set('referencedAttributeCodeName', []);
    }
  }),

  //entityId: alias('model.entityId'),
  codeName: alias('model.codeName'),
  description: alias('model.description'),
  entities: alias('dictionary.entity'),
  attributes: alias('model.attribute'),

  attributeList: computed('attributes.@each.codeName', 'attributes.[]',
    function () {
      let attr = get(this, 'model.attribute');
      if(attr) {
        return attr.map((attr) => {
          return {
            codeId: get(attr, 'codeName'),
            codeName: get(attr, 'codeName'),
            tooltip: get(attr, 'definition')
          };
        });
      }
      return [];
    }),

  entityList: computed('entities.@each.entityId', 'entities.@each.codeName',
    function () {
      return get(this, 'entities')
        .map((attr) => {
          if(get(attr, 'entityId')) {
            return {
              codeId: get(attr, 'entityId'),
              codeName: get(attr, 'codeName'),
              tooltip: get(attr, 'definition')
            };
          }
        });
    }),

  actions: {
    getEntityAttributes(id) {
      let entity = NativeArray.apply(this.get('dictionary.entity'))
        .findBy('entityId', id);

      if(entity) {
        let a = get(entity, 'attribute')
          .map((attr) => {
            return {
              codeId: get(attr, 'codeName'),
              codeName: get(attr, 'codeName'),
              tooltip: get(attr, 'definition')
            };
          });

        return a;
      }

      return [];
    }
  }
});
