import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-modal', 'Integration | Component | control/md modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/md-modal isShowing=true}}`);

  assert.equal($('.md-modalcontainer').length, 0);

  // Template block usage:
  this.render(hbs`
    {{#control/md-modal isShowing=true}}
      template block text
    {{/control/md-modal}}
  `);

  assert.equal($('.md-modal-container').text().trim(), 'template block text');
});
