import { click, find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';
import createRecord from '../../../../../helpers/create-record';
import { createDictionary } from '../../../../../helpers/create-dictionary';

module('Integration | Component | md nav sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
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

    await render(hbs `{{layout/md-nav-sidebar items=model version="test"}}`);

    assert.equal(find('.sidebar-nav').textContent
      .replace(/[ \n]+/g, '|'),
      '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|'
    );
  });

  test('toggle help action', async function(assert) {
    await render(hbs `{{layout/md-nav-sidebar}}`);
    await click('.md-btn-help');
    assert.dom('.md-sidebar-wrapper').hasClass('help');
  });

  test('toggle sidebar action', async function(assert) {
    await render(hbs `<div id="md-wrapper">{{layout/md-nav-sidebar}}</div>`);
    await click('.sidebar-brand-link');
    assert.dom('#md-wrapper').hasClass('toggled');
  });
});
