'use strict';

define('mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test', ['qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  //let componentInstance;

  (0, _moduleForAcceptance.default)('Acceptance | pods/components/md breadcrumb', {
    // beforeEach() {
    //     componentInstance = this.application.__container__.lookup(
    //       'component:layout/md-breadcrumb');
    //   },
    //   afterEach() {
    //     componentInstance = null;
    //   }
  });

  (0, _qunit.test)('visiting /record/new', function (assert) {
    assert.expect(5);

    visit('/record/new');

    andThen(function () {
      assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));

      const listItems = find('ol.breadcrumb li').text();
      const linkItems = find('ol.breadcrumb li a').text();

      const hasRecordInallList = listItems.indexOf('Record') >= 0;
      const hasNewTextInallList = listItems.indexOf('New') >= 0;

      const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
      const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
      assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define('mdeditor/tests/acceptance/pods/contact/new-test', ['qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  (0, _moduleForAcceptance.default)('Acceptance | pods/contact/new');

  (0, _qunit.test)('visiting /pods/contact/new', function (assert) {
    visit('/contact/new');
    andThen(function () {
      assert.ok(currentURL().match(/contact\/new\/[a-z0-9]+/));
    });
  });

  (0, _qunit.test)('test new contact initial page conditions', function (assert) {
    assert.expect(5);
    visit('/contact/new');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), 'on');
      assert.equal(find('input:eq(1)').val().length, 36);
      assert.equal(find('input:eq(2)').val(), "");
      assert.equal(find('input:eq(3)').val(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
    });
  });

  (0, _qunit.test)('test new contact individual', function (assert) {
    assert.expect(2);
    visit('/contact/new');
    fillIn('input:eq(2)', 'Individual Name');
    fillIn('input:eq(3)', '');
    andThen(function () {
      assert.equal(find('input:eq(2)').val(), 'Individual Name');
      assert.equal(find('button.md-form-save').prop('disabled'), false);
    });
  });

  (0, _qunit.test)('test new contact organization', function (assert) {
    assert.expect(2);
    visit('/contact/new');
    click('input:eq(0)').then(function () {
      fillIn('input:eq(2)', 'Organization Name');
      fillIn('input:eq(1)', '1234');
      fillIn('input:eq(3)', '');
      andThen(function () {
        assert.equal(find('input:eq(2)').val(), "Organization Name");
        assert.equal(find('button.md-form-save').prop('disabled'), false);
      });
    });
  });

  (0, _qunit.test)('test new contact missing contact ID', function (assert) {
    assert.expect(1);
    visit('/contact/new');
    fillIn('input:eq(1)', '');
    fillIn('input:eq(2)', 'Individual Name');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
    });
  });
});
define('mdeditor/tests/acceptance/pods/contacts/contacts-test', ['qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  (0, _moduleForAcceptance.default)('Acceptance | pods/contacts');

  (0, _qunit.test)('visiting /contacts', function (assert) {
    visit('/contacts');

    andThen(function () {
      assert.equal(currentURL(), '/contacts');
    });
  });

  (0, _qunit.test)('delete should display a confirm', function (assert) {
    assert.expect(4);

    var store = this.application.__container__.lookup('service:store');

    //make sure there's at least one record visible
    Ember.run(function () {
      store.createRecord('contact');
    });

    visit('/contacts');

    andThen(function () {
      assert.dialogOpensAndCloses({
        openSelector: 'button.md-button-modal.btn-danger:first',
        closeSelector: '.ember-modal-overlay',
        //closeSelector: '.md-modal-container button.btn-primary',
        hasOverlay: true,
        context: 'html'
      });
    });
  });
});
define('mdeditor/tests/acceptance/pods/dictionary/new-test', ['qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  /* global selectChoose*/
  (0, _moduleForAcceptance.default)('Acceptance | pods/dictionary/new');

  (0, _qunit.test)('visiting /pods/dictionary/new', function (assert) {
    visit('/dictionary/new');
    andThen(function () {
      assert.ok(currentURL().match(/dictionary\/new\/[a-z0-9]+/));
    });
  });

  (0, _qunit.test)('test new dictionary initial page conditions', function (assert) {
    assert.expect(4);
    visit('/dictionary/new');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "");
      assert.equal(find('ember-power-select-selected-item .select-value').text(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('div.md-form-alert').length, 2);
    });
  });

  (0, _qunit.test)('test new dictionary completed form', function (assert) {
    assert.expect(4);
    visit('/dictionary/new');
    fillIn('input:eq(0)', 'Dictionary Name');
    selectChoose('div.md-form-select .md-select', 'aggregate');
    andThen(function () {
      assert.equal(find('input:eq(0)').val(), "Dictionary Name");
      assert.equal(find('div.md-form-select .ember-power-select-selected-item .select-value').text().trim(), "aggregate");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
      assert.equal(find('div.md-form-alert').length, 0);
    });
  });

  (0, _qunit.test)('test new dictionary missing dictionary name', function (assert) {
    assert.expect(2);
    visit('/dictionary/new');
    //fillIn('div.md-form-select select', 'aggregate');
    selectChoose('div.md-form-select .md-select', 'aggregate');
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
define('mdeditor/tests/acceptance/pods/record/new-test', ['qunit', 'mdeditor/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  /* global selectChoose*/
  (0, _moduleForAcceptance.default)('Acceptance | pods/record/new');

  (0, _qunit.test)('visiting /pods/record/new', function (assert) {
    visit('/record/new');
    andThen(function () {
      assert.ok(currentURL().match(/record\/new\/[a-z0-9]+/));
    });
  });

  (0, _qunit.test)('test new mdJSON record initial page conditions', function (assert) {
    assert.expect(4);
    visit('/record/new');
    andThen(function () {
      assert.ok(find('input:eq(0)').val());
      assert.equal(find('input:eq(1)').val(), '');
      assert.equal(find('ember-power-select-selected-item .select-value').text(), "");
      assert.equal(find('button.md-form-save').prop('disabled'), true);
    });
  });

  (0, _qunit.test)('test new mdJSON record completed form', function (assert) {
    assert.expect(3);
    visit('/record/new');
    fillIn('input:eq(1)', 'Record Title');
    selectChoose('.md-select', 'attribute');
    andThen(function () {
      assert.equal(find('input:eq(1)').val(), "Record Title");
      assert.equal(find('div.md-select .ember-power-select-selected-item .select-value').text().trim(), "attribute");
      assert.equal(find('button.md-form-save').prop('disabled'), false);
    });
  });

  (0, _qunit.test)('test new mdJSON record missing record title', function (assert) {
    assert.expect(1);
    visit('/record/new');
    selectChoose('.md-select', 'attribute');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
    });
  });

  (0, _qunit.test)('test new mdJSON record missing data record type (scope)', function (assert) {
    assert.expect(2);
    visit('/record/new');
    fillIn('input:eq(1)', 'Record Title');
    andThen(function () {
      assert.equal(find('button.md-form-save').prop('disabled'), true);
      assert.equal(find('.md-error').length, 1);
    });
  });
});
define('mdeditor/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass ESLint\n\n14:3 - Use import LinkComponent from \'@ember/routing/link-component\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import Application from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n19:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n20:3 - Use import { defineProperty } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n21:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n22:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n23:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/add-em.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/add-em.js should pass ESLint\n\n7:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
  });

  QUnit.test('helpers/bbox-to-poly.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/bbox-to-poly.js should pass ESLint\n\n19:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
  });

  QUnit.test('helpers/get-dash.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/get-dash.js should pass ESLint\n\n4:3 - Use import Helper from \'@ember/component/helper\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('helpers/get-property.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-property.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/md-markdown.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/md-markdown.js should pass ESLint\n\n27:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
  });

  QUnit.test('helpers/mod.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/mod.js should pass ESLint\n\n3:3 - Use import Helper from \'@ember/component/helper\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('helpers/present.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/present.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/uc-words.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/uc-words.js should pass ESLint\n\n14:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
  });

  QUnit.test('helpers/word-limit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/word-limit.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/leaflet.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/leaflet.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/local-storage-export.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/local-storage-export.js should pass ESLint\n\n6:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n8:16 - Use import { assign } from \'@ember/polyfills\'; instead of using Ember.assign (ember/new-module-imports)\n8:32 - Use import { merge } from \'@ember/polyfills\'; instead of using Ember.merge (ember/new-module-imports)\n52:14 - Use import { Promise } from \'rsvp\'; instead of using Ember.RSVP.Promise (ember/new-module-imports)');
  });

  QUnit.test('instance-initializers/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/profile.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/route-publish.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/route-publish.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/settings.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/hash-poll.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/hash-poll.js should pass ESLint\n\n11:3 - Use import Mixin from \'@ember/object/mixin\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { on } from \'@ember/object/evented\'; instead of using Ember destructuring (ember/new-module-imports)\n59:16 - Use import { Promise } from \'rsvp\'; instead of using Ember.RSVP.Promise (ember/new-module-imports)');
  });

  QUnit.test('mixins/object-template.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/object-template.js should pass ESLint\n\n9:3 - Use import Mixin from \'@ember/object/mixin\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { merge } from \'@ember/polyfills\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('mixins/scroll-to.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/scroll-to.js should pass ESLint\n\n8:16 - Use import Mixin from \'@ember/object/mixin\'; instead of using Ember.Mixin (ember/new-module-imports)');
  });

  QUnit.test('models/base.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/base.js should pass ESLint\n\n');
  });

  QUnit.test('models/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/contact.js should pass ESLint\n\n15:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n55:21 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n125:14 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember.computed.alias (ember/new-module-imports)\n136:10 - Use brace expansion (ember/use-brace-expansion)\n279:17 - Use brace expansion (ember/use-brace-expansion)\n322:12 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n372:16 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('models/dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/dictionary.js should pass ESLint\n\n15:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n36:21 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('models/record.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/record.js should pass ESLint\n\n12:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n59:19 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n116:20 - Use import { getOwner } from \'@ember/application\'; instead of using Ember.getOwner (ember/new-module-imports)\n166:12 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n215:16 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('models/setting.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/setting.js should pass ESLint\n\n7:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/bs-datetimepicker/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/bs-datetimepicker/component.js should pass ESLint\n\n6:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-button-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-button-confirm/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-button-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-button-modal/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-contact-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-contact-link/component.js should pass ESLint\n\n4:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import LinkComponent from \'@ember/routing/link-component\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-contact-title/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-contact-title/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-crud-buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-crud-buttons/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n8:7 - Use closure actions, unless you need bubbling (ember/closure-actions)\n12:7 - Use closure actions, unless you need bubbling (ember/closure-actions)\n16:7 - Use closure actions, unless you need bubbling (ember/closure-actions)\n20:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('pods/components/control/md-definition/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-definition/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-errors/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-errors/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-fiscalyear/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-fiscalyear/component.js should pass ESLint\n\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-import-csv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-import-csv/component.js should pass ESLint\n\n231:11 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)');
  });

  QUnit.test('pods/components/control/md-itis/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-itis/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-json-button/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-json-button/component.js should pass ESLint\n\n14:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/control/md-json-viewer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-json-viewer/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { typeOf } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n30:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n50:5 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-modal/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/component.js should pass ESLint\n\n6:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/custom/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/custom/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/filter/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/filter/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/show/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/show/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-record-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/component.js should pass ESLint\n\n10:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n91:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/control/md-repo-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-repo-link/component.js should pass ESLint\n\n11:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n47:9 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n61:9 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-scroll-spy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-scroll-spy/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-select-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-select-table/component.js should pass ESLint\n\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-spinner/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-spinner/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/md-spotlight/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-spotlight/component.js should pass ESLint\n\n6:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n30:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n31:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/control/md-status/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-status/component.js should pass ESLint\n\n3:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n4:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-citation/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-extent/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-extent/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n4:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-importcsv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-importcsv/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-keywords/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-keywords/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n4:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-link/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n6:5 - Use import { or } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-spatial/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-spatial/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n4:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/control/subbar-thesaurus/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-thesaurus/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n4:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-boolean/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-boolean/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-codelist-multi/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-codelist-multi/component.js should pass ESLint\n\n62:17 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n92:17 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n112:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n145:32 - Use import { isArray } from \'@ember/array\'; instead of using Ember.isArray (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-codelist/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-codelist/component.js should pass ESLint\n\n117:12 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n126:17 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n144:11 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n180:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-date-range/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-date-range/component.js should pass ESLint\n\n15:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n20:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-datetime/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-datetime/component.js should pass ESLint\n\n10:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { defineProperty } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { isBlank } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n19:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)\n46:9 - Use import { debug } from \'@ember/debug\'; instead of using Ember.debug (ember/new-module-imports)\n67:40 - Use brace expansion (ember/use-brace-expansion)\n171:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/input/md-input-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-input-confirm/component.js should pass ESLint\n\n22:15 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n37:7 - Use import { once } from \'@ember/runloop\'; instead of using Ember.run.once (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-input/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-input/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { defineProperty } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { isBlank } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)\n49:9 - Use import { debug } from \'@ember/debug\'; instead of using Ember.debug (ember/new-module-imports)\n82:40 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/components/input/md-inputs/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-inputs/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n25:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n93:10 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n118:18 - Use import { observer } from \'@ember/object\'; instead of using Ember.observer (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-markdown-area/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-markdown-area/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-month/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-month/component.js should pass ESLint\n\n12:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/input/md-select-contact/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-contact/component.js should pass ESLint\n\n11:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-select-contacts/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-contacts/component.js should pass ESLint\n\n11:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-select-profile/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-profile/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n11:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('pods/components/input/md-select-thesaurus/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-thesaurus/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n18:12 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n30:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n34:16 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n40:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-select/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select/component.js should pass ESLint\n\n10:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { defineProperty } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { isBlank } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)\n60:9 - Use import { debug } from \'@ember/debug\'; instead of using Ember.debug (ember/new-module-imports)\n72:40 - Use brace expansion (ember/use-brace-expansion)\n114:14 - Use import { notEmpty } from \'@ember/object/computed\'; instead of using Ember.computed.notEmpty (ember/new-module-imports)\n115:10 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n285:14 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n317:17 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n336:17 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n358:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n360:22 - Use import { Promise } from \'rsvp\'; instead of using Ember.RSVP.Promise (ember/new-module-imports)\n371:19 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-textarea/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-textarea/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/input/md-toggle/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-toggle/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-breadcrumb/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-breadcrumb/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/layout/md-card/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-card/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-footer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-footer/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/layout/md-nav-main/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-main/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n10:7 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n13:7 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('pods/components/layout/md-nav-secondary/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-secondary/component.js should pass ESLint\n\n4:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n5:12 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n6:18 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n7:10 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n46:5 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n50:16 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n57:26 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n58:47 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n62:22 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n66:20 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n67:25 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n70:25 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n78:23 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n85:9 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n85:17 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n91:25 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n97:29 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n119:36 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n157:5 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('pods/components/layout/md-nav-sidebar/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-sidebar/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-slider/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-slider/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-wrap/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-wrap/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/md-help/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-help/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/md-models-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-models-table/component.js should pass ESLint\n\n10:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/md-models-table/components/check-all/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/components/check-all/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/components/check/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/components/check/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/themes/bootstrap3.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/themes/bootstrap3.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-title/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-title/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-translate/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-translate/component.js should pass ESLint\n\n56:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n226:11 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)');
  });

  QUnit.test('pods/components/object/md-address/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-address/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n57:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-address/md-address-block/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-address/md-address-block/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-allocation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-allocation/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-array-table/component.js should pass ESLint\n\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { typeOf } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-associated/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-associated/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n17:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-associated/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-associated/preview/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n37:23 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/components/object/md-attribute/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-attribute/component.js should pass ESLint\n\n99:15 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/components/object/md-attribute/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-attribute/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-bbox/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-bbox/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n10:11 - Use import { readOnly } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-citation-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation-array/component.js should pass ESLint\n\n4:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n69:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-citation/preview/body/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/preview/body/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-citation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/preview/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-constraint/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-constraint/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n11:5 - Use import { equal } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n19:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n83:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/object/md-date-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-date-array/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-date/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-date/component.js should pass ESLint\n\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-distribution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distribution/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-distributor/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distributor/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-distributor/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distributor/preview/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-documentation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-documentation/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-documentation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-documentation/preview/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-domain/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domain/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-domainitem/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domainitem/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-domainitem/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domainitem/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-entity/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-entity/component.js should pass ESLint\n\n167:18 - Use brace expansion (ember/use-brace-expansion)\n181:15 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/components/object/md-funding/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-funding/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-funding/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-funding/preview/component.js should pass ESLint\n\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-graphic-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-graphic-array/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n77:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-identifier-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-identifier-array/component.js should pass ESLint\n\n7:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n73:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-identifier-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-identifier-object-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-identifier/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-identifier/component.js should pass ESLint\n\n14:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-keyword-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-keyword-citation/component.js should pass ESLint\n\n15:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-keyword-list/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-keyword-list/component.js should pass ESLint\n\n8:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n9:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-lineage/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-lineage/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n52:22 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n59:19 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-lineage/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-lineage/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-locale-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-locale-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-locale/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-locale/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-maintenance/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-maintenance/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { setProperties } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-medium/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-medium/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n12:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-object-table/component.js should pass ESLint\n\n6:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { typeOf } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)\n16:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n391:9 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-objectroute-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-objectroute-table/component.js should pass ESLint\n\n5:3 - Use import { typeOf } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isBlank } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)\n51:9 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-online-resource-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-online-resource-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-online-resource/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-online-resource/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-party-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-party-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-party/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-party/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-phone-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-phone-array/component.js should pass ESLint\n\n8:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n26:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-process-step/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-process-step/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n59:19 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-repository-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-repository-array/component.js should pass ESLint\n\n3:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n4:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:23 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-resource-type-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-resource-type-array/component.js should pass ESLint\n\n8:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n20:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-simple-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-simple-array-table/component.js should pass ESLint\n\n5:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-source/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-source/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-source/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-source/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-spatial-extent/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-spatial-extent/component.js should pass ESLint\n\n5:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { observer } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n10:5 - Use import { or } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { setProperties } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n25:13 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/components/object/md-spatial-info/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-spatial-info/component.js should pass ESLint\n\n4:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-spatial-resolution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-spatial-resolution/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n12:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n13:5 - Use import { or } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n19:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n20:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n121:20 - Use brace expansion (ember/use-brace-expansion)\n134:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/object/md-srs/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-srs/component.js should pass ESLint\n\n8:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:5 - Use import { alias } from \'@ember/object/computed\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/components/object/md-taxonomy/classification/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/classification/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/classification/taxon/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/classification/taxon/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/system/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/system/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/system/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/system/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/voucher/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/voucher/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-time-period/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-time-period/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n98:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/components/object/md-transfer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-transfer/component.js should pass ESLint\n\n9:3 - Use import Component from \'@ember/component\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:5 - Use import { once } from \'@ember/runloop\'; instead of using Ember destructuring (ember/new-module-imports)\n101:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n127:18 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('pods/components/tooltip-on-component/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/tooltip-on-component/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/tooltip-on-element/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/tooltip-on-element/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/id/route.js should pass ESLint\n\n8:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n134:9 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/contact/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/contact/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/contact/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/contact/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/show/edit/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/contact/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contacts/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contacts/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dashboard/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dashboard/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionaries/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionaries/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/id/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n32:25 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n36:25 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n40:28 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/citation/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/citation/index/route.js should pass ESLint\n\n7:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/citation/route.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/item/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/item/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/route.js should pass ESLint\n\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/attribute/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/attribute/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/citation/route.js should pass ESLint\n\n7:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/import/route.js should pass ESLint\n\n44:5 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/dictionary/show/edit/entity/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/route.js should pass ESLint\n\n12:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/index/route.js should pass ESLint\n\n4:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/dictionary/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { copy } from \'@ember/object/internals\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/error/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/error/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/export/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/export/route.js should pass ESLint\n\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { defineProperty } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n16:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n32:52 - Use brace expansion (ember/use-brace-expansion)');
  });

  QUnit.test('pods/help/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/help/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/import/route.js should pass ESLint\n\n16:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n18:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n20:5 - Use import { Promise } from \'rsvp\'; instead of using Ember destructuring (ember/new-module-imports)\n23:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n24:3 - Use import { assign } from \'@ember/polyfills\'; instead of using Ember destructuring (ember/new-module-imports)\n25:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n26:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)\n27:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n28:3 - Use import { merge } from \'@ember/polyfills\'; instead of using Ember destructuring (ember/new-module-imports)\n29:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n70:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n89:7 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n391:11 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)');
  });

  QUnit.test('pods/not-found/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/not-found/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n5:12 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n10:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/publish/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/publish/index/route.js should pass ESLint\n\n2:9 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/publish/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/publish/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/id/route.js should pass ESLint\n\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n4:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/show/edit/associated/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/associated/resource/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/resource/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/show/edit/associated/resource/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/resource/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n48:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/associated/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/constraint/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/constraint/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/constraint/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/constraint/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/coverages/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/coverages/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/dictionary/route.js should pass ESLint\n\n13:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n63:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/show/edit/distribution/distributor/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/distributor/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/distribution/distributor/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/distributor/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n49:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/distribution/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/distribution/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/documents/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/citation/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/documents/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/citation/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n50:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/documents/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/documents/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/extent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/extent/route.js should pass ESLint\n\n4:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)\n36:16 - Don\'t use Ember\'s function prototype extensions (ember/no-function-prototype-extensions)');
  });

  QUnit.test('pods/record/show/edit/extent/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/extent/spatial/route.js should pass ESLint\n\n4:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n12:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n60:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)\n92:7 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n93:18 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n94:23 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n98:7 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n175:9 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/funding/allocation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/allocation/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n52:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/funding/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/funding/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/grid/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/grid/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/keywords/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/keywords/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n12:3 - Use import { copy } from \'@ember/object/internals\'; instead of using Ember destructuring (ember/new-module-imports)\n14:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)\n63:16 - Don\'t use Ember\'s function prototype extensions (ember/no-function-prototype-extensions)');
  });

  QUnit.test('pods/record/show/edit/keywords/thesaurus/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/keywords/thesaurus/route.js should pass ESLint\n\n4:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n11:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n12:12 - Use import { inject } from \'@ember/service\'; instead of using Ember.inject.service (ember/new-module-imports)\n27:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)\n38:12 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n96:12 - Use import { isArray } from \'@ember/array\'; instead of using Ember.isArray (ember/new-module-imports)\n129:11 - Use import { set } from \'@ember/object\'; instead of using Ember.set (ember/new-module-imports)\n132:11 - Use import { set } from \'@ember/object\'; instead of using Ember.set (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/index/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n40:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n42:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n47:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/source/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/source/route.js should pass ESLint\n\n39:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/citation/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n47:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n51:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/lineage/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/main/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/identifier/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n39:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/main/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/main/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/main/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/index/route.js should pass ESLint\n\n7:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/main/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/identifier/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n39:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/route.js should pass ESLint\n\n4:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n39:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/identifier/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/index/route.js should pass ESLint\n\n8:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n10:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n11:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/identifier/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isEmpty } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n39:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/index/route.js should pass ESLint\n\n5:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { isNone } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n15:7 - Use import { get } from \'@ember/object\'; instead of using Ember.get (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/metadata/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/route.js should pass ESLint\n\n12:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n13:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/show/edit/spatial/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/index/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/itis/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/itis/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/system/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/system/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/system/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/system/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/route.js should pass ESLint\n\n4:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { copy } from \'@ember/object/internals\'; instead of using Ember destructuring (ember/new-module-imports)\n8:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n9:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/record/show/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/translate/route.js should pass ESLint\n\n3:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('pods/records/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/records/route.js should pass ESLint\n\n3:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n5:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n16:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('pods/save/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/save/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('pods/settings/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/settings/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/translate/route.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint\n\n4:16 - Use import EmberRouter from \'@ember/routing/router\'; instead of using Ember.Router (ember/new-module-imports)');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass ESLint\n\n4:3 - Use import $ from \'jquery\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import Route from \'@ember/routing/route\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n8:3 - Use import { guidFor } from \'@ember/object/internals\'; instead of using Ember destructuring (ember/new-module-imports)\n9:3 - Use import RSVP from \'rsvp\'; instead of using Ember destructuring (ember/new-module-imports)\n12:5 - Use import { inject as service } from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('services/cleaner.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/cleaner.js should pass ESLint\n\n3:3 - Use import { typeOf } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n4:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import { isBlank } from \'@ember/utils\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { assign } from \'@ember/polyfills\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('services/codelist.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/codelist.js should pass ESLint\n\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('services/contacts.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/contacts.js should pass ESLint\n\n4:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { computed } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n55:18 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n65:23 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('services/icon.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/icon.js should pass ESLint\n\n3:16 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)');
  });

  QUnit.test('services/itis.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/itis.js should pass ESLint\n\n');
  });

  QUnit.test('services/jsonvalidator.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/jsonvalidator.js should pass ESLint\n\n373:16 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)');
  });

  QUnit.test('services/keyword.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/keyword.js should pass ESLint\n\n6:15 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n7:14 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)\n79:16 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)');
  });

  QUnit.test('services/mdjson.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/mdjson.js should pass ESLint\n\n29:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n31:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n32:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n33:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n34:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n35:3 - Use import EmberObject from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('services/patch.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/patch.js should pass ESLint\n\n');
  });

  QUnit.test('services/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/profile.js should pass ESLint\n\n');
  });

  QUnit.test('services/publish.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/publish.js should pass ESLint\n\n4:3 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)');
  });

  QUnit.test('services/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/settings.js should pass ESLint\n\n14:3 - Use import Service from \'@ember/service\'; instead of using Ember destructuring (ember/new-module-imports)\n15:3 - Use import { getWithDefault } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n17:3 - Use import { set } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n65:23 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('services/slider.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/slider.js should pass ESLint\n\n');
  });

  QUnit.test('services/spotlight.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/spotlight.js should pass ESLint\n\n');
  });

  QUnit.test('transforms/json.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'transforms/json.js should pass ESLint\n\n5:10 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n5:18 - Use import { A } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n19:12 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });

  QUnit.test('validators/array-required.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'validators/array-required.js should pass ESLint\n\n5:3 - Use import { assert } from \'@ember/debug\'; instead of using Ember destructuring (ember/new-module-imports)\n6:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)\n7:3 - Use import { isArray } from \'@ember/array\'; instead of using Ember destructuring (ember/new-module-imports)\n12:8 - Use import { isArray } from \'@ember/array\'; instead of using Ember.isArray (ember/new-module-imports)');
  });

  QUnit.test('validators/array-valid.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'validators/array-valid.js should pass ESLint\n\n5:3 - Use import { get } from \'@ember/object\'; instead of using Ember destructuring (ember/new-module-imports)');
  });
});
define("mdeditor/tests/helpers/create-contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createContact;
  function createContact(total) {

    const contacts = [];

    for (let i = 0; i < total; i++) {

      const contact = Ember.Object.create({

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
define("mdeditor/tests/helpers/create-dictionary", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createDictionary;
  function createDictionary(total) {

    const dictionaries = [];

    for (let i = 0; i < total; i++) {

      const dictionary = Ember.Object.create({

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
define('mdeditor/tests/helpers/create-map-layer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createMapLayer;
  function createMapLayer(total) {

    const layers = {
      type: 'FeatureCollection',
      features: []
    };

    for (let i = 1; i < total + 1; i++) {

      const layer = Ember.Object.create({
        type: 'Feature',
        id: i,
        geometry: {
          type: 'Point',
          coordinates: [-104.99404, 39.75621 + i]
        },
        properties: {
          name: `Feature ` + i
        }
      });

      layers.features.push(layer);
    }

    return layers;
  }
});
define("mdeditor/tests/helpers/create-record", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createRecord;
  function createRecord(total) {

    const records = [];

    for (let i = 0; i < total; i++) {

      const record = Ember.Object.create({

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
define('mdeditor/tests/helpers/data-transfer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var c = Ember.Object.extend({
    getData: function getData() {
      return this.get('payload');
    },

    setData: function setData(dataType, payload) {
      this.set("data", { dataType: dataType, payload: payload });
    }
  });

  c.reopenClass({
    makeMockEvent: function makeMockEvent(payload) {
      var transfer = this.create({ payload: payload });
      var res = { dataTransfer: transfer };
      res.originalEvent = res;
      res.originalEvent.preventDefault = function () {
        console.log('prevent default');
      };
      res.originalEvent.stopPropagation = function () {
        console.log('stop propagation');
      };
      return res;
    },

    createDomEvent: function createDomEvent(type) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function setData(type, val) {
          this.data[type] = val;
        },
        getData: function getData(type) {
          return this.data[type];
        }
      };
      return event;
    }
  });

  exports.default = c;
});
define('mdeditor/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    var store = application.__container__.lookup('service:store');

    if (store) {
      Ember.run(function () {
        store.unloadAll();
        application.destroy();
      });
    } else {
      Ember.run(application, 'destroy');
    }
  }
});
define('mdeditor/tests/helpers/drag-drop', ['exports', 'ember-native-dom-helpers', 'mdeditor/tests/helpers/mock-event'], function (exports, _emberNativeDomHelpers, _mockEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.drag = drag;


  async function dragOver(dropSelector, moves) {
    moves = moves || [[{ clientX: 1, clientY: 1 }, dropSelector]];
    return moves.forEach(async ([position, selector]) => {
      let event = new _mockEvent.default(position);
      await (0, _emberNativeDomHelpers.triggerEvent)(selector || dropSelector, 'dragover', event);
    });
  }

  async function drop(dragSelector, dragEvent, options) {
    let dropSelector = options.drop,
        dropEndOptions = options.dropEndOptions,
        dragOverMoves = options.dragOverMoves;


    let dropElement = await (0, _emberNativeDomHelpers.find)(dropSelector);
    if (!dropElement) {
      throw `There are no drop targets by the given selector: '${dropSelector}'`;
    }

    await dragOver(dropSelector, dragOverMoves);

    if (options.beforeDrop) {
      await options.beforeDrop.call();
    }

    let event = new _mockEvent.default().useDataTransferData(dragEvent);
    await (0, _emberNativeDomHelpers.triggerEvent)(dropSelector, 'drop', event);

    return await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragend', dropEndOptions);
  }

  async function drag(dragSelector, options = {}) {
    let dragEvent = new _mockEvent.default(options.dragStartOptions);

    await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'mouseover');

    await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragstart', dragEvent);

    if (options.afterDrag) {
      await options.afterDrag.call();
    }

    if (options.drop) {
      await drop(dragSelector, dragEvent, options);
    }
  }
});
define('mdeditor/tests/helpers/ember-cli-file-picker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function createFile(content = ['test'], options = {}) {
    const name = options.name,
          type = options.type,
          lastModifiedDate = options.lastModifiedDate;


    const file = new Blob(content, { type: type ? type : 'text/plain' });
    file.name = name ? name : 'test.txt';

    return file;
  } /* global Blob, jQuery */

  const uploadFileHelper = function uploadFileHelper(content, options) {
    const file = createFile(content, options);

    const event = jQuery.Event('change');
    event.target = {
      files: [file]
    };

    jQuery('.file-picker__input').trigger(event);
  };

  const uploadFile = Ember.Test.registerAsyncHelper('uploadFile', function (app, content, options) {
    uploadFileHelper(content, options);

    return wait();
  });

  exports.uploadFile = uploadFile;
  exports.uploadFileHelper = uploadFileHelper;
});
define('mdeditor/tests/helpers/ember-drag-drop', ['exports', 'mdeditor/tests/helpers/data-transfer'], function (exports, _dataTransfer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.drag = drag;


  function drop($dragHandle, dropCssPath, dragEvent) {
    let $dropTarget = Ember.$(dropCssPath);

    if ($dropTarget.length === 0) {
      throw `There are no drop targets by the given selector: '${dropCssPath}'`;
    }

    Ember.run(() => {
      triggerEvent($dropTarget, 'dragover', _dataTransfer.default.makeMockEvent());
    });

    Ember.run(() => {
      triggerEvent($dropTarget, 'drop', _dataTransfer.default.makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });

    Ember.run(() => {
      triggerEvent($dragHandle, 'dragend', _dataTransfer.default.makeMockEvent());
    });
  } /* global triggerEvent , andThen */
  function drag(cssPath, options = {}) {
    let dragEvent = _dataTransfer.default.makeMockEvent();
    let $dragHandle = Ember.$(cssPath);

    Ember.run(() => {
      triggerEvent($dragHandle, 'mouseover');
    });

    Ember.run(() => {
      triggerEvent($dragHandle, 'dragstart', dragEvent);
    });

    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });

    andThen(function () {
      if (options.drop) {
        drop($dragHandle, options.drop, dragEvent);
      }
    });
  }
});
define('mdeditor/tests/helpers/ember-pollboy', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stubPollboy = stubPollboy;
  const Service = Ember.Service;
  const PollerMock = exports.PollerMock = Ember.Object.extend({
    cancel() {},
    pause() {},
    poll() {},
    resume() {},
    schedule() {},
    start() {},
    stop() {}
  });

  const serviceMock = exports.serviceMock = Service.extend({
    add() {
      return PollerMock.create();
    },
    remove() {}
  });

  function stubPollboy(application) {
    application.register('service:mockPollboy', serviceMock);
    application.inject('route', 'pollboy', 'service:mockPollboy');
  }

  exports.default = {
    PollerMock,
    serviceMock,
    stubPollboy
  };
});
define('mdeditor/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, { until: '1.11.0', id: `ember-power-select-test-support-${name}` }));

      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('mdeditor/tests/helpers/ember-tooltips', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.findTooltip = findTooltip;
  exports.findTooltipTarget = findTooltipTarget;
  exports.triggerTooltipTargetEvent = triggerTooltipTargetEvent;
  exports.assertTooltipNotRendered = assertTooltipNotRendered;
  exports.assertTooltipRendered = assertTooltipRendered;
  exports.assertTooltipNotVisible = assertTooltipNotVisible;
  exports.assertTooltipVisible = assertTooltipVisible;
  exports.assertTooltipSide = assertTooltipSide;
  exports.assertTooltipSpacing = assertTooltipSpacing;
  exports.assertTooltipContent = assertTooltipContent;
  const $ = Ember.$,
        run = Ember.run;


  const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';
  const tooltipOrPopoverTargetSelector = '.ember-tooltip-or-popover-target';

  /**
  @method getPositionDifferences
  @param String side The side the tooltip should be on relative to the target
  
  Given a side, which represents the side of the target that
  the tooltip should render, this method identifies whether
  the tooltip or the target should be further away from the
  top left of the window.
  
  For example, if the side is 'top' then the target should
  be further away from the top left of the window than the
  tooltip because the tooltip should render above the target.
  
  If the side is 'right' then the tooltip should be further
  away from the top left of the window than the target
  because the tooltip should render to the right of the
  target.
  
  This method then returns an object with two numbers:
  
  - `expectedGreaterDistance` (expected greater number given the side)
  - `expectedLesserDistance` (expected lesser number given the side)
  
  These numbers can be used for calculations like determining
  whether a tooltip is on the correct side of the target or
  determining whether a tooltip is the correct distance from
  the target on the given side.
  */

  function getPositionDifferences(options = {}) {
    var _getTooltipAndTargetP = getTooltipAndTargetPosition(options);

    const targetPosition = _getTooltipAndTargetP.targetPosition,
          tooltipPosition = _getTooltipAndTargetP.tooltipPosition;
    const side = options.side;


    const distanceToTarget = targetPosition[side];
    const distanceToTooltip = tooltipPosition[getOppositeSide(side)];
    const shouldTooltipBeCloserThanTarget = side === 'top' || side === 'left';
    const expectedGreaterDistance = shouldTooltipBeCloserThanTarget ? distanceToTarget : distanceToTooltip;
    const expectedLesserDistance = shouldTooltipBeCloserThanTarget ? distanceToTooltip : distanceToTarget;

    return { expectedGreaterDistance, expectedLesserDistance };
  }

  function getTooltipFromBody(selector = tooltipOrPopoverSelector) {
    // we have to .find() tooltips from $body because sometimes
    // tooltips and popovers are rendered as children of <body>
    // instead of children of the $targetElement

    const $body = $(document.body);
    const $tooltip = $body.find(selector);

    if (!$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
      throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
    } else if ($tooltip.length === 0) {
      throw Error('getTooltipFromBody(): No tooltips were found.');
    } else if ($tooltip.length > 1) {
      throw Error('getTooltipFromBody(): Multiple tooltips were found. Please provide an {option.selector = ".specific-tooltip-class"}');
    }

    return $tooltip;
  }

  function getTooltipTargetFromBody(selector = tooltipOrPopoverTargetSelector) {
    const $body = $(document.body);
    const $tooltipTarget = $body.find(selector);

    if ($tooltipTarget.length === 0) {
      throw Error('getTooltipTargetFromBody(): No tooltip targets were found.');
    } else if ($tooltipTarget.length > 1) {
      throw Error('getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}');
    }

    return $tooltipTarget;
  }

  function getOppositeSide(side) {
    switch (side) {
      case 'top':
        return 'bottom';break;
      case 'right':
        return 'left';break;
      case 'bottom':
        return 'top';break;
      case 'left':
        return 'right';break;
    }
  }

  function validateSide(side, testHelper = 'assertTooltipSide') {
    const sideIsValid = side === 'top' || side === 'right' || side === 'bottom' || side === 'left';

    /* We make sure the side being tested is valid. We
    use Ember.assert because assert is passed in from QUnit */

    if (!sideIsValid) {
      Ember.assert(`You must pass side like ${testHelper}(assert, { side: 'top' }); Valid options for side are top, right, bottom, and left.`);
    }
  }

  function getTooltipAndTargetPosition(options = {}) {
    const $target = getTooltipTargetFromBody(options.targetSelector || tooltipOrPopoverTargetSelector);
    const targetPosition = $target[0].getBoundingClientRect();
    const $tooltip = getTooltipFromBody(options.selector || tooltipOrPopoverSelector);
    const tooltipPosition = $tooltip[0].getBoundingClientRect();

    return {
      targetPosition,
      tooltipPosition
    };
  }

  /* TODO(Duncan): Document */

  function findTooltip(selector = tooltipOrPopoverSelector) {
    return getTooltipFromBody(selector);
  }

  /* TODO(Duncan): Document */

  function findTooltipTarget(selector = tooltipOrPopoverTargetSelector) {
    return getTooltipTargetFromBody(selector);
  }

  /* TODO(Duncan):
  
  Update triggerTooltipTargetEvent() to use getTooltipTargetFromBody
  and move side into the options hash */

  function triggerTooltipTargetEvent($element, type, options = {}) {

    // TODO why do we allow focusin? why not just focus?
    const approvedEventTypes = ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur'];
    if (approvedEventTypes.indexOf(type) == -1) {
      throw Error(`only ${approvedEventTypes.join(', ')} will trigger a tooltip event. You used ${type}.`);
    }

    let wasEventTriggered = false;

    if (options.selector) {
      $element = getTooltipTargetFromBody(options.selector);
    }

    // we need to need to wrap any code with asynchronous side-effects in a run
    // $tooltipTarget.trigger('someEvent') has asynchronous side-effects
    run(() => {
      // if the $tooltip is hidden then the user can't interact with it
      if ($element.attr('aria-hidden') === 'true') {
        return;
      }
      if (type === 'focus' || type === 'blur') {

        // we don't know why but this is necessary when type is 'focus' or 'blur'
        $element[0].dispatchEvent(new window.Event(type));
      } else {
        $element.trigger(type);
      }

      wasEventTriggered = true;
    });

    return wasEventTriggered;
  }

  function assertTooltipNotRendered(assert, options = {}) {
    const $body = $(document.body);
    const $tooltip = $body.find(options.selector || tooltipOrPopoverSelector);

    assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
  }

  function assertTooltipRendered(assert, options = {}) {
    const $tooltip = getTooltipFromBody(options.selector);

    assert.equal($tooltip.length, 1, 'assertTooltipRendered(): the ember-tooltip should be rendered');
  }

  function assertTooltipNotVisible(assert, options = {}) {
    const $tooltip = getTooltipFromBody(options.selector);
    const isTooltipNotVisible = $tooltip.attr('aria-hidden') == 'true';
    const isTooltipTetherDisabled = $tooltip.attr('data-tether-enabled') == 'false';

    assert.ok(isTooltipNotVisible && isTooltipTetherDisabled, `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible and the tether should be disabled:
        isTooltipNotVisible -> ${isTooltipNotVisible} ;
        isTooltipTetherDisabled -> ${isTooltipTetherDisabled}`);
  }

  function assertTooltipVisible(assert, options = {}) {
    const $tooltip = getTooltipFromBody(options.selector);
    const isTooltipVisible = $tooltip.attr('aria-hidden') == 'false';
    const isTooltipTetherEnabled = $tooltip.attr('data-tether-enabled') == 'true';

    assert.ok(isTooltipVisible && isTooltipTetherEnabled, `assertTooltipVisible(): the ember-tooltip should be visible and the tether should be enabled:
        isTooltipVisible -> ${isTooltipVisible} ;
        isTooltipTetherEnabled -> ${isTooltipTetherEnabled}`);
  }

  function assertTooltipSide(assert, options = {}) {
    const side = options.side;


    validateSide(side);

    var _getPositionDifferenc = getPositionDifferences(options);

    const expectedGreaterDistance = _getPositionDifferenc.expectedGreaterDistance,
          expectedLesserDistance = _getPositionDifferenc.expectedLesserDistance;


    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    assert.ok(expectedGreaterDistance > expectedLesserDistance, `Tooltip should be on the ${side} side of the target`);
  }

  function assertTooltipSpacing(assert, options) {
    const side = options.side,
          spacing = options.spacing;


    validateSide(side, 'assertTooltipSpacing');

    if (typeof spacing !== 'number') {
      Ember.assert(`You must pass spacing as a number like assertTooltipSpacing(assert, { side: 'top', spacing: 10 });`);
    }

    var _getPositionDifferenc2 = getPositionDifferences(options);

    const expectedGreaterDistance = _getPositionDifferenc2.expectedGreaterDistance,
          expectedLesserDistance = _getPositionDifferenc2.expectedLesserDistance;

    const actualSpacing = Math.round(expectedGreaterDistance - expectedLesserDistance);

    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    const isSideCorrect = expectedGreaterDistance > expectedLesserDistance;
    const isSpacingCorrect = actualSpacing === spacing;

    assert.ok(isSideCorrect && isSpacingCorrect, `assertTooltipSpacing(): the tooltip should be in the correct position:
        - Tooltip should be on the ${side} side of the target: ${isSideCorrect}.
        - On the ${side} side of the target, the tooltip should be ${spacing}px from the target but it was ${actualSpacing}px`);
  }

  function assertTooltipContent(assert, options = {}) {
    const contentString = options.contentString;


    if (Ember.isNone(contentString)) {
      Ember.assert('You must specify a contentString property in the options parameter');
    }

    const $tooltip = getTooltipFromBody(options.selector);
    const tooltipContent = $tooltip.text().trim();

    assert.equal(tooltipContent, contentString, `Content of tooltip (${tooltipContent}) matched expected (${contentString})`);
  }
});
define('mdeditor/tests/helpers/flash-message', ['ember-cli-flash/flash/object'], function (_object) {
  'use strict';

  const K = Ember.K;


  _object.default.reopen({ init: K });
});
define('mdeditor/tests/helpers/mock-event', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createDomEvent = createDomEvent;
  class DataTransfer {
    constructor() {
      this.data = {};
    }

    setData(type, value) {
      this.data[type] = value;
      return this;
    }

    getData(type = "Text") {
      return this.data[type];
    }

    setDragImage() {}
  }

  class MockEvent {
    constructor(options = {}) {
      this.dataTransfer = new DataTransfer();
      this.dataTransfer.setData('Text', options.dataTransferData);
      this.originalEvent = this;
      this.setProperties(options);
    }

    useDataTransferData(otherEvent) {
      this.dataTransfer.setData('Text', otherEvent.dataTransfer.getData());
      return this;
    }

    setProperties(props) {
      for (let prop in props) {
        this[prop] = props[prop];
      }
      return this;
    }

    preventDefault() {}

    stopPropagation() {}
  }

  exports.default = MockEvent;
  function createDomEvent(type) {
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, null);
    event.dataTransfer = new DataTransfer();
    return event;
  }
});
define('mdeditor/tests/helpers/modal-asserts', ['exports', 'qunit'], function (exports, _qunit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = registerAssertHelpers;
  function registerAssertHelpers() {
    const assert = _qunit.default.assert;

    const overlaySelector = '.md-modal-overlay';
    const dialogSelector = '.ember-modal-dialog';

    assert.isPresentOnce = function (selector, message) {
      message = message || `${selector} is present in DOM once`;
      return this.equal(Ember.$(selector).length, 1, message);
    };

    assert.isAbsent = function (selector, message) {
      message = message || `${selector} is absent from DOM`;
      return this.equal(Ember.$(selector).length, 0, message);
    };

    assert.isVisible = function (selector, message) {
      message = message || `${selector} is not visible`;
      return this.ok(Ember.$(selector).is(':visible'), message);
    };

    assert.dialogOpensAndCloses = function (options /*, message*/) {
      //message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
      const dialogContent = options.dialogText ? [dialogSelector, `:contains(${options.dialogText})`].join('') : dialogSelector;
      const self = this;
      return click(options.openSelector, options.context).then(function () {
        if (options.hasOverlay) {
          self.isPresentOnce(overlaySelector);
        }
        self.isPresentOnce(dialogContent);
        if (options.whileOpen) {
          options.whileOpen();
        }
        return click(options.closeSelector, options.context).then(function () {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      });
    };
  }
});
define('mdeditor/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'mdeditor/tests/helpers/start-app', 'mdeditor/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name, options = {}) {
    (0, _qunit.module)(name, {
      beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach() {
        let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(() => (0, _destroyApp.default)(this.application));
      }
    });
  };
});
define('mdeditor/tests/helpers/resolver', ['exports', 'mdeditor/resolver', 'mdeditor/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('mdeditor/tests/helpers/start-app', ['exports', 'mdeditor/app', 'mdeditor/config/environment', 'mdeditor/tests/helpers/modal-asserts', 'mdeditor/tests/helpers/ember-power-select'], function (exports, _app, _environment, _modalAsserts, _emberPowerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;


  (0, _emberPowerSelect.default)();

  function startApp(attrs) {
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(() => {
      let application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      (0, _modalAsserts.default)();
      return application;
    });
  }
});
define('mdeditor/tests/integration/components/feature-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('feature-form', 'Integration | Component | feature form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('model', {
      id: 'foo',
      properties: {
        name: 'bar',
        description: 'foobar'
      }
    });

    this.render(Ember.HTMLBars.template({
      "id": "qodNgu2S",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"feature-form\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "boWLAnXl",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"feature-form\",null,[[\"model\"],[[20,[\"model\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|');
  });
});
define('mdeditor/tests/integration/components/feature-group-test', ['ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_emberQunit, _createMapLayer) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('feature-group', 'Integration | Component | feature group', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('layers', (0, _createMapLayer.default)(2));

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7kCC356F",
      "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"        \"],[1,[25,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[20,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[20,[\"layers\"]]],null,{\"statements\":[[0,\"          \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"draw\"],[[19,1,[]],true]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n      \"],[1,[18,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '+- Terrain Extents3000 km2000 miLeaflet');
  });
});
define('mdeditor/tests/integration/components/feature-table-test', ['ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_emberQunit, _createMapLayer) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('feature-table', 'Integration | Component | feature table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('data', (0, _createMapLayer.default)(2));
    this.set('showForm', function () {
      return false;
    });

    this.render(Ember.HTMLBars.template({
      "id": "AnIn4SVs",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"feature-table\",null,[[\"data\",\"showForm\"],[[20,[\"data\",\"features\"]],[20,[\"showForm\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal($(this.$().html().replace('&nbsp;', '')).text().trim().replace(/[ \n]+/g, '|'), 'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50');
  });
});
define('mdeditor/tests/integration/components/geojson-layer-test', ['ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_emberQunit, _createMapLayer) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('geojson-layer', 'Integration | Component | geojson layer', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('layers', (0, _createMapLayer.default)(2));

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "/hQfdPCr",
      "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"        \"],[1,[25,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[20,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[20,[\"layers\"]]],null,{\"statements\":[[0,\"          \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"draw\",\"editLayers\"],[[19,1,[]],true,[20,[\"layers\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n      \"],[1,[18,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '+- Terrain Extents3000 km2000 miLeaflet');
  });
});
define('mdeditor/tests/integration/components/leaflet-draw-test', ['ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_emberQunit, _createMapLayer) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('leaflet-draw', 'Integration | Component | leaflet draw', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('layers', (0, _createMapLayer.default)(2));

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "bB8jFq/g",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"        \"],[1,[25,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[20,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[1,[18,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '+- Terrain3000 km2000 miLeaflet');
  });
});
define('mdeditor/tests/integration/components/leaflet-table-row-actions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('leaflet-table-row-actions', 'Integration | Component | leaflet table row actions', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "jcOg9pT3",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"leaflet-table-row-actions\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "aJJ3hgWJ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"leaflet-table-row-actions\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/leaflet-table-row-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('leaflet-table-row', 'Integration | Component | leaflet table row', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "h8LSm2i6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"leaflet-table-row\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "PWjO9SKc",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"leaflet-table-row\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/leaflet-table-test', ['ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_emberQunit, _createMapLayer) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('leaflet-table', 'Integration | Component | leaflet table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('layers', (0, _createMapLayer.default)(2));

    this.render(Ember.HTMLBars.template({
      "id": "RHH4eUZa",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"leaflet-table\",null,[[\"layers\",\"resizeDebouncedEventsEnabled\"],[[20,[\"layers\",\"features\"]],true]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal($(this.$().html().replace('&nbsp;', '|')).text().trim().replace(/[ \n]+/g, '|').replace(/Extents.+Leaflet/g, 'Extents|Leaflet'), 'Drop|Here!|+-|Terrain|Extents|Leaflet|||Map|tiles|by|Stamen|Design,|under|CC|BY|3.0.|Data|by|OpenStreetMap,|under|CC|BY|SA.|Feature|Properties|ID|Name|Description|||1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50');
  });
});
define('mdeditor/tests/integration/components/sb-publisher-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sb-publisher', 'Integration | Component | sb publisher', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "VfdA2WJz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"sb-publisher\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "fhd9Y8Sk",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"sb-publisher\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/sb-settings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sb-settings', 'Integration | Component | sb settings', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "q1qnKDie",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"sb-settings\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "XUufkKmz",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"sb-settings\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/sb-tree-label-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sb-tree-label', 'Integration | Component | sb tree label', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7hhKuYCL",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"sb-tree-label\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7OQOObCY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"sb-tree-label\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/sb-tree-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sb-tree', 'Integration | Component | sb tree', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "d5iVKFXO",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"sb-tree\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "eJkMBsgl",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"sb-tree\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/components/tree-branch-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('', 'Integration | Component | tree branch', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', {
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    });

    this.set('selected', [{
      identifier: 'bar1'
    }]);

    this.set('path', [{ label: 'fiz', identifier: 1 }, { label: 'faz', identifier: 10 }, { label: 'foz', identifier: 100 }]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });

    this.render(Ember.HTMLBars.template({
      "id": "Cbig8K8S",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[20,[\"model\"]],[20,[\"select\"]],[20,[\"selected\"]],3,[20,[\"path\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.expect(3);

    assert.equal(this.$().text().trim(), 'foo1label');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qyPjRKDF",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[20,[\"model\"]],[20,[\"select\"]],[20,[\"selected\"]],3,[20,[\"path\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('.tree-leaf .toggle-icon').click();

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo1label|foo2label|');

    assert.equal(this.$('.tree-leaf:last .tree-indent').length, 3, 'proper indentation');
  });
});
define('mdeditor/tests/integration/components/tree-label-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tree-label', 'Integration | Component | tree label', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    });
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "bF1V4Gaz",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"tree-label\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'foo1label');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "io1xjMyR",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-label\",null,[[\"model\"],[[20,[\"model\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'foo1label');
  });
});
define('mdeditor/tests/integration/components/tree-leaf-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('', 'Integration | Component | tree leaf', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', {
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    });

    this.set('selected', [{
      identifier: 'foo1'
    }]);

    this.set('nodePath', [{ label: 'fiz', identifier: 1 }, { label: 'faz', identifier: 10 }, { label: 'foz', identifier: 100 }]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });

    this.render(Ember.HTMLBars.template({
      "id": "ZJ1FfM4d",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\",\"nodeDepth\",\"nodePath\"],[[20,[\"model\"]],true,[20,[\"select\"]],[20,[\"selected\"]],3,[20,[\"nodePath\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('.toggle-icon').click();

    assert.equal(this.$().text().trim(), 'foo1label');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xzA0dLtv",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\"],[[20,[\"model\"]],false,[20,[\"select\"]],[20,[\"selected\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'foo1label');

    assert.equal(this.$('.tree-indent').length, 0, 'not in tree');
  });
});
define('mdeditor/tests/integration/components/tree-search-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tree-search', 'Integration | Component | tree search', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('model', [{
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    }, {
      broader: 'barfoo0',
      children: [],
      label: 'barfoo1label',
      uuid: 'barfoo1'
    }]);

    this.set('selected', [{
      identifier: 'bar1'
    }]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });

    this.set('searchString', 'foo');
    this.render(Ember.HTMLBars.template({
      "id": "aCvtvy4K",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"tree-search\",null,[[\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"],[[20,[\"model\"]],[20,[\"selected\"]],[20,[\"select\"]],[20,[\"searchString\"]],[20,[\"exactMatch\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Search|Tree:|Exact|Match|3|matches|found.|>|barfoo1label|foo1label|foo1label|>|foo2label|');

    this.set('exactMatch', true);

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo1label|>|foo2label|', 'exact match');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "vL74I/Rf",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-search\",null,[[\"model\",\"selected\",\"select\"],[[20,[\"model\"]],[20,[\"selected\"]],[20,[\"select\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Search|Tree:|Exact|Match|template|block|text|');
  });
});
define('mdeditor/tests/integration/components/tree-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tree-view', 'Integration | Component | tree view', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and expands', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', [{
      broader: 'foo0',
      children: [{
        broader: 'foo2',
        children: [],
        label: 'foo2label',
        uuid: 'foo2'
      }],
      label: 'foo1label',
      uuid: 'foo1'
    }, {
      broader: 'bar0',
      children: [],
      label: 'bar1label',
      uuid: 'bar1'
    }]);

    this.set('selected', [{
      identifier: 'bar1'
    }]);

    this.set('select', function () {
      assert.ok(true, 'called select');
    });
    // Handle any actions with this.on('myAction', function(val) { ... });
    assert.expect(7);

    this.render(Ember.HTMLBars.template({
      "id": "Wm/rVldd",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"tree-view\",null,[[\"model\",\"selected\"],[[20,[\"model\"]],[20,[\"selected\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar1label|foo1label|');

    assert.ok(this.$('.tree-leaf:first').hasClass('tree-highlight'), 'selected leaf highlighted');

    assert.equal(this.$('.tree-leaf:last .expand-icon').length, 1, 'node expand icon rendered');

    this.$('.tree-leaf:last .expand-icon').click();

    assert.equal(this.$('.tree-leaf').length, 3, 'node expanded');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "HOKegU9H",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-view\",null,[[\"model\",\"select\"],[[20,[\"model\"]],[20,[\"select\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|bar1label|foo1label|foo2label|');

    this.$('.tree-leaf:last').click();

    assert.equal(this.$('.tree-leaf.tree-highlight').length, 2, 'node selected');
  });
});
define('mdeditor/tests/integration/helpers/present-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('present', 'helper:present', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "BBakFKAP",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"present\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('mdeditor/tests/integration/helpers/word-limit-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('word-limit', 'helper:word-limit', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "Nl0wWOis",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"word-limit\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('mdeditor/tests/integration/pods/components/bs-datetimepicker/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('bs-datetimepicker', 'Integration | Component | bs datetimepicker', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "B+1eKea3",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"bs-datetimepicker\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "swtxP9oS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"bs-datetimepicker\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-button-confirm/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-button-confirm', 'Integration | Component | control/md button confirm', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "QCshRkZ4",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-button-confirm\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "yZcknomW",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });

  (0, _emberQunit.test)('shows and cancels confirm', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "7rwbzmuQ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"      Test\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'Test', 'renders button');

    this.$('button').click();

    assert.equal(this.$().text().trim(), 'Confirm', 'renders confirm');

    var $btn = this.$('button');
    Ember.run(function () {
      $btn.blur();
    });

    assert.equal(this.$().text().trim(), 'Test', 'cancels confirm');
  });

  (0, _emberQunit.test)('performs confirm action', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('externalAction', type => {
      assert.ok(type, `${type} called`);
    });

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "mc4xfBq1",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,[[\"onConfirm\"],[[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"onConfirm\"],null]]],{\"statements\":[[0,\"      Test\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click().click();
  });
});
define('mdeditor/tests/integration/pods/components/control/md-button-modal/component-test', ['ember-qunit', 'mdeditor/tests/helpers/modal-asserts'], function (_emberQunit, _modalAsserts) {
  'use strict';

  (0, _modalAsserts.default)();

  (0, _emberQunit.moduleForComponent)('control/md-button-modal', 'Integration | Component | control/md button modal', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "NDOIm8Eq",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-button-modal\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "FPsI9VDU",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-modal\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });

  (0, _emberQunit.test)('shows modal and performs actions', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    let modalDialogService = this.container.lookup('service:modal-dialog');
    modalDialogService.destinationElementId = 'test-div';

    this.set('externalAction', type => {
      assert.ok(type, `${type} called`);
    });

    this.render(Ember.HTMLBars.template({
      "id": "UZyEEcwy",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[6,\"div\"],[9,\"id\",\"test-div\"],[7],[8],[0,\"\\n    \"],[4,\"control/md-button-modal\",null,[[\"message\",\"onConfirm\",\"onCancel\"],[\"Hello\",[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"confirm\"],null],[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"cancel\"],null]]],{\"statements\":[[0,\" Test\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    // click the button
    this.$('.md-button-modal').click();

    assert.isPresentOnce('.md-modal-overlay');

    let num = this.$('.md-modal-buttons button').length;

    this.$('.md-modal-overlay').click();

    assert.isAbsent('.md-modal-overlay');

    let i = 0;

    // click the modal buttons
    while (i < num) {
      this.$('.md-button-modal').click();
      this.$('.md-modal-buttons button')[i].click();
      i++;
    }
  });
});
define('mdeditor/tests/integration/pods/components/control/md-contact-link/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-contact-link', 'Integration | Component | control/md contact link', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7sY1nMIs",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-contact-link\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JPCavjX8",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-contact-link\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-contact-title/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-contact-title', 'Integration | Component | control/md contact title', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "iQ6BJhv+",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-contact-title\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "A9HHF90j",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-contact-title\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-crud-buttons/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-crud-buttons', 'Integration | Component | control/md crud buttons', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "t31fFgHN",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-crud-buttons\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|Delete|');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "lLoHGqkT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-crud-buttons\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|Delete|template|block|text|');
  });

  (0, _emberQunit.test)('should trigger external action', function (assert) {
    assert.expect(4);

    // test double for the external action
    this.set('externalAction', type => {
      assert.ok(type, `${type} called`);
    });

    this.render(Ember.HTMLBars.template({
      "id": "/cX+9bOi",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/md-crud-buttons\",null,[[\"doSave\",\"doCancel\",\"doCopy\",\"doDelete\"],[[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"doSave\"],null],[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"doCancel\"],null],[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"doCopy\"],null],[25,\"action\",[[19,0,[]],[20,[\"externalAction\"]],\"doDelete\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    // click the buttons
    this.$('.md-crud-buttons .btn-success').click();
    this.$('.md-crud-buttons .btn-warning').click();
    this.$('.md-crud-buttons .btn-info').click();
    //we have to click delete twice to confirm
    this.$('.md-crud-buttons .btn-danger').click().click();
  });
});
define('mdeditor/tests/integration/pods/components/control/md-definition/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-definition', 'Integration | Component | control/md definition', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3f7TQimq",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-definition\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "OxYg1tGc",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-definition\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-errors/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-errors', 'Integration | Component | control/md errors', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "n6wcRKWy",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-errors\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6ePhSBHV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-errors\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-fiscalyear/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-fiscalyear', 'Integration | Component | control/md fiscalyear', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "J0wbw+FY",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-fiscalyear\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ZNv4HO9+",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-fiscalyear\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-import-csv/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-import-csv', 'Integration | Component | control/md import csv', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "oylfaetv",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-import-csv\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "mtmJ6bnA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-import-csv\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-itis/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-itis', 'Integration | Component | control/md itis', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "fmxlIQTt",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-itis\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "pMcr/JjA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-itis\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-json-button/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-json-button', 'Integration | Component | control/md json button', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    this.render(Ember.HTMLBars.template({
      "id": "itUu+75b",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-json-button\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'Preview JSON');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "UgcvnzIF",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-json-button\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });

  (0, _emberQunit.test)('render json modal', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    this.render(Ember.HTMLBars.template({
      "id": "dTNtBdof",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/md-json-button\",null,[[\"json\"],[[20,[\"json\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click();

    assert.equal(Ember.$('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-json-viewer/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-json-viewer', 'Integration | Component | control/md json viewer', {
    integration: true
  });

  (0, _emberQunit.test)('render json modal', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    this.render(Ember.HTMLBars.template({
      "id": "u4beRUY0",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/md-json-viewer\",null,[[\"json\"],[[20,[\"json\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(Ember.$('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
  });

  (0, _emberQunit.test)('render json viewer', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    this.render(Ember.HTMLBars.template({
      "id": "85gLqzZ/",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/md-json-viewer\",null,[[\"json\",\"modal\"],[[20,[\"json\"]],false]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '{"foo": "bar"}');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-modal/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-modal', 'Integration | Component | control/md modal', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "yGvdu1qa",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/md-modal\",null,[[\"isShowing\"],[true]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal($('.md-modalcontainer').length, 0);

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tdBQcorF",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-modal\",null,[[\"isShowing\"],[true]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal($('.md-modal-container').text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-record-table/buttons', 'Integration | Component | control/md record table/buttons', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+lDzoLsN",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-record-table/buttons\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "q/j3JndS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table/buttons\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/custom/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-record-table/buttons/custom', 'Integration | Component | control/md record table/buttons/custom', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+715xWyu",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-record-table/buttons/custom\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qVj4d9L4",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table/buttons/custom\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/filter/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-record-table/buttons/filter', 'Integration | Component | control/md record table/buttons/filter', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "X/mmNFVV",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-record-table/buttons/filter\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "NLzfC5kY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table/buttons/filter\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/show/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-record-table/buttons/show', 'Integration | Component | control/md record table/buttons/show', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "GkkIweeL",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-record-table/buttons/show\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "56YOQ3jZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table/buttons/show\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-record-table', 'Integration | Component | control/md record table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+4vK0M0h",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-record-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "kD1xs3cc",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-repo-link/component-test', ['ember-qunit', 'mdeditor/config/environment'], function (_emberQunit, _environment) {
  'use strict';

  var _config$APP = _environment.default.APP;
  const repository = _config$APP.repository,
        version = _config$APP.version;


  (0, _emberQunit.moduleForComponent)('control/md-repo-link', 'Integration | Component | control/md repo link', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "AtI8Y3SI",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-repo-link\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), version);
    assert.equal(this.$('a').attr('href'), `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`);

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "i40fpBGA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-repo-link\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-scroll-spy/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-scroll-spy', 'Integration | Component | control/md scroll spy', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "gvTXQipg",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-scroll-spy\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "cWvhxjI6",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-scroll-spy\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-select-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-select-table', 'Integration | Component | control/md select table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "f/vKOdH6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-select-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tTO10qd6",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-select-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-spinner/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-spinner', 'Integration | Component | control/md spinner', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3jWW0Kou",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-spinner\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wU8VZbZw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-spinner\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-spotlight/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-spotlight', 'Integration | Component | control/md spotlight', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "IjldBzM9",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-spotlight\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BQnz8qbY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-spotlight\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/md-status/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/md-status', 'Integration | Component | control/md status', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "CEftag3P",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/md-status\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wHMkw1Uu",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-status\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-citation/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-citation', 'Integration | Component | control/subbar citation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7DkMyxFZ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-citation\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6L/Rog+7",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-citation\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-extent/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-spatial', 'Integration | Component | control/subbar spatial', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3ByLjXmj",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-spatial\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Spatial|Extent|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "y2ccOZEb",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-spatial\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Spatial|Extent|template|block|text|');
  });

  (0, _emberQunit.test)('fire actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Ember.Route.extend({
      actions: {
        addExtent: function addExtent() {
          assert.ok(true, 'calls addExtent action');
        }
      }
    });

    this.on('getContext', function () {
      return new FakeRoute();
    });

    this.render(Ember.HTMLBars.template({
      "id": "YP2qnUCj",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/subbar-spatial\",null,[[\"context\"],[[25,\"action\",[[19,0,[]],\"getContext\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click();
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-importcsv/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-importcsv', 'Integration | Component | control/subbar importcsv', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MML5JEXS",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-importcsv\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "8T3DeXdT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-importcsv\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-keywords/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-keywords', 'Integration | Component | control/subbar keywords', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "rK1zJUYv",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-keywords\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Keywords|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "H85/EsWT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-keywords\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Keywords|template|block|text|');
  });

  (0, _emberQunit.test)('fire actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Ember.Route.extend({
      actions: {
        addThesaurus: function addThesaurus() {
          assert.ok(true, 'calls addThesaurus action');
        }
      }
    });

    this.on('getContext', function () {
      return new FakeRoute();
    });

    this.render(Ember.HTMLBars.template({
      "id": "ZLh6KItu",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/subbar-keywords\",null,[[\"context\"],[[25,\"action\",[[19,0,[]],\"getContext\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click();
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-link/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-link', 'Integration | Component | control/subbar link', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "vuOb1j+u",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-link\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Wa1K64Jm",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-link\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-spatial/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-extent', 'Integration | Component | control/subbar extent', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8/UPPj5Q",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-extent\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Spatial|Extent|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JGiL8e4W",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-extent\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|Spatial|Extent|template|block|text|');
  });

  (0, _emberQunit.test)('fire actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Ember.Route.extend({
      actions: {
        addExtent: function addExtent() {
          assert.ok(true, 'calls addExtent action');
        }
      }
    });

    this.on('getContext', function () {
      return new FakeRoute();
    });

    this.render(Ember.HTMLBars.template({
      "id": "bmYwvvDs",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/subbar-extent\",null,[[\"context\"],[[25,\"action\",[[19,0,[]],\"getContext\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click();
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-thesaurus/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('control/subbar-thesaurus', 'Integration | Component | control/subbar thesaurus', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "HxgIcwRw",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"control/subbar-thesaurus\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Back|to|List|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+MOI1B1D",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-thesaurus\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Back|to|List|template|block|text|template|block|text|');
  });

  (0, _emberQunit.test)('fire actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Ember.Route.extend({
      actions: {
        toList: function toList() {
          assert.ok(true, 'calls toList action');
        }
      }
    });

    this.on('getContext', function () {
      return new FakeRoute();
    });

    this.render(Ember.HTMLBars.template({
      "id": "BsbVxfdM",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"control/subbar-thesaurus\",null,[[\"context\"],[[25,\"action\",[[19,0,[]],\"getContext\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('button').click();
  });
});
define('mdeditor/tests/integration/pods/components/input/md-boolean/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-boolean', 'Integration | Component | input/md boolean', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "LxPod1/d",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[false,\"Foo Bar\",\"Baz\"]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "QUB8nxil",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[true,\"Foo Bar\",\"Baz\"]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');

    assert.ok(this.$('input').prop('checked'));
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test', ['ember-qunit', 'mdeditor/tests/helpers/ember-power-select', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (_emberQunit, _emberPowerSelect, _emberNativeDomHelpers, _wait) {
  'use strict';

  const codelist = Ember.Service.extend({
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

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "8Q18dkbX",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-codelist-multi\",null,[[\"mdCodeName\",\"value\"],[\"foobar\",[20,[\"fooVal\"]]]],{\"statements\":[[0,\"      \"],[6,\"p\"],[7],[0,\"template block text\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'renders block with array value');
  });

  (0, _emberQunit.test)('set value action', function (assert) {
    var $this = this.$();

    assert.expect(2);

    //this.set('fooVal', ['foo']);
    this.set('value', ['foo']);
    this.on('update', actual => {
      assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "uG9L24cY",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[false,[20,[\"value\"]],\"foobar\",[25,\"action\",[[19,0,[]],\"update\",[20,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("bar")').get(0), 'mouseup');

    return (0, _wait.default)().then(() => {
      assert.equal($this.text().replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|', 'value updated');
    });
  });

  (0, _emberQunit.test)('create option', function (assert) {
    var $this = this.$();

    assert.expect(3);

    this.set('value', ['foo']);
    this.on('update', actual => {
      assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "fp38Okep",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[20,[\"value\"]],\"foobar\",[25,\"action\",[[19,0,[]],\"update\",[20,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberPowerSelect.typeInSearch)('biz');
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("biz")').get(0), 'mouseup');

    return (0, _wait.default)().then(() => {
      assert.equal($this.text().replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|', 'value updated');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist/component-test', ['ember-qunit', 'mdeditor/tests/helpers/ember-power-select', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (_emberQunit, _emberPowerSelect, _emberNativeDomHelpers, _wait) {
  'use strict';

  const codelist = Ember.Service.extend({
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
    assert.expect(1);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "XhAf827w",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\"],[\"foo\",\"foobar\"]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|×|');
  });

  (0, _emberQunit.test)('set value action', function (assert) {
    let $this = this.$();

    assert.expect(2);

    this.set('value', ['foo']);
    this.on('update', actual => {
      assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "I2O8FrLM",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\",\"change\"],[[20,[\"value\"]],\"foobar\",[25,\"action\",[[19,0,[]],\"update\",[20,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("bar")').get(0), 'mouseup');

    return (0, _wait.default)().then(() => {
      assert.equal($this.text().replace(/[ \n]+/g, '|'), '|bar|×|', 'value updated');
    });
  });

  (0, _emberQunit.test)('create option', function (assert) {
    var $this = this.$();

    assert.expect(2);

    this.set('value', ['foo']);
    this.on('update', actual => {
      assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "pes7TSnX",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-codelist\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[20,[\"value\"]],\"foobar\",[25,\"action\",[[19,0,[]],\"update\",[20,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberPowerSelect.typeInSearch)('biz');
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("biz")').get(0), 'mouseup');

    return (0, _wait.default)().then(() => {
      assert.equal($this.text().replace(/[ \n]+/g, '|'), '|biz|×|', 'value updated');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-date-range/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-date-range', 'Integration | Component | input/md date range', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "6+2juFS9",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-date-range\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Vxa+ACnH",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-date-range\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-datetime/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-datetime', 'Integration | Component | input/md datetime', {
    integration: true
  });

  (0, _emberQunit.test)('renders and binds', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.set('mydate', '1999-12-31T23:59:59.999+0900');
    this.render(Ember.HTMLBars.template({
      "id": "bAl7k7Fb",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-datetime\",null,[[\"date\",\"format\",\"placeholder\"],[[20,[\"mydate\"]],\"YYYY-MM-DD\",\"Enter date\"]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$('input').val(), '1999-12-31', 'binding works');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input-confirm/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-input-confirm', 'Integration | Component | input/md input confirm', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3M5lNWRu",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-input-confirm\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "HNsSu1dP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input-confirm\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-input', 'Integration | Component | input/md input', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "59lfu2EK",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-input\",null,[[\"label\",\"value\",\"maxlength\",\"required\",\"inputClass\",\"placeholder\"],[\"Foo\",\"Bar\",100,\"true\",\"test\",\"Enter FooBar\"]]],false],[0,\"\\n  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$('label').text(), 'Foo', 'labeled OK');

    const input = this.$('input');
    const props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
    assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "QjtLkg+C",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input\",null,null,{\"statements\":[[0,\"      \"],[6,\"p\"],[9,\"class\",\"help-block\"],[7],[0,\"help text\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$('.help-block').text(), 'help text', 'block renders');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-inputs/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-inputs', 'Integration | Component | input/md inputs', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['Foo', 'Bar', '']);

    this.render(Ember.HTMLBars.template({
      "id": "pISENCxb",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-inputs\",null,[[\"model\",\"header\",\"placeholder\",\"label\",\"buttonText\",\"maxlength\"],[[20,[\"model\"]],\"Header\",\"Enter Line\",\"Lines\",\"Add One\",100]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Lines|#|Header|0|Delete!|1|Delete!|2|Delete!|Add|One|', 'it renders ok');

    const input = this.$('input').first();
    const props = [input.prop('maxlength'), input.val(), input.prop('placeholder')];
    assert.deepEqual(props, [100, 'Foo', 'Enter Line'], 'properties set ok');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "p0tGbhN/",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-inputs\",null,[[\"buttonTop\"],[true]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Add|template|block|text|', 'block renders ok');
  });

  (0, _emberQunit.test)('should update items', function (assert) {
    //assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.render(Ember.HTMLBars.template({
      "id": "BKziU0QP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-inputs\",null,[[\"model\"],[[20,[\"model\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

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

    this.render(Ember.HTMLBars.template({
      "id": "BKziU0QP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-inputs\",null,[[\"model\"],[[20,[\"model\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('.btn-success').click();

    assert.equal(this.$('input').length, 2, 'adds item');

    this.$('.btn-warning').first().click();

    assert.equal(this.$('input').length, 1, 'deletes item');
  });

  (0, _emberQunit.test)('add item action', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('addItem', () => {
      assert.ok(true, 'addItem action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "svCsBn+z",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-inputs\",null,[[\"model\",\"addItem\"],[[20,[\"model\"]],[20,[\"addItem\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('.btn-success').click();
  });

  (0, _emberQunit.test)('delete item actions', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('model', ['foo']);

    this.set('deleteItem', idx => {
      assert.ok(idx > -1, 'deleteItem action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "59v1KSQr",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-inputs\",null,[[\"model\",\"deleteItem\"],[[20,[\"model\"]],[20,[\"deleteItem\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

    this.$('.btn-warning').first().click();
  });
});
define('mdeditor/tests/integration/pods/components/input/md-markdown-area/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-markdown-area', 'Integration | Component | input/md markdown area', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "WDcnfuWM",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-markdown-area\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "hXxSibLZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-markdown-area\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-month/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-month', 'Integration | Component | input/md month', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "JDnpX0Pb",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-month\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "a+6WBvys",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-month\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-contact/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-select-contact', 'Integration | Component | input/md select contact', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "t8EWVaYY",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-select-contact\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "orNIv0Dz",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-contact\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-contacts/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-select-contacts', 'Integration | Component | input/md select contacts', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "M+FfLap7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-select-contacts\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "R02BHWyZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-contacts\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-profile/component-test', ['ember-qunit', 'mdeditor/tests/helpers/ember-power-select', 'ember-native-dom-helpers'], function (_emberQunit, _emberPowerSelect, _emberNativeDomHelpers) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-select-profile', 'Integration | Component | input/md select profile', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "HG0onW+M",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\"],[\"full\",\"updateProfile\"]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Profile|full|?|');
  });

  (0, _emberQunit.test)('should trigger external action on change', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('updateProfile', actual => {
      assert.equal(actual, 'basic', 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "OUdvUPqL",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\"],[[20,[\"full\"]],[25,\"action\",[[19,0,[]],[20,[\"updateProfile\"]]],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    // select a value and force an onchange
    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("basic")').get(0), 'mouseup');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-thesaurus/component-test', ['ember-qunit', 'mdeditor/tests/helpers/ember-power-select', 'ember-native-dom-helpers'], function (_emberQunit, _emberPowerSelect, _emberNativeDomHelpers) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-select-thesaurus', 'Integration | Component | input/md select thesaurus', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "qCDZI9LB",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-select-thesaurus\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "lNHSZm3A",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-thesaurus\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
  });

  (0, _emberQunit.test)('should trigger external action on change', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('selectThesaurus', id => {
      assert.equal(id.citation.identifier[0].identifier, '1eb0ea0a-312c-4d74-8d42-6f1ad758f999', 'submitted value is passed to external action');
    });

    this.render(Ember.HTMLBars.template({
      "id": "huaGqwin",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input/md-select-thesaurus\",null,[[\"selectThesaurus\"],[[20,[\"selectThesaurus\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    // select a value and force an onchange
    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("Science")').get(0), 'mouseup');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select/component-test', ['ember-qunit', 'mdeditor/tests/helpers/ember-power-select', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (_emberQunit, _emberPowerSelect, _emberNativeDomHelpers, _wait) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-select', 'Integration | Component | input/md select', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [Ember.Object.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    })]);

    this.render(Ember.HTMLBars.template({
      "id": "8ZxyHz53",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\",\"tooltipPath\",\"placeholder\"],[1,[20,[\"objArray\"]],\"id\",\"name\",\"tip\",\"Select one\"]]],false],[0,\"\\n  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
  });

  (0, _emberQunit.test)('set value', function (assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [Ember.Object.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    }), Ember.Object.create({
      id: 2,
      name: 'baz',
      tip: 'biz'
    })]);

    this.set('value', 1);

    this.render(Ember.HTMLBars.template({
      "id": "e1jA5pf4",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\"],[[20,[\"value\"]],[20,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|', 'value set');

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("baz")').get(0), 'mouseup');
    return (0, _wait.default)().then(() => {
      assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');

      assert.equal(this.get('value'), 2, 'value is updated');
    });
  });

  (0, _emberQunit.test)('create option', function (assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('objArray', [Ember.Object.create({
      id: 1,
      name: 'foo',
      tip: 'bar'
    }), Ember.Object.create({
      id: 2,
      name: 'baz',
      tip: 'biz'
    })]);

    this.set('value', 1);

    this.render(Ember.HTMLBars.template({
      "id": "ryyN1rGP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-select\",null,[[\"value\",\"create\",\"objectArray\",\"valuePath\",\"namePath\"],[[20,[\"value\"]],true,[20,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|foo|', 'value set');

    (0, _emberPowerSelect.clickTrigger)();
    (0, _emberPowerSelect.typeInSearch)('biz');
    (0, _emberNativeDomHelpers.triggerEvent)($('.ember-power-select-option:contains("biz")').get(0), 'mouseup');
    return (0, _wait.default)().then(() => {
      assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');

      assert.equal(this.get('value'), 'biz', 'value is updated');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-textarea/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-textarea', 'Integration | Component | input/md textarea', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(Ember.HTMLBars.template({
      "id": "pXEFBICS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[25,\"input/md-textarea\",null,[[\"value\",\"label\",\"placeholder\",\"rows\"],[\"Foo bar baz\",\"FooBar\",\"placeholder\",10]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$('textarea').val(), 'Foo bar baz');

    assert.equal(this.$('label').text(), 'FooBar', 'label renders');

    // Template block usage:" + EOL +
    this.render(Ember.HTMLBars.template({
      "id": "qZZvgDQC",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-textarea\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text', 'block renders');
  });
});
define('mdeditor/tests/integration/pods/components/input/md-toggle/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input/md-toggle', 'Integration | Component | input/md toggle', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "453k575J",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"input/md-toggle\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7h9cQT07",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-toggle\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-card/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-card', 'Integration | Component | layout/md card', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "CSI8sDxa",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-card\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "opQWXemp",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-card\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-footer/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-footer', 'Integration | Component | layout/md footer', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ej5BewW2",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-footer\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "VjW7oMuW",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-footer\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-nav-main', 'Integration | Component | md nav main', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7sQKbChO",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-nav-main\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Toggle|navigation|Dashboard|Export|Import|Settings|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qElPu36m",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-main\",null,null,{\"statements\":[[0,\"      template block text \"],[1,[18,\"record/show/edit/nav\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|Toggle|navigation|Dashboard|Export|Import|template|block|text|Settings|');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  //Stub profile service
  const profileStub = Ember.Service.extend({
    getActiveProfile() {
      const active = this.get('active');
      const profile = active && typeof active === 'string' ? active : 'full';
      const profiles = this.get('profiles');

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
      // making it accessible as "profileService" within each test
      this.inject.service('profile', {
        as: 'profileService'
      });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "S3IPATMD",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-nav-secondary\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    var more = this.$('.overflow-nav').length ? '|More' : '';

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tq5UeYvB",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-secondary\",null,null,{\"statements\":[[0,\"      \"],[6,\"li\"],[7],[0,\"template block text\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    more = this.$('.overflow-nav').length ? '|More' : '';

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), more + '|Foo|Bar|template|block|text|');
  });

  (0, _emberQunit.test)('render after setting profile', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('profileService.active', 'basic');

    this.render(Ember.HTMLBars.template({
      "id": "S3IPATMD",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-nav-secondary\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    var more = this.$('.overflow-nav').length ? '|More' : '';

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test', ['ember-qunit', 'mdeditor/tests/helpers/create-contact', 'mdeditor/tests/helpers/create-record', 'mdeditor/tests/helpers/create-dictionary'], function (_emberQunit, _createContact, _createRecord, _createDictionary) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-nav-sidebar', 'Integration | Component | md nav sidebar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(1);

    const contacts = (0, _createContact.default)(2);
    contacts.meta = {
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    };

    const records = (0, _createRecord.default)(2);
    records.meta = {
      type: 'record',
      list: 'records',
      title: 'Records'
    };

    const dicts = (0, _createDictionary.default)(2);
    dicts.meta = {
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    };

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', [records, contacts, dicts]);

    this.render(Ember.HTMLBars.template({
      "id": "KSMvTrkL",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"layout/md-nav-sidebar\",null,[[\"items\",\"version\"],[[20,[\"model\"]],\"test\"]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|'), '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
  });

  (0, _emberQunit.test)('toggle help action', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "n3NhbD47",
      "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"id\",\"md-sidebar-wrapper\"],[7],[1,[18,\"layout/md-nav-sidebar\"],false],[8]],\"hasEval\":false}",
      "meta": {}
    }));
    this.$('#md-btn-help').click();
    assert.ok(this.$('#md-sidebar-wrapper').hasClass('help'));
  });

  (0, _emberQunit.test)('toggle sidebar action', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "Wr6J0SD7",
      "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"id\",\"md-wrapper\"],[7],[6,\"div\"],[9,\"id\",\"md-sidebar-wrapper\"],[7],[1,[18,\"layout/md-nav-sidebar\"],false],[8],[8]],\"hasEval\":false}",
      "meta": {}
    }));
    this.$('.sidebar-brand-link').click();
    assert.ok(this.$('#md-wrapper').hasClass('toggled'));
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-slider/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-slider', 'Integration | Component | layout/md slider', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "22l3UMoH",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-slider\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "23PhokX0",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-slider\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-wrap/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layout/md-wrap', 'Integration | Component | layout/md wrap', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ktl7YtnS",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"layout/md-wrap\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ER3YQ7EM",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-wrap\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/md-help/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-help', 'Integration | Component | md help', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ycYFAtTz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-help\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.ok(this.$().text().indexOf('Lorem ipsum' > 0));

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9+hXur2u",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-help\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.ok(this.$().text().trim().indexOf('template block text' > 0));
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-models-table', 'Integration | Component | md models table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2QG2pO0U",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-models-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Nx/lsfva",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/components/check-all/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-models-table/components/check-all', 'Integration | Component | md models table/components/check all', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "pq3XQQym",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-models-table/components/check-all\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Z7WK9bcH",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check-all\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/components/check/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-models-table/components/check', 'Integration | Component | md models table/components/check', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "HTf0S+bQ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-models-table/components/check\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7yigZ1yW",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/md-title/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-title', 'Integration | Component | md title', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "PcS8ZzJ7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-title\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "4671MT4t",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-title\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/md-translate/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('md-translate', 'Integration | Component | md translate', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "c+as3mJq",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"md-translate\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "He1lKScF",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-translate\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-address/md-address-block/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-address/md-address-block', 'Integration | Component | object/md address/md address block', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Zzk1n9i9",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-address/md-address-block\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "uOHxOA35",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-address/md-address-block\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-allocation/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-allocation', 'Integration | Component | object/md allocation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8gHY20Ea",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-allocation\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "F3WNp+sM",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-allocation\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-array-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-array-table', 'Integration | Component | object/md array table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "LjbFYwdU",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-array-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Lle7WeCB",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-array-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-associated/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-associated', 'Integration | Component | object/md associated', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ZvlsJYM/",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-associated\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "8L1ziB/f",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-associated/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-associated/preview', 'Integration | Component | object/md associated/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "DYWubGrz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-associated/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2YXS6V4B",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-attribute/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-attribute', 'Integration | Component | object/md attribute', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "QXdXFrGg",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-attribute\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+QN/82cM",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-attribute\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-attribute/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-attribute/preview', 'Integration | Component | object/md attribute/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xLgDD0mU",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-attribute/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ksaMgv5r",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-attribute/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-bbox/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-bbox', 'Integration | Component | object/md bbox', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "PpIRdLM/",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-bbox\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "rOFafeYP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-bbox\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-citation-array', 'Integration | Component | object/md citation array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "K/NBqIVp",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-citation-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "V7OLsm8B",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-citation', 'Integration | Component | object/md citation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Ki3rSMDp",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-citation\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+5hUE6F5",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/preview/body/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-citation/preview/body', 'Integration | Component | object/md citation/preview/body', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "uII2hb0d",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-citation/preview/body\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "HhJn1R8R",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview/body\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-citation/preview', 'Integration | Component | object/md citation/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "djcvSV+t",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-citation/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "dztPAHuo",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-constraint/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-constraint', 'Integration | Component | object/md constraint', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Uinwe+xT",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-constraint\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "K1b1iTv6",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-constraint\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-date-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-date-array', 'Integration | Component | object/md date array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8MibG97P",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-date-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+3/86nqH",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-date-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-date/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-date', 'Integration | Component | object/md date', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "pSklZ30Y",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-date\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "r+rp12Qv",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-date\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distribution/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-distribution', 'Integration | Component | object/md distribution', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "RTRW3adT",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-distribution\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "aN5NGr6P",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distribution\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distributor/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-distributor', 'Integration | Component | object/md distributor', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7QSpsZga",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-distributor\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "x6vNsNPS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distributor/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-distributor/preview', 'Integration | Component | object/md distributor/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "c0ZOpqwO",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-distributor/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JS9Nuj7z",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-documentation/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-documentation', 'Integration | Component | object/md documentation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "9Zk1JiSz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-documentation\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Pzc11yK5",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-documentation/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-documentation/preview', 'Integration | Component | object/md documentation/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "BBv1I11G",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-documentation/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Nrx2glI2",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domain/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-domain', 'Integration | Component | object/md domain', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ewqNDitB",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-domain\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Csl2d2bA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domain\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domainitem/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-domainitem', 'Integration | Component | object/md domainitem', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "iUe++eq7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-domainitem\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "CULuql0w",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domainitem/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-domainitem/preview', 'Integration | Component | object/md domainitem/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Ta0LxPvz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-domainitem/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "IeqgoyGG",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-entity/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-entity', 'Integration | Component | object/md entity', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "BNvLfPjj",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-entity\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "bXXiW6DV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-entity\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-funding/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-funding', 'Integration | Component | object/md funding', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Nl5fQm2K",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-funding\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "bhjs3Pay",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-funding\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-funding/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-funding/preview', 'Integration | Component | object/md funding/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "I08a2/T/",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-funding/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "RlrcjZjw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-funding/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-graphic-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-graphic-array', 'Integration | Component | object/md graphic array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Z1jGEc2M",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-graphic-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "MbTZt8D3",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-graphic-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-identifier-array', 'Integration | Component | object/md identifier array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7vWx6rhH",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-identifier-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ly34KEp0",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier-object-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-identifier-object-table', 'Integration | Component | object/md identifier object table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "poJE0W+k",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-identifier-object-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7cVIxHpK",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier-object-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-identifier', 'Integration | Component | object/md identifier', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "hGrirX7R",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-identifier\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5YEV9/ZZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-keyword-citation/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-keyword-citation', 'Integration | Component | object/md keyword citation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "SorZVSbO",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-keyword-citation\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6iu0l38S",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-keyword-citation\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-keyword-list/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-keyword-list', 'Integration | Component | object/md keyword list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      'keyword': [{
        'identifier': 'id1',
        'keyword': 'foo1',
        'path': ['foo1']
      }, {
        'identifier': 'id2',
        'keyword': 'bar1',
        'path': ['foo1', 'bar1']
      }]
    });
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "PD/YcUCG",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"object/md-keyword-list\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Delete|foo1|Delete|bar1|');

    this.render(Ember.HTMLBars.template({
      "id": "I4PaXnlW",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"object/md-keyword-list\",null,[[\"model\",\"readOnly\"],[[20,[\"model\"]],false]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$('tr').length, 4, 'Check number of rows.');
    assert.equal(this.$('input').length, 4, 'Check number of input el.');
    assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
    assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|', 'readOnly = false.');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "LT+Z6zDe",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-keyword-list\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().replace(/[ \n]+/g, '|').trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-lineage/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-lineage', 'Integration | Component | object/md lineage', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "1ogBDacq",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-lineage\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5HwgldL0",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-lineage\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-lineage/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-lineage/preview', 'Integration | Component | object/md lineage/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7XNDGcbw",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-lineage/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qqxtpXI6",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-lineage/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-locale-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-locale-array', 'Integration | Component | object/md locale array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "0IRUzuX7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-locale-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "aM/QvAHD",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-locale-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-locale/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-locale', 'Integration | Component | object/md locale', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "DhC0P3Yq",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-locale\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "giLPTP+D",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-locale\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-maintenance/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-maintenance', 'Integration | Component | object/md maintenance', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "qkmgQDdL",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-maintenance\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "GD0hb+xr",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-maintenance\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-medium/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-medium', 'Integration | Component | object/md medium', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "g1/YavqN",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-medium\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "LQWQhvhJ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-medium\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-objectroute-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-objectroute-table', 'Integration | Component | object/md objectroute table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "bi7r1pxJ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-objectroute-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6gPjZQCp",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-objectroute-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-online-resource/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-online-resource', 'Integration | Component | object/md online resource', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "gasNweQc",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-online-resource\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "sieOZKFZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-online-resource\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-party-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-party-array', 'Integration | Component | object/md party', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "empqurYF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-party-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "IpHOaQ2B",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-party/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-party', 'Integration | Component | object/md party', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "aNgeb0eO",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-party\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "gT+3C4Mn",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-process-step/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-process-step', 'Integration | Component | object/md process step', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "R9ICg+97",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-process-step\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "LZ5UiJtv",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-process-step\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-repository-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-repository-array', 'Integration | Component | object/md repository array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "7wVHc1UT",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-repository-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9wIiC2px",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-repository-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-resource-type-array/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-resource-type-array', 'Integration | Component | object/md resource type array', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Cs2ldKzE",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-resource-type-array\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DQw6H+Bi",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-resource-type-array\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-simple-array-table/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-simple-array-table', 'Integration | Component | object/md simple array table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "cfzjKS1L",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-simple-array-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "c9JKYlJ/",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-simple-array-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-source/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-source', 'Integration | Component | object/md source', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "k084dJ8P",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-source\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "UUIBx/Hj",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-source/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-source/preview', 'Integration | Component | object/md source/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+YcT2MVB",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-source/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "sb5QHFuy",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-extent/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-spatial-extent', 'Integration | Component | object/md spatial extent', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "y0tn821q",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-spatial-extent\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "pb6nE85R",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-extent\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-info/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-spatial-info', 'Integration | Component | object/md spatial info', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "OTvHV0n6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-spatial-info\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "WhZzaHHP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-info\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-resolution/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-spatial-resolution', 'Integration | Component | object/md spatial resolution', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "J2ehxRSw",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-spatial-resolution\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qeMimhlJ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-resolution\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-srs/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-srs', 'Integration | Component | object/md srs', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "tpqxPz3U",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-srs\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "uzlrtwN/",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-srs\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/classification', 'Integration | Component | object/md taxonomy/classification', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "SBfyzrBS",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/classification\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "1a8AuHZ+",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/taxon/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/classification/taxon', 'Integration | Component | object/md taxonomy/classification/taxon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "n2cRMJu6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/classification/taxon\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JkuUUeLA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification/taxon\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/collection', 'Integration | Component | object/md taxonomy/collection', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MZ1UC7Lo",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/collection\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "NEeJEiJv",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/collection/system', 'Integration | Component | object/md taxonomy/collection/system', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "e5J5a/Hi",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/collection/system\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "gFAsxm2R",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/preview/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/collection/system/preview', 'Integration | Component | object/md taxonomy/collection/system/preview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+306W8BY",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/collection/system/preview\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "FcMfYI0t",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system/preview\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/voucher/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy/collection/voucher', 'Integration | Component | object/md taxonomy/collection/voucher', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "nGBHUkTL",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy/collection/voucher\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "pvtJ0TmW",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/voucher\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-taxonomy', 'Integration | Component | object/md taxonomy', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "IHv6JXoK",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-taxonomy\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ejIbaBGP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-time-period/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-time-period', 'Integration | Component | object/md time period', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "yhYFxxUP",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-time-period\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "iwIyXGf/",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-time-period\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/object/md-transfer/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('object/md-transfer', 'Integration | Component | object/md transfer', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "x5rPehFX",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"object/md-transfer\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "G7IDz3uH",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-transfer\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/tooltip-on-component/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tooltip-on-component', 'Integration | Component | tooltip on component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xscXfgcl",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"tooltip-on-component\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6StAmRQY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tooltip-on-component\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/integration/pods/components/tooltip-on-element/component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tooltip-on-element', 'Integration | Component | tooltip on element', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "/sj8XdAE",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"tooltip-on-element\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BHT0bOgC",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tooltip-on-element\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('mdeditor/tests/test-helper', ['mdeditor/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('mdeditor/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/pods/components/layout/md-breadcrumb-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/components/layout/md-breadcrumb-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/contact/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/contacts/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/pods/contacts/contacts-test.js should pass ESLint\n\n23:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('acceptance/pods/dictionary/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/record/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/create-contact.js should pass ESLint\n\n9:21 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('helpers/create-dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/create-dictionary.js should pass ESLint\n\n9:24 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('helpers/create-map-layer.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/create-map-layer.js should pass ESLint\n\n12:19 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('helpers/create-record.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/create-record.js should pass ESLint\n\n9:20 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/flash-message.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/flash-message.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/modal-asserts.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/modal-asserts.js should pass ESLint\n\n11:23 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n16:23 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n21:20 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/feature-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-group-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/feature-group-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/feature-table-test.js should pass ESLint\n\n22:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/components/geojson-layer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/geojson-layer-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-draw-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-draw-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-row-actions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-table-row-actions-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-row-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-table-row-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/leaflet-table-test.js should pass ESLint\n\n20:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/components/sb-publisher-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-publisher-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-tree-label-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-tree-label-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-tree-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-tree-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-branch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-branch-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-label-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-label-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-leaf-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-leaf-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-search-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-search-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/present-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/present-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/word-limit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/word-limit-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/bs-datetimepicker/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/bs-datetimepicker/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-button-confirm/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-button-confirm/component-test.js should pass ESLint\n\n60:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/md-button-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button-modal/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-contact-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-contact-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-contact-title/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-contact-title/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-crud-buttons/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-crud-buttons/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-definition/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-definition/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-errors/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-errors/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-fiscalyear/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-fiscalyear/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-import-csv/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-import-csv/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-itis/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-itis/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-json-button/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-json-button/component-test.js should pass ESLint\n\n49:16 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/md-json-viewer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-json-viewer/component-test.js should pass ESLint\n\n18:16 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/md-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-modal/component-test.js should pass ESLint\n\n14:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n23:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/custom/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/custom/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/filter/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/filter/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/show/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/show/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-repo-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-repo-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-scroll-spy/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-scroll-spy/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-select-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-select-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-spinner/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-spinner/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-spotlight/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-spotlight/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-status/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-status/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-extent/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/subbar-extent/component-test.js should pass ESLint\n\n45:19 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/subbar-importcsv/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-importcsv/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-keywords/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/subbar-keywords/component-test.js should pass ESLint\n\n43:19 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/subbar-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-spatial/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/subbar-spatial/component-test.js should pass ESLint\n\n45:19 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/control/subbar-thesaurus/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/subbar-thesaurus/component-test.js should pass ESLint\n\n42:19 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('integration/pods/components/input/md-boolean/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-boolean/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-codelist-multi/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-codelist-multi/component-test.js should pass ESLint\n\n11:18 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)\n12:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n77:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n106:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/input/md-codelist/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-codelist/component-test.js should pass ESLint\n\n11:18 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)\n12:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n65:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n94:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/input/md-date-range/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-date-range/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-datetime/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-datetime/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-input-confirm/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-input-confirm/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-input/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-input/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-inputs/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-inputs/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-markdown-area/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-markdown-area/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-month/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-month/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-contact/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-contact/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-contacts/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-contacts/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-profile/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-select-profile/component-test.js should pass ESLint\n\n44:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/input/md-select-thesaurus/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-select-thesaurus/component-test.js should pass ESLint\n\n55:16 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/input/md-select/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-select/component-test.js should pass ESLint\n\n20:25 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n46:25 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n50:7 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n71:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n86:25 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n90:7 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)\n113:18 - Do not use global `$` or `jQuery` (ember/no-global-jquery)');
  });

  QUnit.test('integration/pods/components/input/md-textarea/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-textarea/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-toggle/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-toggle/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-card/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-card/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-footer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-footer/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-nav-main/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-main/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-nav-secondary/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/layout/md-nav-secondary/component-test.js should pass ESLint\n\n10:21 - Use import Service from \'@ember/service\'; instead of using Ember.Service (ember/new-module-imports)\n19:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)');
  });

  QUnit.test('integration/pods/components/layout/md-nav-sidebar/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-sidebar/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-slider/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-slider/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-wrap/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-wrap/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-help/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-help/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/components/check-all/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/check-all/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/components/check/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/check/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-title/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-title/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-translate/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-translate/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-address/md-address-block/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-address/md-address-block/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-allocation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-allocation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-array-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-array-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-associated/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-associated/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-associated/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-associated/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-attribute/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-attribute/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-attribute/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-attribute/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-bbox/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-bbox/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/preview/body/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/preview/body/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-constraint/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-constraint/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-date-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-date-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-date/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-date/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distribution/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distribution/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distributor/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distributor/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distributor/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distributor/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-documentation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-documentation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-documentation/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-documentation/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domain/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domain/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domainitem/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domainitem/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domainitem/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domainitem/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-entity/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-entity/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-funding/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-funding/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-funding/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-funding/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-graphic-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-graphic-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier-object-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier-object-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-keyword-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-keyword-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-keyword-list/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-keyword-list/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-lineage/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-lineage/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-lineage/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-lineage/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-locale-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-locale-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-locale/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-locale/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-maintenance/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-maintenance/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-medium/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-medium/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-objectroute-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-objectroute-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-online-resource/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-online-resource/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-party-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-party-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-party/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-party/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-process-step/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-process-step/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-repository-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-repository-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-resource-type-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-resource-type-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-simple-array-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-simple-array-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-source/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-source/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-source/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-source/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-extent/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-extent/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-info/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-info/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-resolution/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-resolution/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-srs/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-srs/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/classification/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/classification/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/classification/taxon/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/classification/taxon/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/system/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/system/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/system/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/system/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/voucher/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/voucher/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-time-period/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-time-period/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-transfer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-transfer/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/tooltip-on-component/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/tooltip-on-component/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/tooltip-on-element/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/tooltip-on-element/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/bbox-to-poly-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/bbox-to-poly-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/get-dash-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/get-dash-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/make-range-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/make-range-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/md-markdown-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/md-markdown-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/mod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/mod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/leaflet-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/initializers/leaflet-test.js should pass ESLint\n\n9:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n10:21 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)');
  });

  QUnit.test('unit/initializers/local-storage-export-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/initializers/local-storage-export-test.js should pass ESLint\n\n8:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n9:26 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)');
  });

  QUnit.test('unit/instance-initializers/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/profile-test.js should pass ESLint\n\n8:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n9:26 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)\n14:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('unit/instance-initializers/route-publish-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/route-publish-test.js should pass ESLint\n\n8:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n9:26 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)\n14:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('unit/instance-initializers/settings-sciencebase-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/settings-sciencebase-test.js should pass ESLint\n\n8:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n9:26 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)\n14:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('unit/instance-initializers/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/settings-test.js should pass ESLint\n\n8:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)\n9:26 - Use import Application from \'@ember/application\'; instead of using Ember.Application (ember/new-module-imports)\n14:5 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('unit/mixins/hash-poll-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/hash-poll-test.js should pass ESLint\n\n9:24 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('unit/mixins/object-template-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/object-template-test.js should pass ESLint\n\n9:30 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('unit/mixins/scroll-to-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/scroll-to-test.js should pass ESLint\n\n9:24 - Use import EmberObject from \'@ember/object\'; instead of using Ember.Object (ember/new-module-imports)');
  });

  QUnit.test('unit/models/base-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/base-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contact-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/dictionary-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/dictionary-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/record-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/models/record-test.js should pass ESLint\n\n28:16 - Use import { getOwner } from \'@ember/application\'; instead of using Ember.getOwner (ember/new-module-imports)');
  });

  QUnit.test('unit/models/setting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/setting-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contacts/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contacts/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dashboard/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dashboard/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionaries/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionaries/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/item/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/item/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/attribute/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/attribute/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/import/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/import/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/error/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/error/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/export/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/export/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/help/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/help/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/import/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/import/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/not-found/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/not-found/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/publish/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/publish/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/publish/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/publish/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/resource/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/resource/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/resource/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/resource/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/constraint/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/constraint/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/constraint/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/constraint/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/coverages/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/coverages/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/dictionary/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/dictionary/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/distributor/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/distributor/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/distributor/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/distributor/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/allocation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/allocation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/grid/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/grid/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/keywords/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/keywords/thesaurus/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/thesaurus/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/source/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/source/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/extent/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/extent/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/itis/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/itis/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/system/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/system/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/system/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/system/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/translate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/translate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/records/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/records/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/settings/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/translate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/translate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/publish/sciencebase-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/publish/sciencebase-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/serializers/application-test.js should pass ESLint\n\n16:11 - Use import { getOwner } from \'@ember/application\'; instead of using Ember destructuring (ember/new-module-imports)\n44:3 - Use import { run } from \'@ember/runloop\'; instead of using Ember.run (ember/new-module-imports)');
  });

  QUnit.test('unit/services/cleaner-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/cleaner-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/codelist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/codelist-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/contacts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/itis-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/itis-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/jsonvalidator-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/jsonvalidator-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/keyword-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/keyword-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/mdjson-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/mdjson-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/patch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/patch-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/publish-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/publish-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/slider-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/slider-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/spotlight-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/spotlight-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/transforms/json-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/json-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/config-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/config-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/sb-tree-node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/sb-tree-node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/validators/array-required-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/array-required-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/validators/array-valid-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/array-valid-test.js should pass ESLint\n\n');
  });
});
define('mdeditor/tests/unit/adapters/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('mdeditor/tests/unit/helpers/bbox-to-poly-test', ['mdeditor/helpers/bbox-to-poly', 'qunit'], function (_bboxToPoly, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | bbox to poly');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _bboxToPoly.bboxToPoly)([42]);
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/helpers/get-dash-test', ['mdeditor/helpers/get-dash', 'qunit'], function (_getDash, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | get dash');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _getDash.getDash)([42]);
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/helpers/make-range-test', ['mdeditor/helpers/make-range', 'qunit'], function (_makeRange, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | make range');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _makeRange.makeRange)([42]);
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/helpers/md-markdown-test', ['mdeditor/helpers/md-markdown', 'qunit'], function (_mdMarkdown, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | md markdown');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _mdMarkdown.mdMarkdown)([42]);
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/helpers/mod-test', ['mdeditor/helpers/mod', 'qunit'], function (_mod, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | mod');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _mod.mod)([42]);
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/initializers/leaflet-test', ['mdeditor/initializers/leaflet', 'qunit'], function (_leaflet, _qunit) {
  'use strict';

  let application;

  (0, _qunit.module)('Unit | Initializer | leaflet', {
    beforeEach() {
      Ember.run(function () {
        application = Ember.Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _leaflet.default.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/initializers/local-storage-export-test', ['mdeditor/initializers/local-storage-export', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_localStorageExport, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Initializer | local storage export', {
    beforeEach() {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.application.deferReadiness();
      });
    },
    afterEach() {
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _localStorageExport.initialize)(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/instance-initializers/profile-test', ['mdeditor/instance-initializers/profile', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_profile, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | profile', {
    beforeEach() {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    },
    afterEach() {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _profile.initialize)(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/instance-initializers/route-publish-test', ['mdeditor/instance-initializers/route-publish', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_routePublish, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | route publish', {
    beforeEach() {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    },
    afterEach() {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _routePublish.initialize)(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/instance-initializers/settings-sciencebase-test', ['mdeditor/instance-initializers/settings-sciencebase', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_settingsSciencebase, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | settings sciencebase', {
    beforeEach() {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    },
    afterEach() {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _settingsSciencebase.initialize)(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/instance-initializers/settings-test', ['mdeditor/instance-initializers/settings', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_settings, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | settings', {
    beforeEach: function beforeEach() {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    },
    afterEach: function afterEach() {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _settings.initialize)(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('mdeditor/tests/unit/mixins/hash-poll-test', ['mdeditor/mixins/hash-poll', 'qunit'], function (_hashPoll, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | hash poll');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let HashPollObject = Ember.Object.extend(_hashPoll.default);
    let subject = HashPollObject.create();
    assert.ok(subject);
  });
});
define('mdeditor/tests/unit/mixins/object-template-test', ['mdeditor/mixins/object-template', 'qunit'], function (_objectTemplate, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | object template');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let ObjectTemplateObject = Ember.Object.extend(_objectTemplate.default);
    let subject = ObjectTemplateObject.create();
    assert.ok(subject);
  });
});
define('mdeditor/tests/unit/mixins/scroll-to-test', ['mdeditor/mixins/scroll-to', 'qunit'], function (_scrollTo, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | scroll to');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let ScrollToObject = Ember.Object.extend(_scrollTo.default);
    let subject = ScrollToObject.create();
    assert.ok(subject);
  });
});
define('mdeditor/tests/unit/models/base-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('base', 'Unit | Model | base', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('mdeditor/tests/unit/models/contact-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('contact', 'Unit | Model | contact', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

  (0, _emberQunit.test)('should correctly compute title', function (assert) {
    const me = this.subject();

    assert.expect(2);
    me.set('json.individualName', undefined);
    me.set('json.organizationName', 'bar');
    assert.equal(me.get('title'), 'bar');
    me.set('json.individualName', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  (0, _emberQunit.test)('should correctly compute icon', function (assert) {
    const me = this.subject();

    assert.expect(2);
    me.set('json.individualName', undefined);
    me.set('json.organizationName', 'bar');
    assert.equal(me.get('icon'), 'users');
    me.set('json.individualName', 'foo');
    assert.equal(me.get('icon'), 'user');
  });
});
define('mdeditor/tests/unit/models/dictionary-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
    const me = this.subject();

    assert.expect(1);
    me.set('json.dictionaryInfo.citation.title', 'bar');
    assert.equal(me.get('title'), 'bar');
  });
});
define('mdeditor/tests/unit/models/record-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
    const me = this.subject();

    assert.expect(1);
    me.set('json.metadata.resourceInfo.citation.title', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  (0, _emberQunit.test)('should correctly compute icon', function (assert) {
    const me = this.subject();
    const list = Ember.getOwner(this).lookup('service:icon');

    assert.expect(1);
    me.set('json.metadata.resourceInfo.resourceType', 'project');
    assert.equal(me.get('icon'), list.get('project'));
  });
});
define('mdeditor/tests/unit/models/setting-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('setting', 'Unit | Model | setting', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('mdeditor/tests/unit/pods/contact/new/id/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:contact/new/id', 'Unit | Route | contact/new/id', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/new/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:contact/new/index', 'Unit | Route | contact/new/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/show/edit/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:contact/show/edit', 'Unit | Route | contact/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contact/show/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:contact/show', 'Unit | Route | contact/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/contacts/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  let originalConfirm;

  (0, _emberQunit.moduleFor)('route:contacts', 'Unit | Route | contacts', {
    beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dashboard/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionaries/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  let originalConfirm;

  (0, _emberQunit.moduleFor)('route:dictionaries', 'Unit | Route | dictionaries', {
    beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('should display a confirm', function (assert) {
    assert.expect(2);

    let route = this.subject();

    // test _deleteItem to displays the expected window.confirm message
    const expectedTextFoo = 'foo';
    window.confirm = message => {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);

    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = message => {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/id/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/new/id', 'Unit | Route | dictionary/new/id', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/new/index', 'Unit | Route | dictionary/new/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/citation/identifier', 'Unit | Route | dictionary/show/edit/citation/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/citation/index', 'Unit | Route | dictionary/show/edit/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/citation', 'Unit | Route | dictionary/show/edit/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit/citation/identifier', 'Unit | Route | dictionary/show/edit/domain/edit/citation/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit/citation/index', 'Unit | Route | dictionary/show/edit/domain/edit/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit/citation', 'Unit | Route | dictionary/show/edit/domain/edit/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit/index', 'Unit | Route | dictionary/show/edit/domain/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/item/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit/item', 'Unit | Route | dictionary/show/edit/domain/edit/item', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/edit', 'Unit | Route | dictionary/show/edit/domain/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain/index', 'Unit | Route | dictionary/show/edit/domain/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/domain', 'Unit | Route | dictionary/show/edit/domain', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/attribute/index', 'Unit | Route | dictionary/show/edit/entity/edit/attribute/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/attribute', 'Unit | Route | dictionary/show/edit/entity/edit/attribute', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/citation/identifier', 'Unit | Route | dictionary/show/edit/entity/edit/citation/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/citation/index', 'Unit | Route | dictionary/show/edit/entity/edit/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/citation', 'Unit | Route | dictionary/show/edit/entity/edit/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit/index', 'Unit | Route | dictionary/show/edit/entity/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/edit', 'Unit | Route | dictionary/show/edit/entity/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/import/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/import', 'Unit | Route | dictionary/show/edit/entity/import', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity/index', 'Unit | Route | dictionary/show/edit/entity/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/entity', 'Unit | Route | dictionary/show/edit/entity', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit/index', 'Unit | Route | dictionary/show/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/edit', 'Unit | Route | dictionary/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show/index', 'Unit | Route | dictionary/show/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dictionary/show', 'Unit | Route | dictionary/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/error/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:error', 'Unit | Route | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/export/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:save', 'Unit | Route | save', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/help/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:help', 'Unit | Route | help', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/import/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:import', 'Unit | Route | import', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/not-found/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:not-found', 'Unit | Route | not found', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/publish/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:publish/index', 'Unit | Route | publish/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/publish/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:publish', 'Unit | Route | publish', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/index', 'Unit | Route | record/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/new/id/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/new/id', 'Unit | Route | record/new/id', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/new/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/new/index', 'Unit | Route | record/new/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/associated/index', 'Unit | Route | record/show/edit/associated/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/resource/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/associated/resource/index', 'Unit | Route | record/show/edit/associated/resource/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/resource/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/associated/resource', 'Unit | Route | record/show/edit/associated/resource', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/associated', 'Unit | Route | record/edit/associated', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/constraint/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/constraint/index', 'Unit | Route | record/show/edit/constraint/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/constraint/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/constraint', 'Unit | Route | record/show/edit/constraint', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/coverages/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/coverages', 'Unit | Route | record/edit/coverages', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/dictionary/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/dictionary', 'Unit | Route | record/show/edit/dictionary', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/distribution/distributor/index', 'Unit | Route | record/show/edit/distribution/distributor/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/distribution/distributor', 'Unit | Route | record/show/edit/distribution/distributor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/distribution/index', 'Unit | Route | record/show/edit/distribution/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/distribution', 'Unit | Route | record/edit/distribution', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/documents/citation/index', 'Unit | Route | record/show/edit/documents/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/documents/citation', 'Unit | Route | record/show/edit/documents/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/documents/index', 'Unit | Route | record/show/edit/documents/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/documents', 'Unit | Route | record/edit/documents', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/allocation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/funding/allocation', 'Unit | Route | record/show/edit/funding/allocation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/funding/index', 'Unit | Route | record/show/edit/funding/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/funding', 'Unit | Route | record/show/edit/funding', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/grid/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/grid', 'Unit | Route | record/edit/grid', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/index', 'Unit | Route | record/show/edit/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/keywords', 'Unit | Route | record/edit/keywords', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/thesaurus/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/keywords/thesaurus', 'Unit | Route | record/show/edit/keywords/thesaurus', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/citation/identifier', 'Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/citation/index', 'Unit | Route | record/show/edit/lineage/lineageobject/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/citation', 'Unit | Route | record/show/edit/lineage/lineageobject/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/index', 'Unit | Route | record/show/edit/lineage/lineageobject/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject', 'Unit | Route | record/show/edit/lineage/lineageobject', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/source/index', 'Unit | Route | record/show/edit/lineage/lineageobject/source/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/source', 'Unit | Route | record/show/edit/lineage/lineageobject/source', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/step/citation', 'Unit | Route | record/show/edit/lineage/lineageobject/step/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/step/index', 'Unit | Route | record/show/edit/lineage/lineageobject/step/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/lineage/lineageobject/step', 'Unit | Route | record/show/edit/lineage/lineageobject/step', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/main/citation/identifier', 'Unit | Route | record/show/edit/main/citation/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/main/citation/index', 'Unit | Route | record/show/edit/main/citation/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/main/citation', 'Unit | Route | record/show/edit/main/citation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/main/index', 'Unit | Route | record/show/edit/main/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/main', 'Unit | Route | record/show/edit/main', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/alternate/identifier', 'Unit | Route | record/show/edit/metadata/alternate/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/alternate/index', 'Unit | Route | record/show/edit/metadata/alternate/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/alternate', 'Unit | Route | record/show/edit/metadata/alternate', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/identifier', 'Unit | Route | record/show/edit/metadata/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/index', 'Unit | Route | record/show/edit/metadata/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/identifier/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/parent/identifier', 'Unit | Route | record/show/edit/metadata/parent/identifier', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/parent/index', 'Unit | Route | record/show/edit/metadata/parent/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata/parent', 'Unit | Route | record/show/edit/metadata/parent', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/metadata', 'Unit | Route | record/show/edit/metadata', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit', 'Unit | Route | record/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/extent/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/extent/spatial', 'Unit | Route | record/show/edit/extent/spatial', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/spatial/index', 'Unit | Route | record/show/edit/spatial/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/spatial', 'Unit | Route | record/show/edit/spatial', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/collection/index', 'Unit | Route | record/show/edit/taxonomy/collection/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/itis/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/collection/itis', 'Unit | Route | record/show/edit/taxonomy/collection/itis', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/collection', 'Unit | Route | record/show/edit/taxonomy/collection', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/collection/system/index', 'Unit | Route | record/show/edit/taxonomy/collection/system/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/collection/system', 'Unit | Route | record/show/edit/taxonomy/collection/system', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy/index', 'Unit | Route | record/show/edit/taxonomy/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/edit/taxonomy', 'Unit | Route | record/show/edit/taxonomy', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/index/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/index', 'Unit | Route | record/show/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show', 'Unit | Route | record/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/record/show/translate/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:record/show/translate', 'Unit | Route | record/show/translate', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/records/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  let originalConfirm;

  (0, _emberQunit.moduleFor)('route:records', 'Unit | Route | records', {
    beforeEach() {
      originalConfirm = window.confirm;
    },

    afterEach() {
      window.confirm = originalConfirm;
    }
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  (0, _emberQunit.test)('should display a confirm', function (assert) {
    assert.expect(2);

    let route = this.subject();

    // test _deleteItem to displays the expected window.confirm message
    const expectedTextFoo = 'foo';
    window.confirm = message => {
      assert.equal(message, expectedTextFoo, 'expect confirm to display ${expectedTextFoo}');
    };
    route._deleteItem(0, expectedTextFoo);

    // test action deleteItem calls _deleteItem and displays a window.confirm
    window.confirm = message => {
      assert.ok(message, 'expect confirm to display a message');
    };
    route.send('deleteItem', 0);
  });
});
define('mdeditor/tests/unit/pods/settings/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:settings', 'Unit | Route | settings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/pods/translate/route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:translate', 'Unit | Route | translate', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/routes/publish/sciencebase-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:publish/sciencebase', 'Unit | Route | publish/sciencebase', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    let route = this.subject();
    assert.ok(route);
  });
});
define('mdeditor/tests/unit/serializers/application-test', ['ember-data', 'ember-qunit'], function (_emberData, _emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('serializer:application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['transform:json']
  });

  (0, _emberQunit.test)('it serializes records', function (assert) {
    assert.expect(2);

    const getOwner = Ember.getOwner;

    let serializer = this.subject();
    let store = getOwner(this).lookup('service:store');
    let record;
    const expected = {
      "data": {
        "attributes": {
          "name": "foo",
          "skill": "bar",
          "games-played": "[100,200]"
        },
        "type": "tests"
      }
    };
    const data = {
      id: 1,
      name: 'foo',
      skill: 'bar',
      gamesPlayed: [100, 200]
    };
    let model = _emberData.default.Model.extend({
      name: _emberData.default.attr(),
      skill: _emberData.default.attr(),
      gamesPlayed: _emberData.default.attr('json')
    });

    this.register('model:test', model);

    Ember.run(function () {
      record = store.createRecord('test', data);
    });

    assert.deepEqual(record.serialize(), expected, 'record serialized OK');
    assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
  });
});
define('mdeditor/tests/unit/services/cleaner-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:cleaner', 'Unit | Service | cleaner', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/codelist-test', ['ember-qunit', 'npm:mdcodes/resources/js/mdcodes.js'], function (_emberQunit, _mdcodes) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:codelist', 'Unit | Service | codelist', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  (0, _emberQunit.test)('all codelists are present', function (assert) {
    var service = this.subject();

    Object.keys(_mdcodes.default).forEach(function (key) {
      const name = key.replace(/^iso_/, '');

      assert.ok(service.get(name), name + ' is present.');
    });
  });
});
define('mdeditor/tests/unit/services/contacts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:contacts', 'Unit | Service | contacts', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/icon-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('mdeditor/tests/unit/services/itis-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:itis', 'Unit | Service | itis', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/jsonvalidator-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:jsonvalidator', 'Unit | Service | jsonvalidator', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  (0, _emberQunit.test)('test jsonapi validation', function (assert) {
    var service = this.subject();
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
define('mdeditor/tests/unit/services/keyword-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:keyword', 'Unit | Service | keyword', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/mdjson-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:mdjson', 'Unit | Service | mdjson', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/patch-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:patch', 'Unit | Service | patch', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('mdeditor/tests/unit/services/publish-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:publish', 'Unit | Service | publish', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/settings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:settings', 'Unit | Service | settings', {
    // Specify the other units that are required for this test.
    needs: ['adapter:application', 'serializer:application', 'model:setting']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/slider-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:slider', 'Unit | Service | slider', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/services/spotlight-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:spotlight', 'Unit | Service | spotlight', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    let service = this.subject();
    assert.ok(service);
  });
});
define('mdeditor/tests/unit/transforms/json-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('transform:json', 'Unit | Transform | json', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  (0, _emberQunit.test)('it deserialized', function (assert) {
    let transform = this.subject();
    assert.deepEqual(transform.deserialize('{"foo":"bar"}'), {
      foo: "bar"
    });
  });

  (0, _emberQunit.test)('it serialized', function (assert) {
    let transform = this.subject();
    assert.equal(transform.serialize({
      foo: 'bar'
    }), '{"foo":"bar"}');
  });
});
define('mdeditor/tests/unit/utils/config-test', ['mdeditor/utils/config', 'qunit'], function (_config, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | config');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _config.default)();
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/utils/sb-tree-node-test', ['mdeditor/utils/sb-tree-node', 'qunit'], function (_sbTreeNode, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | sb tree node');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    let result = (0, _sbTreeNode.default)();
    assert.ok(result);
  });
});
define('mdeditor/tests/unit/validators/array-required-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('validator:array-required', 'Unit | Validator | array-required', {
    needs: ['validator:messages']
  });

  (0, _emberQunit.test)('it works', function (assert) {
    var validator = this.subject();
    assert.ok(validator);
  });
});
define('mdeditor/tests/unit/validators/array-valid-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('validator:array-valid', 'Unit | Validator | array-valid', {
    needs: ['validator:messages']
  });

  (0, _emberQunit.test)('it works', function (assert) {
    var validator = this.subject();
    assert.ok(validator);
  });
});
require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
