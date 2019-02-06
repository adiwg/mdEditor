import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { selectChoose } from 'ember-power-select/test-support';
import { clickTrigger } from 'ember-power-select/test-support/helpers'



module('Integration | Component | control/md fiscalyear', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-fiscalyear context=this}}`);

    assert.equal(find('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g,
      '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year|');
  });

  test('select a year', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    this.set('end', null);
    this.set('start', null);
    this.set('settings', {
        data: {
          fiscalStartMonth: 1
      }
    });
    // Handle any actions with this.on('myAction', function(val) { ... });
    var year = new Date().getFullYear();

    await render(hbs`
      {{input/md-datetime
        class="start"
        valuePath="start"
        model=this
        label="Start Date"
        placeholder="Enter start dateTime"
      }}
      {{input/md-datetime
        class="end"
        valuePath="end"
        model=this
        label="End Date"
      }}
      {{control/md-fiscalyear context=this settings=settings}}`);

    await clickTrigger('.md-fiscalyear');
    await selectChoose('.md-fiscalyear', year);

    assert.equal('2020-01-01T07:59:59.999Z', this.end, 'end set');
    assert.equal('2019-01-01T08:00:00.000Z', this.start, 'end start');

    this.set('settings.data.fiscalStartMonth', null);

    assert.equal(find('.md-fiscalyear .ember-power-select-trigger').getAttribute(
      'aria-disabled'), 'true', 'disabled if fiscalStartMonth empty');
  });
});
