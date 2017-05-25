import Ember from 'ember';
import moment from 'moment';
const {
  Component,
  computed,
  get,
  inject,
  set
} = Ember;

export default Component.extend({
  classNames: ['row'],

  clean: inject.service('cleaner'),
  flashMessages:inject.service(),
  //store: inject.service(),

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
      name: 'HTML',
      value: 'html',
      type: 'text/html',
      tip: 'HTML "human-readable" and printable report of the metadata content'
    },
    {
      name: 'mdJSON',
      value: 'mdJson',
      type: 'application/json',
      tip: 'Alaska Data Integration working group (ADIwg) metadata format'
    }, {
      name: 'sbJSON(beta)',
      value: 'sbJson',
      type: 'application/json',
      tip: 'USGS ScienceBase metadata format'
    }
  ],

  result: null,
  errors: null,
  xhrError: null,

  writeObj: computed('writer', function () {
    return get(this, 'writerOptions').findBy('value', get(this,
      'writer'));
  }),

  writerType: computed('writeObj', function () {
    return get(this, 'writeObj').type.split('/')[1];
  }),

  isJson: computed.equal('writerType', 'json'),

  messages: computed('errors', function () {
    let err = get(this, 'errors');

    if(err) {
      return JSON.parse(err.readerValidationMessages[1]);
    }

    return null;
  }),

  _clearResult() {
    set(this, 'result', null);
    set(this, 'errors', null);
    set(this, 'xhrError', null);
  },

  actions: {
    translate() {
      let model = get(this, 'model');
      let json = JSON.parse(JSON.stringify(this.get('clean').clean(model.get(
        'json'))));
      let contacts = this.store.peekAll('contact').mapBy('json');

      json.contact = contacts;

      console.info(JSON.stringify(json));

      this._clearResult();

      Ember.$.ajax("http://mdtranslator.adiwg.org/api/v2/translator", {
        type: 'POST',
        data: {
          file: JSON.stringify(json),
          reader: 'mdJson',
          writer: get(this, 'writer'),
          showAllTags: get(this, 'showAllTags'),
          validate: 'normal',
          format: 'json'
        },
        context: this
      }).then(function (response) {
        //this.sendAction("select", response);
        console.info(response);

        if(response.success) {
          set(this, 'result', response.data);
          //Ember.$('.md-translator-preview textarea').val(response.data);
        } else {
          set(this, 'errors', response.messages);
          get(this, 'flashMessages').danger('Translation error!');
        }
      }, (response) => {
        let error =
          `mdTranslator Server error:
          ${response.status}: ${response.statusText}`;

        set(this, 'xhrError', error);
        get(this, 'flashMessages').danger(error);
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
      let promise = new Ember.RSVP.Promise((resolve, reject) => {
        let parsed = JSON.parse(get(this, 'result'));

        if(parsed) {
          resolve(parsed);
        } else {
          reject('JSON not valid');
        }
      });

      promise.then((obj) => {
        set(this, 'result', JSON.stringify(obj, null, 2));
      }).
      catch((error) => {
        console.log(error);
        get(this, 'flashMessages').danger(error.message);
      });
    }
  }
});
