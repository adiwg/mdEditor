import Component from '@ember/component';
import {
  htmlSafe
} from '@ember/string';
import {
  computed
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { once } from '@ember/runloop';
import { getWithDefault } from '@ember/object';

const Validations = buildValidations({
  'taxonomicName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ],
  'taxonomicLevel': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    this.collapse = (this.preview && !this.parentItem);
  },
  didReceiveAttrs() {
    this._super(...arguments);

    once(this, function() {
      this.set('model.commonName', getWithDefault(this, 'model.commonName', []));
    });
  },
  spotlight: service(),
  tagName: 'li',
  classNames: ['list-group-item', 'md-taxon'],
  classNameBindings: ['collapse'],
  isEditing: false,
  preview: false,

  level: computed('parent.level', function () {
    let parent = this.parentItem;

    return parent ? parent.get('level') + 1 : 0;
  }),

  padding: computed('level', function () {
    let pad = this.level + 0;

    return htmlSafe('padding-left: ' + pad + 'rem;');
  }),

  collapsible: computed('model.subClassification.[]', function () {
    return this.get(
      'model.subClassification.length');
  }),

  taxonomicLevel: alias('model.taxonomicLevel'),
  taxonomicName: alias('model.taxonomicName'),
  taxonomicSystemId: alias('model.taxonomicSystemId'),

  startEditing() {
    this.set('isEditing', true);
    this.spotlight.setTarget('editor-' + this.elementId, this.stopEditing,this);
  },

  stopEditing() {
      this.set('isEditing', false);
  },

  actions: {
    toggleCollapse(event) {
      event.stopPropagation();
      this.toggleProperty('collapse');
    },
    deleteTaxa(taxa) {
      let parent = this.top || this.get(
        'parentItem.model.subClassification');

      parent.removeObject(taxa);
    },
    toggleEditing() {
      if(this.isEditing){
        this.spotlight.close();
        this.set('isEditing', false);
        return;
      }
      this.startEditing();
    }
  }
});
