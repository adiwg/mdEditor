import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/contact/new', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pods/contact/new', async function(assert) {
    await visit('/contact/new');
    assert.ok(currentURL().match(/contact\/new\/[a-z0-9]+/));
  });

  test('test new contact initial page conditions', async function(assert) {
    assert.expect(5);
    await visit('/contact/new');
    assert.equal(find('input:eq(0)').val(), 'on');
    assert.equal(find('input:eq(1)').val().length, 36);
    assert.equal(find('input:eq(2)').val(), "");
    assert.equal(find('input:eq(3)').val(), "");
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });

  test('test new contact individual', async function(assert) {
    assert.expect(2);
    await visit('/contact/new');
    await fillIn('input:eq(2)', 'Individual Name');
    await fillIn('input:eq(3)', '');
    assert.equal(find('input:eq(2)').val(), 'Individual Name');
    assert.equal(find('button.md-form-save').prop('disabled'), false);
  });

  test('test new contact organization', async function(assert) {
    assert.expect(2);
    await visit('/contact/new');
    click('input:eq(0)').then(async function() {
      await fillIn('input:eq(2)', 'Organization Name');
      await fillIn('input:eq(1)', '1234');
      await fillIn('input:eq(3)', '');
      assert.equal(find('input:eq(2)').val(), "Organization Name");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
    });
  });

  test('test new contact missing contact ID', async function(assert) {
    assert.expect(1);
    await visit('/contact/new');
    await fillIn('input:eq(1)', '');
    await fillIn('input:eq(2)', 'Individual Name');
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });
});
