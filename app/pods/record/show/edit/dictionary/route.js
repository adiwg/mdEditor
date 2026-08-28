import Route from '@ember/routing/route';
import { action } from '@ember/object';
import uuidV4 from 'uuid/v4';
import EmberObject, {
  get,
  computed,
  defineProperty,
  set,
  observer,
} from '@ember/object';
import { A } from '@ember/array';

export default class DictionaryRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      title: 'Dictionaries',
    };

    this.columns = [
      {
        propertyName: 'title',
        title: 'Title',
      },
      {
        propertyName: 'subject',
        title: 'Subject',
      },
    ];
  }

  model() {
    //return this.store.peekAll('contact');
    let dicts = this.modelFor('application').findBy('modelName', 'dictionary');
    let rec = this.modelFor('record.show.edit');

    set(rec, 'json.mdDictionary', get(rec, 'json.mdDictionary') ?? []);
    let selected = rec.get('json.mdDictionary');

    return dicts.map((dict) => {
      let json = get(dict, 'json');
      let id = get(json, 'dictionaryId');
      let data = get(json, 'dataDictionary');

      if (!id) {
        set(json, 'dictionaryId', uuidV4());
        dict.save();
      }

      return EmberObject.create({
        id: json.dataDictionary.dictionaryId,
        title: get(data, 'citation.title'),
        description: data.description,
        subject: data.subject,
        selected: selected.includes(json.dataDictionary.dictionaryId),
      });
    });
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));

    defineProperty(
      this.controller,
      'selected',
      computed('model.@each.selected', function () {
        return this.model.filterBy('selected');
      })
    );

    // The checkbox column (control/md-record-table -> ember-models-table)
    // only flips each row's own `selected` flag via set() -- it doesn't
    // call back out to the route. Sync the record's persisted
    // `mdDictionary` id list from the reactive `selected` list instead of
    // trying to patch it incrementally per click, so both the checkbox
    // column and the "Remove" button (which also just flips `selected`)
    // go through the same path.
    const route = this;

    defineProperty(
      this.controller,
      '_syncSelectedDictionaries',
      observer('selected', function () {
        route.syncSelectedDictionaries(this.selected);
      })
    );

    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.refresh,
      cancelScope: this,
    });
  }

  syncSelectedDictionaries(selected) {
    let rec = this.modelFor('record.show.edit');

    set(rec, 'json.mdDictionary', A(selected.mapBy('id')));
  }

  @action
  getColumns() {
    return this.columns;
  }

  @action
  remove(obj) {
    set(obj, 'selected', false);
  }
}
