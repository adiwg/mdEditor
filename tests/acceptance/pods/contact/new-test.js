import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/contact/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/contact/new', async function(assert) {
    await visit('/contact/new');
    assert.ok(currentURL().match(/contact\/new\/[a-z0-9]+/));
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new contact initial page conditions', async function(assert) {
    assert.expect(5);
    await visit('/contact/new');
    assert.ok(find('.x-toggle-component.toggle-off'));
    assert.equal(findAll('.md-input-input input')[0].value.length, 36);
    assert.equal(findAll('.md-input-input input')[1].value, '');
    assert.equal(findAll('.md-input-input input')[2].value, '');
    assert.equal(find('button.md-form-save').disabled, true);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new contact individual', async function(assert) {
    assert.expect(2);
    await visit('/contact/new');
    await fillIn(findAll('.md-input-input input')[1], 'Individual Name');
    await fillIn(findAll('.md-input-input input')[2], '');
    assert.equal(findAll('.md-input-input input')[1].value, 'Individual Name');
    assert.equal(find('button.md-form-save').disabled, false);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new contact organization', async function(assert) {
    assert.expect(4);
    await visit('/contact/new');
    await click('.x-toggle-btn');
    await fillIn(findAll('.md-input-input input')[1], 'Organization Name');
    assert.ok(find('.x-toggle-component.toggle-on'));
    assert.equal(findAll('.md-input-input input')[0].value.length, 36);
    assert.equal(findAll('.md-input-input input')[1].value, "Organization Name");
    assert.equal(find('button.md-form-save').disabled, false);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new contact missing contact ID', async function(assert) {
    assert.expect(1);
    await visit('/contact/new');
    await fillIn(findAll('.md-input-input input')[0], '');
    await fillIn(findAll('.md-input-input input')[1], 'Individual Name');
    assert.equal(find('button.md-form-save').disabled, true);
    //change route to prevent error during teardown
    await visit('/');
  });
});
