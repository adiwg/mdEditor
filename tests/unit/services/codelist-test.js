import {
  moduleFor, test
}
from 'ember-qunit';
import codes from 'npm:mdcodes/resources/js/mdcodes.js';

moduleFor('service:codelist', 'Unit | Service | codelist', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('all codelists are present', function (assert) {
  var service = this.subject();

  Object.keys(codes)
    .forEach(function (key) {
      const name = key.replace(/^iso_/, '');

      assert.ok(service.get(name), name + ' is present.');
    });
});
