import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';

module('Acceptance | pods/components/md breadcrumb', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /record/new', async function (assert) {
    assert.expect(4);

    await visit('/record/new');

    assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));

    const listItems = findAll('ol.breadcrumb li');
    const linkItems = findAll('ol.breadcrumb li a');

    const hasRecordInallList = listItems[0].textContent.indexOf('Record') >= 0;
    const hasNewTextInallList = listItems[1].textContent.indexOf('New') >= 0;

    // const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
    // const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

    assert.ok(hasRecordInallList, 'renders the right inferred name');
    assert.ok(hasNewTextInallList, 'renders the right inferred name');
    assert.equal(linkItems.length, 0, 'no links rendered');
    // assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
    // assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
  });
});
