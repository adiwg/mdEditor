import EmberObject from '@ember/object';

export default function createContact(total) {

  const contacts = [];

  for(let i = 0; i < total; i++) {

    const contact = EmberObject.create({

      json: {
        "contactId": i,
        "isOrganization": false,
        "name": "Contact" + i,
        "positionName": null,
        "phoneBook": [],
        "address": {},
        "onlineResource": [],
        "contactInstructions": null
      },
      title: 'Contact' + i,
      icon: 'user',
      contactId: i
    });

    contacts.push(contact);

  }

  return contacts;

}

/**
 * Creates a real Contact model record in the store from a createContact()
 * fixture, omitting `title`/`icon` -- those are read-only computed
 * properties on the Contact model (derived from `json.name`/
 * `json.isOrganization`), so passing them to createRecord would attempt to
 * override a computed property without a setter.
 */
export function createContactRecord(store, fixture) {
  return store.createRecord('contact', {
    json: fixture.json,
    contactId: fixture.contactId,
  });
}
