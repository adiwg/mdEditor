import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control/md-json-viewer', 'Integration | Component | control/md json viewer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{control/md-json-viewer}}`);

  assert.equal(this.$().text().trim(), '');
});
