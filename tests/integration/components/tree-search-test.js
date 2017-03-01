import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tree-search', 'Integration | Component | tree search', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', [{
    broader: 'foo0',
    children: [{
      broader: 'foo2',
      children: [],
      label: 'foo2label',
      uuid: 'foo2'
    }],
    label: 'foo1label',
    uuid: 'foo1'
  }, {
    broader: 'barfoo0',
    children: [],
    label: 'barfoo1label',
    uuid: 'barfoo1'
  }]);

  this.set('selected', [{
    identifier: 'bar1'
  }]);

  this.set('select', function () {
    assert.ok(true, 'called select');
  });

  this.set('searchString', 'foo');
  this.render(hbs `
    {{tree-search
      model=model
      selected=selected
      select=select
      searchString=searchString
      exactMatch=exactMatch
    }}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|Search|Tree:|Exact|Match|3|matches|found.|>|barfoo1label|foo1label|foo1label|>|foo2label|'
  );

  this.set('exactMatch', true);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'),
    '|Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo1label|>|foo2label|',
    'exact match'
  );

  // Template block usage:
  this.render(hbs `
    {{#tree-search
      model=model
      selected=selected
      select=select
    }}
      template block text
    {{/tree-search}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Search|Tree:|Exact|Match|template|block|text|');
});
