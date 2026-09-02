import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  A
} from '@ember/array';
import EmberObject, { set } from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  once
} from '@ember/runloop';
import {
  assert
} from '@ember/debug';
import { action } from '@ember/object';

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

@classic
export default class MdEntityComponent extends Component.extend(Validations) {
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

  tagName = 'form';

  foreignKeyTemplate = EmberObject.extend(buildValidations({
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
  });

  indexTemplate = EmberObject.extend(buildValidations({
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
  });

  attributeTemplate = Attribute;

  get attributeList() {
    let attr = this.model?.attribute;
    if(attr) {
      return A(attr.map((attr) => {
        return {
          codeId: attr.codeName,
          codeName: attr.codeName,
          tooltip: attr.definition
        };
      }));
    }
    return A([]);
  }

  get entityList() {
    return A((this.entities || [])
      .map((attr) => {
        if(attr.entityId) {
          return {
            codeId: attr.entityId,
            codeName: attr.codeName,
            tooltip: attr.definition
          };
        }
      }).filter(Boolean));
  }

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

  init() {
    super.init(...arguments);
    assert(`You must supply a dictionary for ${this.toString()}.`, this.dictionary);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'entityId', model.entityId ?? uuidV4());
      set(model, 'alias', model.alias ?? []);
      set(model, 'primaryKeyAttributeCodeName', model.primaryKeyAttributeCodeName ?? []);
      set(model, 'index', model.index ?? []);
      set(model, 'attribute', model.attribute ?? []);
      set(model, 'foreignKey', model.foreignKey ?? []);
      set(model, 'entityReference', model.entityReference ?? []);
    });
  }

  @action
  getEntityAttributes(id) {
    let entity = A(this.dictionary?.entity)
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
  }

  @action
  editCitationAction(id){
    this.editCitation(id);
  }

  @action
  editAttributeAction(id){
    this.editAttribute(id);
  }
}

MdEntityComponent.reopen({
  codeName: alias('model.codeName'),
  description: alias('model.description'),
  entities: alias('dictionary.entity'),
  attributes: alias('model.attribute'),
});
