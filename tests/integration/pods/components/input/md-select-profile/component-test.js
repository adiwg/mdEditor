import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from '../../../../../helpers/ember-power-select';
import { triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('input/md-select-profile',
  'Integration | Component | input/md select profile', {
    integration: true
  });

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs `{{input/md-select-profile
    value='full'
    updateProfile="updateProfile"
  }}`);

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), '|Profile|full|?|');
});

test('should trigger external action on change', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  // test dummy for the external profile action
  this.set('updateProfile', (actual) => {
    assert.equal(actual, 'basic',
      'submitted value is passed to external action');
  });

  this.render(hbs `{{input/md-select-profile value=full updateProfile=(action updateProfile)}}`);

  // select a value and force an onchange
  clickTrigger();
  triggerEvent($('.ember-power-select-option:contains("basic")').get(0),'mouseup');
});
