import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, getWithDefault, action, computed } from '@ember/object';
import { isArray, A } from '@ember/array';
import { later } from '@ember/runloop';
import { assert } from '@ember/debug';
import moment from 'moment';
import { formatCitation } from '../../object/md-citation/component';

@classic
@tagName('form')
@classNames('md-itis')
export default class MdItis extends Component {
  init() {
    super.init(...arguments);

    this.selected = [];
    assert('No taxonomy object supplied', this.taxonomy);
  }

  @service
  itis;

  @service
  flashMessages;

  searchString = null;
  kingdom = null;
  total = null;
  isLoading = false;
  limit = 25;

  @computed('limit', 'total', 'searchResult.[]')
  get resultTitle() {
    let total = this.total;
    let result = this.get('searchResult.length');
    let limit = this.limit;

    return total <= limit ? result : `${result} of ${total}`;
  }

  @computed('searchResult')
  get notFound() {
    let result = this.searchResult;

    return isArray(result) && result.length === 0;
  }

  @or('selected.length', 'searchResult.length')
  found;

  submit() {
    let itis = this.itis;

    this.set('isLoading', true);
    this.set('searchResult', null);

    itis
      .sendQuery(this.searchString, this.kingdom, this.limit)
      .then((response) => {
        if (!response) {
          return;
        }

        let docs = response.response.docs;
        let data = docs.map((doc) => itis.parseDoc(doc));

        this.set('searchResult', data);
        this.set('total', response.response.numFound);
        this.set('isLoading', false);
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
    let itisCitation = this.get('itis.citation');

    let classification = set(
      taxonomy,
      'taxonomicClassification',
      getWithDefault(taxonomy, 'taxonomicClassification', [])
    );
    let systems = set(
      taxonomy,
      'taxonomicSystem',
      getWithDefault(taxonomy, 'taxonomicSystem', [{ citation: {} }])
    );
    let system = systems.findBy('citation.title', get(itisCitation, 'title'));

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
      let citation = set(
        system,
        'citation',
        getWithDefault(system, 'citation', {})
      );
      formatCitation(citation);

      let date = A(get(citation, 'date'));

      if (!date.findBy('date', today)) {
        date.pushObject(dateObj);
      }
    }

    this.flashMessages.success(
      `Successfully imported ${allTaxa.length} taxa from ITIS.`
    );
  }
}
