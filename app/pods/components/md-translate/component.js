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

//const _contacts = [];

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
  errors: null,
  xhrError: null,
  isLoading: false,
  subTitle: null,

  writeObj: computed('writer', function () {
    return get(this, 'writerOptions')
      .findBy('value', get(this,
        'writer'));
  }),

  writerType: computed('writeObj', function () {
    return get(this, 'writeObj')
      .type.split('/')[1];
  }),

  isJson: computed.equal('writerType', 'json'),
  defaultAPI: defaultValues.mdTranslatorAPI,
  apiURL: computed.or('settings.data.mdTranslatorAPI', 'defaultAPI'),
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

    if(!err.readerStructurePass) {
      set(this, 'subtitle', 'Errors ocurred when reading the mdJSON');
      return err.readerStructureMessages;
    }

    if(!err.readerValidationPass) {
      set(this, 'subtitle', 'mdJSON Schema validation failed');
      return JSON.parse(err.readerValidationMessages[1]);
    }

    if(!err.readerExecutionPass) {
      return err.readerExecutionMessages;
    }

    if(!err.writerPass) {
      return err.writerMessages;
    }
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
            validate: 'normal',
            format: 'json'
          },
          context: this
        })
        .then(function (response) {
          //this.sendAction("select", response);
          //console.info(response);

          set(this, 'isLoading', false);

          if(response.success) {
            set(this, 'result', response.data);
            //Ember.$('.md-translator-preview textarea').val(response.data);
          } else {
            set(this, 'errors', response.messages);
            set(this, 'result', response.data);
            get(this, 'flashMessages')
              .danger('Translation error!');
          }
        }, (response) => {
          let error =
            `mdTranslator Server error:
          ${response.status}: ${response.statusText}`;

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
        })
        .
      catch((error) => {
        //console.log(error);
        get(this, 'flashMessages')
          .danger(error.message);
      });
    }
  }
});
