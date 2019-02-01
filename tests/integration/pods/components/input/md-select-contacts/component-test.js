import { find, render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createContact from '../../../../../helpers/create-contact';
import { selectChoose} from 'ember-power-select/test-support';

module('Integration | Component | input/md select contacts', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    await render(hbs`{{input/md-select-contacts}}`);

    assert.equal(findAll('.md-select-contact').length, 1);
  });

  test('contact selected', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    //make sure there's at least one record visible
    var store = this.owner.lookup('service:store');

    this.set('contacts', this.owner.lookup('service:contacts'));

    store.createRecord('contact', createContact(1)[0]);

    await render(hbs`{{input/md-select-contacts contacts=contacts}}`);
    await selectChoose('.md-select-contact', 'Contact0');

    assert.equal(find('.md-select-contact .select-value').innerText.trim(), 'Contact0');
  });
});
