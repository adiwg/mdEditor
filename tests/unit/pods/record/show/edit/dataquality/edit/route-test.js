import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | record/show/edit/dataquality/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:record/show/edit/dataquality/edit');
    assert.ok(route);
  });

  test('setupModel returns the matching dataQuality object', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dataquality/edit');
    const dataQuality = { id: 'dq-1' };

    route.dataQualityId = '0';
    route.modelFor = () => ({
      get() {
        return [dataQuality];
      },
    });

    const result = route.setupModel();

    assert.strictEqual(result, dataQuality);
  });

  test('setupModel warns and redirects when no matching dataQuality is found', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dataquality/edit');
    let warned = null;
    let redirectedTo = null;

    route.dataQualityId = '0';
    route.modelFor = () => ({
      get() {
        return [];
      },
    });
    route.flashMessages = {
      warning(msg) {
        warned = msg;
      },
    };
    route.router = {
      replaceWith(name) {
        redirectedTo = name;
      },
    };

    const result = route.setupModel();

    assert.strictEqual(
      warned,
      'No Data Quality object found! Re-directing to list...'
    );
    assert.strictEqual(redirectedTo, 'record.show.edit.dataquality');
    assert.strictEqual(result, undefined);
  });

  test('flashMessages is injected on the route (not relying on implicit injection)', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dataquality/edit');

    assert.ok(
      route.flashMessages,
      'flashMessages should be available without manual stubbing'
    );
  });

  test('breadCrumb reflects the current dataQualityId', function (assert) {
    const route = this.owner.lookup('route:record/show/edit/dataquality/edit');

    route.dataQualityId = 'dq-42';

    assert.deepEqual(route.breadCrumb, { title: 'dq-42', linkable: true });
  });
});
