/**
 * @module mdeditor
 * @submodule components-input
 */

 import { alias, not, notEmpty, and, or } from '@ember/object/computed';

 import Component from '@ember/component';
import classic from 'ember-classic-decorator';
 import { computed, defineProperty } from '@ember/object';
 import { isBlank } from '@ember/utils';
 import { assert, debug } from '@ember/debug';

 @classic
export default class MdInputComponent extends Component {
   /**
    * Input, edit, display a single item
    *
    * ```handlebars
    * \{{input/md-input
    *    value=val
    *    model=null
    *    valuePath=null
    *    label="Name"
    *    placeholder="Enter name."
    *    infotip=true
    *    required=false
    *  }}
    * ```
    *
    * @class md-input
    * @constructor
    */

   classNames = ['md-input'];
   classNameBindings = ['label:form-group', 'required'];
   attributeBindings = ['data-spy'];

   /**
    * Value of the input.
    * Value sets the initial value and returns the edited result.
    * This property is overridden if valuePath and model are supplied.
    *
    * @property value
    * @type String
    * @required
    */

   /**
    * Type of data represented by the value string.
    * HTML5 types may be specified ('text', 'number', etc.)
    *
    * @property type
    * @type String
    * @default text
    */
   type = 'text';

   /**
    * The form label to display
    *
    * @property label
    * @type String
    * @default null
    */
   label = null;

   /**
    * Whether a value is required
    *
    * @property required
    * @type Boolean
    * @default false
    */
   required = false;

   /**
    * Whether a input is disabled
    *
    * @property disabled
    * @type Boolean
    * @default false
    */
   disabled = false;

   /**
    * Maximum number of characters for each input string.
    * If no maxlength is specified the length will not be restricted
    *
    * @property maxlength
    * @type Number
    * @default null
    */
   maxlength = null;

   /**
    * Text displayed in empty inputs
    *
    * @property placeholder
    * @type String
    * @default null
    */
   placeholder = null;

   /**
    * CSS class to set on the input control
    *
    * @property class
    * @type String
    * @default 'form-control'
    */
   inputClass = 'form-control';

   /**
    * The model or object containing the input value. Only needed for validation.
    *
    * @property model
    * @type {Object}
    * @default undefined
    * @readOnly
    */

   /**
    * The path of the input value. Only needed for validation.
    *
    * @property valuePath
    * @type {String}
    * @default ''
    * @readOnly
    */
   valuePath = '';

   /**
    * Whether to show the infotip
    *
    * @property infotip
    * @type {Boolean}
    * @default false
    */
   infotip = false;

   /**
    * Determines whether infotip is rendered
    *
    * @property showInfoTip
    * @type {Boolean}
    * @default "false"
    * @readOnly
    * @category computed
    * @requires placeholder, infotip
    */
   @and('placeholder', 'infotip') showInfoTip;

   constructor() {
     super(...arguments);

     let model = this.model;
     let valuePath = this.valuePath;

     if(isBlank(model) !== isBlank(valuePath)) {
       assert(
         `You must supply both model and valuePath to ${this.toString()} or neither.`
       );
     }

     if(!isBlank(model)) {
       if(this.model?.[valuePath] === undefined) {
         debug(
           `model.${valuePath} is undefined in ${this.toString()}.`
         );

         //Ember.run.once(()=>model.set(valuePath, ""));
       }

       if(this.type === 'number') {
         let attribute = `model.${valuePath}`;

         defineProperty(this, 'value', computed(attribute, {
           get() {
             let val = this.model?.[valuePath];

             return val ? val.toString() : '';
           },

           set(key, value) {
             let parse = this.step ? parseFloat : parseInt;

             this.model[valuePath] = parse(value, 10);

             return value;
           }
         }));
       } else {
         defineProperty(this, 'value', alias(`model.${valuePath}`));
       }

       defineProperty(this, 'validation', alias(
           `model.validations.attrs.${valuePath}`)
         .readOnly());

       defineProperty(this, 'required', computed(
           'validation.options.presence{presence,disabled}',
           'disabled',
           function () {
             return !this.disabled &&
               this.validation?.options?.presence?.presence &&
               !this.validation?.options?.presence?.disabled;
           })
         .readOnly());

       defineProperty(this, 'notValidating', not(
           'validation.isValidating')
         .readOnly());

       defineProperty(this, 'hasContent', notEmpty('value')
         .readOnly());

       defineProperty(this, 'hasWarnings', notEmpty(
           'validation.warnings')
         .readOnly());

       defineProperty(this, 'isValid', and('hasContent',
           'validation.isTruelyValid')
         .readOnly());

       defineProperty(this, 'shouldDisplayValidations', or(
           'showValidations', 'didValidate',
           'hasContent')
         .readOnly());

       defineProperty(this, 'showErrorClass', and('notValidating',
           'showErrorMessage',
           'hasContent', 'validation')
         .readOnly());

       defineProperty(this, 'showErrorMessage', and(
           'shouldDisplayValidations',
           'validation.isInvalid')
         .readOnly());

       defineProperty(this, 'showWarningMessage', and(
           'shouldDisplayValidations',
           'hasWarnings', 'isValid')
         .readOnly());
     }
   }
 }
