import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from 'mdeditor/tests/helpers/create-contact';
import { selectChoose} from 'ember-power-select/test-support';

module('Integration | Component | input/md select contacts', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    await render(hbs`{{input/md-select-contacts}}`);

    assert.ok(find('.md-select-contact'));
  });

  test('contact selected', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    //make sure there's at least one record visible
    //var store = this.owner.lookup('service:store');
    var contacts = createContact(2);
    var cs = this.owner.lookup('service:contacts');

    cs.set('contacts', contacts);
    //store.createRecord('contact', contacts[0]);
    //store.createRecord('contact', contacts[1]);

    await render(hbs`{{input/md-select-contacts}}`);
    await selectChoose('.md-select-contact', 'Contact0');
    await selectChoose('.md-select-contact', 'Contact1');

    assert.equal(find('.md-select-contact').innerText.replace(/[\s\n]+/g, '|').trim(),
      '×|Contact0|×|Contact1', 'select multiple contacts');
  });
});
