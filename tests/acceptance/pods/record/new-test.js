import { test } from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pods/record/new');

test('visiting /pods/record/new', function(assert) {
  visit('/record/new');
  andThen(function() {
    assert.equal(currentURL(), '/record/new');
  });
});

test('test new mdJSON record initial page conditions', function(assert) {
  assert.expect(4);
  visit('/record/new');
  andThen(function() {
    assert.equal(find('input:eq(0)').val(), "");
    assert.equal(find('div.md-form-select select').val(), "");
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('div.md-form-alert').length, 2);
  });
});

test('test new mdJSON record completed form', function (assert) {
  assert.expect(4);
  visit('/record/new');
  fillIn('input:eq(0)', 'Record Title');
  fillIn('div.md-form-select select', 'attribute');
  andThen(function() {
    assert.equal(find('input:eq(0)').val(), "Record Title");
    assert.equal(find('div.md-form-select select').val(), "attribute");
    assert.equal(find('button.md-form-save').prop('disabled'), false);
    assert.equal(find('div.md-form-alert').length, 0);
  });
});

test('test new mdJSON record missing record title', function (assert) {
  assert.expect(2);
  visit('/record/new');
  fillIn('div.md-form-select select', 'attribute');
  andThen(function() {
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('div.md-form-alert').length, 1);
  });
});

test('test new mdJSON record missing data record type (scope)', function (assert) {
  assert.expect(2);
  visit('/record/new');
  fillIn('input:eq(0)', 'Record Title');
  andThen(function() {
    assert.equal(find('button.md-form-save').prop('disabled'), true);
    assert.equal(find('div.md-form-alert').length, 1);
  });
});
