/**
 * @module mdeditor
 * @submodule components-input
 */

import { A } from '@ember/array';

import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import { notEmpty, alias, not, and, or } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action, computed, get, defineProperty } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { assert, debug } from '@ember/debug';
import DS from 'ember-data';

@classic
export default class MdSelectComponent extends Component {
  /**
   * A select list control for displaying and selecting options
   * provided in an array or promise array.
   *
   * ```handlebars
   * \{{input/md-select
   *  label="Measure Type"
   *  showValidations=true
   *  model=this
   *  path="measureType"
   *  valuePath="value"
   *  namePath="name"
   *  objectArray=typeOptions
   *  tooltip=true
   *  tooltipPath="tip"
   *  searchEnabled=false
   *  disabled=measureDisabled
   *  placeholder="The type of measurement."
   *  profilePath=(concat profilePath ".measure.type")
   * }}
   * ```
   *
   * @class md-select
   * @constructor
   */

  classNames = ['md-select'];
  classNameBindings = ['formGroup', 'required'];
  attributeBindings = ['dataSpy:data-spy'];

  @notEmpty('label') formGroup;
  @service('icon') icons;

  /**
   * An array or promise array containing the options for the
   * select list.
   * At a minimum the array elements should provide attributes for the
   * name value pairs displayed as select list options.
   * Tooltips may also be included.
   * Other attributes in the array elements will be ignored.
   *
   * ```javascript
   * {
   *   name: 'displayed',
   *   value: 'option',
   *   type: 'xtra info',
   *   tip: 'tooltip'
   * }
   * ```
   *
   * @property objectArray
   * @type Array
   * @required
   */

  /**
   * The initial value of the select. Type must match the type of the attribute
   * identified by the path option.
   *
   * @property value
   * @type Any
   * @required
   */
  value = null;

  /**
   * Path in the model to be used for the select list's option value. Both
   * `model` and `path` must be supplied together.
   *
   * @property path
   * @type String
   */

  /**
   * The model to be used to compute the value alias, generally used for
   * validations. Both `model` and `path` must be supplied together.
   *
   * @property model
   * @type String
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option value.
   *
   * @property valuePath
   * @type String
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option name or display text.
   *
   * @property namePath
   * @type String
   * @required
   */

  /**
   * Indicates if icons should be rendered.
   *
   * @property icon
   * @type Boolean
   * @default false
   */
  icon = false;

  /**
   * Indicates if value is required.
   *
   * @property required
   * @type Boolean
   * @default false
   */
  required = false;

  /**
   * The default icon.
   *
   * @property defaultIcon
   * @type {String}
   * @default defaultList
   * @required
   */
  defaultIcon = 'defaultList';

  /**
   * Indicates if tooltips should be rendered for the options.
   *
   * @property tooltip
   * @type Boolean
   * @default false
   */
  tooltip = false;

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's tooltip.  If null, no tooltip will be
   * generated.
   *
   * @property tooltipPath
   * @type String
   * @default null
   */
  tooltipPath = null;

  /**
   * Whether to render a button to clear the selection.
   *
   * @property allowClear
   * @type Boolean
   * @default false
   */
  allowClear = false;

  /**
   * Whether to render the search input.
   *
   * @property searchEnabled
   * @type Boolean
   * @default true
   */
  searchEnabled = true;

  /**
   * Whether to disable the select.
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled = false;

  /**
   * Whether to close the selection list after a selection has been made.
   *
   * @property closeOnSelect
   * @type Boolean
   * @default true
   */
  closeOnSelect = true;

  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one option'
   */
  placeholder = "Select one option";

  /**
   * Form label for select list
   *
   * @property label
   * @type String
   * @default null
   */
  label = null;

  get ariaLabel() {
    return this.label;
  }

  /**
   * Indicates whether to allow the user to enter a new option
   * not contained in the select list.
   *
   * @property create
   * @type Boolean
   * @default false
   */
  create = false;

  /**
   * If set, removes the option with the specified id from the list. By default,
   * it will hide options with a null id.
   *
   * @property filterId
   * @type {String|Number|null}
   * @default null
   * @optional
   */
  filterId = null;

  /**
   * The component to render
   *
   * @property theComponent
   * @type Ember.computed
   * @return String
   */
  get theComponent() {
    return this.create ? 'power-select-with-create' : 'power-select';
  }

