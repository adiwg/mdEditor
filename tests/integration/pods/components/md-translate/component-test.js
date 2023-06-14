import { find, click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createRecord } from 'mdeditor/tests/helpers/create-record';

module('Integration | Component | md translate', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createRecord(1)[0];
    this.isLoading = false;
    this.messages = null;
    this.result = null;
    this.writer = {
      type: 'json',
    };

    window.saveAs = function (blob, title) {
      assert.ok(title, 'save title');
      assert.equal(blob.constructor.name, 'Blob', 'save blob');
    };

    await render(hbs`{{md-translate
      model=model
      isLoading=isLoading
      messages=messages
      result=result
      errorLevel=2
      isJson=true
      writeObj=writer
    }}`);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|'
    );

    this.set('isLoading', true);

    assert.ok(find('.md-spinner'), 'loading');

    this.set('messages', [
      [
        'WARNING',
        ' FGDC writer',
        ' citation originator role is missing',
        ' CONTEXT is lineage method',
      ],
      [
        'WARNING',
        ' FGDC writer',
        ' citation publication date is missing',
        ' CONTEXT is lineage method',
      ],
    ]);

    assert.equal(
      find('.md-translator-error')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Translation|Warning|Warning|ocurred|during|translation.|WARNING|citation|originator|role|is|missing|FGDC|writer|context|is|lineage|method|WARNING|citation|publication|date|is|missing|FGDC|writer|context|is|lineage|method|',
      'messages'
    );

    this.set('result', '{"foo":"bar"}');

    assert.equal(
      find('.md-translator-preview.warning')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Result|Preview|JSON|Format|Save|Result|',
      'result'
    );

    assert.equal(
      find('.md-translator-preview.warning textarea').value,
      '{"foo":"bar"}',
      'textarea value set'
    );

    click('.md-translator-preview.warning .btn-success');

    // Template block usage:
    await render(hbs`
      {{#md-translate}}
        template block text
      {{/md-translate}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|template|block|text|',
      'block'
    );
  });
});
