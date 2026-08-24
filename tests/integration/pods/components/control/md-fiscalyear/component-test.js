import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { selectChoose } from 'ember-power-select/test-support';
import { clickTrigger } from 'ember-power-select/test-support/helpers';
import moment from'moment';
import EmberObject from '@ember/object';



module('Integration | Component | control/md fiscalyear', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-fiscalyear context=this}}`);

    assert.equal(find('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g,
      '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year');
  });

  test('select a year', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    this.set('end', null);
    this.set('start', null);
    this.set('settings', EmberObject.create({
      data: EmberObject.create({
        fiscalStartMonth: 1
      })
    }));
    // Handle any actions with this.on('myAction', function(val) { ... });
    var year = new Date().getFullYear();

    await render(hbs`
      {{input/md-datetime
        class="this.start"
        valuePath="this.start"
        model=this
        label="Start Date"
        placeholder="Enter this.start dateTime"
      }}
      {{input/md-datetime
        class="this.end"
        valuePath="this.end"
        model=this
        label="End Date"
      }}
      {{control/md-fiscalyear context=this settings=this.settings}}`);

    await clickTrigger('.md-fiscalyear');
    await selectChoose('.md-fiscalyear', year);

    assert.equal(moment(this.end).format('YYYY-MM-DD'),
      moment(year, 'YYYY').month(this.settings.data.fiscalStartMonth + 10).endOf('month').format('YYYY-MM-DD'),
      'end set');
    assert.equal(moment(this.start).format('YYYY-MM-DD'),
      moment(year, 'YYYY').month(this.settings.data.fiscalStartMonth - 1).startOf('month').format('YYYY-MM-DD'),
      'start set');

  });
});
