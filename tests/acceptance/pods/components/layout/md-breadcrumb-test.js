import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pods/components/md breadcrumb', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /record/new', async function(assert) {
    assert.expect(5);

    await visit('/record/new');

    assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));

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
