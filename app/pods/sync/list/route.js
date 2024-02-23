import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import RSVP from 'rsvp';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

import { POUCH_TYPES } from 'mdeditor/services/pouch';

export default class SyncListRoute extends Route {
  @service pouch;

  async beforeModel() {
    await this.pouch.loadOptions();
    // TODO - This shouldn't be necessary. There's a race condition somewhere...
    await this.store.findAll('pouch-record');
    await this.store.findAll('pouch-contact');
    await this.store.findAll('pouch-dictionary');
  }

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
      type: POUCH_TYPES.RECORD,
      list: 'records',
      title: 'Metadata Records',
      icon: 'file-o',
      options: this.pouch.options[POUCH_TYPES.RECORD]
    }), EmberObject.create({
      type: POUCH_TYPES.CONTACT,
      list: 'contacts',
      title: 'Contacts',
      icon: 'users',
      options: this.pouch.options[POUCH_TYPES.CONTACT]
    }), EmberObject.create({
      type: POUCH_TYPES.DICTIONARY,
      list: 'dictionaries',
      title: 'Dictionaries',
      icon: 'book',
      options: this.pouch.options[POUCH_TYPES.DICTIONARY]
    })]);

    let mapFn = function (item, id) {
      meta[id].set('listId', guidFor(item));
      item.set('meta', meta[id]);

      return item;
    };

    return await RSVP.map(promises, mapFn);
  }
}