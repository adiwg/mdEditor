import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-datetime',
  'Integration | Component | input/md datetime', {
    integration: true
  });

test('renders and binds', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{input/md-datetime
                    date=mydate
                    format="YYYY-MM-DD"
                    placeholder="Enter date"}}`);

  this.set('mydate', '1999-12-31T23:59:59.999+0900');
  assert.equal(this.$('input').val(), '1999-12-31', 'binding works');
});
