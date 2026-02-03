import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import Papa from 'papaparse';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

@classic
export default class MdImportCsvComponent extends Component {
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Button with drop zone used to load CSV files
   *
   *```handlebars
   * \{{control/md-import-csv
   *   beforeFirstChunk=callback
   *   processChunk=callback
   *   processComplete=callback
   * }}
   * ```
   *
   * @class md-import-csv
   */

  @service router;
  @service ajax;

  /**
   * True if processing CSV file
   *
   * @property isProcessing
   * @type {Boolean}
   * @default "false"
   * @required
   */
  isProcessing = false;

  /**
   * Percent of file processed
   *
   * @property progress
   * @type {Number}
   * @default 0
   */
  progress = 0;

  /**
   * Style string for progress bar
   *
   * @property barWidth
   * @type {String}
   * @default "min-width: 10em;width:0%;""
   * @category computed
   * @requires progress
   */
  get barWidth() {
    return htmlSafe(`min-width: 10em;width:${this.progress}%;`);
  }

  /**
   * Callback fires before first chunk is processed
   *
   * @method beforeFirstChunk
   * @param {Object} result Data returned from parser
   * @param {Array} options.data Chunk of data
   * @param {Array} options.errors
   * @param {Object} options.metadata
   */
  beforeFirstChunk() {}

  /**
   * Method that processes each chunk of data
   *
   * @method processChunk
   * @param {Array} data Chunk of data
   */
  processChunk() {}

  /**
   * Method called when processsing is complete
   *
   * @method processComplete
   */
  processComplete() {}

  @action
  stopParsing() {
    this.parser.abort();
    this.isProcessing = false;
  }

  @action
  readData(file) {
    Papa.SCRIPT_PATH = this.router.rootURL +
      'assets/workers/worker_papaparse.js';

    let comp = this;

    comp.isProcessing = true;
    comp.progress = 0;
    next(this, function () {

      new Promise((resolve, reject) => {
          try {
            let processed = 1;
            let chunkSize = 1000000;

            Papa.parse(file.data, {
              header: true,
              worker: true,
              dynamicTyping: true,
              skipEmptyLines: true,
              chunkSize: chunkSize,
              complete: () => {
                resolve();
              },
              chunk: (results, parser) => {
                if(processed === 1) {
                  this.beforeFirstChunk(results);
                }

                this.progress = Math.trunc(((
                    chunkSize * processed) / file
                  .size) * 100);

                this.parser = parser;

                this.processChunk(results.data);

                processed++;
              }
            });
          } catch(e) {
            reject(
              `Failed to parse file: ${file.name}. Is it a valid CSV?\n${e}`
            );
          }
        })
        .then(() => {
          //fire callback
          this.processComplete();

        })
        .catch((reason) => {
          //catch any errors
          this.flashMessages
            .danger(reason);
          return false;
        })
        .finally(() => {
          //comp.isProcessing = false;

          const fileInput = document.querySelector('.md-import-picker input[type="file"]');
          if (fileInput) {
            fileInput.value = '';
          }
        });
    });
  }

  @action
  readFromUri() {
    let comp = this;

    comp.isLoading = true;

    this.ajax.request(this.importUri, {
        type: 'GET',
        context: this,
        dataType: 'text',
        crossDomain: true
      })
      .then(function (response, textStatus) {

        if(response && textStatus === 'success') {
          let json;

          new Promise((resolve, reject) => {
              try {
                json = JSON.parse(response);
              } catch(e) {
                reject(
                  `Failed to parse data. Is it valid JSON?`);
              }

              resolve({
                json: json,
                file: null,
                route: this
              });
            })
            .then((data) => {
              //determine file type and map
              this.mapJSON(data);

            })
            .catch((reason) => {
              //catch any errors
              this.flashMessages
                .danger(reason);
              return false;
            })
            .finally(() => {
              comp.isLoading = false;
              const fileInput = document.querySelector('.import-file-picker input[type="file"]');
              if (fileInput) {
                fileInput.value = '';
              }
            });
        } else {
          comp.errors = response.messages;
          this.flashMessages
            .danger('Import error!');
        }
      }, (response) => {
        let error =
          ` Error retrieving the mdJSON: ${response.status}: ${response.statusText}`;

        comp.xhrError = error;
        comp.isLoading = false;
        this.flashMessages
          .danger(error);
      });

  }
}
