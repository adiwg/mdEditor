import Ember from 'ember';

export default function createContact(total) {

  const contacts = [];

  for(let i = 0; i < total; i++) {

    const contact = Ember.Object.create({

      json: {
        "contactId": i,
        "organizationName": null,
        "individualName": "Contact" + i,
        "positionName": null,
        "phoneBook": [],
        "address": {},
        "onlineResource": [],
        "contactInstructions": null
      },
      title: 'Contact' + i,
      icon: 'user'
    });

    contacts.push(contact);

  }

  return contacts;

}
