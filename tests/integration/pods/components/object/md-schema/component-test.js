import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | object/md-schema', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('data', EmberObject.create({
      title: 'foo',
      uri: 'bar',
      remoteVersion: '1.1',
      localVersion: '1.0',
      hasUpdate: true
    }));

    await render(hbs`{{object/md-schema record=data}}`);

    assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(),
    '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');

    assert.equal(find('.md-schema input').value, 'foo', 'render form');
    // Template block usage:
    await render(hbs`
      {{#object/md-schema record=data}}
        template block text
      {{/object/md-schema}}
    `);

    assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(),
    '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
  });
});
