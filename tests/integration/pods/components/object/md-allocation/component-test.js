import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md allocation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('allocation', {
      'amount': 9.9,
      'currency': 'currency',
      'sourceId': 'source',
      'recipientId': 'recipient',
      'matching': true,
      'comment': 'comment',
      sourceAllocationId: 'sourceAllocationId'
    });

    await render(hbs`{{object/md-allocation profilePath="test" model=allocation}}`);

    assert.equal(find('.md-card').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|');

    // Template block usage:
    await render(hbs`
      {{#object/md-allocation profilePath="test" model=allocation class="testme"}}
        template block text
      {{/object/md-allocation}}
    `);

    assert.equal(find('.testme').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|template|block|text|');
  });
});
