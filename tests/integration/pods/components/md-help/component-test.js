import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md help', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{md-help}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Help|Main|Tour|The|mdEditor|is|a|web|application|that|allows|users|to|author|and|edit|metadata|for|projects|and|datasets.|The|primary|design|goal|is|to|develop|an|editor|that|will|allow|creation|and|management|of|archival|quality|metadata|without|requiring|extensive|knowledge|of|metadata|standards.|A|comprehensive|User|Manual|is|available.|The|manual|includes|a|tutorial,|reference,|and|best|practices.|View|User|Manual|If|you|would|like|to|receive|announcements|regarding|the|mdEditor,|join|our|email|list!|Join|Email|list|'
  );

    // Template block usage:
    await render(hbs `
      {{#md-help}}
        template block text
      {{/md-help}}
    `);

    assert.ok(this.element.textContent
      .trim()
      .indexOf('template block text') > 0);
  });
});
