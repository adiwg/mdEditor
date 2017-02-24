import { test } from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pods/contact/new');

test('visiting /pods/contact/new', function(assert) {
  visit('/contact/new');
  andThen(function() {
    assert.ok(currentURL().match(/contact\/new\/[a-z0-9]+/));
  });
});

test('test new contact initial page conditions', function(assert) {
  assert.expect(5);
  visit('/contact/new');
  andThen(function() {
    assert.equal(find('input:eq(0)').val().length, 36);
    assert.equal(find('input:eq(1)').val(), "");
    assert.equal(find('input:eq(2)').val(), "");
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('div.md-form-alert').length, 1);
  });
});

test('test new contact individual', function (assert) {
  assert.expect(3);
  visit('/contact/new');
  fillIn('input:eq(1)', 'Individual Name');
  andThen(function() {
    assert.equal(find('input:eq(1)').val(), "Individual Name");
    assert.equal(find('button.md-form-save').prop('disabled'), false);
    assert.equal(find('div.md-form-alert').length, 0);
  });
});

test('test new contact organization', function (assert) {
  assert.expect(3);
  visit('/contact/new');
  fillIn('input:eq(2)', 'Organization Name');
  andThen(function() {
    assert.equal(find('input:eq(2)').val(), "Organization Name");
    assert.equal(find('button.md-form-save').prop('disabled'), false);
    assert.equal(find('div.md-form-alert').length, 0);
  });
});

test('test new contact organization and individual names', function (assert) {
  assert.expect(2);
  visit('/contact/new');
  fillIn('input:eq(1)', 'Individual Name');
  fillIn('input:eq(2)', 'Organization Name');
  andThen(function() {
    assert.equal(find('button.md-form-save').prop('disabled'), false);
    assert.equal(find('div.md-form-alert').length, 0);
  });
});

test('test new contact missing contact ID', function (assert) {
  assert.expect(2);
  visit('/contact/new');
  fillIn('input:eq(0)', '');
  fillIn('input:eq(1)', 'Individual Name');
  fillIn('input:eq(2)', 'Organization Name');
  andThen(function() {
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('div.md-form-alert').length, 1);
  });
});
