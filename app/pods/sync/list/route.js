import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import RSVP from 'rsvp';
import { guidFor } from '@ember/object/internals';

export default class SyncListRoute extends Route {
  async model() {

    let promises = [
      this.store.peekAll('pouch-record', {
        reload: true
      }),
      this.store.peekAll('pouch-contact', {
        reload: true
      }),
      this.store.peekAll('pouch-dictionary', {
        reload: true
      })
    ];

    const meta = A([EmberObject.create({
      type: 'record',
      list: 'records',
      title: 'Metadata Records',
      icon: 'file-o'
    }), EmberObject.create({
      type: 'contact',
      list: 'contacts',
      title: 'Contacts',
      icon: 'users'
    }), EmberObject.create({
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries',
      icon: 'book'
    })]);

    let mapFn = function (item, id) {
      meta[id].set('listId', guidFor(item));
      item.set('meta', meta[id]);

      return item;
    };

    return await RSVP.map(promises, mapFn);
  }
}