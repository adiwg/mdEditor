define('mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test', ['exports', 'qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (exports, _qunit, _mdeditorTestsHelpersModuleForAcceptance) {

  var componentInstance = undefined;

  (0, _mdeditorTestsHelpersModuleForAcceptance['default'])('Acceptance | pods/components/md breadcrumb', {
    beforeEach: function beforeEach() {
      componentInstance = this.application.__container__.lookup('component:layout/md-breadcrumb');
    },
    afterEach: function afterEach() {
      componentInstance = null;
    }
  });

  (0, _qunit.test)('visiting /record/new', function (assert) {
    assert.expect(5);

    visit('/record/new');

    andThen(function () {
      assert.equal(currentURL(), '/record/new');

      var listItems = find('ol.breadcrumb li').text();
      var linkItems = find('ol.breadcrumb li a').text();

      var hasRecordInallList = listItems.indexOf('Record') >= 0;
      var hasNewTextInallList = listItems.indexOf('New') >= 0;

      var hasRecordInLinkList = linkItems.indexOf('Record') >= 0;
      var doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.ok(hasRecordInLinkList, 'renders the right inferred name');
      assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define('mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/pods/components/layout');
  QUnit.test('acceptance/pods/components/layout/md-breadcrumb-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/components/layout/md-breadcrumb-test.js should pass jshint.');
  });
});
define('mdeditor/tests/acceptance/pods/contact/new-test', ['exports', 'qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (exports, _qunit, _mdeditorTestsHelpersModuleForAcceptance) {

  (0, _mdeditorTestsHelpersModuleForAcceptance['default'])('Acceptance | pods/contact/new');

  (0, _qunit.test)('visiting /pods/contact/new', function (assert) {
    visit('/contact/new');
    andThen(function () {
      assert.equal(currentURL(), '/contact/new');
    });
  });

  (0, _qunit.test)('test new contact initial page conditions', function (assert) {
    assert.expect(5);
    visit('/contact/new');
    andThen(function () {
      assert.equal(find('input:eq(0)').val().length, 36);
      assert.equal(find('input:eq(1)').val(), "");
      assert.equal(find('input:eq(2)').val(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });

  (0, _qunit.test)('test new contact individual', function (assert) {
    assert.expect(3);
    visit('/contact/new');
    fillIn('input:eq(1)', 'Individual Name');
    andThen(function () {
      assert.equal(find('input:eq(1)').val(), "Individual Name");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new contact organization', function (assert) {
    assert.expect(3);
    visit('/contact/new');
    fillIn('input:eq(2)', 'Organization Name');
    andThen(function () {
      assert.equal(find('input:eq(2)').val(), "Organization Name");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new contact organization and individual names', function (assert) {
    assert.expect(2);
    visit('/contact/new');
    fillIn('input:eq(1)', 'Individual Name');
    fillIn('input:eq(2)', 'Organization Name');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new contact missing contact ID', function (assert) {
    assert.expect(2);
    visit('/contact/new');
    fillIn('input:eq(0)', '');
    fillIn('input:eq(1)', 'Individual Name');
    fillIn('input:eq(2)', 'Organization Name');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });
});
define('mdeditor/tests/acceptance/pods/contact/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/pods/contact');
  QUnit.test('acceptance/pods/contact/new-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/new-test.js should pass jshint.');
  });
});
define('mdeditor/tests/acceptance/pods/dictionary/new-test', ['exports', 'qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (exports, _qunit, _mdeditorTestsHelpersModuleForAcceptance) {

  (0, _mdeditorTestsHelpersModuleForAcceptance['default'])('Acceptance | pods/dictionary/new');

  (0, _qunit.test)('visiting /pods/dictionary/new', function (assert) {
    visit('/dictionary/new');
    andThen(function () {
      assert.equal(currentURL(), '/dictionary/new');
    });
  });

  (0, _qunit.test)('test new dictionary initial page conditions', function (assert) {
    assert.expect(4);
    visit('/dictionary/new');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "");
      assert.equal(find('div.md-form-select select').val(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 2);
    });
  });

  (0, _qunit.test)('test new dictionary completed form', function (assert) {
    assert.expect(4);
    visit('/dictionary/new');
    fillIn('input:eq(0)', 'Dictionary Name');
    fillIn('div.md-form-select select', 'aggregate');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "Dictionary Name");
      assert.equal(find('div.md-form-select select').val(), "aggregate");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new dictionary missing dictionary name', function (assert) {
    assert.expect(2);
    visit('/dictionary/new');
    fillIn('div.md-form-select select', 'aggregate');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });

  (0, _qunit.test)('test new dictionary missing data resource type', function (assert) {
    assert.expect(2);
    visit('/dictionary/new');
    fillIn('input:eq(0)', 'Dictionary Name');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });
});
define('mdeditor/tests/acceptance/pods/dictionary/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/pods/dictionary');
  QUnit.test('acceptance/pods/dictionary/new-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/new-test.js should pass jshint.');
  });
});
define('mdeditor/tests/acceptance/pods/record/new-test', ['exports', 'qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (exports, _qunit, _mdeditorTestsHelpersModuleForAcceptance) {

  (0, _mdeditorTestsHelpersModuleForAcceptance['default'])('Acceptance | pods/record/new');

  (0, _qunit.test)('visiting /pods/record/new', function (assert) {
    visit('/record/new');
    andThen(function () {
      assert.equal(currentURL(), '/record/new');
    });
  });

  (0, _qunit.test)('test new mdJSON record initial page conditions', function (assert) {
    assert.expect(4);
    visit('/record/new');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "");
      assert.equal(find('div.md-form-select select').val(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 2);
    });
  });

  (0, _qunit.test)('test new mdJSON record completed form', function (assert) {
    assert.expect(4);
    visit('/record/new');
    fillIn('input:eq(0)', 'Record Title');
    fillIn('div.md-form-select select', 'attribute');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "Record Title");
      assert.equal(find('div.md-form-select select').val(), "attribute");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new mdJSON record missing record title', function (assert) {
    assert.expect(2);
    visit('/record/new');
    fillIn('div.md-form-select select', 'attribute');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });

  (0, _qunit.test)('test new mdJSON record missing data record type (scope)', function (assert) {
    assert.expect(2);
    visit('/record/new');
    fillIn('input:eq(0)', 'Record Title');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 1);
    });
  });
});
define('mdeditor/tests/acceptance/pods/record/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/pods/record');
  QUnit.test('acceptance/pods/record/new-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/new-test.js should pass jshint.');
  });
});
define('mdeditor/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('mdeditor/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define("mdeditor/tests/helpers/create-contact", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = createContact;

  function createContact(total) {

    var contacts = [];

    for (var i = 0; i < total; i++) {

      var contact = _ember["default"].Object.create({

        json: {
          "contactId": i,
          "organizationName": null,
          "individualName": "Contact" + i,
          "positionName": null,
          "phoneBook": [],
          "address": {},
          "onlineResource": [],
          "contactInstructions": null
        },
        title: 'Contact' + i,
        icon: 'user'
      });

      contacts.push(contact);
    }

    return contacts;
  }
});
define('mdeditor/tests/helpers/create-contact.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/create-contact.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-contact.js should pass jshint.');
  });
});
define("mdeditor/tests/helpers/create-dictionary", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = createDictionary;

  function createDictionary(total) {

    var dictionaries = [];

    for (var i = 0; i < total; i++) {

      var dictionary = _ember["default"].Object.create({

        json: {
          "dictionaryInfo": {
            "citation": {
              "title": "My Dictionary",
              "date": [{
                "date": new Date().toISOString(),
                "dateType": "creation"
              }]
            },
            "description": "Data dictionary.",
            "resourceType": null
          },
          "domain": [],
          "entity": []
        },
        title: 'My Dictionary' + i,
        icon: 'book'
      });

      dictionaries.push(dictionary);
    }

    return dictionaries;
  }
});
define('mdeditor/tests/helpers/create-dictionary.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/create-dictionary.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-dictionary.js should pass jshint.');
  });
});
define("mdeditor/tests/helpers/create-record", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = createRecord;

  function createRecord(total) {

    var records = [];

    for (var i = 0; i < total; i++) {

      var record = _ember["default"].Object.create({

        json: {
          "version": {
            "name": "mdJson",
            "version": "1.0.0"
          },
          "record": [],
          "metadata": {
            "metadataInfo": {
              "metadataIdentifier": {
                "identifier": 'r' + i,
                "type": "uuid"
              }
            },
            "resourceInfo": {
              "resourceType": null,
              "citation": {
                "title": "My Record" + i,
                "date": [{
                  "date": new Date().toISOString(),
                  "dateType": "creation"
                }]
              },
              "pointOfrecord": [],
              "abstract": null,
              "status": null,
              "language": ["eng; USA"]
            }
          }
        },
        title: 'My Record' + i,
        icon: 'project'
      });

      records.push(record);
    }

    return records;
  }
});
define('mdeditor/tests/helpers/create-record.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/create-record.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-record.js should pass jshint.');
  });
});
define('mdeditor/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('mdeditor/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('mdeditor/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'mdeditor/tests/helpers/start-app', 'mdeditor/tests/helpers/destroy-app'], function (exports, _qunit, _mdeditorTestsHelpersStartApp, _mdeditorTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mdeditorTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _mdeditorTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('mdeditor/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('mdeditor/tests/helpers/resolver', ['exports', 'ember/resolver', 'mdeditor/config/environment'], function (exports, _emberResolver, _mdeditorConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mdeditorConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mdeditorConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('mdeditor/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('mdeditor/tests/helpers/start-app', ['exports', 'ember', 'mdeditor/app', 'mdeditor/config/environment'], function (exports, _ember, _mdeditorApp, _mdeditorConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _mdeditorConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _mdeditorApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('mdeditor/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-boolean/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-boolean', 'Integration | Component | input/md boolean', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-boolean', [], ['value', false, 'text', 'Foo Bar', 'label', 'Baz'], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-boolean', [], ['value', true, 'text', 'Foo Bar', 'label', 'Baz'], 0, null, ['loc', [null, [2, 4], [4, 25]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');

    assert.ok(this.$('input').prop('checked'));
  });
});
define('mdeditor/tests/integration/pods/components/input/md-boolean/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-boolean');
  QUnit.test('integration/pods/components/input/md-boolean/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-boolean/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist/component-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var codelist = _ember['default'].Service.extend({
    foobar: {
      codelist: [{
        code: '001',
        codeName: 'foo',
        description: 'This is foo.'
      }, {
        code: '002',
        codeName: 'bar',
        description: 'This is bar.'
      }]
    }
  });

  (0, _emberQunit.moduleForComponent)('input/md-codelist', 'Integration | Component | input/md-codelist', {
    integration: true,
    beforeEach: function beforeEach() {
      this.register('service:codelist', codelist);
      this.inject.service('codelist', {
        as: 'codelist'
      });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 2,
              'column': 37
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-codelist', [], ['value', 'foo', 'mdCodeName', 'foobar'], ['loc', [null, [1, 0], [2, 37]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar|foo|foo|');

    // Template block usage:" + EOL +
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('option');
            dom.setAttribute(el1, 'value', 'baz');
            var el2 = dom.createTextNode('baz');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-codelist', [], ['value', 'foo', 'mdCodeName', 'foobar'], 0, null, ['loc', [null, [2, 4], [4, 26]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar|foo|baz|foo|', 'render block ok');
  });

  (0, _emberQunit.test)('set value action', function (assert) {
    // test dummy for the external profile action
    this.on('update', function (actual) {
      assert.equal(actual, 'bar', 'submitted value is passed to external action');
    });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 3,
              'column': 36
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-codelist', [], ['value', 'foo', 'mdCodeName', 'foobar', 'change', ['subexpr', 'action', ['update', 'bar'], [], ['loc', [null, [3, 11], [3, 34]]]]], ['loc', [null, [1, 0], [3, 36]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('select').trigger('change');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-codelist');
  QUnit.test('integration/pods/components/input/md-codelist/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-codelist/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  var codelist = _ember['default'].Service.extend({
    foobar: {
      codelist: [{
        code: '001',
        codeName: 'foo',
        description: 'This is foo.'
      }, {
        code: '002',
        codeName: 'bar',
        description: 'This is bar.'
      }]
    }
  });

  (0, _emberQunit.moduleForComponent)('input/md-codelist-multi', 'Integration | Component | input/md codelist multi', {
    integration: true,
    beforeEach: function beforeEach() {
      this.register('service:codelist', codelist);
      this.inject.service('codelist', {
        as: 'codelist'
      });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('fooVal', ['foo', 'bar']);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 6,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-codelist-multi', [], ['value', '["foo","bar"]', 'create', true, 'mdCodeName', 'foobar'], ['loc', [null, [2, 4], [5, 25]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar|foo|×bar×foo|', 'renders with JSON string');

    // Template block usage:" + EOL +
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 7,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('p');
            var el2 = dom.createTextNode('template block text');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 8,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-codelist-multi', [], ['mdCodeName', 'foobar', 'value', ['subexpr', '@mut', [['get', 'fooVal', ['loc', [null, [4, 12], [4, 18]]]]], [], []]], 0, null, ['loc', [null, [2, 4], [7, 32]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar|foo|template|block|text|×bar×foo|', 'renders block with array value');
  });

  (0, _emberQunit.test)('set value action', function (assert) {
    // test dummy for the external profile action
    this.on('update', function (actual) {
      assert.equal(actual, "['bar']", 'submitted value is passed to external action');
    });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 40
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-codelist-multi', [], ['create', true, 'value', '["foo"]', 'mdCodeName', 'foobar', 'change', ['subexpr', 'action', ['update', '[\'bar\']'], [], ['loc', [null, [5, 11], [5, 38]]]]], ['loc', [null, [1, 0], [5, 40]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('select').trigger('change');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-codelist-multi');
  QUnit.test('integration/pods/components/input/md-codelist-multi/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-codelist-multi/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-datetime/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-datetime', 'Integration | Component | input/md datetime', {
    integration: true
  });

  (0, _emberQunit.test)('renders and binds', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 4,
              'column': 46
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-datetime', [], ['date', ['subexpr', '@mut', [['get', 'mydate', ['loc', [null, [2, 25], [2, 31]]]]], [], []], 'format', 'YYYY-MM-DD', 'placeholder', 'Enter date'], ['loc', [null, [1, 0], [4, 46]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.set('mydate', '1999-12-31T23:59:59.999+0900');
    assert.equal(this.$('input').val(), '1999-12-31', 'binding works');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-datetime/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-datetime');
  QUnit.test('integration/pods/components/input/md-datetime/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-datetime/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-input', 'Integration | Component | input/md input', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 9,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-input', [], ['label', 'Foo', 'value', 'Bar', 'maxlength', 100, 'required', 'true', 'class', 'test', 'placeholder', 'Enter FooBar'], ['loc', [null, [2, 4], [8, 34]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('label').text(), 'Foo', 'labeled OK');

    var input = this.$('input');
    var props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
    assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('p');
            dom.setAttribute(el1, 'class', 'help-block');
            var el2 = dom.createTextNode('help text');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-input', [], [], 0, null, ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$('.help-block').text(), 'help text', 'block renders');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-input');
  QUnit.test('integration/pods/components/input/md-input/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-input/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-inputs/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-inputs', 'Integration | Component | input/md inputs', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['Foo', 'Bar', '']);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 8,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-inputs', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 12], [3, 17]]]]], [], []], 'header', 'Header', 'placeholder', 'Enter Line', 'label', 'Lines', 'maxlength', 100], ['loc', [null, [2, 4], [7, 21]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Lines|Add|Line|#|Header|0|Delete!|1|Delete!|2|Delete!|', 'it renders ok');

    var input = this.$('input').first();
    var props = [input.prop('maxlength'), input.val(), input.prop('placeholder')];
    assert.deepEqual(props, [100, 'Foo', 'Enter Line'], 'properties set ok');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-inputs', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Add|Line|#|Column1|template|block|text|', 'block renders ok');
  });

  (0, _emberQunit.test)('should update items', function (assert) {
    //assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 4,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-inputs', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 12], [3, 17]]]]], [], []]], ['loc', [null, [2, 4], [3, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('input').val(), 'foo', 'starts as foo');

    this.set('model', ['bar']);
    assert.equal(this.$('input').val(), 'bar', 'updates to bar');

    this.set('model', ['bar', 'baz']);
    assert.equal(this.$('input').length, 2, 'adds line');
  });

  (0, _emberQunit.test)('should add/delete item', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 4,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-inputs', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 12], [3, 17]]]]], [], []]], ['loc', [null, [2, 4], [3, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('.btn-success').click();

    assert.equal(this.$('input').length, 2, 'adds item');

    this.$('.btn-warning').first().click();

    assert.equal(this.$('input').length, 1, 'deletes item');
  });

  (0, _emberQunit.test)('add item action', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('addItem', function () {
      assert.ok(true, 'addItem action');
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-inputs', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 12], [3, 17]]]]], [], []], 'addItem', ['subexpr', '@mut', [['get', 'addItem', ['loc', [null, [4, 14], [4, 21]]]]], [], []]], ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('.btn-success').click();
  });

  (0, _emberQunit.test)('delete item actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('deleteItem', function (idx) {
      assert.ok(idx > -1, 'deleteItem action');
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-inputs', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 12], [3, 17]]]]], [], []], 'deleteItem', ['subexpr', '@mut', [['get', 'deleteItem', ['loc', [null, [4, 17], [4, 27]]]]], [], []]], ['loc', [null, [2, 4], [4, 29]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('.btn-warning').first().click();
  });
});
define('mdeditor/tests/integration/pods/components/input/md-inputs/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-inputs');
  QUnit.test('integration/pods/components/input/md-inputs/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-inputs/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select/component-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  (0, _emberQunit.moduleForComponent)('input/md-select', 'Integration | Component | input/md select', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [_ember['default'].Object.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    })]);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 9,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-select', [], ['value', 1, 'objectArray', ['subexpr', '@mut', [['get', 'objArray', ['loc', [null, [4, 18], [4, 26]]]]], [], []], 'valuePath', 'id', 'namePath', 'name', 'tooltipPath', 'tip', 'placeholder', 'Select one'], ['loc', [null, [2, 4], [8, 32]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|foo|', 'renders ok');

    // Template block usage:" + EOL +
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 9,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('option');
            dom.setAttribute(el1, 'value', '2');
            var el2 = dom.createTextNode('bar');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 10,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-select', [], ['value', 1, 'objectArray', ['subexpr', '@mut', [['get', 'objArray', ['loc', [null, [4, 18], [4, 26]]]]], [], []], 'valuePath', 'id', 'namePath', 'name'], 0, null, ['loc', [null, [2, 4], [9, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|bar|foo|', 'renders block ok');
  });

  (0, _emberQunit.test)('set value', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [_ember['default'].Object.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    }), _ember['default'].Object.create({
      id: 2,
      name: 'baz',
      tip: 'biz'
    })]);

    this.set('val', '1');

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 7,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-select', [], ['value', ['subexpr', '@mut', [['get', 'val', ['loc', [null, [3, 12], [3, 15]]]]], [], []], 'objectArray', ['subexpr', '@mut', [['get', 'objArray', ['loc', [null, [4, 18], [4, 26]]]]], [], []], 'valuePath', 'id', 'namePath', 'name'], ['loc', [null, [2, 4], [6, 23]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.$('select').val(2).trigger('change');

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|baz|baz|', 'display value updates');

    assert.equal(this.get('val'), 2, 'value is set');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-select');
  QUnit.test('integration/pods/components/input/md-select/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-profile/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-select-profile', 'Integration | Component | input/md select profile', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 69
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-select-profile', [], ['value', ['subexpr', '@mut', [['get', 'full', ['loc', [null, [1, 32], [1, 36]]]]], [], []], 'updateProfile', 'updateProfile'], ['loc', [null, [1, 0], [1, 69]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Profile|basic|full|Choose|profile|');
  });

  (0, _emberQunit.test)('should trigger external action on change', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('updateProfile', function (actual) {
      assert.equal(actual, 'basic', 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 75
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'input/md-select-profile', [], ['value', ['subexpr', '@mut', [['get', 'full', ['loc', [null, [1, 32], [1, 36]]]]], [], []], 'updateProfile', ['subexpr', 'action', [['get', 'updateProfile', ['loc', [null, [1, 59], [1, 72]]]]], [], ['loc', [null, [1, 51], [1, 73]]]]], ['loc', [null, [1, 0], [1, 75]]]]],
        locals: [],
        templates: []
      };
    })()));

    // select a value and force an onchange
    this.$('select').val('basic');
    this.$('select').change();
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-profile/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-select-profile');
  QUnit.test('integration/pods/components/input/md-select-profile/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-profile/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-textarea/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('input/md-textarea', 'Integration | Component | input/md textarea', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 7,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['inline', 'input/md-textarea', [], ['value', 'Foo bar baz', 'label', 'FooBar', 'placeholder', 'placeholder', 'rows', 10], ['loc', [null, [2, 4], [6, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('textarea').val(), 'Foo bar baz');

    assert.equal(this.$('label').text(), 'FooBar', 'label renders');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'input/md-textarea', [], [], 0, null, ['loc', [null, [2, 4], [4, 26]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text', 'block renders');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-textarea/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/input/md-textarea');
  QUnit.test('integration/pods/components/input/md-textarea/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-textarea/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('layout/md-nav-main', 'Integration | Component | md nav main', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 22
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'layout/md-nav-main', ['loc', [null, [1, 0], [1, 22]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Toggle|navigation|Dashboard|Export|Import|Settings|');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text ');
            dom.appendChild(el0, el1);
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [['content', 'record/show/edit/nav', ['loc', [null, [3, 26], [3, 50]]]]],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'layout/md-nav-main', [], [], 0, null, ['loc', [null, [2, 4], [4, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Toggle|navigation|Dashboard|Export|Import|template|block|text|Settings|');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/layout/md-nav-main');
  QUnit.test('integration/pods/components/layout/md-nav-main/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-main/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test', ['exports', 'ember-qunit', 'ember'], function (exports, _emberQunit, _ember) {

  //Stub profile service
  var profileStub = _ember['default'].Service.extend({
    getActiveProfile: function getActiveProfile() {
      var active = this.get('active');
      var profile = active && typeof active === 'string' ? active : 'full';
      var profiles = this.get('profiles');

      return profiles[profile];
    },
    profiles: {
      full: {
        profile: null,
        secondaryNav: [{
          title: 'Foo',
          target: 'record.show.edit.index'

        }, {
          title: 'Bar',
          target: 'record.show.edit.metadata'

        }]
      },
      basic: {
        profile: null,
        secondaryNav: [{
          title: 'FooBar',
          target: 'record.show.edit.index'

        }, {
          title: 'BarFoo',
          target: 'record.show.edit.metadata'

        }]
      }
    }
  });

  (0, _emberQunit.moduleForComponent)('layout/md-nav-secondary', 'Integration | Component | md nav secondary', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('service:profile', profileStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "locationService" within each test
      this.inject.service('profile', {
        as: 'profileService'
      });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'layout/md-nav-secondary', ['loc', [null, [1, 0], [1, 27]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|More|Foo|Bar|');

    // Template block usage:
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      ');
            dom.appendChild(el0, el1);
            var el1 = dom.createElement('li');
            var el2 = dom.createTextNode('template block text');
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'layout/md-nav-secondary', [], [], 0, null, ['loc', [null, [2, 4], [4, 32]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|More|Foo|Bar|template|block|text|');
  });

  (0, _emberQunit.test)('render after setting profile', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('profileService.active', 'basic');

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'layout/md-nav-secondary', ['loc', [null, [1, 0], [1, 27]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|More|FooBar|BarFoo|');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/layout/md-nav-secondary');
  QUnit.test('integration/pods/components/layout/md-nav-secondary/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-secondary/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test', ['exports', 'ember-qunit', 'mdeditor/tests/helpers/create-contact', 'mdeditor/tests/helpers/create-record', 'mdeditor/tests/helpers/create-dictionary'], function (exports, _emberQunit, _mdeditorTestsHelpersCreateContact, _mdeditorTestsHelpersCreateRecord, _mdeditorTestsHelpersCreateDictionary) {

  (0, _emberQunit.moduleForComponent)('layout/md-nav-sidebar', 'Integration | Component | md nav sidebar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(1);

    var contacts = (0, _mdeditorTestsHelpersCreateContact['default'])(2);
    contacts.meta = {
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    };

    var records = (0, _mdeditorTestsHelpersCreateRecord['default'])(2);
    records.meta = {
      type: 'record',
      list: 'records',
      title: 'Records'
    };

    var dicts = (0, _mdeditorTestsHelpersCreateDictionary['default'])(2);
    dicts.meta = {
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    };

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', [records, contacts, dicts]);

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 37
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'layout/md-nav-sidebar', [], ['items', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [1, 30], [1, 35]]]]], [], []]], ['loc', [null, [1, 0], [1, 37]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|mdditor|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
  });

  (0, _emberQunit.test)('toggle help action', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'triple-curlies'
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement('div');
          dom.setAttribute(el1, 'id', 'md-sidebar-wrapper');
          var el2 = dom.createComment('');
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
          return morphs;
        },
        statements: [['content', 'layout/md-nav-sidebar', ['loc', [null, [1, 29], [1, 54]]]]],
        locals: [],
        templates: []
      };
    })()));
    this.$('#md-btn-help').click();
    assert.ok(this.$('#md-sidebar-wrapper').hasClass('help'));
  });

  (0, _emberQunit.test)('toggle sidebar action', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'triple-curlies'
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 87
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement('div');
          dom.setAttribute(el1, 'id', 'md-wrapper');
          var el2 = dom.createElement('div');
          dom.setAttribute(el2, 'id', 'md-sidebar-wrapper');
          var el3 = dom.createComment('');
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]), 0, 0);
          return morphs;
        },
        statements: [['content', 'layout/md-nav-sidebar', ['loc', [null, [1, 50], [1, 75]]]]],
        locals: [],
        templates: []
      };
    })()));
    this.$('.sidebar-brand-link').click();
    assert.ok(this.$('#md-wrapper').hasClass('toggled'));
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/layout/md-nav-sidebar');
  QUnit.test('integration/pods/components/layout/md-nav-sidebar/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-sidebar/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/integration/pods/components/md-help/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('md-help', 'Integration | Component | md help', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 11
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'md-help', ['loc', [null, [1, 0], [1, 11]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.$().text().indexOf('Lorem ipsum' > 0));

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'md-help', [], [], 0, null, ['loc', [null, [2, 4], [4, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.ok(this.$().text().trim().indexOf('template block text' > 0));
  });
});
define('mdeditor/tests/integration/pods/components/md-help/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/md-help');
  QUnit.test('integration/pods/components/md-help/component-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-help/component-test.js should pass jshint.');
  });
});
define('mdeditor/tests/models/contact.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/contact.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contact.js should pass jshint.');
  });
});
define('mdeditor/tests/models/dictionary.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/dictionary.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/dictionary.js should pass jshint.');
  });
});
define('mdeditor/tests/models/record.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/record.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/record.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-boolean/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-boolean');
  QUnit.test('pods/components/input/md-boolean/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-boolean/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-codelist/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-codelist');
  QUnit.test('pods/components/input/md-codelist/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-codelist/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-codelist-multi/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-codelist-multi');
  QUnit.test('pods/components/input/md-codelist-multi/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-codelist-multi/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-datetime/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-datetime');
  QUnit.test('pods/components/input/md-datetime/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-datetime/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-input/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-input');
  QUnit.test('pods/components/input/md-input/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-input/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-inputs/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-inputs');
  QUnit.test('pods/components/input/md-inputs/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-inputs/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-select/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-select');
  QUnit.test('pods/components/input/md-select/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-select-profile/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-select-profile');
  QUnit.test('pods/components/input/md-select-profile/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-profile/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/input/md-textarea/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/input/md-textarea');
  QUnit.test('pods/components/input/md-textarea/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-textarea/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/layout/md-breadcrumb/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/layout/md-breadcrumb');
  QUnit.test('pods/components/layout/md-breadcrumb/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-breadcrumb/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/layout/md-nav-main/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/layout/md-nav-main');
  QUnit.test('pods/components/layout/md-nav-main/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-main/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/layout/md-nav-secondary/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/layout/md-nav-secondary');
  QUnit.test('pods/components/layout/md-nav-secondary/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-secondary/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/layout/md-nav-sidebar/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/layout/md-nav-sidebar');
  QUnit.test('pods/components/layout/md-nav-sidebar/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-sidebar/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/components/md-help/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/md-help');
  QUnit.test('pods/components/md-help/component.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-help/component.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/contact/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/contact/new');
  QUnit.test('pods/contact/new/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/new/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/contact/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/contact');
  QUnit.test('pods/contact/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/contact/show/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/contact/show/edit');
  QUnit.test('pods/contact/show/edit/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/edit/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/contact/show/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/contact/show');
  QUnit.test('pods/contact/show/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/contacts/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/contacts');
  QUnit.test('pods/contacts/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contacts/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dashboard/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard');
  QUnit.test('pods/dashboard/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionaries/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionaries');
  QUnit.test('pods/dictionaries/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionaries/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/new');
  QUnit.test('pods/dictionary/new/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/new/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary');
  QUnit.test('pods/dictionary/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/show/edit/domains/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/show/edit/domains');
  QUnit.test('pods/dictionary/show/edit/domains/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domains/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/show/edit/entities/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/show/edit/entities');
  QUnit.test('pods/dictionary/show/edit/entities/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entities/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/show/edit/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/show/edit/index');
  QUnit.test('pods/dictionary/show/edit/index/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/index/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/show/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/show/edit');
  QUnit.test('pods/dictionary/show/edit/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/dictionary/show/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dictionary/show');
  QUnit.test('pods/dictionary/show/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/export/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/export');
  QUnit.test('pods/export/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/export/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/help/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/help');
  QUnit.test('pods/help/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/help/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/import/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/import');
  QUnit.test('pods/import/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/import/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/publish/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/publish');
  QUnit.test('pods/publish/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/publish/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/new');
  QUnit.test('pods/record/new/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/new/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/associated/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/associated');
  QUnit.test('pods/record/show/edit/associated/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/associated/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/coverages/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/coverages');
  QUnit.test('pods/record/show/edit/coverages/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/coverages/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/distribution/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/distribution');
  QUnit.test('pods/record/show/edit/distribution/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/distribution/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/documents/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/documents');
  QUnit.test('pods/record/show/edit/documents/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/documents/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/grid/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/grid');
  QUnit.test('pods/record/show/edit/grid/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/grid/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/index');
  QUnit.test('pods/record/show/edit/index/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/index/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/keywords/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/keywords');
  QUnit.test('pods/record/show/edit/keywords/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/keywords/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/metadata/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/metadata');
  QUnit.test('pods/record/show/edit/metadata/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/quality/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/quality');
  QUnit.test('pods/record/show/edit/quality/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/quality/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit');
  QUnit.test('pods/record/show/edit/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/edit/spatial/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show/edit/spatial');
  QUnit.test('pods/record/show/edit/spatial/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/spatial/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/record/show/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/record/show');
  QUnit.test('pods/record/show/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/records/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/records');
  QUnit.test('pods/records/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/records/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/save/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/save');
  QUnit.test('pods/save/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/save/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/settings/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/settings');
  QUnit.test('pods/settings/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/settings/route.js should pass jshint.');
  });
});
define('mdeditor/tests/pods/translate/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/translate');
  QUnit.test('pods/translate/route.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/translate/route.js should pass jshint.');
  });
});
define('mdeditor/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('mdeditor/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('mdeditor/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('mdeditor/tests/serializers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass jshint.');
  });
});
define('mdeditor/tests/services/codelist.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/codelist.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/codelist.js should pass jshint.');
  });
});
define('mdeditor/tests/services/icon.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/icon.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/icon.js should pass jshint.');
  });
});
define('mdeditor/tests/services/profile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/profile.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/profile.js should pass jshint.');
  });
});
define('mdeditor/tests/test-helper', ['exports', 'mdeditor/tests/helpers/resolver', 'ember-qunit'], function (exports, _mdeditorTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mdeditorTestsHelpersResolver['default']);
});
define('mdeditor/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('mdeditor/tests/transforms/json.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - transforms');
  QUnit.test('transforms/json.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/json.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  (0, _emberQunit.test)('it has a importData method', function (assert) {
    var adapter = this.subject();
    assert.ok(typeof adapter.importData === 'function');
  });

  (0, _emberQunit.test)('it has a exportData method', function (assert) {
    var adapter = this.subject();
    assert.ok(typeof adapter.exportData === 'function');
  });
});
define('mdeditor/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/models/contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('contact', 'Unit | Model | contact', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('should correctly compute title', function (assert) {
    var me = this.subject();

    assert.expect(2);
    me.set('json.individualName', undefined);
    me.set('json.organizationName', 'bar');
    assert.equal(me.get('title'), 'bar');
    me.set('json.individualName', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  (0, _emberQunit.test)('should correctly compute icon', function (assert) {
    var me = this.subject();

    assert.expect(2);
    me.set('json.individualName', undefined);
    me.set('json.organizationName', 'bar');
    assert.equal(me.get('icon'), 'users');
    me.set('json.individualName', 'foo');
    assert.equal(me.get('icon'), 'user');
  });
});
define('mdeditor/tests/unit/models/contact-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/contact-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contact-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/models/dictionary-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('dictionary', 'Unit | Model | dictionary', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('should correctly compute title', function (assert) {
    var me = this.subject();

    assert.expect(1);
    me.set('json.dictionaryInfo.citation.title', 'bar');
    assert.equal(me.get('title'), 'bar');
  });
});
define('mdeditor/tests/unit/models/dictionary-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/dictionary-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/dictionary-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/models/record-test', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {

  (0, _emberQunit.moduleForModel)('record', 'Unit | Model | record', {
    // Specify the other units that are required for this test.
    needs: ['service:icon']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('should correctly compute title', function (assert) {
    var me = this.subject();

    assert.expect(1);
    me.set('json.metadata.resourceInfo.citation.title', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  (0, _emberQunit.test)('should correctly compute icon', function (assert) {
    var me = this.subject();
    var list = _ember['default'].getOwner(this).lookup('service:icon');

    assert.expect(1);
    me.set('json.metadata.resourceInfo.resourceType', 'project');
    assert.equal(me.get('icon'), list.get('project'));
  });
});
define('mdeditor/tests/unit/models/record-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/record-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/record-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/contact/new/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:contact/new', 'Unit | Route | contact/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/new/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/contact/new');
  QUnit.test('unit/pods/contact/new/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/new/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/contact/show/edit/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:contact/show/edit', 'Unit | Route | contact/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/show/edit/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/contact/show/edit');
  QUnit.test('unit/pods/contact/show/edit/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/edit/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/contact/show/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:contact/show', 'Unit | Route | contact/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/show/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/contact/show');
  QUnit.test('unit/pods/contact/show/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/contacts/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  var originalConfirm = undefined;

  (0, _emberQunit.moduleFor)('route:contacts', 'Unit | Route | contacts', {
    beforeEach: function beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach: function afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('should display a confirm', function (assert) {
    assert.expect(2);

    var route = this.subject();

    // test _deleteItem to displays the expected window.confirm message
    var expectedTextFoo = 'foo';
    window.confirm = function (message) {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);

    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = function (message) {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
  });
});
define('mdeditor/tests/unit/pods/contacts/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/contacts');
  QUnit.test('unit/pods/contacts/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contacts/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dashboard/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dashboard/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dashboard');
  QUnit.test('unit/pods/dashboard/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dashboard/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionaries/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  var originalConfirm = undefined;

  (0, _emberQunit.moduleFor)('route:dictionaries', 'Unit | Route | dictionaries', {
    beforeEach: function beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach: function afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('should display a confirm', function (assert) {
    assert.expect(2);

    var route = this.subject();

    // test _deleteItem to displays the expected window.confirm message
    var expectedTextFoo = 'foo';
    window.confirm = function (message) {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);

    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = function (message) {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
  });
});
define('mdeditor/tests/unit/pods/dictionaries/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionaries');
  QUnit.test('unit/pods/dictionaries/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionaries/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/new', 'Unit | Route | dictionary/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/new');
  QUnit.test('unit/pods/dictionary/new/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/new/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domains/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domains', 'Unit | Route | dictionary/edit/domains', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domains/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/show/edit/domains');
  QUnit.test('unit/pods/dictionary/show/edit/domains/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domains/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entities/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entities', 'Unit | Route | dictionary/edit/entities', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entities/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/show/edit/entities');
  QUnit.test('unit/pods/dictionary/show/edit/entities/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entities/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/index', 'Unit | Route | dictionary/show/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/show/edit/index');
  QUnit.test('unit/pods/dictionary/show/edit/index/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/index/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit', 'Unit | Route | dictionary/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/show/edit');
  QUnit.test('unit/pods/dictionary/show/edit/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dictionary/show', 'Unit | Route | dictionary/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dictionary/show');
  QUnit.test('unit/pods/dictionary/show/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/export/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:save', 'Unit | Route | save', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/export/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/export');
  QUnit.test('unit/pods/export/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/export/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/help/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:help', 'Unit | Route | help', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/help/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/help');
  QUnit.test('unit/pods/help/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/help/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/import/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:import', 'Unit | Route | import', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/import/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/import');
  QUnit.test('unit/pods/import/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/import/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/publish/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:publish', 'Unit | Route | publish', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/publish/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/publish');
  QUnit.test('unit/pods/publish/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/publish/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/new/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/new', 'Unit | Route | record/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/new/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/new');
  QUnit.test('unit/pods/record/new/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/new/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/associated', 'Unit | Route | record/edit/associated', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/associated');
  QUnit.test('unit/pods/record/show/edit/associated/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/coverages/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/coverages', 'Unit | Route | record/edit/coverages', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/coverages/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/coverages');
  QUnit.test('unit/pods/record/show/edit/coverages/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/coverages/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/distribution', 'Unit | Route | record/edit/distribution', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/distribution');
  QUnit.test('unit/pods/record/show/edit/distribution/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/documents', 'Unit | Route | record/edit/documents', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/documents');
  QUnit.test('unit/pods/record/show/edit/documents/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/grid/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/grid', 'Unit | Route | record/edit/grid', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/grid/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/grid');
  QUnit.test('unit/pods/record/show/edit/grid/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/grid/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/index/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/index', 'Unit | Route | record/show/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/index/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/index');
  QUnit.test('unit/pods/record/show/edit/index/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/index/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/keywords', 'Unit | Route | record/edit/keywords', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/keywords');
  QUnit.test('unit/pods/record/show/edit/keywords/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata', 'Unit | Route | record/show/edit/metadata', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/metadata');
  QUnit.test('unit/pods/record/show/edit/metadata/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/quality/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/quality', 'Unit | Route | record/edit/quality', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/quality/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/quality');
  QUnit.test('unit/pods/record/show/edit/quality/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/quality/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit', 'Unit | Route | record/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit');
  QUnit.test('unit/pods/record/show/edit/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show/edit/spatial', 'Unit | Route | record/edit/spatial', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show/edit/spatial');
  QUnit.test('unit/pods/record/show/edit/spatial/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/record/show/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:record/show', 'Unit | Route | record/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/record/show');
  QUnit.test('unit/pods/record/show/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/records/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  var originalConfirm = undefined;

  (0, _emberQunit.moduleFor)('route:records', 'Unit | Route | records', {
    beforeEach: function beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach: function afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('should display a confirm', function (assert) {
    assert.expect(2);

    var route = this.subject();

    // test _deleteItem to displays the expected window.confirm message
    var expectedTextFoo = 'foo';
    window.confirm = function (message) {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);

    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = function (message) {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
  });
});
define('mdeditor/tests/unit/pods/records/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/records');
  QUnit.test('unit/pods/records/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/records/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/settings/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:settings', 'Unit | Route | settings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/settings/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/settings');
  QUnit.test('unit/pods/settings/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/pods/translate/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:translate', 'Unit | Route | translate', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/translate/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/translate');
  QUnit.test('unit/pods/translate/route-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/translate/route-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/serializers/application-test', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {

  (0, _emberQunit.moduleFor)('serializer:application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['transform:json']
  });

  (0, _emberQunit.test)('it serializes records', function (assert) {
    assert.expect(2);

    var getOwner = _ember['default'].getOwner;

    var serializer = this.subject();
    var store = getOwner(this).lookup('service:store');
    var record = undefined;
    var expected = {
      "data": {
        "attributes": {
          "name": "foo",
          "skill": "bar",
          "games-played": "[100,200]"
        },
        "type": "tests"
      }
    };
    var data = {
      id: 1,
      name: 'foo',
      skill: 'bar',
      gamesPlayed: [100, 200]
    };
    var model = DS.Model.extend({
      name: DS.attr(),
      skill: DS.attr(),
      gamesPlayed: DS.attr('json')
    });

    this.register('model:test', model);

    _ember['default'].run(function () {
      record = store.createRecord('test', data);
    });

    assert.deepEqual(record.serialize(), expected, 'record serialized OK');
    assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
  });
});
define('mdeditor/tests/unit/serializers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/services/codelist-test', ['exports', 'ember-qunit', 'npm:mdcodes/resources/js/mdcodes.js'], function (exports, _emberQunit, _npmMdcodesResourcesJsMdcodesJs) {

  (0, _emberQunit.moduleFor)('service:codelist', 'Unit | Service | codelist', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  (0, _emberQunit.test)('all codelists are present', function (assert) {
    var service = this.subject();

    Object.keys(_npmMdcodesResourcesJsMdcodesJs['default']).forEach(function (key) {
      var name = key.replace(/^iso_/, '');

      assert.ok(service.get(name), name + ' is present.');
    });
  });
});
define('mdeditor/tests/unit/services/codelist-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/codelist-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/codelist-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/services/icon-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:icon', 'Unit | Service | icon', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/icon-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/icon-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/icon-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/services/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:profile', 'Unit | Service | profile', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/profile-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/profile-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/profile-test.js should pass jshint.');
  });
});
define('mdeditor/tests/unit/transforms/json-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:json', 'Unit | Transform | json', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  (0, _emberQunit.test)('it deserialized', function (assert) {
    var transform = this.subject();
    assert.deepEqual(transform.deserialize('{"foo":"bar"}'), {
      foo: "bar"
    });
  });

  (0, _emberQunit.test)('it serialized', function (assert) {
    var transform = this.subject();
    assert.equal(transform.serialize({
      foo: 'bar'
    }), '{"foo":"bar"}');
  });
});
define('mdeditor/tests/unit/transforms/json-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/transforms');
  QUnit.test('unit/transforms/json-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/json-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map