import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md online resource', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = {
      "uri": "http://URI.example.com",
      "protocol": "protocol",
      "name": "name",
      "description": "description",
      "function": "download"
    };

    await render(hbs`{{object/md-online-resource model=model profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      'Name|URI|Protocol|Description|Function|download|?|×|');

    // Template block usage:
    await render(hbs`
      {{#object/md-online-resource profilePath="foobar" model=model}}
        template block text
      {{/object/md-online-resource}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Name|URI|Protocol|Description|Function|download|?|×|template|block|text|',
      'block');
  });
});
