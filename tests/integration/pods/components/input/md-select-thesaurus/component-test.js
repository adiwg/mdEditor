import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  clickTrigger
} from '../../../../../helpers/ember-power-select';
import {
  triggerEvent
} from 'ember-native-dom-helpers';

moduleForComponent('input/md-select-thesaurus',
  'Integration | Component | input/md select thesaurus', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{input/md-select-thesaurus}}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

  // Template block usage:
  this.render(hbs `
    {{#input/md-select-thesaurus}}
      template block text
    {{/input/md-select-thesaurus}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
});

test('should trigger external action on change', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  // test dummy for the external profile action
  this.set('selectThesaurus', (id) => {
    assert.equal(id.citation.identifier[0].identifier, '1eb0ea0a-312c-4d74-8d42-6f1ad758f999',
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-select-thesaurus selectThesaurus=selectThesaurus}}`);

  // select a value and force an onchange
  clickTrigger();
  triggerEvent($('.ember-power-select-option:contains("Science")')
    .get(0), 'mouseup');
});
