import { alias, equal, or } from '@ember/object/computed';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import moment from 'moment';
import { defaultValues } from 'mdeditor/models/setting';

const errorLevels = {
  OK: 0,
  NOTICE: 1,
  WARNING: 2,
  ERROR: 3,
};

const errorClasses = ['success', 'info', 'warning', 'danger'];

@classic
export default class MdTranslateComponent extends Component {
  classNames = ['row'];

  @service cleaner;
  @service flashMessages;
  @service mdjson;
  @service settings;
  @service ajax;
  @service apiValidator;

  /**
   * Indicates whether empty tags should be written to the translated output
   *
   * @property showAllTags
   * @type {Boolean}
   * @default "false"
   */
  showAllTags = false;

  /**
   * Indicates whether to force writer to meet the output standard
   *
   * @property forceValid
   * @type {Boolean}
   * @default "false"
   */
  forceValid = false;

  writer = null;
  @tracked result = null;
  @tracked errorLevel = null;
  @tracked errors = null;
  @tracked xhrError = null;
  @tracked isLoading = false;
  @tracked subTitle = null;

  @alias('errors') messages;
  @equal('writerType', 'json') isJson;
  @or('settings.data.mdTranslatorAPI', 'defaultAPI') apiURL;

  defaultAPI = defaultValues.mdTranslatorAPI;

  get writerOptions() {
    return [
      {
        name: 'FGDC CSDGM',
        value: 'fgdc',
        type: 'application/xml',
        tip: 'Federal Geographic Data Committee Content Standard for Digital Geospatial Metadata',
      },
      {
        name: 'HTML',
        value: 'html',
        type: 'text/html',
        tip: 'HTML "human-readable" and printable report of the metadata content',
      },
      {
        name: 'ISO 19115-3',
        value: 'iso19115_3',
        type: 'application/xml',
        tip: 'International Standards Organization Geographic Information - Metadata 19115-1:2014',
      },
      {
        name: 'ISO 19115-2/19139 (deprecated)',
        value: 'iso19115_2',
        type: 'application/xml',
        tip: 'International Standards Organization Geographic Information - Metadata 19115-2:2009',
      },
      {
        name: 'ISO 19110',
        value: 'iso19110',
        type: 'application/xml',
        tip: 'International Standards Organization Geographic Information - Feature Catalogue 19110:2005',
      },
      {
        name: 'sbJSON',
        value: 'sbJson',
        type: 'application/json',
        tip: 'USGS ScienceBase metadata format',
      },
      {
        name: 'Simple HTML (MS Word compatible)',
        value: 'simple_html',
        type: 'text/html',
        tip: 'HTML "human-readable" and printable report of the metadata content',
      },
    ];
  }

  get errorClass() {
    return errorClasses[this.errorLevel];
  }

  get errorTitle() {
    let type = ['Success', 'Notice', 'Warning', 'Error'];
    return type[this.errorLevel];
  }

  get errorSubTitle() {
    let err = this.errors;

    if (err.length) {
      return this.errorTitle + ' ocurred during translation.';
    }

    return null;
  }

  get writeObj() {
    return this.writerOptions.findBy('value', this.writer);
  }

  get writerType() {
    let obj = this.writeObj;
    return obj ? obj.type.split('/')[1] : null;
  }

  get isApiConfigured() {
    return this.apiValidator.isApiConfigured();
  }

  get isHtml() {
    //IE does not supoprt srcdoc, so default to non-html display
    return (
      this.writerType === 'html' && 'srcdoc' in document.createElement('iframe')
    );
  }

  _clearResult() {
    this.result = null;
    this.subTitle = null;
    this.errors = null;
    this.xhrError = null;
  }

  @action
  translate() {
    // Check if API is configured before proceeding
    if (!this.apiValidator.isApiConfigured()) {
      this.flashMessages.danger(
        'mdTranslator API URL is not configured. Please configure it in Settings.'
      );
      return;
    }

    let mdjson = this.mdjson;
    let url = this.apiURL;
    let cmp = this;

    this._clearResult();
    this.isLoading = true;

    this.ajax
      .request(url, {
        type: 'POST',
        data: {
          //file: JSON.stringify(cleaner.clean(json)),
          file: mdjson.formatRecord(this.model, true),
          reader: 'mdJson',
          writer: this.writer,
          showAllTags: this.showAllTags,
          forceValid: this.forceValid,
          validate: 'normal',
          format: 'json',
        },
        context: this,
      })
      .then(
        function (response) {
          cmp.isLoading = false;

          let level = Math.max(
            ...[
              response.readerExecutionStatus,
              response.readerStructureStatus,
              response.readerValidationStatus,
              response.writerStatus,
            ].map((itm) => errorLevels[itm])
          );

          cmp.errorLevel = level;
          cmp.errors = response.readerExecutionMessages
            .concat(
              response.readerStructureMessages,
              response.readerValidationMessages.length
                ? response.readerValidationMessages[0]
                : response.readerValidationMessages,
              response.writerMessages
            )
            .map((itm) => itm.split(':'));
          cmp.result = response.writerOutput;
          if (!response.success) {
            cmp.flashMessages.danger('Translation error!');
          }
        },
        (response) => {
          let error = `mdTranslator Server error:
          ${response.status}: ${response.statusText}`;

          cmp.errorLevel = 3;
          cmp.isLoading = false;
          cmp.xhrError = error;
          cmp.flashMessages.danger(error);
        }
      );
  }

  @action
  saveResult() {
    let title = this.model.title;
    let result = this.result;
    let writer = this.writeObj;

    window.saveAs(
      new Blob([result], {
        type: `${writer.type};charset=utf-8`,
      }),
      `${title}_${moment().format('YYYYMMDD')}.${this.writerType}`
    );
  }

  @action
  clearResult() {
    this._clearResult();
  }

  @action
  prettifyJson() {
    let promise = new Promise((resolve, reject) => {
      let parsed = JSON.parse(this.result);

      if (parsed) {
        resolve(parsed);
      } else {
        reject('JSON not valid');
      }
    });

    promise
      .then((obj) => {
        this.result = JSON.stringify(obj, null, 2);
      })
      .catch((error) => {
        this.flashMessages.danger(error.message);
      });
  }

  @action
  errorClassAction(level) {
    return errorClasses[errorLevels[level]] || 'primary';
  }

  @action
  formatMessage(message) {
    return message
      ? message.trim().replace(/^([A-Z]{2,})/g, (match) => match.toLowerCase())
      : 'context not provided';
  }

  @action
  goToSettings() {
    // Invoke the closure action passed from the parent route
    if (this.onGoToSettings && typeof this.onGoToSettings === 'function') {
      this.onGoToSettings();
    }
  }
}
