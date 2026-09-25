import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Route | dictionary/show/edit/entity/import', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dictionary/show/edit/entity/import');
    assert.ok(route);
  });

  test('createAttribute builds attribute + domain from a column with hasDomain', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );
    const column = EmberObject.create({
      hasDomain: true,
      domain: ['a', 'b', null],
      importName: 'myCol',
      importType: 'character varying',
      allowNull: false,
      range: false,
    });

    const result = route.createAttribute('myCol', column);

    assert.strictEqual(result.attribute.codeName, 'myCol');
    assert.strictEqual(result.attribute.dataType, 'character varying');
    assert.ok(result.domain, 'creates a domain object since hasDomain is true');
    assert.deepEqual(
      result.domain.domainItem.map((i) => i.name),
      ['a', 'b'],
      'filters out blank domain values'
    );
    assert.strictEqual(result.attribute.domainId, result.domain.domainId);
  });

  test('createAttribute skips domain creation when hasDomain is false', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );
    const column = EmberObject.create({
      hasDomain: false,
      importName: 'myCol',
      importType: 'numeric',
      allowNull: true,
      range: false,
    });

    const result = route.createAttribute('myCol', column);

    assert.strictEqual(result.domain, false);
    assert.strictEqual(result.attribute.domainId, null);
  });

  test('generateData skips columns flagged not to import', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );

    route.controller = {
      columns: {
        keep: EmberObject.create({
          import: true,
          hasDomain: false,
          importName: 'keep',
          importType: 'numeric',
          allowNull: false,
          range: false,
        }),
        skip: EmberObject.create({
          import: false,
          hasDomain: false,
          importName: 'skip',
          importType: 'numeric',
          allowNull: false,
          range: false,
        }),
      },
    };

    const data = route.generateData();

    assert.strictEqual(data.attributes.length, 1);
    assert.strictEqual(data.attributes[0].codeName, 'keep');
  });

  test('doImport concats new domains onto an existing dataDictionary.domain array', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );
    const dataDictionary = { domain: [{ domainId: 'existing' }] };
    const entity = { entityId: 'e1' };
    let transitionedTo = null;
    let transitionedArg = null;
    let flashed = null;

    route.controller = {
      entity,
      model: { json: { dataDictionary } },
      columns: {
        colA: EmberObject.create({
          import: true,
          hasDomain: true,
          domain: ['x', 'y'],
          importName: 'colA',
          importType: 'character varying',
          allowNull: false,
          range: false,
        }),
      },
    };
    route.router = {
      transitionTo(name, arg) {
        transitionedTo = name;
        transitionedArg = arg;
      },
    };
    route.flashMessages = {
      success(msg) {
        flashed = msg;
      },
    };

    route.doImport();

    assert.strictEqual(
      dataDictionary.domain.length,
      2,
      'keeps the existing domain and appends the new one'
    );
    assert.strictEqual(dataDictionary.domain[0].domainId, 'existing');
    assert.deepEqual(dataDictionary.entity, [entity]);
    assert.strictEqual(transitionedTo, 'dictionary.show.edit.entity.edit');
    assert.strictEqual(transitionedArg, 0);
    assert.strictEqual(flashed, 'Entity imported from CSV!');
  });

  test('doImport initializes dataDictionary.domain and entity when missing', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );
    const dataDictionary = {};
    const entity = { entityId: 'e2' };

    route.controller = {
      entity,
      model: { json: { dataDictionary } },
      columns: {
        colA: EmberObject.create({
          import: true,
          hasDomain: true,
          domain: ['x'],
          importName: 'colA',
          importType: 'character varying',
          allowNull: false,
          range: false,
        }),
      },
    };
    route.router = { transitionTo() {} };
    route.flashMessages = { success() {} };

    route.doImport();

    assert.deepEqual(dataDictionary.entity, [entity]);
    assert.strictEqual(
      dataDictionary.domain.length,
      1,
      'domain defaults to an empty array before the new domain is appended'
    );
  });

  test('reduceData merges unique values into each column domain', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );

    route.controller = {
      columns: {
        colA: { domain: ['x'] },
      },
    };

    route.reduceData([{ colA: 'x' }, { colA: 'y' }]);

    assert.deepEqual(route.controller.columns.colA.domain.sort(), ['x', 'y']);
  });

  test('processComplete infers integer vs numeric and allowNull per column', function (assert) {
    const route = this.owner.lookup(
      'route:dictionary/show/edit/entity/import'
    );

    route.controller = {
      columns: {
        ints: { importType: 'numeric', domain: [1, 2, 3] },
        floats: { importType: 'numeric', domain: [1.5, 2.5] },
        withBlank: { importType: 'numeric', domain: [1, null] },
      },
      processed: false,
    };

    route.processComplete();

    assert.strictEqual(route.controller.columns.ints.importType, 'integer');
    assert.strictEqual(route.controller.columns.floats.importType, 'numeric');
    assert.true(route.controller.columns.withBlank.allowNull);
    assert.true(route.controller.processed);
  });
});
