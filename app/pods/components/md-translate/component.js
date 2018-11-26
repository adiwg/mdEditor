import { equal, or } from '@ember/object/computed';
import Component from '@ember/component';
import {
  computed,
  get,
  set
} from '@ember/object';
import $ from 'jquery';
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

  writerOptions: [{
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
  }],

  result: null,
  errorLevel: null,
  errors: null,
  xhrError: null,
  isLoading: false,
  subTitle: null,

  errorClass: computed('errorLevel', 'errors', function () {
    return errorClasses[get(this, 'errorLevel')];
  }),

  errorTitle: computed('errorLevel', 'errors', function () {
    let type = ['Success', 'Notice', 'Warning', 'Error'];

    return type[get(this, 'errorLevel')];
  }),

  writeObj: computed('writer', function () {
    return get(this, 'writerOptions')
      .findBy('value', get(this,
        'writer'));
  }),

  writerType: computed('writeObj', function () {
    let obj = get(this, 'writeObj');

    return obj ? obj.type.split('/')[1] : null;
  }),

  isJson: equal('writerType', 'json'),
  defaultAPI: defaultValues.mdTranslatorAPI,
  apiURL: or('settings.data.mdTranslatorAPI', 'defaultAPI'),
  isHtml: computed('writerType', function () {
    //IE does not supoprt srcdoc, so default to non-html display
    return get(this, 'writerType') === 'html' && 'srcdoc' in document.createElement(
      'iframe');
  }),

  messages: computed('errors', function () {
    let err = get(this, 'errors');

    if(!err) {
      return null;
    }

    if(err.length) {
      set(this, 'subtitle', get(this, 'errorTitle') +
        ' ocurred during translation.');
      return err;
    }

    // if(!err.readerValidationPass) {
    //   set(this, 'subtitle', 'mdJSON Schema validation failed');
    //   return JSON.parse(err.readerValidationMessages[1]);
    // }
    //
    // if(!err.readerExecutionPass) {
    //   return err.readerExecutionMessages;
    // }
    //
    // if(!err.writerPass) {
    //   return err.writerMessages;
    // }
  }),

  _clearResult() {
    set(this, 'result', null);
    set(this, 'subtitle', null);
    set(this, 'errors', null);
    set(this, 'xhrError', null);
  },

  // _replacer(key, value) {
  //   //console.log(arguments);
  //   if(key==='contactId' && !_contacts.includes(value)){
  //     _contacts.push(value);
  //   }
  //   return value;
  // },

  actions: {
    translate() {
      let mdjson = this.get('mdjson');
      let url = this.get('apiURL');
      // let clean = cleaner.clean(get(this,'model.json'));
      // let json = JSON.parse(JSON.stringify(clean, get(this, '_replacer')));
      // let contacts = this.store.peekAll('contact').mapBy('json');
      //
      // json.contact = contacts.filter((item)=>{
      //   return _contacts.includes(get(item, 'contactId'));
      // });
      //console.info(JSON.stringify(json));

      this._clearResult();
      set(this, 'isLoading', true);

      $.ajax(url, {
          type: 'POST',
          data: {
            //file: JSON.stringify(cleaner.clean(json)),
            file: mdjson.formatRecord(get(this, 'model'), true),
            reader: 'mdJson',
            writer: get(this, 'writer'),
            showAllTags: get(this, 'showAllTags'),
            forceValid: get(this, 'forceValid'),
            validate: 'normal',
            format: 'json'
          },
          context: this
        })
        .then(function (response) {
          //this.sendAction("select", response);
          //console.info(response);

          set(this, 'isLoading', false);

          // if(response.success) {
          //   set(this, 'result', response.writerOutput);
          //   //Ember.$('.md-translator-preview textarea').val(response.data);
          // } else {
          let level = Math.max(...[response.readerExecutionStatus,
            response.readerStructureStatus,
            response.readerValidationStatus, response.writerStatus
          ].map(itm => errorLevels[itm]));

          set(this, 'errorLevel', level);
          set(this, 'errors', response.readerExecutionMessages.concat(
            response.readerStructureMessages,
            response.readerValidationMessages.length ? response.readerValidationMessages[0] : response.readerValidationMessages,
            response.writerMessages).map(itm => itm.split(':')));
          set(this, 'result', response.writerOutput);
          if(!response.success) {
            get(this, 'flashMessages')
              .danger('Translation error!');
          }
        }, (response) => {
          let error =
            `mdTranslator Server error:
          ${response.status}: ${response.statusText}`;

          set(this, 'errorLevel', 3);
          set(this, 'isLoading', false);
          set(this, 'xhrError', error);
          get(this, 'flashMessages')
            .danger(error);
        });

    },
    saveResult() {
      let title = get(this, 'model.title');
      let result = get(this, 'result');
      let writer = get(this, 'writeObj');

      window.saveAs(
        new Blob([result], {
          type: `${writer.type};charset=utf-8`
        }),
        `${title}_${moment().format('YYYYMMDD')}.${get(this, 'writerType')}`
      );
    },
    clearResult() {
      this._clearResult();
    },
    prettifyJson() {
      let promise = new Promise((resolve, reject) => {
        let parsed = JSON.parse(get(this, 'result'));

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
        get(this, 'flashMessages').danger(error.message);
      });
    },
    errorClass(level) {
      return errorClasses[errorLevels[level]] || 'primary';
    },
    formatMessage(message) {
      return message ? message.trim().replace(/^([A-Z]{2,})/g, match => match.toLowerCase()) :
        'context not provided'
    }
  }
});
