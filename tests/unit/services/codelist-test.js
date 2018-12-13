import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import codes from 'mdcodes/resources/js/mdcodes.js';

module('Unit | Service | codelist', function(hooks) {
  setupTest(hooks);

  test('all codelists are present', function (assert) {
    var service = this.owner.lookup('service:codelist');

    Object.keys(codes)
      .forEach(function (key) {
        const name = key.replace(/^iso_/, '');

        assert.ok(service.get(name), name + ' is present.');
      });
  });
});
