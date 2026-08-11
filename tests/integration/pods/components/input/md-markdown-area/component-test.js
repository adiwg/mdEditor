import { find, render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/md markdown area', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{input/md-markdown-area required=true}}`);

    assert.equal(find('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(),
      '||||Entertext,Markdownissupported.​length:0100:0');
    assert.ok(find('.md-markdown-editor .length.md-error'), 'required ok');

    this.set('markdownValue', 'This is foobar.');

    await render(hbs`{{input/md-markdown-area value=markdownValue maxlength=10 required=false}}`);

    assert.equal(find('.md-markdown-editor .length.md-error').textContent, 'length: 15', 'maxlength ok');

    // Template block usage:
    await render(hbs`
      <Input::MdMarkdownArea>
        template block text
      </Input::MdMarkdownArea>
    `);

    assert.equal(find('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(),
     '||||Entertext,Markdownissupported.​length:0100:0templateblocktext', 'block');
  });

  test('editing writes back through the two-way binding', async function(assert) {
    this.set('description', { abstract: '' });

    await render(hbs`{{input/md-markdown-area value=this.description.abstract}}`);

    find('.CodeMirror').CodeMirror.setValue('I am the abstract');
    await settled();

    assert.equal(this.description.abstract, 'I am the abstract',
      'edited value propagates to the bound property');
  });
});
