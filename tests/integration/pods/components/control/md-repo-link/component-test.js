import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'mdeditor/config/environment';

const {
  APP: {
    repository,
    version
  }
} = config;

moduleForComponent('control/md-repo-link',
  'Integration | Component | control/md repo link', {
    integration: true
  });

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{control/md-repo-link}}`);

  assert.equal(this.$()
    .text()
    .trim(), version);
  assert.equal(this.$('a')
    .attr('href'),
    `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`);

  // Template block usage:
  this.render(hbs `
    {{#control/md-repo-link}}
      template block text
    {{/control/md-repo-link}}
  `);

  assert.equal(this.$()
    .text()
    .trim(), 'template block text');
});
