import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { get, set } from '@ember/object';

export default class IndexRoute extends Route {
  model() {
    let model = this.modelFor('record.show.edit');
    let json = model.get('json');
    let info = json.metadata.resourceInfo;

    set(
      info,
      'keyword',
      !info.hasOwnProperty('keyword') ? A() : A(info.keyword)
    );

    //check to see if custom list
    info.keyword.forEach((k) => {
      set(k, 'thesaurus', get(k, 'thesaurus') ?? {});
      set(
        k,
        'thesaurus.identifier',
        get(k, 'thesaurus.identifier') ?? [
          {
            identifier: 'custom',
          },
        ]
      );
      set(k, 'thesaurus.date', get(k, 'thesaurus.date') ?? [{}]);
      set(
        k,
        'thesaurus.onlineResource',
        get(k, 'thesaurus.onlineResource') ?? [{}]
      );
    });

    return model;
  }
}
