import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';

module('Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/identifier');
    assert.ok(route);
  });

  test('setupModel returns the identifier at identifierId when it exists', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/lineage/lineageobject/citation/identifier'
    );
    const identifier = { value: 'abc123' };

    route.identifierId = 1;
    route.modelFor = () => ({ identifier: A([{ value: 'other' }, identifier]) });

    const result = route.setupModel();

    assert.strictEqual(result, identifier);
  });

  test('setupModel redirects to Citation when the identifier is missing', function (assert) {
    const route = this.owner.lookup(
      'route:record/show/edit/lineage/lineageobject/citation/identifier'
    );
    let warned = '';
    let redirectedTo = '';

    route.identifierId = 5;
    route.modelFor = () => ({ identifier: A([]) });
    route.flashMessages = { warning: (msg) => (warned = msg) };
    route.router = {
      replaceWith: (routeName) => (redirectedTo = routeName),
    };

    const result = route.setupModel();

    assert.strictEqual(result, undefined);
    assert.ok(warned.length > 0, 'shows a warning message');
    assert.strictEqual(
      redirectedTo,
      'record.show.edit.lineage.lineageobject.citation'
    );
  });
});
