import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import createProfile from 'mdeditor/tests/helpers/create-profile';

module('Integration | Component | object/md-profile/preview', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.model = createProfile(1)[0];

    await render(hbs `{{object/md-profile/preview  record=model}}`);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'
    );

    // Template block usage:
    await render(hbs `
      {{#object/md-profile/preview record=model}}
        template block text
      {{/object/md-profile/preview}}
    `);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|'
    );
  });
});
