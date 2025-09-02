import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  A
} from '@ember/array';
import EmberObject, { set, getWithDefault, get, action, computed } from '@ember/object';
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

@classic
@tagName('form')
export default class MdEntity extends Component.extend(Validations) {
  init() {
    super.init(...arguments);
    assert(`You must supply a dictionary for ${this.toString()}.`, this.dictionary);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, 'entityId', getWithDefault(model, 'entityId', uuidV4()));
      set(model, 'alias', getWithDefault(model, 'alias', []));
      set(model, 'primaryKeyAttributeCodeName', getWithDefault(model,
        'primaryKeyAttributeCodeName', []));
      set(model, 'index', getWithDefault(model, 'index', []));
      set(model, 'attribute', getWithDefault(model, 'attribute', []));
      set(model, 'foreignKey', getWithDefault(model, 'foreignKey', []));
      set(model, 'entityReference', getWithDefault(model,
        'entityReference', []));
    });
  }

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

  //entityId: alias('model.entityId'),
  @alias('model.codeName')
  codeName;

  @alias('model.description')
  description;

  @alias('dictionary.entity')
  entities;

  @alias('model.attribute')
  attributes;

  @computed('attributes.{@each.codeName,[]}')
  get attributeList() {
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
  }

  @computed('entities.{@each.entityId,@each.codeName}')
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

  @action
  getEntityAttributes(id) {
    let entity = A(this.get('dictionary.entity'))
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
  editCitation(id) {
    this.editCitation(id);
  }

  @action
  editAttribute(id) {
    this.editAttribute(id);
  }
}
