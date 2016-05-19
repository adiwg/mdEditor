import { test } from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pods/contact/new');

test('visiting /pods/contact/new', function(assert) {
  visit('/contact/new');

  andThen(function() {
    assert.equal(currentURL(), '/contact/new');
  });
  
});

test('should have default contact ID', function(assert) {
  visit('/contact/new');
  andThen(function() {
    assert.equal(find('input.first').text().length, 6);
  });
});
