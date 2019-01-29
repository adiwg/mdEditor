/* global selectChoose*/
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/record/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/record/new', async function(assert) {
    await visit('/record/new');
    assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));
  });

  test('test new mdJSON record initial page conditions', async function(assert) {
    assert.expect(4);
    await visit('/record/new');
    assert.ok(find('input:eq(0)').val());
    assert.equal(find('input:eq(1)').val(), '');
    assert.equal(find('ember-power-select-selected-item .select-value')
      .text(), "");
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });

  test('test new mdJSON record completed form', async function(assert) {
    assert.expect(3);
    await visit('/record/new');
    await fillIn('input:eq(1)', 'Record Title');
    selectChoose('.md-select', 'attribute');
    assert.equal(find('input:eq(1)').val(), "Record Title");
    assert.equal(find(
        'div.md-select .ember-power-select-selected-item .select-value'
      )
      .text()
      .trim(), "attribute");
    assert.equal(find('button.md-form-save').prop('disabled'), false);
  });

  test('test new mdJSON record missing record title', async function(assert) {
    assert.expect(1);
    await visit('/record/new');
    selectChoose('.md-select', 'attribute');
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });

  test('test new mdJSON record missing data record type (scope)', async function(assert) {
    assert.expect(2);
    await visit('/record/new');
    await fillIn('input:eq(1)', 'Record Title');
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('.md-error').length, 1);
  });
});
