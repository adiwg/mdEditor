import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose} from 'ember-power-select/test-support';

module('Acceptance | pods/record/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/record/new', async function(assert) {
    await visit('/record/new');
    assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));
  });

  test('test new metadata record initial page conditions', async function(assert) {
    assert.expect(3);
    await visit('/record/new');
    assert.equal(findAll('.md-input-input input')[0].value, '');
    assert.equal(find('.md-select').innerText.trim(), 'Choose type of resource');
    assert.equal(find('button.md-form-save').disabled, true);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new metadata record completed form', async function(assert) {
    assert.expect(3);
    await visit('/record/new');
    await fillIn(findAll('.md-input-input input')[0], 'Record Title');
    await selectChoose('.md-select', 'attribute');
    assert.equal(findAll('.md-input-input input')[0].value, 'Record Title');
    assert.equal(find('div.md-select .select-value').innerText, 'attribute');
    assert.equal(find('button.md-form-save').disabled, false);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new metadata record missing record title', async function(assert) {
    assert.expect(1);
    await visit('/record/new');
    await selectChoose('.md-select', 'attribute');
    assert.equal(find('button.md-form-save').disabled, true);
    //change route to prevent error during teardown
    await visit('/');
  });

  test('test new metadata record missing data record type (scope)', async function(assert) {
    assert.expect(2);
    await visit('/record/new');
    await fillIn(findAll('.md-input-input input')[1], 'Record Title');
    assert.equal(find('button.md-form-save').disabled, true);
    assert.equal(findAll('.md-error').length, 1);
    //change route to prevent error during teardown
    await visit('/');
  });
});
