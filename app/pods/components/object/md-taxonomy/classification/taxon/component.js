import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { htmlSafe } from '@ember/string';
import { action, computed, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { once, scheduleOnce } from '@ember/runloop';
import scrollIntoView from 'scroll-into-view-if-needed';

const Validations = buildValidations({
  taxonomicName: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
  taxonomicLevel: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

@classic
export default class MdTaxonomyClassificationTaxonComponent extends Component.extend(
  Validations
) {
  @service spotlight;

  tagName = 'li';
  classNames = ['list-group-item', 'md-taxon'];
  classNameBindings = ['collapse'];
  @tracked isEditing = false;
  @tracked collapse = false;
  preview = false;

  @alias('model.taxonomicLevel') taxonomicLevel;
  @alias('model.taxonomicName') taxonomicName;
  @alias('model.taxonomicSystemId') taxonomicSystemId;

  get level() {
    let parent = this.parentItem;
    return parent ? parent.level + 1 : 0;
  }

  get padding() {
    let pad = this.level + 0;

    return htmlSafe('padding-left: ' + pad + 'rem;');
  }

  @computed('model.subClassification.length')
  get collapsible() {
    return this.model?.subClassification?.length;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    once(this, function () {
      set(this.model, 'commonName', this.model.commonName || []);
      set(this.model, 'subClassification', this.model.subClassification || []);
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.model._edit) {
      this.startEditing();
      this.model._edit = false;
    }
  }

  startEditing() {
    let id = 'body-' + this.elementId;
    let editor = 'editor-' + this.elementId;

    this.isEditing = true;

    this.spotlight.setTarget(id, null, null);

    scheduleOnce('afterRender', this, () => {
      const el = document.getElementById(editor);
      if (el) scrollIntoView(el, { behavior: 'smooth' });
    });
  }

  init() {
    super.init(...arguments);

    this.collapse = this.preview && !this.parentItem;

    if (!this.deleteTaxa) {
      this.deleteTaxa = this._deleteTaxa.bind(this);
    }
  }

  _deleteTaxa(taxa) {
    let parent = this.top || this.parentItem?.model?.subClassification;
    if (!parent) return;

    let next = (parent || []).filter((item) => item !== taxa);

    if (this.top) {
      set(this, 'top', next);
    } else if (this.parentItem && this.parentItem.model) {
      set(this.parentItem.model, 'subClassification', next);
    }
  }

  @action
  addChild() {
    let children = this.model.subClassification || [];
    let child = {
      commonName: [],
      subClassification: [],
      _edit: true,
    };

    let next = [...children, child];
    set(this.model, 'subClassification', next);
  }

  @action
  toggleCollapse(event) {
    event.stopPropagation();
    this.collapse = !this.collapse;
  }

  @action
  toggleEditing(event) {
    event?.preventDefault?.();

    if (this.isEditing) {
      this.spotlight.close();
      this.isEditing = false;
      return;
    }
    this.startEditing();
  }
}
