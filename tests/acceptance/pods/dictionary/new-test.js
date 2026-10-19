import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  find,
  findAll,
  fillIn
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';


module('Acceptance | pods/dictionary/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/dictionary/new', async function(assert) {
    await visit('/dictionary/new');
    assert.ok(currentURL().match(/dictionary\/new\/[a-z0-9]+/));
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary initial page conditions', async function(assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    assert.equal(find('.md-input-input input').value, '');
    assert.equal(find('.md-codelist-multi').innerText.trim(), '');
    assert.equal(find('button.md-form-save').disabled, true);
    assert.equal(findAll('.md-error.ember-tooltip-target').length, 2);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary completed form', async function(assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    await fillIn('.md-input-input input', 'Dictionary Name');
    await selectChoose('.md-codelist-multi', 'aggregate');
    assert.equal(find('.md-input-input input').value, 'Dictionary Name');
    assert.ok(find('.md-codelist-multi').innerText.includes('aggregate'));
    assert.equal(find('button.md-form-save').disabled, false);
    assert.equal(findAll('.md-error.ember-tooltip-target').length, 0);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary missing dictionary name', async function(assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    await selectChoose('.md-codelist-multi', 'aggregate');
    assert.equal(find('button.md-form-save').disabled, true);
    assert.equal(findAll('.md-error.ember-tooltip-target').length, 1);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary missing data resource type', async function(assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    await fillIn('.md-input-input input', 'Dictionary Name');
    assert.equal(find('button.md-form-save').disabled, true);
    assert.equal(findAll('.md-error.ember-tooltip-target').length, 1);
    //change route to prevent error during teardown
    await visit('/');
  });
});
