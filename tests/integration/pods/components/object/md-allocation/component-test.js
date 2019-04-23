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
      '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|Other|Contacts|0|Add|#|Role|Contacts|Add|Other|Contacts|Matching|Matching|funds|or|in-kind|services|Comment|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|');

    // Template block usage:
    await render(hbs`
      {{#object/md-allocation profilePath="test" model=allocation class="testme"}}
        template block text
      {{/object/md-allocation}}
    `);

    assert.equal(find('.testme').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|Other|Contacts|0|Add|#|Role|Contacts|Add|Other|Contacts|Matching|Matching|funds|or|in-kind|services|Comment|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|template|block|text|');
  });
});
