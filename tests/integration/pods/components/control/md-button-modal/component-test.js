import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerHelper from '../../../../../helpers/modal-asserts';

registerHelper();

moduleForComponent('control/md-button-modal',
  'Integration | Component | control/md button modal', {
    integration: true
  });

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{control/md-button-modal}}`);

  assert.equal(this.$()
    .text()
    .trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#control/md-button-modal}}
      template block text
    {{/control/md-button-modal}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'template block text');
});

test('shows modal and performs actions', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  let modalDialogService = this.container.lookup('service:modal-dialog');
  modalDialogService.destinationElementId = 'test-div';

  this.set('externalAction', (type) => {
    assert.ok(type, `${type} called`);
  });

  this.render(hbs `
    <div id='test-div'></div>
    {{#control/md-button-modal
        message="Hello" onConfirm=(action externalAction "confirm")
        onCancel=(action externalAction "cancel")}} Test
    {{/control/md-button-modal}}
  `);

  // click the button
  this.$('.md-button-modal')
    .click();

  assert.isPresentOnce('.md-modal-overlay');

  let num = this.$('.md-modal-buttons button')
    .length;

  this.$('.md-modal-overlay').click();

  assert.isAbsent('.md-modal-overlay');

  let i = 0;

  // click the modal buttons
  while(i < num) {
    this.$('.md-button-modal').click();
    this.$('.md-modal-buttons button')[i].click();
    i++;
  }

});
