import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md datetime', function(hooks) {
  setupRenderingTest(hooks);

  test('renders and binds', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.set('mydate', '1999-12-31T23:59:59.999+0900');
    await render(hbs `{{input/md-datetime
                      date=mydate
                      format="YYYY-MM-DD"
                      placeholder="Enter date"}}`);

    assert.equal(find('input').value, '1999-12-31', 'binding works');
  });
});
