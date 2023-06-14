import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';

module('Integration | Component | control/md contact title', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    var store = this.owner.lookup('service:store');

    store.createRecord('contact', createContact(1)[0]);

    await render(hbs`<span>{{control/md-contact-title contactId=0}}</span>`);

    assert.equal(find('span').textContent.trim(), 'Contact0');

    // Template block usage:
    await render(hbs`<div class="test1">
      {{#control/md-contact-title contactId=0 as |c|}}
        template block text {{c.title}}
      {{/control/md-contact-title}}
      </div>
    `);

    assert.equal(
      find('.test1').textContent.trim(),
      'template block text Contact0'
    );
  });
});
