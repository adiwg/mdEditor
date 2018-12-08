import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | jsonvalidator', function(hooks) {
  setupTest(hooks);

  test('test jsonapi validation', function (assert) {
    var service = this.owner.lookup('service:jsonvalidator');
    var obj = {
      "data": [{
        "id": "8ke11eu1",
        "attributes": {
          "profile": "full",
          "json": "{}",
          "date-updated": "2016-09-16T22:08:04.425Z"
        },
        "type": "records",
        "meta": {
          "title": "ytr",
          "export": true
        }
      }, {
        "id": "spt9cadc",
        "attributes": {
          "json": "{}",
          "date-updated": "2016-09-16T22:08:11.080Z"
        },
        "type": "contacts",
        "meta": {
          "title": "ewrrrrrrrrrrrrrr",
          "export": true
        }
      }]
    };

    assert.ok(service.validate('jsonapi', obj));
  });
});
