import EmberObject from '@ember/object';

export default function createContact(total) {
  const contacts = [];

  for (let i = 0; i < total; i++) {
    const contact = EmberObject.create({
      json: {
        contactId: i,
        isOrganization: false,
        name: 'Contact' + i,
        positionName: null,
        phoneBook: [],
        address: {},
        onlineResource: [],
        contactInstructions: null,
      },
      title: 'Contact' + i,
      icon: 'user',
      contactId: i,
    });

    contacts.push(contact);
  }

  return contacts;
}
