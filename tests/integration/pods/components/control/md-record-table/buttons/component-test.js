import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md record table/buttons', function (
      hooks) {
      setupRenderingTest(hooks);

      test('it renders', async function (assert) {
        assert.expect(2);
        // Set any properties with this.set('myProperty', 'value');
        this.set('model', {
          hasDirtyHash: true,
          hasSchemaErrors: true
        });
        // Handle any actions with this.on('myAction', function(val) { ... });

        await render(hbs `{{control/md-record-table/buttons record=model}}`);

        assert.equal(find('.md-dashboard-buttons').textContent.replace(
          /[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|This|record|has|been|modified!|Cick|to|save.|This|record|has|errors!|Click|to|view.|');

        // Template block usage:
      await render(hbs`{{#control/md-record-table/buttons}}
          template block text
        {{/control/md-record-table/buttons}}`
      );

        assert.equal(find('.md-dashboard-buttons').textContent.replace(
          /[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
      });

});
