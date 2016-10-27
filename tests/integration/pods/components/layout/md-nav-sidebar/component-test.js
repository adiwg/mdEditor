import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from '../../../../../helpers/create-contact';
import createRecord from '../../../../../helpers/create-record';
import createDictionary from '../../../../../helpers/create-dictionary';

moduleForComponent('layout/md-nav-sidebar',
  'Integration | Component | md nav sidebar', {
    integration: true
  });

test('it renders', function(assert) {
  assert.expect(1);

  const contacts = createContact(2);
  contacts.meta = {
    type: 'contact',
    list: 'contacts',
    title: 'Contacts'
  };

  const records = createRecord(2);
  records.meta = {
    type: 'record',
    list: 'records',
    title: 'Records'
  };

  const dicts = createDictionary(2);
  dicts.meta = {
    type: 'dictionary',
    list: 'dictionaries',
    title: 'Dictionaries'
  };

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', [records, contacts, dicts]);

  this.render(hbs `{{layout/md-nav-sidebar items=model version="test"}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|'
  );
});

test('toggle help action', function(assert) {
  this.render(hbs `<div id="md-sidebar-wrapper">{{layout/md-nav-sidebar}}</div>`);
  this.$('#md-btn-help')
    .click();
  assert.ok(this.$('#md-sidebar-wrapper')
    .hasClass('help'));
});

test('toggle sidebar action', function(assert) {
  this.render(hbs `<div id="md-wrapper"><div id="md-sidebar-wrapper">{{layout/md-nav-sidebar}}</div></div>`);
  this.$('.sidebar-brand-link')
    .click();
  assert.ok(this.$('#md-wrapper')
    .hasClass('toggled'));
});
