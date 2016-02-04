import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * Models for sidebar navigation
   *
   * @return {Ember.RSVP.hash}
   */
  model() {
    let promises = [this.store.findAll('record'),
      this.store.findAll('contact'),
      this.store.findAll('dictionary')
    ];

    let meta = [{
      type: 'record',
      list: 'records',
      title: 'Metadata Records'
    }, {
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    }, {
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    }];

    let idx = 0;

    let mapFn = function (item) {

      meta[idx].listId = Ember.guidFor(item);
      item.meta = meta[idx];
      idx = ++idx;

      return item;
    };

    return Ember.RSVP.map(promises, mapFn);
  }
});
