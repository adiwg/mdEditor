import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
    .replace(/[ \n]+/g, '|'), '|Custom|Entry|GCMD|Science|Keywords|GCMD|Platforms|GCMD|Instruments|Pick|a|thesaurus|');

  // Template block usage:
  this.render(hbs `
    {{#input/md-select-thesaurus}}
      template block text
    {{/input/md-select-thesaurus}}
  `);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Custom|Entry|GCMD|Science|Keywords|GCMD|Platforms|GCMD|Instruments|Pick|a|thesaurus|');
});
