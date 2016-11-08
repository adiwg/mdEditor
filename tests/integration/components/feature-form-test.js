import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feature-form', 'Integration | Component | feature form', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', {
    id: 'foo',
    properties: {
      name: 'bar',
      description: 'foobar'
    }
  });

  this.render(hbs `{{feature-form model=model}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|'
  );

  // Template block usage:
  this.render(hbs `
    {{#feature-form model=model}}
      template block text
    {{/feature-form}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|')
    .trim(),
    '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|'
  );
});
