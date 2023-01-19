import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | cleaner', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:cleaner');
    const obj = {
      test: [[],{},'',null, undefined],
      foo: 'bar',
      bar: null,
      biz: {},
      baz: { foo: [undefined] },
      jim: [{ jam: '' }],
      hey: {
        ya: [
          '',
          'keep',
          true,
          false
        ],
        zoo:[]
      }
    };
    assert.ok(service);

    assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: true,
        preserveRootOnly: false
      })),
      '{"test":[[]],"foo":"bar","baz":{"foo":[]},"jim":[],"hey":{"ya":["keep",true,false],"zoo":[]}}',
      'preserveArrays: true, preserveRootOnly: false'
    );
    assert.equal(JSON.stringify(service.clean(obj)),
      '{"test":[],"foo":"bar","jim":[],"hey":{"ya":["keep",true,false]}}',
      'preserveArrays: true, preserveRootOnly: true'
    );
    assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: false,
        preserveRootOnly: true
      })),
      '{"foo":"bar","hey":{"ya":["keep",true,false]}}',
      'preserveArrays: false, preserveRootOnly: true'
    );
  });
});
