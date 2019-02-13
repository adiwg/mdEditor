import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';


module('Integration | Component | input/md select contact', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    var contacts = createContact(3);
    var cs = this.owner.lookup('service:contacts');

    cs.set('contacts', contacts);

    this.set('contacts', contacts);

    await render(hbs`{{input/md-select-contact value=1}}`);

    assert.equal(find('.md-select-contact').textContent.replace(/[ \n]+/g, '|').trim(), '|Contact1|×|');

    // Template block usage:
    await render(hbs`
      {{#input/md-select-contact}}
        template block text
      {{/input/md-select-contact}}
    `);

    assert.equal(find('.md-select-contact').textContent.trim(), 'Select one option');
  });
});
