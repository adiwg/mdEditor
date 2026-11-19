import { click, find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';
import { createRecord } from 'mdeditor/tests/helpers/create-record';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';

module('Integration | Component | md nav sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    const contacts = createContact(2);
    contacts.forEach(c => c.set('isNew', true));
    contacts.meta = {
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    };

    const records = createRecord(2);
    records.forEach(r => r.set('isNew', true));
    records.meta = {
      type: 'record',
      list: 'records',
      title: 'Records'
    };

    const dicts = createDictionary(2);
    dicts.forEach(d => d.set('isNew', true));
    dicts.meta = {
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    };

    this.set('model', [records, contacts, dicts]);

    await render(hbs`{{layout/md-nav-sidebar items=this.model version="test"}}`);

    assert.equal(find('.sidebar-nav').textContent
      .replace(/[ \n]+/g, '|'),
      '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|'
    );
  });

  test('toggle help action', async function(assert) {
    await render(hbs`{{layout/md-nav-sidebar}}`);
    await click('.md-btn-help');
    assert.ok(find('.md-sidebar-wrapper').classList.contains('help'));
  });

  test('toggle sidebar action', async function(assert) {
    await render(hbs`<div id="md-wrapper">{{layout/md-nav-sidebar}}</div>`);
    await click('.sidebar-brand-link');
    assert.ok(find('#md-wrapper').classList.contains('toggled'));
  });
});
