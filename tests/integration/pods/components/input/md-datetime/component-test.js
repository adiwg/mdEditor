import { click, find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md datetime', function(hooks) {
  setupRenderingTest(hooks);

  test('renders and binds', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.set('mydate', '1999-12-31T23:59:59.999+0900');
    await render(hbs`{{input/md-datetime
                      date=this.mydate
                      format="YYYY-MM-DD"
                      placeholder="Enter date"}}`);

    assert.equal(find('input').value, '1999-12-31', 'binding works');
  });

  test('Year precision renders a text input with a year-grid picker instead of a number spinner', async function (assert) {
    this.set('mydate', '2026');
    await render(hbs`{{input/md-datetime
                      date=this.mydate
                      format="YYYY"
                      placeholder="Enter Year"}}`);

    assert.equal(find('input').type, 'text', 'renders type=text, not type=number');
    assert.equal(find('input').value, '2026', 'binding works');
    assert.notOk(find('.md-year-picker'), 'picker is closed by default');

    await click('.md-datetime-year-toggle');

    assert.ok(find('.md-year-picker'), 'picker opens on toggle click');
    assert.equal(
      findAll('.md-year-picker-grid button').length,
      12,
      'shows a 12-year grid'
    );
    assert.ok(
      find('.md-year-picker-grid button.active').textContent.trim(),
      '2026',
      'the current year is marked active'
    );

    const otherYearButton = findAll('.md-year-picker-grid button').find(
      (btn) => btn.textContent.trim() === '2030'
    );

    await click(otherYearButton);

    assert.equal(find('input').value, '2030', 'clicking a year updates the value');
    assert.notOk(find('.md-year-picker'), 'picker closes after selecting a year');
  });
});
