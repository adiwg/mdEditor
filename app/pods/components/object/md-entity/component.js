import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  A
} from '@ember/array';
import EmberObject, { set, get } from '@ember/object';
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

  @alias('model.codeName') codeName;
  @alias('model.description') description;
  @alias('dictionary.entity') entities;
  @alias('model.attribute') attributes;

  get attributeList() {
    let attr = this.model?.attribute;
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
  }

  get entityList() {
    return this.entities
      .map((attr) => {
        if(get(attr, 'entityId')) {
          return {
            codeId: get(attr, 'entityId'),
            codeName: get(attr, 'codeName'),
            tooltip: get(attr, 'definition')
          };
        }
      });
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

  constructor() {
    super(...arguments);
    assert(`You must supply a dictionary for ${this.toString()}.`, this.dictionary);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      model.entityId = model.entityId ?? uuidV4();
      model.alias = model.alias ?? [];
      model.primaryKeyAttributeCodeName = model.primaryKeyAttributeCodeName ?? [];
      model.index = model.index ?? [];
      model.attribute = model.attribute ?? [];
      model.foreignKey = model.foreignKey ?? [];
      model.entityReference = model.entityReference ?? [];
    });
  }

  @action
  getEntityAttributes(id) {
    let entity = A(this.dictionary?.entity)
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

  @action
  editCitationAction(id){
    this.editCitation(id);
  }

  @action
  editAttributeAction(id){
    this.editAttribute(id);
  }
}
