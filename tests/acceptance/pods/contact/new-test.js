import {
  test
} from 'qunit';
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
    assert.equal(find('input:eq(0)').val(), 'on');
    assert.equal(find('input:eq(1)').val().length, 36);
    assert.equal(find('input:eq(2)').val(), "");
    assert.equal(find('input:eq(3)').val(), "");
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });
});

test('test new contact individual', function(assert) {
  assert.expect(2);
  visit('/contact/new');
  fillIn('input:eq(2)', 'Individual Name');
  fillIn('input:eq(3)', '');
  andThen(function() {
    assert.equal(find('input:eq(2)').val(), 'Individual Name');
    assert.equal(find('button.md-form-save').prop('disabled'), false);
  });
});

test('test new contact organization', function(assert) {
  assert.expect(2);
  visit('/contact/new');
  click('input:eq(0)').then(function() {
    fillIn('input:eq(2)', 'Organization Name');
    fillIn('input:eq(1)', '1234');
    fillIn('input:eq(3)', '');
    andThen(function() {
      assert.equal(find('input:eq(2)').val(), "Organization Name");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
    });
  });
});

test('test new contact missing contact ID', function(assert) {
  assert.expect(1);
  visit('/contact/new');
  fillIn('input:eq(1)', '');
  fillIn('input:eq(2)', 'Individual Name');
  andThen(function() {
    assert.equal(find('button.md-form-save').prop('disabled'), true);
  });
});
