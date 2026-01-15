import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { or } from '@ember/object/computed';
import { isArray, A } from '@ember/array';
import { later } from '@ember/runloop';
import { assert } from '@ember/debug';
import moment from 'moment';
import { formatCitation } from '../../object/md-citation/component';

@classic
export default class MdItisComponent extends Component {
  tagName = 'form';
  classNames = ['md-itis'];

  @service itis;
  @service flashMessages;

  searchString = null;
  kingdom = null;
  total = null;
  isLoading = false;
  limit = 25;

  @or('selected.length', 'searchResult.length') found;

  get resultTitle() {
    let total = this.total;
    let result = this.searchResult?.length;
    let limit = this.limit;

    return total <= limit ? result : `${result} of ${total}`;
  }

  get notFound() {
    let result = this.searchResult;

    return isArray(result) && result.length === 0;
  }

  constructor() {
    super(...arguments);

    this.selected = [];
    assert('No taxonomy object supplied', this.taxonomy);
  }

  submit() {
    let itis = this.itis;

    this.isLoading = true;
    this.searchResult = null;

    itis
      .sendQuery(this.searchString, this.kingdom, this.limit)
      .then((response) => {
        if (!response) {
          return;
        }

        let docs = response.response.docs;
        let data = docs.map((doc) => itis.parseDoc(doc));

        this.searchResult = data;
        this.total = response.response.numFound;
        this.isLoading = false;
      });
  }

  @action
  search() {
    this.submit.call(this);
  }

  @action
  selectItem(item) {
    item.set('animate', true);
    item.set('selected', true);
    later(
      this,
      function () {
        this.searchResult.removeObject(item);
        this.selected.pushObject(item);
      },
      250
    );
  }

  @action
  deselectItem(item) {
    item.set('selected', false);
    later(
      this,
      function () {
        this.selected.removeObject(item);
        this.searchResult.pushObject(item);
      },
      250
    );
  }

  @action
  importTaxa(taxa) {
    let taxonomy = this.taxonomy;
    let itisCitation = this.itis.citation;

    taxonomy.taxonomicClassification = taxonomy.taxonomicClassification ?? [];
    let classification = taxonomy.taxonomicClassification;

    taxonomy.taxonomicSystem = taxonomy.taxonomicSystem ?? [{ citation: {} }];
    let systems = taxonomy.taxonomicSystem;

    let system = systems.findBy('citation.title', itisCitation.title);

    let allTaxa = taxa.reduce(
      (acc, itm) => acc.pushObjects(itm.taxonomy),
      []
    );
    let today = moment().format('YYYY-MM-DD');
    let dateObj = {
      date: today,
      dateType: 'transmitted',
      description: 'Taxa imported from ITIS',
    };
    itisCitation.otherCitationDetails = [
      `Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov on ${today}.`,
    ];

    allTaxa.forEach((itm) => this.itis.mergeTaxa(itm, classification));

    if (!system) {
      itisCitation.get('date').pushObject(dateObj);
      systems.pushObject({
        citation: itisCitation,
      });
    } else {
      system.citation = system.citation ?? {};
      let citation = system.citation;

      formatCitation(citation);

      let date = A(citation.date);

      if (!date.findBy('date', today)) {
        date.pushObject(dateObj);
      }
    }

    this.flashMessages.success(
      `Successfully imported ${allTaxa.length} taxa from ITIS.`
    );
  }
}
