import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md record table/buttons', function (
      hooks) {
      setupRenderingTest(hooks);

      test('it renders', async function (assert) {
        assert.expect(4);
        // Set any properties with this.set('myProperty', 'value');
        this.set('model', {
          hasDirtyHash: true,
          hasSchemaErrors: true
        });
        // Handle any actions with this.on('myAction', function(val) { ... });

        await render(hbs`{{control/md-record-table/buttons record=this.model}}`);

        assert.equal(find('.md-dashboard-buttons').textContent.replace(
          /[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|');
        assert.dom('.md-status-icon .btn-danger').exists();
        assert.dom('.md-status-icon .btn-warning').exists();
        // Template block usage:
      await render(hbs`<Control::MdRecordTable::Buttons>
          template block text
        </Control::MdRecordTable::Buttons>`
      );

        assert.equal(find('.md-dashboard-buttons').textContent.replace(
          /[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
      });

});
