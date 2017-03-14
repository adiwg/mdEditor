/* global selectChoose*/
import {
  test
} from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pods/dictionary/new');

test('visiting /pods/dictionary/new', function (assert) {
  visit('/dictionary/new');
  andThen(function () {
    assert.ok(currentURL()
      .match(/dictionary\/new\/[a-z0-9]+/));
  });
});

test('test new dictionary initial page conditions', function (assert) {
  assert.expect(4);
  visit('/dictionary/new');
  andThen(function () {
    assert.equal(find('input:eq(0)')
      .val(), "");
    assert.equal(find('ember-power-select-selected-item .select-value')
      .text(), "");
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 2);
  });
});

test('test new dictionary completed form', function (assert) {
  assert.expect(4);
  visit('/dictionary/new');
  fillIn('input:eq(0)', 'Dictionary Name');
  selectChoose('div.md-form-select .md-select', 'aggregate');
  andThen(function () {
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
});

test('test new dictionary missing dictionary name', function (assert) {
  assert.expect(2);
  visit('/dictionary/new');
  //fillIn('div.md-form-select select', 'aggregate');
  selectChoose('div.md-form-select .md-select', 'aggregate');
  andThen(function () {
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 1);
  });
});

test('test new dictionary missing data resource type', function (assert) {
  assert.expect(2);
  visit('/dictionary/new');
  fillIn('input:eq(0)', 'Dictionary Name');
  andThen(function () {
    assert.equal(find('button.md-form-save')
      .prop('disabled'), true);
    assert.equal(find('div.md-form-alert')
      .length, 1);
  });
});
