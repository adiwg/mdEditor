/**
 * @module mdeditor
 * @submodule components-input
 */

import { isArray, A } from '@ember/array';
import { computed, set } from '@ember/object';
import classic from 'ember-classic-decorator';
import MdCodelist from '../md-codelist/component';

/**
 * Specialized select list control for displaying and selecting options in
 * mdCodes codelists. Extends md-codelist. Allows selection of multiple
 * options.
 *
 * ```handlebars
 * {{input/md-codelist-multi
 *   value=array
 *   create=true
 *   tooltip=true
 *   icon=false
 *   mdCodeName="codeName"
 *   closeOnSelect=false
 *   placeholder="Select or enter one or more"
 * }}
 * ```
 *
 * @class md-codelist-multi
 * @extends md-codelist
 */
@classic
class MdCodelistMultiComponent extends MdCodelist {
  init() {
    super.init(...arguments);

    this.setValue = this.setValue.bind(this);

    if (!(this.model && this.path)) {
      set(this, 'localValue', this.value || []);
    }
  }

  setValue(selected) {
    let sel;

    if (this.create && !isArray(selected)) {
      sel = this.selectedItem.compact();
      sel.pushObject(selected);
    } else {
      sel = selected;
    }

    let nextValue = (sel || []).mapBy('codeId');

    if (this.model && this.path) {
      set(this, 'value', nextValue);
    } else {
      set(this, 'localValue', nextValue);
      set(this, 'value', nextValue);
    }

    this.change();
  }
}

MdCodelistMultiComponent.reopen({
  localValue: null,
  multiple: true,
  closeOnSelect: false,
  placeholder: 'Select one or more options',

  theComponent: computed('create', function () {
    return this.create
      ? 'power-select-multiple-with-create'
      : 'power-select-multiple';
  }),

  effectiveValue: computed('value', 'localValue', 'model', 'path', function () {
    return this.model && this.path ? this.value : this.localValue;
  }),

  selectedItem: computed('effectiveValue', 'codelist.[]', function () {
    let value = this.effectiveValue;
    let codelist = this.codelist;

    if (value) {
      return codelist.filter((item) => {
        return value.includes(item['codeId']);
      });
    }

    return null;
  }),

  codelist: computed('effectiveValue', 'filterId', 'mapped', function () {
    let existing = this.mapped || A([]);
    let value = this.effectiveValue;
    let create = this.create;
    let filter = this.filterId;
    let extra = [];

    if (value && create) {
      value.forEach((val) => {
        let found = existing.findBy('codeId', val);
        if (found === undefined) {
          extra.push(this.createCode(val));
        }
      });
    }

    return A([...existing, ...extra]).rejectBy('codeId', filter);
  }),
});

MdCodelistMultiComponent.prototype.classNames = [
  ...MdCodelist.prototype.classNames,
  'md-codelist-multi',
];

export default MdCodelistMultiComponent;
