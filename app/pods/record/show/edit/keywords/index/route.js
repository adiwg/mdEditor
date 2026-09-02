import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { set } from '@ember/object';

export default class IndexRoute extends Route {
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(
      info,
      'keyword',
      !Object.prototype.hasOwnProperty.call(info, 'keyword') ? A() : A(info.keyword)
    );

    //check to see if custom list
    info.keyword.forEach((k) => {
      set(k, 'thesaurus', k.thesaurus ?? {});
      set(
        k,
        'thesaurus.identifier',
        k.thesaurus.identifier ?? [
          {
            identifier: 'custom',
          },
        ]
      );
      set(k, 'thesaurus.date', k.thesaurus.date ?? [{}]);
      set(
        k,
        'thesaurus.onlineResource',
        k.thesaurus.onlineResource ?? [{}]
      );
    });

    return model;
  }
}
