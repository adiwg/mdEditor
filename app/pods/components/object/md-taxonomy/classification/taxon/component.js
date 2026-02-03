import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { htmlSafe } from '@ember/string';
import { action, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
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
export default class MdTaxonomyClassificationTaxonComponent extends Component.extend(Validations) {
  @service spotlight;

  tagName = 'li';
  classNames = ['list-group-item', 'md-taxon'];
  classNameBindings = ['collapse'];
  isEditing = false;
  preview = false;

  @alias('model.taxonomicLevel') taxonomicLevel;
  @alias('model.taxonomicName') taxonomicName;
  @alias('model.taxonomicSystemId') taxonomicSystemId;

  get level() {
    let parent = this.parentItem;

    return parent ? parent.get('level') + 1 : 0;
  }

  get padding() {
    let pad = this.level + 0;

    return htmlSafe('padding-left: ' + pad + 'rem;');
  }

  get collapsible() {
    return this.model?.subClassification?.length;
  }

  constructor() {
    super(...arguments);

    this.collapse = (this.preview && !this.parentItem);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function () {
      this.model.commonName = this.model.commonName ?? [];
      this.model.subClassification = this.model.subClassification ?? [];
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if(this.model._edit) {
      this.startEditing();
      this.model._edit = false;
    }
  }

  startEditing() {
    let id = 'body-' + this.elementId;
    let editor = 'editor-' + this.elementId;

    this.isEditing = true;

    // this.spotlight.setTarget('editor-' + this.elementId, this.stopEditing,this);
    this.spotlight.setTarget(id, this.stopEditing, this);

    scrollIntoView(document.getElementById(editor), {
      behavior: 'smooth',
      //scrollMode: 'if-needed',
    });
  }

  stopEditing() {
    this.isEditing = false;
  }

  deleteTaxa(taxa) {
    let parent = this.top || get(this.parentItem, 'model.subClassification');

    parent.removeObject(taxa);
  }

  addChild() {
    this.model.subClassification.pushObject({
      commonName: [],
      subClassification: [],
      _edit: true
    });
  }

  @action
  toggleCollapse(event) {
    event.stopPropagation();
    this.collapse = !this.collapse;
  }

  @action
  deleteTaxaAction(taxa) {
    this.deleteTaxa(taxa);
  }

  @action
  toggleEditing() {
    if(this.isEditing) {
      this.spotlight.close();
      this.isEditing = false;
      return;
    }
    this.startEditing();
  }

  @action
  addChildAction() {
    this.addChild();
  }
}
