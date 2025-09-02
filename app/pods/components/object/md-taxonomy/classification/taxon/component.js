import classic from 'ember-classic-decorator';
import { classNameBindings, classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  htmlSafe
} from '@ember/string';
import { getWithDefault, action, computed } from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import { once } from '@ember/runloop';
import scrollIntoView from 'scroll-into-view-if-needed';

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

@classic
@tagName('li')
@classNames('list-group-item', 'md-taxon')
@classNameBindings('collapse')
export default class Taxon extends Component.extend(Validations) {
  init() {
    super.init(...arguments);

    this.collapse = (this.preview && !this.parentItem);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function () {
      this.set('model.commonName', getWithDefault(this,
        'model.commonName', []));
      this.set('model.subClassification', getWithDefault(this,
        'model.subClassification', []));
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if(this.model._edit) {
      this.startEditing();
      this.set('model._edit', false);
    }
  }

  @service
  spotlight;

  isEditing = false;
  preview = false;

  @computed('parent.level')
  get level() {
    let parent = this.parentItem;

    return parent ? parent.get('level') + 1 : 0;
  }

  @computed('level')
  get padding() {
    let pad = this.level + 0;

    return htmlSafe('padding-left: ' + pad + 'rem;');
  }

  @computed('model.subClassification.[]')
  get collapsible() {
    return this.get(
      'model.subClassification.length');
  }

  @alias('model.taxonomicLevel')
  taxonomicLevel;

  @alias('model.taxonomicName')
  taxonomicName;

  @alias('model.taxonomicSystemId')
  taxonomicSystemId;

  startEditing() {
    let id = 'body-' + this.elementId;
    let editor = 'editor-' + this.elementId;

    this.set('isEditing', true);

    // this.spotlight.setTarget('editor-' + this.elementId, this.stopEditing,this);
    this.spotlight.setTarget(id, this.stopEditing, this);

    scrollIntoView(document.getElementById(editor), {
      behavior: 'smooth',
      //scrollMode: 'if-needed',
    });
  }

  stopEditing() {
    this.set('isEditing', false);
  }

  deleteTaxa(taxa) {
    let parent = this.top || this.get(
      'parentItem.model.subClassification');

    parent.removeObject(taxa);
  }

  addChild() {
    this.get('model.subClassification').pushObject({
      commonName: [],
      subClassification: [],
      _edit: true
    });
  }

  @action
  toggleCollapse(event) {
    event.stopPropagation();
    this.toggleProperty('collapse');
  }

  @action
  deleteTaxa(taxa) {
    this.deleteTaxa(taxa);
  }

  @action
  toggleEditing() {
    if(this.isEditing) {
      this.spotlight.close();
      this.set('isEditing', false);
      return;
    }
    this.startEditing();
  }

  @action
  addChild() {
    this.addChild();
  }
}
