import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';


module('Integration | Component | control/md contact link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    var store = this.owner.lookup('service:store');

    this.set('contacts', this.owner.lookup('service:contacts'));

    store.createRecord('contact', createContact(1)[0])


    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-contact-link contacts=contacts contactId=0}}`);

    assert.equal(find('a').innerText.trim(), 'Contact0', 'renders link');

    // Template block usage:
    await render(hbs`
      {{#control/md-contact-link contacts=contacts contactId=0 block=true}}
        template block text
      {{/control/md-contact-link}}
    `);

    assert.equal(find('a').textContent.trim(), 'template block text', 'renders as block');
  });
});
