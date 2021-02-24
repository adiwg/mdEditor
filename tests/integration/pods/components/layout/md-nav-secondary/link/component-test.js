import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | layout/md-nav-secondary/link', function (
  hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.links = [EmberObject.create({
      title: 'Foo',
      target: 'record.show.edit.index',
      tip: 'Foo not bar'
    }), EmberObject.create({
      title: 'Bar',
      target: 'record.show.edit.metadata'

    })];

    this.nav = {
      links: this.links
    }

    await render(hbs `{{layout/md-nav-secondary/link link=links.firstObject nav=nav}}`);

    assert.dom(this.element).hasText('Foo');

    // Template block usage:
    await render(hbs `
      {{#layout/md-nav-secondary/link link=links.lastObject nav=nav}}
        template block text
      {{/layout/md-nav-secondary/link}}
    `);

    assert.dom(this.element).hasText('Bar');
  });
});
