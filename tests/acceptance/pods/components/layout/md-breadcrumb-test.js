import {
  test
}
from 'qunit';
import moduleForAcceptance from 'mdeditor/tests/helpers/module-for-acceptance';

let componentInstance;

moduleForAcceptance('Acceptance | pods/components/md breadcrumb', {
  beforeEach() {
      componentInstance = this.application.__container__.lookup(
        'component:layout/md-breadcrumb');
    },
    afterEach() {
      componentInstance = null;
    }
});

test('visiting /record/new', function(assert) {
  assert.expect(5);

  visit('/record/new');

  andThen(function() {
    assert.equal(currentURL(), '/record/new/');

    const listItems = find('ol.breadcrumb li').text();
    const linkItems = find('ol.breadcrumb li a').text();

    const hasRecordInallList = listItems.indexOf('Record') >= 0;
    const hasNewTextInallList = listItems.indexOf('New') >= 0;

    const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
    const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

    assert.ok(hasRecordInallList, 'renders the right inferred name');
    assert.ok(hasNewTextInallList, 'renders the right inferred name');
    assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
    assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');

  });
});
