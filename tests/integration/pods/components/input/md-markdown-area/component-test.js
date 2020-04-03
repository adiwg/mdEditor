import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md markdown area', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    assert.expect(6);
    await render(hbs `{{input/md-markdown-area required=true}}`);

    assert.equal(find('.md-markdown-editor').innerText.replace(
        /[ \n\s]+/g, '').trim(),
      '||||Entertext,Markdownissupported.​length:010');
    assert.ok(find('.md-markdown-editor .length.md-error'),
      'required ok');

    this.set('markdownValue', 'This is foobar.');
    this.set('change', value => {
        assert.equal(value, this.markdownValue, `changed to ${this.markdownValue}`);
    });

    await render(
      hbs `{{input/md-markdown-area
          value=markdownValue
          maxlength=10
          required=false
          change=(action change markdownValue)
        }}`
    );

    assert.equal(find('.md-markdown-editor .length.md-error')
      .textContent, 'length: 15', 'maxlength ok');

    this.set('markdownValue', 'This is binbash.');

    // Template block usage:
    await render(hbs `
      {{#input/md-markdown-area}}
        template block text
      {{/input/md-markdown-area}}
    `);

    assert.equal(find('.md-markdown-editor').innerText.replace(
        /[ \n\s]+/g, '').trim(),
      '||||Entertext,Markdownissupported.​length:010templateblocktext',
      'block');
  });
});
