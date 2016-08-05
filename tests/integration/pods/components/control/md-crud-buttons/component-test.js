import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-crud-buttons',
  'Integration | Component | control/md crud buttons', {
    integration: true
  });

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{control/md-crud-buttons}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|Delete|');

  // Template block usage:" + EOL +
  this.render(hbs `
    {{#control/md-crud-buttons}}
      template block text
    {{/control/md-crud-buttons}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|Save|Cancel|Copy|Delete|template|block|text|');
});

test('should trigger external action', function (assert) {
  assert.expect(4);

  // test double for the external action
  this.set('externalAction', (type) => {
    assert.ok(type, `${type} called`);
  });

  this.render(hbs `{{control/md-crud-buttons doSave=(action externalAction
'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
externalAction 'doCopy') doDelete=(action externalAction 'doDelete')}}`);

  // click the buttons
  this.$('.md-crud-buttons .btn-success')
    .click();
  this.$('.md-crud-buttons .btn-warning')
    .click();
  this.$('.md-crud-buttons .btn-info')
    .click();
  //we have to click delete twice to confirm
  this.$('.md-crud-buttons .btn-danger')
    .click().click();
});
