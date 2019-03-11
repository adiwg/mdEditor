import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md scroll spy', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);
    // Set any properties with this.set('myProperty', 'value');
    this.set('setScrollTo', function(target){
      assert.equal(target, 'foo', 'calls action');
    });

    // this.set('clickLink', function(){
    // });
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`<div data-spy="Foo" id="foo1">Foo</div>
      <div data-spy="Bar" id="bar1">Bar</div>
      {{control/md-scroll-spy setScrollTo=setScrollTo}}`);

    assert.equal(find('ul').textContent.replace(/[ \n\t\s]+/g,'|').trim(), '|Foo|Bar|');

    await click('ul a');
    // Template block usage:
    await render(hbs`
      {{#control/md-scroll-spy setScrollTo=setScrollTo}}
        template block text
      {{/control/md-scroll-spy}}
    `);

    assert.equal(find('ul').textContent.trim(), 'template block text');
  });
});
