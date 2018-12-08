/* global selectChoose*/
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/dictionary/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/dictionary/new', async function(assert) {
    await visit('/dictionary/new');
    assert.ok(currentURL()
      .match(/dictionary\/new\/[a-z0-9]+/));
  });

  test('test new dictionary initial page conditions', async function(assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    assert.equal(find('input:eq(0)')
      .val(), "");
    assert.equal(find('ember-power-select-selected-item .select-value')
      .text(), "");
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 2);
  });

  test('test new dictionary completed form', async function(assert) {
    assert.expect(4);
    await visit('/dictionary/new');
    await fillIn('input:eq(0)', 'Dictionary Name');
    selectChoose('div.md-form-select .md-select', 'aggregate');
    assert.equal(find('input:eq(0)')
      .val(), "Dictionary Name");
    assert.equal(find(
        'div.md-form-select .ember-power-select-selected-item .select-value'
      )
      .text()
      .trim(), "aggregate");
    assert.equal(find('button.md-form-save')
      .prop('disabled'), false);
    assert.equal(find('div.md-form-alert')
      .length, 0);
  });

  test('test new dictionary missing dictionary name', async function(assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    //fillIn('div.md-form-select select', 'aggregate');
    selectChoose('div.md-form-select .md-select', 'aggregate');
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 1);
  });

  test('test new dictionary missing data resource type', async function(assert) {
    assert.expect(2);
    await visit('/dictionary/new');
    await fillIn('input:eq(0)', 'Dictionary Name');
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 1);
  });
});
