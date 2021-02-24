import { module, test } from 'qunit';
import { visit, currentURL, find, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | pods/dictionary/new', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/dictionary/new', async function (assert) {
    await visit('/dictionary/new');
    assert.ok(currentURL().match(/dictionary\/new\/[a-z0-9]+/));
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary initial page conditions', async function (assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    assert.dom('.md-input-input input').hasValue('');
    assert.equal(find('.md-select').innerText, '');
    assert.dom('button.md-form-save').isDisabled();
    assert.dom('.md-error.ember-tooltip-target').exists({ count: 2 });
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary completed form', async function (assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    await fillIn('.md-input-input input', 'Dictionary Name');
    await selectChoose('div.md-select', 'aggregate');
    assert.dom('.md-input-input input').hasValue('Dictionary Name');
    assert.equal(find('div.md-select .select-value').innerText, 'aggregate');
    assert.dom('button.md-form-save').isNotDisabled();
    assert.dom('.md-error.ember-tooltip-target').doesNotExist();
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary missing dictionary name', async function (assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    await selectChoose('div.md-select', 'aggregate');
    assert.dom('button.md-form-save').isDisabled();
    assert.dom('.md-error.ember-tooltip-target').exists({ count: 1 });
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new dictionary missing data resource type', async function (assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    await fillIn('.md-input-input input', 'Dictionary Name');
    assert.dom('button.md-form-save').isDisabled();
    assert.dom('.md-error.ember-tooltip-target').exists({ count: 1 });
    //change route to prevent error during teardown
    await visit('/');
  });
});
