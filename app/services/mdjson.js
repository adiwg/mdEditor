import Ember from 'ember';

const {
  Service,
  inject,
  get
} = Ember;

export default Service.extend({
  cleaner: inject.service(),
  store: inject.service(),

  // _replacer(key, value) {
  //   //console.log(arguments);
  //   if(key==='contactId' && !_contacts.includes(value)){
  //     _contacts.push(value);
  //   }
  //   return value;
  // },

  formatRecord(rec, asText) {
    let _contacts = [];
    const _replacer = (key, value) => {
      //console.log(arguments);
      if(key === 'contactId' && !_contacts.includes(value)) {
        _contacts.push(value);
      }
      return value;
    };

    let cleaner = this.get('cleaner');
    let clean = cleaner.clean(get(rec, 'json'));
    let json = JSON.parse(JSON.stringify(clean, _replacer));
    let contacts = this.get('store').peekAll('contact').mapBy('json');

    json.contact = contacts.filter((item) => {
      return _contacts.includes(get(item, 'contactId'));
    });

    return asText ? JSON.stringify(cleaner.clean(json)) : cleaner.clean(json);
  }
});
