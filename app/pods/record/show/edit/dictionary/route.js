import Route from '@ember/routing/route';
import { action } from '@ember/object';
import uuidV4 from 'uuid/v4';
import EmberObject, { get, computed, defineProperty, set } from '@ember/object';

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
      computed('model', function () {
        return this.model.filterBy('selected');
      })
    );

    this.controllerFor('record.show.edit').setProperties({
      onCancel: this.refresh,
      cancelScope: this,
    });
  }
  _select(obj) {
    let rec = this.modelFor('record.show.edit');
    let selected = rec.get('json.mdDictionary');

    if (obj.selected) {
      if (selected.indexOf(obj.id) === -1) {
        selected.pushObject(obj.id);
        this.controller.notifyPropertyChange('model');
        return;
      }
    }
    selected.removeObject(obj.id);
    this.controller.notifyPropertyChange('model');
  }

  @action
  getColumns() {
    return this.columns;
  }

  @action
  select(obj) {
    this._select(obj);
  }

  @action
  remove(obj) {
    set(obj, 'selected', false);
    this._select(obj);
  }
}
