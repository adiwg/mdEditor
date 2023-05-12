import Component from '@ember/component';
import {
  A
} from '@ember/array';
import EmberObject, { set, computed, getWithDefault, get } from '@ember/object';
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
  Template as Attribute
} from '../md-attribute/component';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import uuidV4 from "uuid/v4";

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
    assert(`You must supply a dictionary for ${this.toString()}.`, this.dictionary);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'entityId', (model.entityId === undefined ? uuidV4() : model.entityId));
      set(model, 'alias', (model.alias === undefined ? [] : model.alias));
      set(model, 'primaryKeyAttributeCodeName', (model.primaryKeyAttributeCodeName === undefined ? [] : model.primaryKeyAttributeCodeName));
      set(model, 'index', (model.index === undefined ? [] : model.index));
      set(model, 'attribute', (model.attribute === undefined ? [] : model.attribute));
      set(model, 'foreignKey', (model.foreignKey === undefined ? [] : model.foreignKey));
      set(model, 'entityReference', (model.entityReference === undefined ? [] : model.entityReference));
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

  indexTemplate: EmberObject.extend(buildValidations({
    'codeName': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      })
    ],
    'allowDuplicates': [
      validator('presence', {
        presence: true,
        ignoreBlank: true
      })
    ],
    'attributeCodeName': [
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
      this.set('attributeCodeName', []);
      this.set('allowDuplicates', false);
    }
  }),

  attributeTemplate: Attribute,
  //entityId: alias('model.entityId'),
  codeName: alias('model.codeName'),
  description: alias('model.description'),
  entities: alias('dictionary.entity'),
  attributes: alias('model.attribute'),

  attributeList: computed('attributes.@each.codeName', 'model.attribute', function () {
    let attr = get(this, 'model.attribute');
    if(attr) {
      return attr.map((attr) => {
        return {
          codeId: attr.codeName,
          codeName: attr.codeName,
          tooltip: attr.definition
        };
      });
    }
    return [];
  }),

  entityList: computed('entities.{@each.entityId,@each.codeName}',
    function () {
      return this.entities
        .map((attr) => {
          if(attr.entityId) {
            return {
              codeId: attr.entityId,
              codeName: attr.codeName,
              tooltip: attr.definition
            };
          }
        });
    }),

   /**
    * The passed down editCitation method.
    *
    * @method editCitation
    * @param {Number} id
    * @required
    */

   /**
    * The passed down editAttribute method.
    *
    * @method editAttribute
    * @param {Number} id
    * @required
    */

  actions: {
    getEntityAttributes(id) {
      let entity = A(this.get('dictionary.entity'))
        .findBy('entityId', id);

      if(entity) {
        let a = entity.attribute
          .map((attr) => {
            return {
              codeId: attr.codeName,
              codeName: attr.codeName,
              tooltip: attr.definition
            };
          });

        return a;
      }

      return [];
    },

    editCitation(id){
      this.editCitation(id);
    },

    editAttribute(id){
      this.editAttribute(id);
    }
  }
});
