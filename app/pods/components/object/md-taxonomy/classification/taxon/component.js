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

    // this.collapse = !this.parentItem;
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

  level: computed('parent.level', function () {
    let parent = this.get('parentItem');

    return parent ? parent.get('level') + 1 : 0;
  }),

  padding: computed('level', function () {
    let pad = this.get('level') + 0;

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
    this.get('spotlight').setTarget('editor-' + this.get('elementId'), this.get('stopEditing'),this);
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
      let parent = this.get('top') || this.get(
        'parentItem.model.subClassification');

      parent.removeObject(taxa);
    },
    toggleEditing() {
      if(this.get('isEditing')){
        this.get('spotlight').close();
        this.set('isEditing', false);
        return;
      }
      this.startEditing();
    }
  }
});
