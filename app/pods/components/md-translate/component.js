import {
  alias,
  equal,
  or
} from '@ember/object/computed';
import Component from '@ember/component';
import {
  computed,
  get,
  set
} from '@ember/object';
import {
  inject as service
} from '@ember/service';
import {
  Promise
} from 'rsvp';
import moment from 'moment';
import {
  defaultValues
} from 'mdeditor/models/setting';

const errorLevels = {
  'OK': 0,
  'NOTICE': 1,
  'WARNING': 2,
  'ERROR': 3
};

const errorClasses = ['success', 'info', 'warning', 'danger'];

export default Component.extend({
  classNames: ['row'],

  cleaner: service(),
  flashMessages: service(),
  mdjson: service(),
  settings: service(),
  ajax: service(),

  /**
   * Indicates whether empty tags should be written to the translated output
   *
   * @property showAllTags
   * @type {Boolean}
   * @default "false"
   */
  showAllTags: false,

  /**
   * Indicates whether to force writer to meet the output standard
   *
   * @property forceValid
   * @type {Boolean}
   * @default "false"
   */
  forceValid: false,

  writer: null,

  writerOptions: computed(function () {
    return [{
      name: 'FGDC CSDGM',
      value: 'fgdc',
      type: 'application/xml',
      tip: 'Federal Geographic Data Committee Content Standard for Digital Geospatial Metadata'
    }, {
      name: 'HTML',
      value: 'html',
      type: 'text/html',
      tip: 'HTML "human-readable" and printable report of the metadata content'
    }, {
      name: 'ISO 19115-1',
      value: 'iso19115_1',
      type: 'application/xml',
      tip: 'International Standards Organization Geographic Information - Metadata 19115-1:2014'
    }, {
      name: 'ISO 19115-2',
      value: 'iso19115_2',
      type: 'application/xml',
      tip: 'International Standards Organization Geographic Information - Metadata 19115-2:2009'
    }, {
      name: 'ISO 19110',
      value: 'iso19110',
      type: 'application/xml',
      tip: 'International Standards Organization Geographic Information - Feature Catalogue 19110:2005'
    }, {
      name: 'sbJSON',
      value: 'sbJson',
      type: 'application/json',
      tip: 'USGS ScienceBase metadata format'
    }];
  }),

  result: null,
  errorLevel: null,
  errors: null,
  xhrError: null,
  isLoading: false,
  subTitle: null,

  errorClass: computed('errorLevel', 'errors', function () {
    return errorClasses[this.errorLevel];
  }),

  errorTitle: computed('errorLevel', 'errors', function () {
    let type = ['Success', 'Notice', 'Warning', 'Error'];

    return type[this.errorLevel];
  }),

  errorSubTitle: computed('errorTitle', 'errors', 'subTitle', function () {
    let err = this.errors;

    if(err.length) {
      return this.errorTitle + ' ocurred during translation.';
    }

    return null;
  }),
  writeObj: computed('writer', 'writerOptions', function () {
    return this.writerOptions
      .findBy('value', this.writer);
  }),

  writerType: computed('writeObj', function () {
    let obj = this.writeObj;

    return obj ? obj.type.split('/')[1] : null;
  }),

  isJson: equal('writerType', 'json'),
  defaultAPI: defaultValues.mdTranslatorAPI,
  apiURL: or('settings.data.mdTranslatorAPI', 'defaultAPI'),
  isHtml: computed('writerType', function () {
    //IE does not supoprt srcdoc, so default to non-html display
    return this.writerType === 'html' && 'srcdoc' in document.createElement(
      'iframe');
  }),

  messages: alias('errors'),

  _clearResult() {
    set(this, 'result', null);
    set(this, 'subtitle', null);
    set(this, 'errors', null);
    set(this, 'xhrError', null);
  },

  actions: {
    translate() {
      let mdjson = this.mdjson;
      let url = this.apiURL;
      let cmp = this;

      this._clearResult();
      set(this, 'isLoading', true);

      this.ajax.request(url, {
          type: 'POST',
          data: {
            //file: JSON.stringify(cleaner.clean(json)),
            file: mdjson.formatRecord(this.model, true),
            reader: 'mdJson',
            writer: this.writer,
            showAllTags: this.showAllTags,
            forceValid: this.forceValid,
            validate: 'normal',
            format: 'json'
          },
          context: this
        })
        .then(function (response) {
          set(cmp, 'isLoading', false);

          let level = Math.max(...[response.readerExecutionStatus,
            response.readerStructureStatus,
            response.readerValidationStatus, response.writerStatus
          ].map(itm => errorLevels[itm]));

          set(cmp, 'errorLevel', level);
          set(cmp, 'errors', response.readerExecutionMessages.concat(
            response.readerStructureMessages,
            response.readerValidationMessages.length ? response.readerValidationMessages[
              0] : response.readerValidationMessages,
            response.writerMessages).map(itm => itm.split(':')));
          set(cmp, 'result', response.writerOutput);
          if(!response.success) {
            cmp.flashMessages
              .danger('Translation error!');
          }
        }, (response) => {
          let error =
            `mdTranslator Server error:
          ${response.status}: ${response.statusText}`;

          set(cmp, 'errorLevel', 3);
          set(cmp, 'isLoading', false);
          set(cmp, 'xhrError', error);
          cmp.flashMessages
            .danger(error);
        });

    },
    saveResult() {
      let title = get(this, 'model.title');
      let result = this.result;
      let writer = this.writeObj;

      window.saveAs(
        new Blob([result], {
          type: `${writer.type};charset=utf-8`
        }),
        `${title}_${moment().format('YYYYMMDD')}.${this.writerType}`
      );
    },
    clearResult() {
      this._clearResult();
    },
    prettifyJson() {
      let promise = new Promise((resolve, reject) => {
        let parsed = JSON.parse(this.result);

        if(parsed) {
          resolve(parsed);
        } else {
          reject('JSON not valid');
        }
      });

      promise.then((obj) => {
        set(this, 'result', JSON.stringify(obj, null, 2));
      }).catch((error) => {
        //console.log(error);
        this.flashMessages.danger(error.message);
      });
    },
    errorClass(level) {
      return errorClasses[errorLevels[level]] || 'primary';
    },
    formatMessage(message) {
      return message ? message.trim().replace(/^([A-Z]{2,})/g, match =>
          match.toLowerCase()) :
        'context not provided';
    }
  }
});
