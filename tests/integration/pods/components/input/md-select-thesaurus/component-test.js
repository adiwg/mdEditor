import {
  find,
  findAll,
  render,
  triggerEvent
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  clickTrigger
} from 'ember-power-select/test-support/helpers';

module('Integration | Component | input/md select thesaurus', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{input/md-select-thesaurus}}`);

    assert.equal(find('.md-select').textContent
      .replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

    // Template block usage:
    await render(hbs `
      {{#input/md-select-thesaurus}}
        template block text
      {{/input/md-select-thesaurus}}
    `);

    assert.equal(find('.md-select').textContent
      .replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
  });

  test('should trigger external action on change', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('selectThesaurus', (id) => {
      assert.equal(id.citation.identifier[0].identifier, 'ISO 19115 Topic Category',
        'submitted value is passed to external action');
    });

    await render(hbs `{{input/md-select-thesaurus selectThesaurus=selectThesaurus}}`);

    // select a value and force an onchange
    await clickTrigger();
    triggerEvent(findAll('.ember-power-select-option')[1], 'mouseup');
  });
});