  /**
   * Callback after value is updated, usually an action is passed.
   *
   * @method change
   */
  change() {}

  /**
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  get selectedItem() {
    let value = this.value;

    return DS.PromiseObject.create({
      promise: this.codelist
        .then(function(arr) {
          return arr.find((item) => {
            return item['codeId'] === value;
          });
        })
    });
  }

  /**
   * codelist is an array of code objects re-mapped from the input 'objectArray'.
   * Values from the input object array are mapped according the path parameters
   * provided.
   *
   * @property codelist
   * @type Ember.computed
   * @return PromiseArray
   */
  get codelist() {
    console.log('md-select codelist getter called');
    const objArray = this.objectArray;
    let inList = new Promise(function(resolve, reject) {
      // succeed
      resolve(objArray);
      // or reject
      reject(new Error('Couldn\'t create a promise.'));
    });
    let codeId = this.valuePath;
    let codeName = this.namePath;
    let tooltip = this.tooltipPath;
    let icons = this.icons;
    let defaultIcon = this.defaultIcon;
    let outList = A();

    const result = DS.PromiseArray.create({
      promise: inList.then(function(arr) {
        arr.forEach(function(item) {
          let newObject = {
            codeId: get(item, codeId),
            codeName: get(item, codeName),
            tooltip: false,
            icon: icons.get(item[codeName].toString()) || icons.get(
              defaultIcon)
          };
          if(tooltip) {
            newObject.tooltip = get(item, tooltip);
          }
          outList.pushObject(newObject);
        });

        return outList;
      })
    });
    console.log('md-select codelist returning PromiseArray:', result);
    return result;
  }

  /**
   * Creates a new codelist entry. The codeId and codeName are both set to the
   * passed value.
   *
   * @method createCode
   * @param  {String} code The code
   * @return {Object}      Returns a new codelist object
   */
  createCode(code) {
    return {
      codeId: code,
      codeName: code,
      tooltip: false
    };
  }

  /**
   * Set the value on the select.
   *
   * @method setValue
   * @param {Object} selected The object with the value(codeName) to set.
   */
  setValue(selected) {
    let val = selected ? selected.codeId : null;
    this.value = val;
    this.change();
  }

  constructor() {
    super(...arguments);

    let model = this.model;
    let path = this.path;

    if(isNone(model) !== isNone(path)) {
      assert(
        `You must supply both model and path to ${this.toString()} or neither.`
      );
    }

    if(!isBlank(model)) {
      if(this.model?.[path] === undefined) {
        debug(
          `model.${path} is undefined in ${this.toString()}.`
        );
        //Ember.run.once(()=>model.set(path, ""));
      }

      defineProperty(this, 'value', alias(`model.${path}`));

      defineProperty(this, 'validation', alias(
        `model.validations.attrs.${path}`).readOnly());

      defineProperty(this, 'required', computed(
        'validation.options.presence.{presence,disabled}',
        'disabled',
        function() {
          return !this.disabled &&
            this.validation?.options?.presence?.presence &&
            !this.validation?.options?.presence?.disabled;
        }).readOnly());

      defineProperty(this, 'notValidating', not(
        'validation.isValidating').readOnly());

      defineProperty(this, 'hasContent', notEmpty('value').readOnly());

      defineProperty(this, 'hasWarnings', notEmpty(
        'validation.warnings').readOnly());

      defineProperty(this, 'isValid', and('hasContent',
        'validation.isTruelyValid').readOnly());

      defineProperty(this, 'shouldDisplayValidations', or(
        'showValidations', 'didValidate',
        'hasContent').readOnly());

      defineProperty(this, 'showErrorClass', and('notValidating',
        'showErrorMessage',
        'hasContent', 'validation').readOnly());

      defineProperty(this, 'showErrorMessage', and(
        'shouldDisplayValidations',
        'validation.isInvalid').readOnly());

      defineProperty(this, 'showWarningMessage', and(
        'shouldDisplayValidations',
        'hasWarnings', 'isValid').readOnly());
    }
  }

  actions = {
    setValue(selected) {
      this.setValue(selected);
    },

    create(selected) {
      let code = this.createCode(selected);

      this.codelist
        .pushObject(code);
      this.setValue(code);
    }
  }
}
