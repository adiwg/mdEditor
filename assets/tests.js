'use strict';

define("mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/components/md breadcrumb', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /record/new', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
      const listItems = (0, _testHelpers.findAll)('ol.breadcrumb li');
      const linkItems = (0, _testHelpers.findAll)('ol.breadcrumb li a');
      const hasRecordInallList = listItems[0].textContent.indexOf('Record') >= 0;
      const hasNewTextInallList = listItems[1].textContent.indexOf('New') >= 0;

      // const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
      // const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.equal(linkItems.length, 0, 'no links rendered');
      // assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
      // assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_qunit, _testHelpers, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contact copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var contact = store.createRecord('contact', (0, _createContact.default)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/contact/' + contact.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/contact/' + contact.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Copy of Contact0', 'created copy');

      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/new-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contact/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/contact/new', async function (assert) {
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.currentURL)().match(/contact\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact initial page conditions', async function (assert) {
      assert.expect(5);
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-off'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact individual', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[2], '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact organization', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.click)('.x-toggle-btn');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Organization Name');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-on'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, "Organization Name");
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact missing contact ID', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], '');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contacts/contacts-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contacts', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /contacts', async function (assert) {
      await (0, _testHelpers.visit)('/contacts');
      assert.equal((0, _testHelpers.currentURL)(), '/contacts');
    });
    (0, _qunit.test)('delete should display a confirm', async function (assert) {
      assert.expect(1);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      store.createRecord('contact');
      await (0, _testHelpers.visit)('/contacts');
      await (0, _testHelpers.click)('button.md-button-confirm.btn-danger');
      assert.equal((0, _testHelpers.find)('button.md-button-confirm.btn-danger').innerText.trim(), 'Confirm');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_qunit, _testHelpers, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/dictionary copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var dictionary = store.createRecord('dictionary', (0, _createDictionary.createDictionary)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/dictionary/' + dictionary.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/dictionary/' + dictionary.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Dictionary0', 'created copy');

      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/dictionary/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/dictionary/new', async function (assert) {
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.ok((0, _testHelpers.currentURL)().match(/dictionary\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary initial page conditions', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText, '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 2);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary completed form', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, 'Dictionary Name');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'aggregate');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 0);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing dictionary name', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing data resource type', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/record/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _testHelpers, _emberQunit, _createRecord, _createContact, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | raster view', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.afterEach(function () {
      (0, _mdHelpers.lsClean)();
    });
    (0, _qunit.skip)('visiting /raster', async function (assert) {
      let json = (0, _createRecord.createRecord)(1)[0];
      let contact = (0, _createContact.default)(2);
      json.json.contact = contact;
      let coverageDescription = (0, _createRecord.createCoverageDescription)(1);
      json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('record', json);
      record.save();
      await (0, _testHelpers.visit)(`/record/${record.id}/edit`);
      assert.equal((0, _testHelpers.currentURL)(), `/record/${record.id}/edit`);
    });

    // need to figure out why the Promise is being rejected when asserting the currentURL
    // is equal to asyny helper
    // skip('visiting raster page', async function(assert) {
    //     let store = this.owner.lookup('service:store');
    //     let json = createRecord(1)[0];
    //     let coverageDescription = createCoverageDescription(1);
    //     json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
    //     let record = store.createRecord('record', json);
    //     record.save();

    //   await visit(`/record/${record.id}/edit`);
    //   assert.equal(currentURL(), `/record/${record.id}/edit`);
    // });
  });
});
define("mdeditor/tests/acceptance/pods/record/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/record/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/record/new', async function (assert) {
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
    });
    (0, _qunit.test)('test new metadata record initial page conditions', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText.trim(), 'Choose type of resource');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record completed form', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], 'Record Title');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Record Title');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing record title', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing data record type (scope)', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Record Title');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/helpers/create-citation", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createCitation;
  function createCitation(total) {
    const citations = [];
    for (let i = 0; i < total; i++) {
      const citation = Ember.Object.create({
        "title": "title" + i,
        "alternateTitle": ["alternateTitle0", "alternateTitle1"],
        "date": [{
          "date": "2016-10-13",
          "dateType": "dateType"
        }, {
          "date": "2016-10-22",
          "dateType": "dateType"
        }],
        "edition": "edition",
        "responsibleParty": [{
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }],
        "presentationForm": ["presentationForm0", "presentationForm1"],
        "identifier": [{
          "identifier": "identifier" + i,
          "authority": {
            "title": "title"
          }
        }, {
          "identifier": "identifier-" + i
        }],
        "series": {
          "seriesName": "seriesName"
        },
        "otherCitationDetails": ["otherCitationDetails0", "otherCitationDetails1"],
        "onlineResource": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://mdeditor.org"
        }],
        "graphic": [{
          "fileName": "fileName"
        }, {
          "fileName": "fileName"
        }]
      });
      citations.push(citation);
    }
    return citations;
  }
});
define("mdeditor/tests/helpers/create-contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createContact;
  function createContact(total) {
    const contacts = [];
    for (let i = 0; i < total; i++) {
      const contact = Ember.Object.create({
        json: {
          "contactId": i,
          "isOrganization": false,
          "name": "Contact" + i,
          "positionName": null,
          "phoneBook": [],
          "address": {},
          "onlineResource": [],
          "contactInstructions": null
        },
        title: 'Contact' + i,
        icon: 'user',
        contactId: i
      });
      contacts.push(contact);
    }
    return contacts;
  }
});
define("mdeditor/tests/helpers/create-dictionary", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createEntity = _exports.createDomain = _exports.createDictionary = _exports.createAttribute = void 0;
  let createDictionary = function (total) {
    const dictionaries = [];
    for (let i = 0; i < total; i++) {
      const dictionary = Ember.Object.create({
        json: {
          "dataDictionary": {
            "citation": {
              "title": "My Dictionary" + i,
              "date": [{
                "date": new Date().toISOString(),
                "dateType": "creation"
              }]
            },
            "description": "Data dictionary." + i,
            subject: [],
            responsibleParty: {},
            domain: createDomain(2),
            entity: createEntity(2)
          }
        },
        title: 'My Dictionary' + i,
        icon: 'book'
      });
      dictionaries.push(dictionary);
    }
    return dictionaries;
  };
  _exports.createDictionary = createDictionary;
  let createDomain = function (total) {
    const domains = [];
    for (let i = 0; i < total; i++) {
      const domain = Ember.Object.create({
        "domainId": "domainId" + i,
        "commonName": "commonName" + i,
        "codeName": "codeName" + i,
        "description": "description" + i,
        "domainItem": [{
          "name": "name" + i,
          "value": "value" + i,
          "definition": "definition" + i
        }]
      });
      domains.push(domain);
    }
    return domains;
  };
  _exports.createDomain = createDomain;
  let createAttribute = function (total) {
    const attributes = [];
    for (let i = 0; i < total; i++) {
      const attribute = Ember.Object.create({
        "commonName": "attributeCommonName" + i,
        "codeName": "attributeCodeName0-" + i,
        "alias": ["attributeAlias0-" + i],
        "definition": "definition" + i,
        "dataType": "dataType" + i,
        "allowNull": true,
        "units": "units" + i,
        "domainId": "domainId" + i,
        "minValue": "0" + i,
        "maxValue": "99"
      });
      attributes.push(attribute);
    }
    return attributes;
  };
  _exports.createAttribute = createAttribute;
  let createEntity = function (total) {
    const entities = [];
    for (let i = 0; i < total; i++) {
      const entity = Ember.Object.create({
        "entityId": "entityId" + i,
        "commonName": "commonName" + i,
        "codeName": "codeName" + i,
        "alias": ["alias0-" + i, "alias1-" + i],
        "definition": "definition" + i,
        "primaryKeyAttributeCodeName": ["primaryKeyAttributeCodeName0-" + i, "primaryKeyAttributeCodeName1-" + i],
        "index": [{
          "codeName": "attributeIndex0-" + i,
          "allowDuplicates": false,
          "attributeCodeName": ["attributeCodeName0-" + i]
        }],
        "attribute": createAttribute(3),
        "foreignKey": [{
          "localAttributeCodeName": ["attributeCommonName0-" + i],
          "referencedEntityCodeName": "referencedEntityCodeName0" + i,
          "referencedAttributeCodeName": ["referencedAttributeCodeName0-" + i]
        }],
        "fieldSeparatorCharacter": ",",
        "numberOfHeaderLines": 9,
        "quoteCharacter": "\""
      });
      entities.push(entity);
    }
    return entities;
  };
  _exports.createEntity = createEntity;
});
define("mdeditor/tests/helpers/create-extent", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createExtent;
  function createExtent(total) {
    const contacts = [];
    for (let i = 0; i < total; i++) {
      const contact = Ember.Object.create({
        "description": "description" + i,
        "geographicExtent": [{
          "description": "description" + i,
          "boundingBox": {
            "westLongitude": -87.52179241764053,
            "eastLongitude": -85.30119385960293,
            "southLatitude": 29.640690610830635,
            "northLatitude": 30.42485959910817
          },
          "containsData": false,
          "geographicElement": [{
            "type": "Point",
            "coordinates": [100, 0]
          }, {
            "type": "LineString",
            "coordinates": [[100, 0], [101, 1]]
          }]
        }, {
          "geographicElement": [{
            "type": "Point",
            "coordinates": [100, 0]
          }]
        }],
        "temporalExtent": [{
          "timeInstant": {
            "description": "description" + i,
            "dateTime": "2016-10-24T11:10:15.2-10:00"
          }
        }, {
          "timePeriod": {
            "description": "description" + i,
            "startDateTime": "2016-10-24T11:10:15.2-10:00"
          }
        }],
        "verticalExtent": [{
          "description": "description" + i,
          "minValue": 9.9,
          "maxValue": 9.9,
          "crsId": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          }
        }, {
          "minValue": 9.9,
          "maxValue": 9.9,
          "crsId": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          }
        }]
      });
      contacts.push(contact);
    }
    return contacts;
  }
});
define("mdeditor/tests/helpers/create-identifier", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createIdentifier;
  function createIdentifier(total) {
    const identifiers = [];
    for (let i = 0; i < total; i++) {
      const identifier = Ember.Object.create({
        "identifier": "identifier" + i,
        "namespace": "namespace" + i,
        "version": "version" + i,
        "description": "description" + i,
        "authority": {
          "title": "title" + i
        }
      });
      identifiers.push(identifier);
    }
    return identifiers;
  }
});
define("mdeditor/tests/helpers/create-map-layer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createMapLayer;
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
define("mdeditor/tests/helpers/create-profile", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createProfile;
  function createProfile(total) {
    const profiles = [];
    for (let i = 0; i < total; i++) {
      const profile = Ember.Object.create({
        "uri": "https://jlblcc.github.io/test-profile/profiles/minimal.json",
        "alias": 'My alias' + i,
        "altDescription": 'alternate decscription' + i,
        "remoteVersion": "0.0.1",
        components: {
          "record": {
            "main": {
              "recordId": false,
              "purpose": false,
              "environmentDescription": false,
              "supplementalInfo": false,
              "credit": false,
              "timePeriod": {
                "id": false,
                "description": false,
                "periodName": false,
                "duration": false,
                "interval": false
              },
              "citation": {
                "edition": false,
                "onlineResource": {
                  "protocol": false
                },
                "presentationForm": false,
                "otherCitationDetails": false,
                "graphic": false,
                "series": false,
                "identifier": false,
                "graphicOverview": false
              },
              "graphicOverview": false
            },
            "metadata": {
              "identifier": {
                "identifier": true,
                "namespace": true,
                "version": false,
                "description": false,
                "authority": false
              },
              "parentMetadata": false,
              "alternateMetadataReference": false,
              "defaultLocale": false,
              "maintenance": false
            }
          }
        },
        description: "A Minimalist Profile" + i,
        hasUpdate: true,
        identifier: "minimal",
        localVersion: "0.0.0",
        namespace: "org.adiwg.profile",
        nav: {
          "record": [{
            "title": "Basic Info",
            "target": "record.show.edit.main",
            "tip": "This is a customized tip."
          }, {
            "title": "About Metadata",
            "target": "record.show.edit.metadata",
            "tip": "Information about the metadata for the resource."
          }, {
            "title": "Keywords",
            "target": "record.show.edit.keywords",
            "tip": "Terms used to describe the resource."
          }, {
            "title": "Boundaries",
            "target": "record.show.edit.extent",
            "tip": "Information describing the bounds of the resource."
          }, {
            "title": "Distribution",
            "target": "record.show.edit.distribution",
            "tip": "Information about obtaining the resource."
          }],
          "dictionary": [{
            "title": "Main",
            "target": "dictionary.show.edit.index",
            "tip": "Basic information about the dictionary."
          }, {
            "title": "Citation",
            "target": "dictionary.show.edit.citation",
            "tip": "The citation for the dictionary."
          }, {
            "title": "Tables",
            "target": "dictionary.show.edit.entity",
            "tip": "Information about entities(tables) and attributes(columns or fields)."
          }]
        },
        title: "Minimal",
        config: JSON.parse("{\"identifier\":\"minimal\",\"namespace\":\"org.adiwg.profile\",\"alternateId\":[],\"title\":\"Minimal\",\"description\":\"A Minimalist Profile\",\"version\":\"0.0.0\",\"components\":{\"record\":{\"main\":{\"recordId\":false,\"purpose\":false,\"environmentDescription\":false,\"supplementalInfo\":false,\"credit\":false,\"timePeriod\":{\"id\":false,\"description\":false,\"periodName\":false,\"duration\":false,\"interval\":false},\"citation\":{\"edition\":false,\"onlineResource\":{\"protocol\":false},\"presentationForm\":false,\"otherCitationDetails\":false,\"graphic\":false,\"series\":false,\"identifier\":false,\"graphicOverview\":false},\"graphicOverview\":false},\"metadata\":{\"identifier\":{\"identifier\":true,\"namespace\":true,\"version\":false,\"description\":false,\"authority\":false},\"parentMetadata\":false,\"alternateMetadataReference\":false,\"defaultLocale\":false,\"maintenance\":false}}},\"nav\":{\"record\":[{\"title\":\"Basic Info\",\"target\":\"record.show.edit.main\",\"tip\":\"This is a customized tip.\"},{\"title\":\"About Metadata\",\"target\":\"record.show.edit.metadata\",\"tip\":\"Information about the metadata for the resource.\"},{\"title\":\"Keywords\",\"target\":\"record.show.edit.keywords\",\"tip\":\"Terms used to describe the resource.\"},{\"title\":\"Boundaries\",\"target\":\"record.show.edit.extent\",\"tip\":\"Information describing the bounds of the resource.\"},{\"title\":\"Distribution\",\"target\":\"record.show.edit.distribution\",\"tip\":\"Information about obtaining the resource.\"}],\"dictionary\":[{\"title\":\"Main\",\"target\":\"dictionary.show.edit.index\",\"tip\":\"Basic information about the dictionary.\"},{\"title\":\"Citation\",\"target\":\"dictionary.show.edit.citation\",\"tip\":\"The citation for the dictionary.\"},{\"title\":\"Tables\",\"target\":\"dictionary.show.edit.entity\",\"tip\":\"Information about entities(tables) and attributes(columns or fields).\"}]}}")
      });
      profiles.push(profile);
    }
    return profiles;
  }
});
define("mdeditor/tests/helpers/create-record", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createRecord = _exports.createCoverageDescription = _exports.createAttribute = void 0;
  let createRecord = total => {
    const records = [];
    for (let i = 0; i < total; i++) {
      const record = Ember.Object.create({
        json: {
          schema: {
            name: 'mdJson',
            version: '2.7.0'
          },
          "metadata": {
            "metadataInfo": {
              "metadataIdentifier": {
                "identifier": 'r' + i,
                "type": "uuid"
              }
            },
            "associatedResource": [],
            "resourceInfo": {
              "resourceType": [{
                "type": "project"
              }],
              "citation": {
                "title": "My Record" + i,
                "date": [{
                  "date": new Date().toISOString(),
                  "dateType": "creation"
                }]
              },
              "pointOfContact": [{
                "role": "administrator"
              }],
              "pointOfrecord": [],
              "abstract": "An abstract.",
              "status": ["completed"],
              "language": ["eng; USA"]
            },
            "resourceDistribution": []
          }
        },
        title: 'My Record' + i,
        icon: 'project'
      });
      records.push(record);
    }
    return records;
  };
  _exports.createRecord = createRecord;
  let createCoverageDescription = total => {
    const coverageDescriptions = [];
    for (let i = 0; i < total; i++) {
      const coverageDescription = Ember.Object.create({
        "coverageName": "coverageName" + i,
        "coverageDescription": "coverageDescription" + i,
        "attributeGroup": [{
          "attributeContentType": ["attributeContentType" + i],
          "attribute": createAttribute(1).attributeDescription
        }],
        "processingLevelCode": {
          "identifier": "identifier" + i,
          "namespace": "namespace" + i
        },
        "imageDescription": {
          "illuminationElevationAngle": i.toString(),
          "illuminationAzimuthAngle": i.toString(),
          "imagingCondition": "imagingCondition" + i,
          "imageQualityCode": {
            "identifier": "identifier" + i,
            "namespace": "namespace" + i
          },
          "cloudCoverPercent": i.toString(),
          "compressionQuantity": i.toString(),
          "triangulationIndicator": true,
          "radiometricCalibrationAvailable": false,
          "cameraCalibrationAvailable": true,
          "filmDistortionAvailable": false,
          "lensDistortionAvailable": false
        }
      });
      coverageDescriptions.push(coverageDescription);
    }
    return coverageDescriptions;
  };
  _exports.createCoverageDescription = createCoverageDescription;
  let createAttribute = total => {
    const attributes = [];
    for (var i = 0; i < total; i++) {
      const attribute = Ember.Object.create({
        "attributeDescription": "attributeDescription" + i,
        "attributeIdentifier": [{
          "identifier": "identifier" + i,
          "namespace": "namespace" + i
        }],
        "bandBoundaryDefinition": ["bandBoundaryDefinition" + i],
        "transferFunctionType": ["transferFunctionType" + i],
        "transmittedPolarization": ["transmittedPolarization" + i],
        "detectedPolarization": ["detectedPolarization" + i],
        "sequenceIdentifier": "sequenceIdentifier" + i,
        "sequenceIdentifierType": "sequenceIdentifierType" + i,
        "minValue": i.toString(),
        "maxValue": i.toString(),
        "units": "units" + i,
        "scaleFactor": i.toString(),
        "offset": i.toString(),
        "meanValue": i.toString(),
        "numberOfValues": i.toString(),
        "standardDeviation": i.toString(),
        "bitsPerValue": i.toString(),
        "boundMin": i.toString(),
        "boundMax": i.toString(),
        "boundUnits": i.toString(),
        "peakResponse": i.toString(),
        "toneGradations": i.toString(),
        "nominalSpatialResolution": i.toString()
      });
      attributes.push(attribute);
    }
    return attributes;
  };
  _exports.createAttribute = createAttribute;
});
define("mdeditor/tests/helpers/create-taxonomy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createTaxonomy;
  function createTaxonomy() {
    const taxonomies = [{
      "taxonomicClassification": [{
        "taxonomicSystemId": "555705",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Fungi",
        "subClassification": [{
          "taxonomicSystemId": "936287",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Dikarya",
          "subClassification": [{
            "taxonomicSystemId": "623881",
            "taxonomicLevel": "Division",
            "taxonomicName": "Basidiomycota",
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true,
        "commonName": ["Kingdom"]
      }, {
        "taxonomicSystemId": "202423",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Animalia",
        "subClassification": [{
          "taxonomicSystemId": "914153",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Radiata",
          "subClassification": [{
            "taxonomicSystemId": "48738",
            "taxonomicLevel": "Phylum",
            "taxonomicName": "Cnidaria",
            "subClassification": [{
              "taxonomicSystemId": "718920",
              "taxonomicLevel": "Subphylum",
              "taxonomicName": "Medusozoa",
              "subClassification": [{
                "taxonomicSystemId": "51483",
                "taxonomicLevel": "Class",
                "taxonomicName": "Scyphozoa",
                "subClassification": [{
                  "taxonomicSystemId": "718923",
                  "taxonomicLevel": "Subclass",
                  "taxonomicName": "Discomedusae",
                  "subClassification": [{
                    "taxonomicSystemId": "51756",
                    "taxonomicLevel": "Order",
                    "taxonomicName": "Rhizostomeae",
                    "subClassification": [{
                      "taxonomicSystemId": "51911",
                      "taxonomicLevel": "Family",
                      "taxonomicName": "Rhizostomatidae",
                      "subClassification": [{
                        "taxonomicSystemId": "51919",
                        "taxonomicLevel": "Genus",
                        "taxonomicName": "Rhopilema",
                        "subClassification": [{
                          "taxonomicSystemId": "51920",
                          "taxonomicLevel": "Species",
                          "taxonomicName": "Rhopilema verrilli",
                          "commonName": ["mushroom jellyfish"],
                          "isITIS": true
                        }],
                        "isITIS": true
                      }],
                      "isITIS": true
                    }],
                    "isITIS": true
                  }],
                  "isITIS": true
                }],
                "isITIS": true
              }],
              "isITIS": true
            }],
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true
      }],
      "taxonomicSystem": [{
        "citation": {
          "title": "Integrated Taxonomic Information System (ITIS)",
          "date": [{
            "date": "2019-02-26",
            "dateType": "transmitted",
            "description": "Taxa imported from ITIS"
          }],
          "presentationForm": ["webService", "webSite"],
          "otherCitationDetails": ["Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov."],
          "onlineResource": [{
            "uri": "https://www.itis.gov",
            "name": "ITIS website",
            "protocol": "HTTPS",
            "function": "information",
            "description": "ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world."
          }],
          "graphic": [{
            "fileName": "itis_logo.jpg",
            "fileType": "JPEG",
            "fileUri": [{
              "uri": "https://itis.gov/Static/images/itis_logo.jpg"
            }]
          }]
        },
        modifications: "modifications"
      }],
      "observer": [{
        "party": [{
          "contactId": "CID003"
        }],
        "role": "pointOfContact"
      }],
      "voucher": [{
        "repository": {
          "party": [{
            "contactId": "CID003"
          }],
          "role": "custodian"
        },
        "specimen": "Specimen"
      }],
      "generalScope": "Scope",
      "identificationProcedure": "Id Procedure",
      "identificationCompleteness": "Id Completeness"
    }, {
      "taxonomicSystem": [{
        "citation": {
          "title": "ITIS - Integrated Taxonomic Information System",
          "alternateTitle": ["Citation for ITIS"],
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        },
        "modifications": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }, {
        "citation": {
          "title": "Some OTHER Taxonomic System",
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        }
      }],
      "generalScope": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationReference": [{
        "title": "citation",
        "identifier": [{
          "identifier": "identifier0",
          "namespace": "namespace0",
          "version": "version0",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title0",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }, {
        "title": "citation1",
        "identifier": [{
          "identifier": "identifier1",
          "namespace": "namespace1",
          "version": "version1",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title1",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }],
      "observer": [{
        "party": [{
          "contactId": "CID006"
        }, {
          "contactId": "CID004"
        }],
        "role": "coPrincipalInvestigator"
      }, {
        "party": [{
          "contactId": "CID001"
        }],
        "role": "editor"
      }],
      "identificationProcedure": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationCompleteness": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "voucher": [{
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "bear claw"
      }, {
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "moose tooth"
      }],
      "taxonomicClassification": [{
        "taxonomicLevel": "taxonomicLevel0",
        "taxonomicName": "taxonomicName",
        "commonName": ["commonName0", "commonName1"],
        "subClassification": [{
          "taxonomicSystemId": "taxonomicSystemId00",
          "taxonomicLevel": "taxonomicLevel00",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel000",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"],
            "subClassification": [{
              "taxonomicSystemId": "taxonomicSystemId0000.1",
              "taxonomicLevel": "taxonomicLevel0000.1",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }, {
              "taxonomicSystemId": "taxonomicSystemId0000.2",
              "taxonomicLevel": "taxonomicLevel0000.2",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }]
          }]
        }, {
          "taxonomicLevel": "taxonomicLevel01",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel010",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"]
          }]
        }]
      }, {
        "taxonomicLevel": "taxonomicLevel0201",
        "taxonomicName": "taxonomicName"
      }]
    }];
    return taxonomies;
  }
});
define("mdeditor/tests/helpers/data-transfer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var c = Ember.Object.extend({
    getData: function () {
      return this.get('payload');
    },
    setData: function (dataType, payload) {
      this.set("data", {
        dataType: dataType,
        payload: payload
      });
    }
  });
  c.reopenClass({
    makeMockEvent: function (payload) {
      var transfer = this.create({
        payload: payload
      });
      var res = {
        dataTransfer: transfer
      };
      res.preventDefault = function () {
        console.log('prevent default');
      };
      res.stopPropagation = function () {
        console.log('stop propagation');
      };
      return res;
    },
    createDomEvent: function (type) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function (type, val) {
          this.data[type] = val;
        },
        getData: function (type) {
          return this.data[type];
        }
      };
      return event;
    }
  });
  var _default = c;
  _exports.default = _default;
});
define("mdeditor/tests/helpers/destroy-app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;
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
define("mdeditor/tests/helpers/drag-drop", ["exports", "@ember/test-helpers", "mdeditor/tests/helpers/mock-event"], function (_exports, _testHelpers, _mockEvent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.drag = drag;
  async function dragOver(dropSelector, moves) {
    moves = moves || [[{
      clientX: 1,
      clientY: 1
    }, dropSelector]];
    for (const move of moves) {
      const position = move[0] || false;
      const selector = move[1] || false;
      const event = new _mockEvent.default(position);
      await (0, _testHelpers.triggerEvent)(selector || dropSelector, 'dragover', event);
    }
  }
  async function drop(dragSelector, dragEvent, options) {
    let {
      drop: dropSelector,
      dropEndOptions,
      dragOverMoves
    } = options;
    let dropElement = await (0, _testHelpers.find)(dropSelector);
    if (!dropElement) {
      throw `There are no drop targets by the given selector: '${dropSelector}'`;
    }
    await dragOver(dropSelector, dragOverMoves);
    if (options.beforeDrop) {
      await options.beforeDrop.call();
    }
    let event = new _mockEvent.default().useDataTransferData(dragEvent);
    await (0, _testHelpers.triggerEvent)(dropSelector, 'drop', event);
    return await (0, _testHelpers.triggerEvent)(dragSelector, 'dragend', dropEndOptions);
  }
  async function drag(dragSelector) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let dragEvent = new _mockEvent.default(options.dragStartOptions);
    await (0, _testHelpers.triggerEvent)(dragSelector, 'mouseover');
    await (0, _testHelpers.triggerEvent)(dragSelector, 'dragstart', dragEvent);
    if (options.afterDrag) {
      await options.afterDrag.call();
    }
    if (options.drop) {
      await drop(dragSelector, dragEvent, options);
    }
  }
});
define("mdeditor/tests/helpers/ember-cli-file-picker", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.uploadFileHelper = _exports.uploadFile = void 0;
  function createFile() {
    let content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['test'];
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      name,
      type,
      lastModifiedDate
    } = options;
    const file = new Blob(content, {
      type: type ? type : 'text/plain'
    });
    file.name = name ? name : 'test.txt';
    return file;
  }
  const uploadFileHelper = function (content, options) {
    const file = createFile(content, options);
    const event = jQuery.Event('change');
    event.target = {
      files: [file]
    };
    jQuery('.file-picker__input').trigger(event);
  };
  _exports.uploadFileHelper = uploadFileHelper;
  const uploadFile = Ember.Test.registerAsyncHelper('uploadFile', function (app, content, options) {
    uploadFileHelper(content, options);
    return wait();
  });
  _exports.uploadFile = uploadFile;
});
define("mdeditor/tests/helpers/ember-drag-drop", ["exports", "mdeditor/tests/helpers/data-transfer"], function (_exports, _dataTransfer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.drag = drag;
  function drop($dragHandle, dropCssPath, dragEvent) {
    let dropTarget = document.querySelector(dropCssPath);
    if (dropTarget.length === 0) {
      throw `There are no drop targets by the given selector: '${dropCssPath}'`;
    }
    Ember.run(() => {
      triggerEvent(dropTarget, 'dragover', _dataTransfer.default.makeMockEvent());
    });
    Ember.run(() => {
      triggerEvent(dropTarget, 'drop', _dataTransfer.default.makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });
    Ember.run(() => {
      triggerEvent($dragHandle, 'dragend', _dataTransfer.default.makeMockEvent());
    });
  }
  function drag(cssPath) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let dragEvent = _dataTransfer.default.makeMockEvent();
    let dragHandle = document.querySelector(cssPath);
    Ember.run(() => {
      triggerEvent(dragHandle, 'mouseover');
    });
    Ember.run(() => {
      triggerEvent(dragHandle, 'dragstart', dragEvent);
    });
    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });
    andThen(function () {
      if (options.drop) {
        drop(dragHandle, options.drop, dragEvent);
      }
    });
  }
});
define("mdeditor/tests/helpers/ember-power-select", ["exports", "ember-power-select/test-support/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clickTrigger = void 0;
  _exports.default = deprecatedRegisterHelpers;
  _exports.typeInSearch = _exports.triggerKeydown = _exports.touchTrigger = _exports.selectChoose = _exports.nativeTouch = _exports.nativeMouseUp = _exports.nativeMouseDown = _exports.findContains = void 0;
  function deprecateHelper(fn, name) {
    return function () {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, {
        until: '1.11.0',
        id: `ember-power-select-test-support-${name}`
      }));
      return fn(...arguments);
    };
  }
  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  _exports.findContains = findContains;
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  _exports.nativeMouseDown = nativeMouseDown;
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  _exports.nativeMouseUp = nativeMouseUp;
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  _exports.triggerKeydown = triggerKeydown;
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  _exports.typeInSearch = typeInSearch;
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  _exports.clickTrigger = clickTrigger;
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  _exports.nativeTouch = nativeTouch;
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  _exports.touchTrigger = touchTrigger;
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');
  _exports.selectChoose = selectChoose;
  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, {
      until: '1.11.0',
      id: 'ember-power-select-test-support-register-helpers'
    }));
    return (0, _helpers.default)();
  }
});
define("mdeditor/tests/helpers/flash-message", ["ember-cli-flash/flash/object"], function (_object) {
  "use strict";

  _object.default.reopen({
    init() {
      return this;
    }
  });
});
define("mdeditor/tests/helpers/md-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.formatContent = formatContent;
  _exports.nestedValues = _exports.lsClean = void 0;
  _exports.parseInput = parseInput;
  /**
   * The parseInput helper will query for any input, textarea, or instance of
   * md-select and return the value(s) as a delimited string. Set delimiter to
   * `false` to return an array of values.
   *
   * @method parseInput
   * @param {Element} e The element to parse
   * @param {String|false} delimiter The delimiter to use, Defaults to `|`. Set to `false` to
   * return `[values]`
   * @static
   * @return {String|Array}
   */
  function parseInput(e) {
    let delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';
    // TODO: Support md-toggle
    let text = Array.from(e.querySelectorAll('input,textarea,.md-select')).map(i => (i.type === 'checkbox' ? i.checked.toString() : false) || i.value || Array.from(i.querySelectorAll('.select-value')).map(n => n.textContent).join('|'));
    return delimiter ? text.join(delimiter) : text;
  }
  function formatContent(t) {
    return t.textContent.replace(/[\s\n]+/g, '|').trim();
  }
  let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];
  _exports.nestedValues = nestedValues;
  let lsClean = () => {
    let ls = window.localStorage;
    Object.keys(ls).forEach(k => {
      // eslint-disable-next-line no-useless-escape
      if (k.match(/^test\:/)) {
        ls.removeItem(k);
        console.info('Removed record:' + k);
      }
    });
  };
  _exports.lsClean = lsClean;
});
define("mdeditor/tests/helpers/mock-event", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createDomEvent = createDomEvent;
  _exports.default = void 0;
  class DataTransfer {
    constructor() {
      this.data = {};
    }
    setData(type, value) {
      this.data[type] = value;
      return this;
    }
    getData() {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Text";
      return this.data[type];
    }
    setDragImage() {}
  }
  class MockEvent {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.dataTransfer = new DataTransfer();
      this.dataTransfer.setData('Text', options.dataTransferData);
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
  _exports.default = MockEvent;
  function createDomEvent(type) {
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, null);
    event.dataTransfer = new DataTransfer();
    return event;
  }
});
define("mdeditor/tests/helpers/modal-asserts", ["exports", "jquery", "qunit"], function (_exports, _jquery, _qunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = registerAssertHelpers;
  function registerAssertHelpers() {
    const {
      assert
    } = _qunit.default;
    const overlaySelector = '.md-modal-overlay';
    const dialogSelector = '.ember-modal-dialog';
    assert.isPresentOnce = function (selector, message) {
      message = message || `${selector} is present in DOM once`;
      return this.equal((0, _jquery.default)(selector).length, 1, message);
    };
    assert.isAbsent = function (selector, message) {
      message = message || `${selector} is absent from DOM`;
      return this.equal((0, _jquery.default)(selector).length, 0, message);
    };
    assert.isVisible = function (selector, message) {
      message = message || `${selector} is not visible`;
      return this.ok((0, _jquery.default)(selector).is(':visible'), message);
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
define("mdeditor/tests/helpers/start-app", ["exports", "mdeditor/app", "mdeditor/config/environment", "mdeditor/tests/helpers/modal-asserts", "mdeditor/tests/helpers/ember-power-select"], function (_exports, _app, _environment, _modalAsserts, _emberPowerSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;
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
define("mdeditor/tests/integration/components/feature-form-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        id: 'foo',
        properties: {
          name: 'bar',
          description: 'foobar'
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{feature-form model=model}}
      */
      {
        "id": "zqCRS9hC",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"feature-form\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#feature-form model=model}}
              template block text
            {{/feature-form}}
          
      */
      {
        "id": "von06tDY",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"feature-form\",null,[[\"model\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/components/feature-group-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature group', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{#feature-group name="Extents" default=true}}
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true}}
                {{/each}}
              {{/feature-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "mSlXIeXa",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[28,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[24,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[24,[\"layers\"]]],null,{\"statements\":[[0,\"            \"],[1,[28,\"geojson-layer\",null,[[\"geoJSON\",\"draw\"],[[23,1,[]],true]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[22,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/feature-table-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.zoomTo = function () {
        assert.ok(true, 'called zoomTo');
      };
      this.showForm = function () {
        assert.ok(true, 'clicked showForm');
      };
      this.deleteFeature = function () {
        assert.ok(true, 'clicked deleteFeature');
      };
      this.set('data', (0, _createMapLayer.default)(2));
      assert.expect(4);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{feature-table
            data=data.features
            columnComponents=(hash
              leaflet-table-row-actions=(component "leaflet-table-row-actions"
              showForm=showForm
              zoomTo=zoomTo
              deleteFeature=deleteFeature
            ))
          }}
      */
      {
        "id": "+59K97qw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"feature-table\",null,[[\"data\",\"columnComponents\"],[[24,[\"data\",\"features\"]],[28,\"hash\",null,[[\"leaflet-table-row-actions\"],[[28,\"component\",[\"leaflet-table-row-actions\"],[[\"showForm\",\"zoomTo\",\"deleteFeature\"],[[24,[\"showForm\"]],[24,[\"zoomTo\"]],[24,[\"deleteFeature\"]]]]]]]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s, \t]/g, '\n').trim().replace(/[ +\n]+/g, '|'), 'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1');
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-success'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-info'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-danger'));
    });
  });
});
define("mdeditor/tests/integration/components/geojson-layer-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | geojson layer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{#feature-group name="Extents" default=true}}
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true editLayers=layers}}
                {{/each}}
              {{/feature-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "V09y6BZy",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[28,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[24,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[24,[\"layers\"]]],null,{\"statements\":[[0,\"            \"],[1,[28,\"geojson-layer\",null,[[\"geoJSON\",\"draw\",\"editLayers\"],[[23,1,[]],true,[24,[\"layers\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[22,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-draw-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet draw', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "RlgiTreF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[28,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[24,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[22,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-actions-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table row actions', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.zoomTo = function () {};
      this.showForm = function () {};
      this.deleteFeature = function () {};
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table-row-actions
            zoomTo=zoomTo
            showForm=showForm
            deleteFeature=deleteFeature
          }}
      */
      {
        "id": "wm33aNOw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"leaflet-table-row-actions\",null,[[\"zoomTo\",\"showForm\",\"deleteFeature\"],[[24,[\"zoomTo\"]],[24,[\"showForm\"]],[24,[\"deleteFeature\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('button').length, 3);
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table row', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table-row}}
      */
      {
        "id": "P92N9X7U",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"leaflet-table-row\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('tr').length, 1);
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table layers=layers.features
            resizeDebouncedEventsEnabled=true}}
      */
      {
        "id": "tWrXLNFF",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"leaflet-table\",null,[[\"layers\",\"resizeDebouncedEventsEnabled\"],[[24,[\"layers\",\"features\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1');
    });
  });
});
define("mdeditor/tests/integration/components/sb-publisher-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb publisher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('config', {
        name: 'ScienceBase',
        route: 'sciencebase',
        description: 'ScienceBase is a collaborative scientific data and information management platform',
        //image: 'https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/content_list_thumbnail/public/thumbnails/image/ScienceBase-DescImage.jpg'
        icon: 'globe',
        rootURI: 'https://api.sciencebase.gov/sbmd-service/',
        jossoURL: 'https://www.sciencebase.gov/catalog/jossoHelper/sessionInfo?includeJossoSessionId=true',
        rootItemURL: 'https://www.sciencebase.gov/catalog/item/',
        defaultParent: '59ef8a34e4b0220bbd98d449',
        settingsComponent: 'sb-settings'
      });
      this.set('settings', Ember.Object.create({
        data: {
          publishOptions: {}
        }
      }));
      this.set('records', (0, _createRecord.default)(3));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-publisher config=config settings=settings records=records}}
      */
      {
        "id": "q4nF2V5F",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"sb-publisher\",null,[[\"config\",\"settings\",\"records\"],[[24,[\"config\"]],[24,[\"settings\"]],[24,[\"records\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 4);
    });
  });
});
define("mdeditor/tests/integration/components/sb-settings-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb settings', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-settings}}
      */
      {
        "id": "X4SFMJyq",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"sb-settings\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('input').length, 1);
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-label-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-tree-label model=model}}
      */
      {
        "id": "37dk+wnz",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"sb-tree-label\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-cell').innerText.trim(), 'Data Management Strategy : test Parent Id: None --');
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb tree', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [{
        children: [{
          definition: 'Child 1.',
          hideCheck: false,
          icon: 'globe',
          id: '4ebb8fe5-f88f-49a4-9964-1',
          identifier: '4ebb8fe5-f88f-49a4-9964-1',
          isSelected: false,
          label: 'Child 1',
          nodeClass: 'tree-node-rooted',
          notSelectable: false,
          sbDate: null,
          sbId: 'test1',
          sbParentId: null,
          sbParentIdObj: undefined,
          sortOrder: 0,
          type: 'map',
          uuid: '4ebb8fe5-f88f-49a4-9964-1'
        }],
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        isExpanded: true,
        isRoot: true,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-tree model=model labelComponent="sb-tree-label"}}
      */
      {
        "id": "NDA/Pok4",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"sb-tree\",null,[[\"model\",\"labelComponent\"],[[24,[\"model\"]],\"sb-tree-label\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Data|Management|Strategy|:|test|?|Child|1|:|test1|Parent|Id:|None|--|?');
      assert.equal((0, _testHelpers.findAll)('.tree-branch')[1].innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Child|1|:|test1|Parent|Id:|None|--|?');
    });
  });
});
define("mdeditor/tests/integration/components/tree-branch-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree branch', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
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
      this.set('path', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{tree-branch model=model
                select=select
                selected=selected
                nodeDepth=3
                path=path
            }}
      */
      {
        "id": "OJKnbKHR",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[24,[\"model\"]],[24,[\"select\"]],[24,[\"selected\"]],3,[24,[\"path\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.expect(3);
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-branch model=model
              select=select
              selected=selected
              nodeDepth=3
              path=path
            }}
              template block text
            {{/tree-branch}}
          
      */
      {
        "id": "S915ZCbU",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[24,[\"model\"]],[24,[\"select\"]],[24,[\"selected\"]],3,[24,[\"path\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.tree-leaf .toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.replace(/[\s\n]+/g, '|'), '|foo1label|foo2label');
      assert.equal((0, _testHelpers.findAll)('.tree-leaf')[1].querySelectorAll('.tree-indent').length, 3, 'proper indentation');
    });
  });
});
define("mdeditor/tests/integration/components/tree-label-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
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

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-label model=model}}
      */
      {
        "id": "fkICw9HE",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"tree-label\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-label model=model}}
              template block text
            {{/tree-label}}
          
      */
      {
        "id": "udnZOytJ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-label\",null,[[\"model\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');
    });
  });
});
define("mdeditor/tests/integration/components/tree-leaf-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree leaf', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
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
      this.set('nodePath', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-leaf model=model
            inTree=true
            select=select
            selected=selected
            nodeDepth=3
            nodePath=nodePath
          }}
      */
      {
        "id": "quSG1G17",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\",\"nodeDepth\",\"nodePath\"],[[24,[\"model\"]],true,[24,[\"select\"]],[24,[\"selected\"]],3,[24,[\"nodePath\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-leaf model=model
              inTree=false
              select=select
              selected=selected
            }}
              template block text
            {{/tree-leaf}}
          
      */
      {
        "id": "wcFrt4pB",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\"],[[24,[\"model\"]],false,[24,[\"select\"]],[24,[\"selected\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');
      assert.equal((0, _testHelpers.findAll)('.tree-indent').length, 0, 'not in tree');
    });
  });
});
define("mdeditor/tests/integration/components/tree-search-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree search', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
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
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{tree-search
              model=model
              selected=selected
              select=select
              searchString=searchString
              exactMatch=exactMatch
            }}
      */
      {
        "id": "uGb817V1",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"tree-search\",null,[[\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"],[[24,[\"model\"]],[24,[\"selected\"]],[24,[\"select\"]],[24,[\"searchString\"]],[24,[\"exactMatch\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|3|matches|found.|barfoo1label|foo1label|foo2label', 'search OK');
      this.set('exactMatch', true);
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo2label', 'exact match');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-search
              model=model
              selected=selected
              select=select
            }}
              template block text
            {{/tree-search}}
          
      */
      {
        "id": "1QAiNJP7",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-search\",null,[[\"model\",\"selected\",\"select\"],[[24,[\"model\"]],[24,[\"selected\"]],[24,[\"select\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|template|block|text', 'block');
    });
  });
});
define("mdeditor/tests/integration/components/tree-view-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders and expands', async function (assert) {
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
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-view model=model selected=selected}}
      */
      {
        "id": "UwSxCJQ6",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"tree-view\",null,[[\"model\",\"selected\"],[[24,[\"model\"]],[24,[\"selected\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label');
      assert.ok((0, _testHelpers.find)('.tree-leaf').classList.contains('tree-highlight'), 'selected leaf highlighted');
      assert.equal((0, _testHelpers.findAll)('.tree-leaf .expand-icon').length, 1, 'node expand icon rendered');
      await (0, _testHelpers.click)((0, _testHelpers.find)('.expand-icon'));
      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 3, 'node expanded');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-view model=model select=select}}
              template block text
            {{/tree-view}}
          
      */
      {
        "id": "OHjnoj3O",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-view\",null,[[\"model\",\"select\"],[[24,[\"model\"]],[24,[\"select\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label|foo2label');
      await (0, _testHelpers.click)((0, _testHelpers.findAll)('.tree-leaf')[1]);
      assert.equal((0, _testHelpers.findAll)('.tree-leaf.tree-highlight').length, 2, 'node selected');
    });
  });
});
define("mdeditor/tests/integration/helpers/object-is-empty-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | object-is-empty', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object-is-empty inputValue}}
      */
      {
        "id": "GSagCU8j",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object-is-empty\",[[24,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "false");
    });
  });
});
define("mdeditor/tests/integration/helpers/present-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('helper:present', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{present inputValue}}</section>
      */
      {
        "id": "wL4s7BkC",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"present\",[[24,[\"inputValue\"]]],null],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'true');
    });
  });
});
define("mdeditor/tests/integration/helpers/word-limit-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('helper:word-limit', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, neque
      nec sagittis maximus, lacus lectus placerat libero, finibus varius arcu enim
      eget ante. Duis.`);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{word-limit inputValue limit=20 wordLength=10}}</section>
      */
      {
        "id": "Xr1JHQPo",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"word-limit\",[[24,[\"inputValue\"]]],[[\"limit\",\"wordLength\"],[20,10]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), `Lorem ipsum dolor sit amet,  consectetu... adipiscing...elit. Etiam rutrum, neque nec sagittis maximus, lacus lectus placerat libero, finibus varius ...`);
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-alert-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-alert-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-alert-table
            title="Foos"
            required=true
            tipMessage="Biz is baz."
          }}
      */
      {
        "id": "db5ZT1dX",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-alert-table\",null,[[\"title\",\"required\",\"tipMessage\"],[\"Foos\",true,\"Biz is baz.\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'No|Foos|found.|Add|Foo|');
      await (0, _testHelpers.triggerEvent)('.md-danger.ember-tooltip-target', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Biz is baz.'
      });
      assert.dom('.md-alert-table.alert-danger').exists();
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-alert-table title="Bars"}}
              template block text
            {{/control/md-alert-table}}
          
      */
      {
        "id": "QiwhbZXM",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-alert-table\",null,[[\"title\"],[\"Bars\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Bars|found.|Add|Bar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-confirm/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md button confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button-confirm}}
      */
      {
        "id": "tqvrE4qs",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-button-confirm\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-confirm}}
              template block text
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "RGc0SS/2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'template block text');
    });
    (0, _qunit.test)('shows and cancels confirm', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <a href="#">Test</a>
            {{#control/md-button-confirm}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "FyQue1/5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"a\",true],[10,\"href\",\"#\"],[8],[0,\"Test\"],[9],[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"        Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'renders button');
      await (0, _testHelpers.click)('button');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Confirm', 'renders confirm');
      await (0, _testHelpers.triggerEvent)('button', 'blur');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'cancels confirm');
    });
    (0, _qunit.test)('performs confirm action', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "cwKh8wcL",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,[[\"onConfirm\"],[[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"onConfirm\"],null]]],{\"statements\":[[0,\"        Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button');
      await (0, _testHelpers.click)('button');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-modal/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/modal-asserts"], function (_testHelpers, _qunit, _emberQunit, _modalAsserts) {
  "use strict";

  (0, _modalAsserts.default)();
  (0, _qunit.module)('Integration | Component | control/md button modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button-modal}}
      */
      {
        "id": "ZSKm2QLB",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-button-modal\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-modal}}
              template block text
            {{/control/md-button-modal}}
          
      */
      {
        "id": "F6rZnLP/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-modal\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), 'template block text', 'block');
    });
    (0, _qunit.test)('shows modal and performs actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // let modalDialogService = this.owner.lookup('service:modal-dialog');
      // modalDialogService.destinationElementId = 'test-div';

      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
                message="Hello" onConfirm=(action externalAction "confirm")
                onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "7TD1VSEX",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\",true],[10,\"id\",\"test-div\"],[8],[9],[0,\"\\n      \"],[4,\"control/md-button-modal\",null,[[\"message\",\"onConfirm\",\"onCancel\"],[\"Hello\",[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"confirm\"],null],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"cancel\"],null]]],{\"statements\":[[0,\" Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      // click the button
      await (0, _testHelpers.click)('.md-button-modal');
      assert.isPresentOnce('.md-modal-overlay');
      await (0, _testHelpers.clearRender)();
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
              renderInPlace=true
              message="Hello" onConfirm=(action externalAction "confirm")
              onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "A8QcUo7q",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\",true],[10,\"id\",\"test-div\"],[8],[9],[0,\"\\n      \"],[4,\"control/md-button-modal\",null,[[\"renderInPlace\",\"message\",\"onConfirm\",\"onCancel\"],[true,\"Hello\",[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"confirm\"],null],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"cancel\"],null]]],{\"statements\":[[0,\" Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      // click the button
      await (0, _testHelpers.click)('.md-button-modal');
      await (0, _testHelpers.click)('.md-button-modal');
      assert.isAbsent('.md-modal-overlay');

      // click the modal buttons
      await (0, _testHelpers.click)('.md-button-modal');
      let num = (0, _testHelpers.findAll)('.md-modal-buttons button').length;
      let i = 0;
      while (i < num) {
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.md-modal-buttons button')[i]);
        i++;
      }
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function (val) {
        assert.ok(val, 'Click action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button text="Click me" click=(action myAction true)}}
      */
      {
        "id": "ZC0cOZ/H",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-button\",null,[[\"text\",\"click\"],[\"Click me\",[28,\"action\",[[23,0,[]],[24,[\"myAction\"]],true],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Click me');
      (0, _testHelpers.click)('.md-button');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button}}
              template block text
            {{/control/md-button}}
          
      */
      {
        "id": "03k2SbUy",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md contact link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-contact-link contacts=contacts contactId=0}}
      */
      {
        "id": "pxFJU6dO",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-contact-link\",null,[[\"contacts\",\"contactId\"],[[24,[\"contacts\"]],0]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('a').innerText.trim(), 'Contact0', 'renders link');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-contact-link contacts=contacts contactId=0 block=true}}
              template block text
            {{/control/md-contact-link}}
          
      */
      {
        "id": "qHXG9RZE",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-contact-link\",null,[[\"contacts\",\"contactId\",\"block\"],[[24,[\"contacts\"]],0,true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'renders as block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-title/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md contact title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var store = this.owner.lookup('service:store');
      store.createRecord('contact', (0, _createContact.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <span>{{control/md-contact-title contactId=0}}</span>
      */
      {
        "id": "bk26CxWD",
        "block": "{\"symbols\":[],\"statements\":[[7,\"span\",true],[8],[1,[28,\"control/md-contact-title\",null,[[\"contactId\"],[0]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('span').textContent.trim(), 'Contact0');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div class="test1">
            {{#control/md-contact-title contactId=0 as |c|}}
              template block text {{c.title}}
            {{/control/md-contact-title}}
            </div>
          
      */
      {
        "id": "jMQvLy2k",
        "block": "{\"symbols\":[\"c\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"test1\"],[8],[0,\"\\n\"],[4,\"control/md-contact-title\",null,[[\"contactId\"],[0]],{\"statements\":[[0,\"        template block text \"],[1,[23,1,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.test1').textContent.trim(), 'template block text Contact0');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-crud-buttons/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md crud buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-crud-buttons allowCopy=true allowDelete=true}}
      */
      {
        "id": "y/mjSNGw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-crud-buttons\",null,[[\"allowCopy\",\"allowDelete\"],[true,true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.triggerEvent)('.md-crud-buttons', 'mouseenter');
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Copy|Delete|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-crud-buttons doSave=true allowCopy=true}}
              template block text
            {{/control/md-crud-buttons}}
          
      */
      {
        "id": "ADZvkhqU",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-crud-buttons\",null,[[\"doSave\",\"allowCopy\"],[true,true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|template|block|text|', 'block, doSave');
      assert.equal((0, _testHelpers.find)('.md-crud-buttons .btn-success').disabled, true, 'save disabled');
    });
    (0, _qunit.test)('should trigger external action', async function (assert) {
      assert.expect(4);

      // test double for the external action
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      //enable save and delete
      this.set('model', {
        hasDirtyHash: true,
        canRevert: true
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-crud-buttons model=model doSave=(action externalAction
        'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
        externalAction 'doCopy') doDelete=(action externalAction 'doDelete') allowCopy=true allowDelete=true}}
      */
      {
        "id": "s88SE2b/",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-crud-buttons\",null,[[\"model\",\"doSave\",\"doCancel\",\"doCopy\",\"doDelete\",\"allowCopy\",\"allowDelete\"],[[24,[\"model\"]],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"doSave\"],null],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"doCancel\"],null],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"doCopy\"],null],[28,\"action\",[[23,0,[]],[24,[\"externalAction\"]],\"doDelete\"],null],true,true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // click the buttons
      await (0, _testHelpers.click)('.md-crud-buttons .btn-success');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-warning');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      //we have to click delete twice to confirm
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-definition/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md definition', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-definition title="foobar" text="bizbaz"}}
      */
      {
        "id": "K/9FE+vQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-definition\",null,[[\"title\",\"text\"],[\"foobar\",\"bizbaz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|bizbaz|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-definition title="foobar"}}
      */
      {
        "id": "/bfdiis0",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-definition\",null,[[\"title\"],[\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|Not|Defined|', 'no text');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-definition title="foobar"}}
              template block text
            {{/control/md-definition}}
          
      */
      {
        "id": "86A/wYHV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-definition\",null,[[\"title\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|foobar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-edit-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-edit-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('data', [Ember.Object.create({
        title: 'foo',
        type: 'bar'
      }), Ember.Object.create({
        title: 'biz',
        type: 'baz'
      })]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-edit-table data=data dataColumns=columns rowBodyComponent="object/md-schema"}}
      */
      {
        "id": "clR+HHnt",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-edit-table\",null,[[\"data\",\"dataColumns\",\"rowBodyComponent\"],[[24,[\"data\"]],[24,[\"columns\"]],\"object/md-schema\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|Edit|Delete|biz|baz|Edit|Delete|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');
      await (0, _testHelpers.click)('.md-row-buttons .btn-success');
      assert.dom('.md-schema').exists('expanded row');
      assert.equal((0, _testHelpers.find)('.md-schema input').value, 'foo', 'render row contents');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-errors/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md errors', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('errors', [{
        title: 'Test',
        errors: [{
          dataPath: '/foo/biz',
          message: 'message1'
        }, {
          message: 'message2'
        }]
      }, {
        title: 'Test2',
        errors: []
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-errors errors=errors}}
      */
      {
        "id": "PqxTYhO9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-errors\",null,[[\"errors\"],[[24,[\"errors\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|0|message1|/foo/biz|1|message2|Test2|');
      assert.ok((0, _testHelpers.findAll)('.md-error-list .label')[1].classList.contains('label-danger'), 'class applied');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-errors  errors=errors}}
              template block text
            {{/control/md-errors}}
          
      */
      {
        "id": "gwY/Irt/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-errors\",null,[[\"errors\"],[[24,[\"errors\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|0|message1|/foo/biz|1|message2|Test2|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-fiscalyear/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers", "moment"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers, _moment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md fiscalyear', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-fiscalyear context=this}}
      */
      {
        "id": "9P55wWdL",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-fiscalyear\",null,[[\"context\"],[[23,0,[]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g, '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year');
    });
    (0, _qunit.test)('select a year', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('end', null);
      this.set('start', null);
      this.set('settings', {
        data: {
          fiscalStartMonth: 1
        }
      });
      // Handle any actions with this.on('myAction', function(val) { ... });
      var year = new Date().getFullYear();
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-datetime
              class="start"
              valuePath="start"
              model=this
              label="Start Date"
              placeholder="Enter start dateTime"
            }}
            {{input/md-datetime
              class="end"
              valuePath="end"
              model=this
              label="End Date"
            }}
            {{control/md-fiscalyear context=this settings=settings}}
      */
      {
        "id": "M3yGHXNh",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-datetime\",null,[[\"class\",\"valuePath\",\"model\",\"label\",\"placeholder\"],[\"start\",\"start\",[23,0,[]],\"Start Date\",\"Enter start dateTime\"]]],false],[0,\"\\n      \"],[1,[28,\"input/md-datetime\",null,[[\"class\",\"valuePath\",\"model\",\"label\"],[\"end\",\"end\",[23,0,[]],\"End Date\"]]],false],[0,\"\\n      \"],[1,[28,\"control/md-fiscalyear\",null,[[\"context\",\"settings\"],[[23,0,[]],[24,[\"settings\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)('.md-fiscalyear');
      await (0, _testSupport.selectChoose)('.md-fiscalyear', year);
      assert.equal(this.end, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth + 10).endOf('month').toISOString(), 'end set');
      assert.equal(this.start, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth - 1).startOf('month').toISOString(), 'start set');
      this.set('settings.data.fiscalStartMonth', null);
      assert.equal((0, _testHelpers.find)('.md-fiscalyear .ember-power-select-trigger').getAttribute('aria-disabled'), 'true', 'disabled if fiscalStartMonth empty');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-import-csv/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md import csv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('progress', 0);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-import-csv}}
      */
      {
        "id": "niQlXi6v",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-import-csv\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-import-picker').textContent.trim(), 'Click or Drop a CSV here.');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-import-csv isProcessing=true progress=progress}}
      */
      {
        "id": "aLxICkyw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-import-csv\",null,[[\"isProcessing\",\"progress\"],[true,[24,[\"progress\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|0%|Complete|', 'renders progressbar');
      this.set('progress', 57);
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|57%|Complete|', 'updates progressbar');
    });
    (0, _qunit.skip)('upload csv', async function (assert) {
      assert.ok();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-indicator', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('values', {
        foo: 'This',
        bar: 'warning'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-indicator
            icon="sticky-note"
            title="Hello"
            note="${foo} is a ${bar}"
            values=values
            type="danger"}}
            
      */
      {
        "id": "Dl4Oe9ox",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-indicator\",null,[[\"icon\",\"title\",\"note\",\"values\",\"type\"],[\"sticky-note\",\"Hello\",\"${foo} is a ${bar}\",[24,[\"values\"]],\"danger\"]]],false],[0,\"\\n      \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('.md-indicator').isVisible({
        count: 1
      });
      await (0, _testHelpers.triggerEvent)('.md-indicator', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Hello\nThis is a warning'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/related/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-dictionary", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _createDictionary, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-indicator/related', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function (assert) {
      let router = Ember.Service.extend({
        transitionTo() {
          assert.ok(true, 'Transition started');
        },
        generateURL(route, models) {
          assert.equal(route, 'dictionary.show.edit.entity', 'route OK');
          assert.deepEqual(models, ['attribute1'], 'model ids OK');
        }
      });
      this.owner.register('service:-routing', router);
      //this.router=router;
      this.owner.setupRouter();
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      this.set('values', {
        foo: 'attribute1',
        bar: 'codeName0'
      });
      this.set('dictionary', (0, _createDictionary.createDictionary)(1)[0].json.dataDictionary);
      this.set('model', this.dictionary.entity[0].attribute[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-indicator/related
            model=model
            route=true
            icon="cog"
            note="The attribute ${foo} has an associated domain: ${bar}."
            route="dictionary.show.edit.entity"
            values=values
            parent=dictionary
            relatedId="domainId"
            path="domain"
            title="Related Indicator Test"
            linkText="Go to Domain"
            type="warning"
            popperContainer="#ember-testing"
            routeIdPaths=(array "values.foo")
          }}
      */
      {
        "id": "a1Hq5omP",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-indicator/related\",null,[[\"model\",\"route\",\"icon\",\"note\",\"route\",\"values\",\"parent\",\"relatedId\",\"path\",\"title\",\"linkText\",\"type\",\"popperContainer\",\"routeIdPaths\"],[[24,[\"model\"]],true,\"cog\",\"The attribute ${foo} has an associated domain: ${bar}.\",\"dictionary.show.edit.entity\",[24,[\"values\"]],[24,[\"dictionary\"]],\"domainId\",\"domain\",\"Related Indicator Test\",\"Go to Domain\",\"warning\",\"#ember-testing\",[28,\"array\",[\"values.foo\"],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('.md-indicator-related .md-indicator').isVisible({
        count: 1
      });
      assert.dom('.md-indicator .fa').hasClass('fa-cog');
      await (0, _testHelpers.triggerEvent)('.md-indicator-related .md-indicator', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: `Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`
      });
      await (0, _testHelpers.click)('.btn');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-infotip/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-infotip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-infotip}}
      */
      {
        "id": "ZykxUW8s",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-infotip\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-infotip}}
              template block text
            {{/control/md-infotip}}
          
      */
      {
        "id": "ltvhuIeV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-infotip\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-itis/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md itis', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('taxonomy', {
        taxonomicClassification: []
      });
      this.set('taxa', [Ember.Object.create({
        "kingdom": "Animalia",
        "name": "Calotes rouxii",
        "rank": "Species",
        "tsn": "1055525",
        "taxonomy": [[{
          "rank": "Kingdom",
          "value": "Animalia",
          "order": 0,
          "tsn": "202423"
        }, {
          "rank": "Subkingdom",
          "value": "Bilateria",
          "order": 1,
          "tsn": "914154"
        }, {
          "rank": "Genus",
          "value": "Calotes",
          "order": 12,
          "tsn": "209043"
        }, {
          "rank": "Species",
          "value": "Calotes rouxii",
          "order": 13,
          "tsn": "1055525",
          "common": ["Roux's Forest Lizard", "Forest Blood Sucker"]
        }]],
        "common": [{
          "name": "Roux's Forest Lizard",
          "language": "English"
        }, {
          "name": "Forest Blood Sucker",
          "language": "English"
        }],
        "status": "valid"
      })]);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-itis taxonomy=taxonomy}}
      */
      {
        "id": "e6jUvnI0",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-itis\",null,[[\"taxonomy\"],[[24,[\"taxonomy\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-itis').textContent.replace(/[ \n]+/g, '|').trim(), '|Search|Value|Kingdom|(optional)|Select|a|kingdom.|Search|');

      // await fillIn('.md-input-input input.ember-text-field', 'shark');
      // await click('button[type=submit]');
      // await settled();

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-itis taxonomy=taxonomy searchResult=taxa found=true}}
      */
      {
        "id": "+9DGhqWP",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-itis\",null,[[\"taxonomy\",\"searchResult\",\"found\"],[[24,[\"taxonomy\"]],[24,[\"taxa\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('.md-itis-taxalist'), 'renders search result');
      await (0, _testHelpers.click)('.md-itis-taxalist .list-group-item .btn-success');
      assert.ok((0, _testHelpers.find)('.md-itis-selectedlist .list-group-item'), 'renders selected item');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-button/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md json button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button}}
      */
      {
        "id": "FdHCZTIy",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-json-button\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'Preview JSON');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-json-button}}
              template block text
            {{/control/md-json-button}}
          
      */
      {
        "id": "hEVqRZ6K",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-json-button\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'template block text');
    });
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button json=json preview=true}}
      */
      {
        "id": "+2fTwcpF",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-json-button\",null,[[\"json\",\"preview\"],[[24,[\"json\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.equal(document.querySelector('.md-jsmodal-container').textContent.trim(), '{"foo": "bar"}');
    });
    (0, _qunit.test)('render json slider', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button json=json title="foobar"}}
            <div class="slider">
              {{#from-elsewhere name="md-slider-json" as |slider|}}
                <h3 class="text-info">{{slider.title}}</h3>
                <hr>
                {{component slider.body}}
              {{/from-elsewhere}}
            </div>
      */
      {
        "id": "u5Xr56f1",
        "block": "{\"symbols\":[\"slider\"],\"statements\":[[1,[28,\"control/md-json-button\",null,[[\"json\",\"title\"],[[24,[\"json\"]],\"foobar\"]]],false],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"slider\"],[8],[0,\"\\n\"],[4,\"from-elsewhere\",null,[[\"name\"],[\"md-slider-json\"]],{\"statements\":[[0,\"          \"],[7,\"h3\",true],[10,\"class\",\"text-info\"],[8],[1,[23,1,[\"title\"]],false],[9],[0,\"\\n          \"],[7,\"hr\",true],[8],[9],[0,\"\\n          \"],[1,[28,\"component\",[[23,1,[\"body\"]]],null],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.equal((0, _testHelpers.find)('.slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Viewing|JSON|for:|foobar|{"foo":|"bar"}|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-viewer/component-test", ["@ember/test-helpers", "jquery", "qunit", "ember-qunit"], function (_testHelpers, _jquery, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md json viewer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-viewer json=json}}
      */
      {
        "id": "TcOCWF/H",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-json-viewer\",null,[[\"json\"],[[24,[\"json\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _jquery.default)('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
    });
    (0, _qunit.test)('render json viewer', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-viewer json=json modal=false}}
      */
      {
        "id": "EQYsgPf9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-json-viewer\",null,[[\"json\",\"modal\"],[[24,[\"json\"]],false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-json-viewer').textContent.trim(), '{"foo": "bar"}');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-modal/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-modal isShowing=true}}
      */
      {
        "id": "SzJXlXQ8",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-modal\",null,[[\"isShowing\"],[true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(document.querySelector('.md-modal-container'));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-modal isShowing=true}}
              template block text
            {{/control/md-modal}}
          
      */
      {
        "id": "f3JPqgHv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-modal\",null,[[\"isShowing\"],[true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(document.querySelector('.md-modal-container').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: true
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons record=model}}
      */
      {
        "id": "9HtadClo",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-record-table/buttons\",null,[[\"record\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|');
      assert.dom('.md-status-icon .btn-danger').isVisible();
      assert.dom('.md-status-icon .btn-warning').isVisible();
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{#control/md-record-table/buttons}}
                template block text
              {{/control/md-record-table/buttons}}
      */
      {
        "id": "EZ0t44CS",
        "block": "{\"symbols\":[],\"statements\":[[4,\"control/md-record-table/buttons\",null,null,{\"statements\":[[0,\"          template block text\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/custom/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      this.set('rec', {
        biz: 'baz'
      });
      this.set('column', {
        buttonConfig: {
          title: 'foobar',
          style: 'warning',
          action: function (rec) {
            assert.equal(rec.biz, 'baz', 'action fired');
          }
        }
      });

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/custom column=column record=rec}}
      */
      {
        "id": "MGlm/+qB",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-record-table/buttons/custom\",null,[[\"column\",\"record\"],[[24,[\"column\"]],[24,[\"rec\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button.btn-warning').textContent.trim(), 'foobar');
      (0, _testHelpers.click)('button.btn-warning');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/filter/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      var items = ['foo', 'bar'];
      // Set any properties with this.set('myProperty', 'value');
      this.set('selectedItems', items);
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('deleteSelected', function (selectedItems) {
        assert.equal(selectedItems, items, 'fires action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/filter deleteSelected=deleteSelected selectedItems=selectedItems}}
      */
      {
        "id": "JUHx4BI6",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-record-table/buttons/filter\",null,[[\"deleteSelected\",\"selectedItems\"],[[24,[\"deleteSelected\"]],[24,[\"selectedItems\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button.btn-danger').textContent.trim(), 'Delete Selected');
      (0, _testHelpers.doubleClick)('button.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/show/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/show', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/show}}
      */
      {
        "id": "CIQW3h35",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-record-table/buttons/show\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.btn-info').textContent.trim(), 'Show');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table dataColumns=columns data=data}}
      */
      {
        "id": "OuB9O86R",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-record-table\",null,[[\"dataColumns\",\"data\"],[[24,[\"columns\"]],[24,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|Title|Type|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-record-table dataColumns=columns data=data}}
              template block text
            {{/control/md-record-table}}
          
      */
      {
        "id": "KOiBYcL2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table\",null,[[\"dataColumns\",\"data\"],[[24,[\"columns\"]],[24,[\"data\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-repo-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/config/environment"], function (_testHelpers, _qunit, _emberQunit, _environment) {
  "use strict";

  const {
    APP: {
      repository,
      version
    }
  } = _environment.default;
  (0, _qunit.module)('Integration | Component | control/md repo link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-repo-link}}
      */
      {
        "id": "F+AIyKwT",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-repo-link\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), version);
      assert.equal((0, _testHelpers.find)('a').getAttribute('href'), `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`, 'link ok');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-repo-link}}
              template block text
            {{/control/md-repo-link}}
          
      */
      {
        "id": "J/VwpCTq",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-repo-link\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-into-view/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-scroll-into-view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-scroll-into-view}}
      */
      {
        "id": "vrCTc9ZH",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"control/md-scroll-into-view\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-scroll-into-view}}
              template block text
            {{/control/md-scroll-into-view}}
          
      */
      {
        "id": "7z4D/Vlt",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-scroll-into-view\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-spy/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md scroll spy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('setScrollTo', function (target) {
        assert.equal(target, 'foo', 'calls action');
      });

      // this.set('clickLink', function(){
      // });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div data-spy="Foo" id="foo1">Foo</div>
            <div data-spy="Bar" id="bar1">Bar</div>
            {{control/md-scroll-spy setScrollTo=setScrollTo}}
      */
      {
        "id": "7Fz0P+T0",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"data-spy\",\"Foo\"],[10,\"id\",\"foo1\"],[8],[0,\"Foo\"],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"data-spy\",\"Bar\"],[10,\"id\",\"bar1\"],[8],[0,\"Bar\"],[9],[0,\"\\n      \"],[1,[28,\"control/md-scroll-spy\",null,[[\"setScrollTo\"],[[24,[\"setScrollTo\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Foo|Bar|');
      await (0, _testHelpers.click)('ul a');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-scroll-spy setScrollTo=setScrollTo}}
              template block text
            {{/control/md-scroll-spy}}
          
      */
      {
        "id": "7eHiwVrX",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-scroll-spy\",null,[[\"setScrollTo\"],[[24,[\"setScrollTo\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-select-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md select table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      this.set('select', function (selected) {
        assert.equal(selected[0].title, 'foo', 'calls action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-select-table columns=columns data=data select=select}}
      */
      {
        "id": "Fy+rfgpM",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-select-table\",null,[[\"columns\",\"data\",\"select\"],[[24,[\"columns\"]],[24,[\"data\"]],[24,[\"select\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');
      (0, _testHelpers.click)('.md-select-table tbody tr');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-select-table}}
              template block text
            {{/control/md-select-table}}
          
      */
      {
        "id": "LI4m+FX9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-select-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|template|block|text|', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spinner/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md spinner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-spinner text="foobar" size="5"}}
      */
      {
        "id": "vOezijb2",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-spinner\",null,[[\"text\",\"size\"],[\"foobar\",\"5\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'foobar');
      assert.ok((0, _testHelpers.find)('.md-spinner .md-spinner-text').classList.contains('size-5'), 'adds class');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-spinner}}
              template block text
            {{/control/md-spinner}}
          
      */
      {
        "id": "NJovIzPH",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-spinner\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spotlight/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md spotlight', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var spotlight = this.owner.lookup('service:spotlight');
      var scope = {
        foo: 'bar'
      };
      var close = function () {
        assert.equal(this.foo, 'bar', 'calls close action');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div id="foo">foobar</div>
            {{control/md-spotlight}}
      */
      {
        "id": "Rf1nF6/x",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"id\",\"foo\"],[8],[0,\"foobar\"],[9],[0,\"\\n      \"],[1,[22,\"control/md-spotlight\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      spotlight.setTarget('foo', close, scope);
      assert.ok(document.querySelector('.md-modal-overlay'), 'render overlay');
      assert.equal((0, _testHelpers.find)('#foo').textContent.trim(), 'foobar', 'render target');
      assert.ok((0, _testHelpers.find)('#foo').classList.contains('md-spotlight-target'), 'adds class');
      spotlight.setTarget('foo');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-status/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md status', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: false
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-status model=model}}
      */
      {
        "id": "iGtHxXTA",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/md-status\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('.md-status-icon .md-error').isVisible();
      this.set('model.hasDirtyHash', false);
      this.set('model.hasSchemaErrors', true);
      assert.dom('.md-status-icon .md-error').isNotVisible();
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-status model=model}}
              template block text
            {{/control/md-status}}
          
      */
      {
        "id": "w9tnfYpE",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-status\",null,[[\"model\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('.md-status-icon .md-warning').isVisible();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-citation text="foobar"}}
      */
      {
        "id": "Gj4Ac28l",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/subbar-citation\",null,[[\"text\"],[\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|foobar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-citation}}
              template block text
            {{/control/subbar-citation}}
          
      */
      {
        "id": "dySsOj+Q",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-citation\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-importcsv/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar importcsv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      var Target = Ember.Route.extend({
        actions: {
          doImport() {
            assert.ok(true, 'calls target action');
          }
        }
      });
      this.set('foo', Target.create({}));

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-importcsv class="importcsv" actionContext=foo}}
      */
      {
        "id": "1O8Bx8k+",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/subbar-importcsv\",null,[[\"class\",\"actionContext\"],[\"importcsv\",[24,[\"foo\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|');
      (0, _testHelpers.click)('.importcsv .btn-info');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-importcsv class="importcsv"}}
              template block text
            {{/control/subbar-importcsv}}
          
      */
      {
        "id": "mNt7Tqm/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-importcsv\",null,[[\"class\"],[\"importcsv\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('test', function () {
        assert.ok(true, 'called action');
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-link  text="foo" click=test}}
      */
      {
        "id": "f0MKUM+9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/subbar-link\",null,[[\"text\",\"click\"],[\"foo\",[24,[\"test\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'foo');
      await (0, _testHelpers.click)('button');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-link text="foo" click=test}}
              <section>template block text</section>
            {{/control/subbar-link}}
          
      */
      {
        "id": "tbPLHl7U",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-link\",null,[[\"text\",\"click\"],[\"foo\",[24,[\"test\"]]]],{\"statements\":[[0,\"        \"],[7,\"section\",true],[8],[0,\"template block text\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-spatial/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-spatial class="testme"}}
      */
      {
        "id": "7a5bmZfv",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/subbar-spatial\",null,[[\"class\"],[\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-spatial class="testme"}}
              template block text
            {{/control/subbar-spatial}}
          
      */
      {
        "id": "Y4IOqNAM",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-spatial\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|template|block|text|');
    });
    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(5);
      this.setProperties({
        test1: function () {
          assert.ok(true, 'called zoomAll');
        },
        test2: function () {
          assert.ok(true, 'called uploadData');
        },
        test3: function () {
          assert.ok(true, 'called exportGeoJSON');
        },
        test4: function () {
          assert.ok(true, 'called deleteAllFeatures');
        },
        test5: function () {
          assert.ok(true, 'called toList');
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-spatial
            zoomAll=test1
            uploadData=test2
            exportGeoJSON=test3
            deleteAllFeatures=test4
            toList=test5
          }}
      */
      {
        "id": "1jkyIYKV",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"control/subbar-spatial\",null,[[\"zoomAll\",\"uploadData\",\"exportGeoJSON\",\"deleteAllFeatures\",\"toList\"],[[24,[\"test1\"]],[24,[\"test2\"]],[24,[\"test3\"]],[24,[\"test4\"]],[24,[\"test5\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      (0, _testHelpers.findAll)('button').forEach(async btn => await (0, _testHelpers.click)(btn));
      await (0, _testHelpers.doubleClick)('.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/ember-tooltip/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | ember-tooltip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{ember-tooltip}}
      */
      {
        "id": "3vKsVbDd",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"ember-tooltip\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#ember-tooltip isShown="true"}}
              template block text
            {{/ember-tooltip}}
          
      */
      {
        "id": "6nHpSXF3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"ember-tooltip\",null,[[\"isShown\"],[\"true\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      (0, _testSupport.assertTooltipContent)(assert, {
        contentString: 'template block text'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-boolean/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md boolean', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-boolean value=false text="Foo Bar" label="Baz" }}
      */
      {
        "id": "gjlo6MFi",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[false,\"Foo Bar\",\"Baz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-boolean value=true text="Foo Bar" label="Baz"}}
              template block text
            {{/input/md-boolean}}
          
      */
      {
        "id": "X0tl7Ihh",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[true,\"Foo Bar\",\"Baz\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');
      assert.ok((0, _testHelpers.find)('input').checked);
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = Ember.Service.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md codelist multi', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      var _this = this;
      this.actions = {};
      this.send = function (actionName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return _this.actions[actionName].apply(_this, args);
      };
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('fooVal', ['foo', 'bar']);

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-codelist-multi
              mdCodeName="foobar"
              value=fooVal
            }}
              <p>template block text</p>
            {{/input/md-codelist-multi}}
          
      */
      {
        "id": "NcoGivXD",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-codelist-multi\",null,[[\"mdCodeName\",\"value\"],[\"foobar\",[24,[\"fooVal\"]]]],{\"statements\":[[0,\"        \"],[7,\"p\",true],[8],[0,\"template block text\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'renders block with array value');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);

      //this.set('fooVal', ['foo']);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist-multi
            create=false
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "j5kBZ74s",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[false,[24,[\"value\"]],\"foobar\",[28,\"action\",[[23,0,[]],\"update\",[24,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|', 'value updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist-multi
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "WC3IpKJw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[24,[\"value\"]],\"foobar\",[28,\"action\",[[23,0,[]],\"update\",[24,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|', 'value updated');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers) {
  "use strict";

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = Ember.Service.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md-codelist', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      var _this = this;
      this.actions = {};
      this.send = function (actionName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return _this.actions[actionName].apply(_this, args);
      };
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            value='foo' mdCodeName="foobar"}}
      */
      {
        "id": "EVnEW5ZO",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\"],[\"foo\",\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|×|');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            value=value mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "OAhxYgBp",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\",\"change\"],[[24,[\"value\"]],\"foobar\",[28,\"action\",[[23,0,[]],\"update\",[24,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testSupport.selectChoose)('.md-select', 'bar');

      // return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|bar|×|', 'value updated');
      // });
    });

    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "nTirPUs4",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-codelist\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[24,[\"value\"]],\"foobar\",[28,\"action\",[[23,0,[]],\"update\",[24,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      //return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|×|', 'value updated');
      //});
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-date-range/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md date range', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('start', new Date('2016-01-01'));
      this.set('end', new Date('2017-01-01'));
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
      */
      {
        "id": "Rb8NRDgI",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-date-range\",null,[[\"class\",\"startDateTime\",\"endDateTime\",\"profilePath\"],[\"testme\",[24,[\"start\"]],[24,[\"end\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[0].value).toISOString(), this.start.toISOString(), 'set start');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[1].value).toISOString(), this.end.toISOString(), 'set end');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
              template block text
            {{/input/md-date-range}}
          
      */
      {
        "id": "/FcTU/tB",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-date-range\",null,[[\"class\",\"startDateTime\",\"endDateTime\",\"profilePath\"],[\"testme\",[24,[\"start\"]],[24,[\"end\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-datetime/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md datetime', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('renders and binds', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      this.set('mydate', '1999-12-31T23:59:59.999+0900');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-datetime
                            date=mydate
                            format="YYYY-MM-DD"
                            placeholder="Enter date"}}
      */
      {
        "id": "Ab2s54pq",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-datetime\",null,[[\"date\",\"format\",\"placeholder\"],[[24,[\"mydate\"]],\"YYYY-MM-DD\",\"Enter date\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('input').value, '1999-12-31', 'binding works');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input-confirm/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md input confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-input-confirm}}
      */
      {
        "id": "0E7ddOfR",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"input/md-input-confirm\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Edit');
      assert.ok((0, _testHelpers.find)('.md-input input[disabled]'), 'input disabled');
      await (0, _testHelpers.click)('.btn-warning');
      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Confirm', 'confirm ok');
      await (0, _testHelpers.click)('.btn-warning');
      assert.ok((0, _testHelpers.find)('.md-input input:not([disabled])'), 'input enabled');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-input-confirm}}
              template block text
            {{/input/md-input-confirm}}
          
      */
      {
        "id": "eL0jDQk3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input-confirm\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-input').textContent.replace(/[ \n]+/g, '|').trim(), '|Edit|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders md-input', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-input
              label="Foo"
              value="Bar"
              showInfoTip="true"
              maxlength=100
              required="true"
              inputClass="test"
              placeholder="Enter FooBar"}}
          
      */
      {
        "id": "Kxd5OXsb",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-input\",null,[[\"label\",\"value\",\"showInfoTip\",\"maxlength\",\"required\",\"inputClass\",\"placeholder\"],[\"Foo\",\"Bar\",\"true\",100,\"true\",\"test\",\"Enter FooBar\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('label').textContent.trim(), 'Foo', 'labeled OK');
      const input = this.$('input');
      const props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
      assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-input}}
              <p class="help-block">help text</p>
            {{/input/md-input}}
          
      */
      {
        "id": "rBc/beup",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input\",null,null,{\"statements\":[[0,\"        \"],[7,\"p\",true],[10,\"class\",\"help-block\"],[8],[0,\"help text\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.help-block').textContent, 'help text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-markdown-area/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md markdown area', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-markdown-area required=true}}
      */
      {
        "id": "NfbDl9S4",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-markdown-area\",null,[[\"required\"],[true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0');
      assert.ok((0, _testHelpers.find)('.md-markdown-editor .length.md-error'), 'required ok');
      this.set('markdownValue', 'This is foobar.');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-markdown-area value=markdownValue maxlength=10 required=false}}
      */
      {
        "id": "f+GzQOI9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-markdown-area\",null,[[\"value\",\"maxlength\",\"required\"],[[24,[\"markdownValue\"]],10,false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor .length.md-error').textContent, 'length: 15', 'maxlength ok');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-markdown-area}}
              template block text
            {{/input/md-markdown-area}}
          
      */
      {
        "id": "Ltu4oWFp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-markdown-area\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0templateblocktext', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-month/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md month', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-month date="10"}}
      */
      {
        "id": "+yoBomZr",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-month\",null,[[\"date\"],[\"10\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('input').value, 'October');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-month class="testme" date="10"}}
              template block text
            {{/input/md-month}}
          
      */
      {
        "id": "atqTYxDI",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-month\",null,[[\"class\",\"date\"],[\"testme\",\"10\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '', 'no block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contact/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select contact', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var contacts = (0, _createContact.default)(3);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      this.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contact value=1}}
      */
      {
        "id": "wswGMPs0",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-select-contact\",null,[[\"value\"],[1]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.replace(/[ \n]+/g, '|').trim(), '|Contact1|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-select-contact}}
              template block text
            {{/input/md-select-contact}}
          
      */
      {
        "id": "B/VACfLw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-contact\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.trim(), 'Select one option');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contacts/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "ember-power-select/test-support"], function (_testHelpers, _qunit, _emberQunit, _createContact, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select contacts', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "BszrmhJZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"input/md-select-contacts\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('.md-select-contact'));
    });
    (0, _qunit.test)('contact selected', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      //make sure there's at least one record visible
      //var store = this.owner.lookup('service:store');
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      //store.createRecord('contact', contacts[0]);
      //store.createRecord('contact', contacts[1]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "BszrmhJZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"input/md-select-contacts\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact0');
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact1');
      assert.equal((0, _testHelpers.find)('.md-select-contact').innerText.replace(/[\s\n]+/g, '|').trim(), '×|Contact0|×|Contact1', 'select multiple contacts');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-profile/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers", "mdeditor/config/environment"], function (_testHelpers, _qunit, _emberQunit, _helpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // test dummy for the external profile action
      this.set('updateProfile', () => {});
      this.set('profileId', _environment.default.APP.defaultProfileId);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-profile
            value=profileId
            updateProfile=updateProfile
            class="testme"
          }}
      */
      {
        "id": "N5QfEFEi",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\",\"class\"],[[24,[\"profileId\"]],[24,[\"updateProfile\"]],\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|'), '|Profile|Full|?|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('updateProfile', actual => {
        assert.equal(actual, _environment.default.APP.defaultProfileId, 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-profile value=null updateProfile=(action updateProfile)}}
      */
      {
        "id": "yLsB4s+B",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\"],[null,[28,\"action\",[[23,0,[]],[24,[\"updateProfile\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option .select-value').findBy('innerText', 'Full'), 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-thesaurus/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select thesaurus', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-thesaurus}}
      */
      {
        "id": "d3VLD8rQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"input/md-select-thesaurus\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-select-thesaurus}}
              template block text
            {{/input/md-select-thesaurus}}
          
      */
      {
        "id": "ThFIe8O9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-thesaurus\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('selectThesaurus', id => {
        assert.equal(id.citation.identifier[0].identifier, '1eb0ea0a-312c-4d74-8d42-6f1ad758f999', 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-thesaurus selectThesaurus=selectThesaurus}}
      */
      {
        "id": "KzCmCf4Z",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-select-thesaurus\",null,[[\"selectThesaurus\"],[[24,[\"selectThesaurus\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      })]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=1
              objectArray=objArray
              valuePath="id"
              namePath="name"
              tooltipPath="tip"
              placeholder="Select one"}}
          
      */
      {
        "id": "YBlB4Kdz",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\",\"tooltipPath\",\"placeholder\"],[1,[24,[\"objArray\"]],\"id\",\"name\",\"tip\",\"Select one\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
    });
    (0, _qunit.test)('set value', async function (assert) {
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
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=value
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "adgl6jS9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\"],[[24,[\"value\"]],[24,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');
      assert.equal(this.get('value'), 2, 'value is updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
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
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=value
              create=true
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "rcKdh2K6",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-select\",null,[[\"value\",\"create\",\"objectArray\",\"valuePath\",\"namePath\"],[[24,[\"value\"]],true,[24,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');
      assert.equal(this.get('value'), 'biz', 'value is updated');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-textarea/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md textarea', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-textarea
            value="Foo bar baz"
            label="FooBar"
            placeholder="placeholder"
            rows=10}}
            
      */
      {
        "id": "MP9NEYBp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[28,\"input/md-textarea\",null,[[\"value\",\"label\",\"placeholder\",\"rows\"],[\"Foo bar baz\",\"FooBar\",\"placeholder\",10]]],false],[0,\"\\n      \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'Foo bar baz');
      assert.equal((0, _testHelpers.find)('label').textContent, 'FooBar', 'label renders');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-textarea class="testme"}}
              template block text
            {{/input/md-textarea}}
          
      */
      {
        "id": "OrJLXcDT",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-textarea\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-toggle/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md toggle', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('value', false);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-toggle
            value=this.value
            showLabels=true
            onToggle=(action (mut this.value))
            offLabel="No"
            onLabel="Yes"
          }}
      */
      {
        "id": "fcKCbwmF",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"input/md-toggle\",null,[[\"value\",\"showLabels\",\"onToggle\",\"offLabel\",\"onLabel\"],[[23,0,[\"value\"]],true,[28,\"action\",[[23,0,[]],[28,\"mut\",[[23,0,[\"value\"]]],null]],null],\"No\",\"Yes\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.x-toggle-component').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Yes|');
      await (0, _testHelpers.click)('.x-toggle-btn');
      assert.ok((0, _testHelpers.find)('.toggle-on'), 'toggle on');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-toggle class="testme"}}
              template block text
            {{/input/md-toggle}}
          
      */
      {
        "id": "AxyKbbVw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-toggle\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-card/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md card', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-card title="foo"}}
      */
      {
        "id": "lJn7MTX7",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-card\",null,[[\"title\"],[\"foo\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'foo');

      // await render(hbs`{{layout/md-card title="foo" collasped="true"}}`);

      // assert.equal(find('.md-card').textContent.trim(), 'foo');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-card}}
              template block text
            {{/layout/md-card}}
          
      */
      {
        "id": "M+5H0+hm",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-card\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'template block text', 'block');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-card title="foo" collapsed=true collapsible=true}}
              template block text
            {{/layout/md-card}}
          
      */
      {
        "id": "pGMgp3ey",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-card\",null,[[\"title\",\"collapsed\",\"collapsible\"],[\"foo\",true,true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').innerText.trim(), 'foo', 'collapsed');
      assert.ok((0, _testHelpers.find)('.md-card .card-block:not(.in)'), 'class ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-footer/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md footer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('settings', {
        data: {
          autoSave: false
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-footer settings=settings}}
      */
      {
        "id": "ANTpV+Sw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-footer\",null,[[\"settings\"],[[24,[\"settings\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|Off|');
      this.set('settings.data.autoSave', true);
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-footer settings=settings}}
              template block text
            {{/layout/md-footer}}
          
      */
      {
        "id": "w7koDt8e",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-footer\",null,[[\"settings\"],[[24,[\"settings\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|On|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md nav main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-main}}
      */
      {
        "id": "7HbRySVX",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"layout/md-nav-main\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|Settings');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-main}}
              template block text
            {{/layout/md-nav-main}}
          
      */
      {
        "id": "vTbqEBbv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-main\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|template|block|text|Settings');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  //Stub profile service
  const profiles = [{
    identifier: "full",
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'Foo',
        target: 'record.show.edit.index'
      }, {
        title: 'Bar',
        target: 'record.show.edit.metadata'
      }]
    }
  }, {
    identifier: 'basic',
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'FooBar',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo',
        target: 'record.show.edit.metadata'
      }, {
        title: 'FooBar1',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo2',
        target: 'record.show.edit.metadata'
      }]
    }
  }];
  const profileStub = Ember.Service.extend({
    coreProfiles: profiles
  });
  (0, _qunit.module)('Integration | Component | md nav secondary', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:profile', profileStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "profileService" within each test
      this.profileService = this.owner.lookup('service:profile');
      this.customService = this.owner.lookup('service:custom-profile');
      this.model = {
        constructor: {
          modelName: 'record'
        }
      };
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "vCS56Cuf",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-nav-secondary\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-secondary model=model}}
              <li>template block text</li>
            {{/layout/md-nav-secondary}}
          
      */
      {
        "id": "7PVVRSYN",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-secondary\",null,[[\"model\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        \"],[7,\"li\",true],[8],[0,\"template block text\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');
    });
    (0, _qunit.test)('render after setting profile', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('customService.active', 'org.adiwg.profile.basic');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "vCS56Cuf",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-nav-secondary\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|FooBar1|BarFoo2|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div style="width:100px;">{{layout/md-nav-secondary model=model}}</div>
      */
      {
        "id": "fT9ZgaMr",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"style\",\"width:100px;\"],[8],[1,[28,\"layout/md-nav-secondary\",null,[[\"model\"],[[24,[\"model\"]]]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.findAll)('.dropdown .dropdown-menu').length, 'render more dropdown');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/link/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md-nav-secondary/link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.links = [Ember.Object.create({
        title: 'Foo',
        target: 'record.show.edit.index',
        tip: 'Foo not bar'
      }), Ember.Object.create({
        title: 'Bar',
        target: 'record.show.edit.metadata'
      })];
      this.nav = {
        links: this.links
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary/link link=links.firstObject nav=nav}}
      */
      {
        "id": "SjqIZjc7",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-nav-secondary/link\",null,[[\"link\",\"nav\"],[[24,[\"links\",\"firstObject\"]],[24,[\"nav\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Foo');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-secondary/link link=links.lastObject nav=nav}}
              template block text
            {{/layout/md-nav-secondary/link}}
          
      */
      {
        "id": "dTotO+8I",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-secondary/link\",null,[[\"link\",\"nav\"],[[24,[\"links\",\"lastObject\"]],[24,[\"nav\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Bar');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createContact, _createRecord, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md nav sidebar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      const contacts = (0, _createContact.default)(2);
      contacts.meta = {
        type: 'contact',
        list: 'contacts',
        title: 'Contacts'
      };
      const records = (0, _createRecord.createRecord)(2);
      records.meta = {
        type: 'record',
        list: 'records',
        title: 'Records'
      };
      const dicts = (0, _createDictionary.createDictionary)(2);
      dicts.meta = {
        type: 'dictionary',
        list: 'dictionaries',
        title: 'Dictionaries'
      };

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [records, contacts, dicts]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-sidebar items=model version="test"}}
      */
      {
        "id": "oOzPshzD",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-nav-sidebar\",null,[[\"items\",\"version\"],[[24,[\"model\"]],\"test\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.sidebar-nav').textContent.replace(/[ \n]+/g, '|'), '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
    });
    (0, _qunit.test)('toggle help action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-sidebar}}
      */
      {
        "id": "/wtPdttb",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"layout/md-nav-sidebar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.md-btn-help');
      assert.ok((0, _testHelpers.find)('.md-sidebar-wrapper').classList.contains('help'));
    });
    (0, _qunit.test)('toggle sidebar action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div id="md-wrapper">{{layout/md-nav-sidebar}}</div>
      */
      {
        "id": "YaaE/gVE",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"id\",\"md-wrapper\"],[8],[1,[22,\"layout/md-nav-sidebar\"],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.sidebar-brand-link');
      assert.ok((0, _testHelpers.find)('#md-wrapper').classList.contains('toggled'));
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-object-container/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md-object-container', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-object-container
            title="Foo"
            isCollapsible=true
            index="1"
          }}
      */
      {
        "id": "Hm3ScjAT",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-object-container\",null,[[\"title\",\"isCollapsible\",\"index\"],[\"Foo\",true,\"1\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Foo #1');
      assert.dom('.md-object-container').hasClass('even');
      await (0, _testHelpers.click)('.md-object-container-header a');
      assert.dom('.md-object-container .btn-collapse').hasClass('collapsed');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-object-container}}
              template block text
            {{/layout/md-object-container}}
          
      */
      {
        "id": "oZCFfN2y",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-object-container\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-slider/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md slider', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-slider}}
      */
      {
        "id": "K8sOFqjB",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"layout/md-slider\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-slider').textContent.trim(), 'Close');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-slider fromName="slider"}}
              template block text
            {{/layout/md-slider}}
            {{to-elsewhere named="slider"
              send=(hash
                title="biz"
                body=(component "layout/md-card" title="foobar"))
            }}
          
      */
      {
        "id": "FLb3THMW",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-slider\",null,[[\"fromName\"],[\"slider\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"      \"],[1,[28,\"to-elsewhere\",null,[[\"named\",\"send\"],[\"slider\",[28,\"hash\",null,[[\"title\",\"body\"],[\"biz\",[28,\"component\",[\"layout/md-card\"],[[\"title\"],[\"foobar\"]]]]]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Close|biz|foobar|template|block|text|');
      assert.ok((0, _testHelpers.find)('.md-card'), 'rendered slider content');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-wrap/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md wrap', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-wrap class="testme"}}
      */
      {
        "id": "moXlat3Z",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/md-wrap\",null,[[\"class\"],[\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-wrap class="testme"}}
              template block text
            {{/layout/md-wrap}}
          
      */
      {
        "id": "fJoC4aqA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-wrap\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/dictionary/nav-main/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  // import Service from '@ember/service';

  //Stub profile service
  // const profiles = [{
  //     identifier: "full",
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'Foo',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'Bar',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   },
  //   {
  //     identifier: 'basic',
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'FooBar',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'BarFoo',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   }
  // ];

  // const profileStub = Service.extend({
  //   coreProfiles: profiles
  // });

  (0, _qunit.module)('Integration | Component | layout/nav/dictionary/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // hooks.beforeEach(function () {
    //   this.owner.register('service:profile', profileStub);
    //   // Calling inject puts the service instance in the test's context,
    //   // making it accessible as "profileService" within each test
    //   this.profileService = this.owner.lookup('service:profile');
    //   this.customService = this.owner.lookup('service:custom-profile');
    //   this.model = {
    //     constructor: {
    //       modelName: 'record'
    //     }
    //   }
    // });

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/nav/dictionary/nav-main model=model}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
            
      */
      {
        "id": "kfjnpNao",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"layout/nav/dictionary/nav-main\",null,[[\"model\"],[[24,[\"model\"]]]]],false],[0,\"\\n      \"],[1,[28,\"to-elsewhere\",null,[[\"named\",\"send\"],[\"dictionary-nav\",[28,\"component\",[\"control/md-button\"],[[\"text\"],[\"testme\"]]]]]],false],[0,\"\\n      \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'testme');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/nav/dictionary/nav-main model=model}}
              template block text
            {{/layout/nav/dictionary/nav-main}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
          
      */
      {
        "id": "uRoBR1Kt",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/nav/dictionary/nav-main\",null,[[\"model\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"      \"],[1,[28,\"to-elsewhere\",null,[[\"named\",\"send\"],[\"dictionary-nav\",[28,\"component\",[\"control/md-button\"],[[\"text\"],[\"testme\"]]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'testme');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/record/nav-main/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/config/environment"], function (_qunit, _emberQunit, _testHelpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/nav/record/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.foo = function () {};
      this.profileId = _environment.default.APP.defaultProfileId;
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/nav/record/nav-main}}
          {{to-elsewhere named="record-nav" send=(component "input/md-select-profile" value=profileId updateProfile=this.foo)}}
          
      */
      {
        "id": "lAREQhMJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"layout/nav/record/nav-main\"],false],[0,\"\\n    \"],[1,[28,\"to-elsewhere\",null,[[\"named\",\"send\"],[\"record-nav\",[28,\"component\",[\"input/md-select-profile\"],[[\"value\",\"updateProfile\"],[[24,[\"profileId\"]],[23,0,[\"foo\"]]]]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Translate|Profile|Full|?|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/nav/record/nav-main}}
              template block text
            {{/layout/nav/record/nav-main}}
          
      */
      {
        "id": "1nFMK2zh",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/nav/record/nav-main\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Translate');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-help/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md help', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-help}}
      */
      {
        "id": "iLPoPgdy",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"md-help\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Help|Main|Tour|The|mdEditor|is|a|web|application|that|allows|users|to|author|and|edit|metadata|for|projects|and|datasets.|The|primary|design|goal|is|to|develop|an|editor|that|will|allow|creation|and|management|of|archival|quality|metadata|without|requiring|extensive|knowledge|of|metadata|standards.|A|comprehensive|User|Manual|is|available.|The|manual|includes|a|tutorial,|reference,|and|best|practices.|View|User|Manual|If|you|would|like|to|receive|announcements|regarding|the|mdEditor,|join|our|email|list!|Join|Email|list|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-help}}
              template block text
            {{/md-help}}
          
      */
      {
        "id": "mDCBuwo3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-help\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent.trim().indexOf('template block text') > 0);
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table data=data columns=columns}}
      */
      {
        "id": "SimpEWop",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-models-table\",null,[[\"data\",\"columns\"],[[24,[\"data\"]],[24,[\"columns\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table}}
              template block text
            {{/md-models-table}}
          
      */
      {
        "id": "HFawtjvi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check-all/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table/components/check all', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.data = {
        themeInstance: {
          'select-all-rows': 'select',
          'deselect-all-rows': 'deselect'
        },
        selectedItems: {
          length: 0
        },
        length: 1
      };
      this.toggleAllSelection = function () {
        assert.ok(true, 'toggleAll action');
        this.set('selectedItems.length', 1);
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/check-all data=data selectedItems=data.selectedItems themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}
      */
      {
        "id": "CQdEzpau",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-models-table/components/check-all\",null,[[\"data\",\"selectedItems\",\"themeInstance\",\"toggleAllSelection\"],[[24,[\"data\"]],[24,[\"data\",\"selectedItems\"]],[24,[\"data\",\"themeInstance\"]],[24,[\"toggleAllSelection\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('span').classList.contains('deselect'), 'add class');
      await (0, _testHelpers.click)('span');

      // await render(hbs`{{md-models-table/components/check-all data=data themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

      assert.ok((0, _testHelpers.find)('span').classList.contains('select'), 'deselect');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table/components/check-all}}
              template block text
            {{/md-models-table/components/check-all}}
          
      */
      {
        "id": "xwLd9HXZ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check-all\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table/components/check', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.themeInstance = {
        'select-row': 'select',
        'deselect-row': 'deselect'
      };
      this.set('isSelected', false);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/check isSelected=isSelected themeInstance=themeInstance}}
      */
      {
        "id": "PMo3Xmev",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-models-table/components/check\",null,[[\"isSelected\",\"themeInstance\"],[[24,[\"isSelected\"]],[24,[\"themeInstance\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('span').classList.contains('deselect'), 'add class');
      this.set('isSelected', true);
      assert.ok((0, _testHelpers.find)('span').classList.contains('select'), 'update class');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table/components/check}}
              template block text
            {{/md-models-table/components/check}}
          
      */
      {
        "id": "vzjRZrkF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-body/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md-models-table/components/row-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function () {
        assert.ok(true, 'call collapseRow');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/row-body collapseRow=myAction}}
      */
      {
        "id": "lcd48Rwn",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-models-table/components/row-body\",null,[[\"collapseRow\"],[[24,[\"myAction\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-buttons/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md-models-table/components/row-buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function (col, index, record) {
        assert.equal(record.title, 'foo', 'called passed action');
        this.expandRow(index, record);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/row-buttons}}
      */
      {
        "id": "L/GNUZXL",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"md-models-table/components/row-buttons\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }, {
        component: 'components/md-models-table/components/row-buttons',
        disableFiltering: true,
        disableSorting: true,
        mayBeHidden: false,
        className: 'text-center',
        buttons: [{
          title: 'foo',
          type: 'info',
          icon: 'house',
          action: this.myAction
        }, {
          title: 'biz',
          type: 'danger',
          icon: 'times',
          confirm: true,
          action: this.myAction
        }]
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table data=data columns=columns expandedRowComponent=(component "md-models-table/components/row-body" spotlighted=true)}}
      */
      {
        "id": "MtwUtds9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-models-table\",null,[[\"data\",\"columns\",\"expandedRowComponent\"],[[24,[\"data\"]],[24,[\"columns\"]],[28,\"component\",[\"md-models-table/components/row-body\"],[[\"spotlighted\"],[true]]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-row-buttons .btn').length, 4);
      assert.equal((0, _testHelpers.findAll)('.md-row-buttons .btn-danger').length, 2);
      assert.dom('.md-button-confirm').hasText('biz');
      assert.dom('.md-button-confirm.btn-danger .fa').hasClass('fa-times');
      await (0, _testHelpers.click)('.md-button-confirm');
      assert.dom('.md-button-confirm').hasText('Confirm');
      await (0, _testHelpers.click)('.btn-info');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-title/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-title}}
      */
      {
        "id": "8da3z/LK",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"md-title\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-title}}
              template block text
            {{/md-title}}
          
      */
      {
        "id": "i7KE7rEm",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-title\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-translate/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md translate', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createRecord.createRecord)(1)[0];
      this.isLoading = false;
      this.messages = null;
      this.result = null;
      this.writer = {
        type: 'json'
      };
      window.saveAs = function (blob, title) {
        assert.ok(title, 'save title');
        assert.equal(blob.constructor.name, 'Blob', 'save blob');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-translate
            model=model
            isLoading=isLoading
            messages=messages
            result=result
            errorLevel=2
            isJson=true
            writeObj=writer
          }}
      */
      {
        "id": "hTkEAnbu",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"md-translate\",null,[[\"model\",\"isLoading\",\"messages\",\"result\",\"errorLevel\",\"isJson\",\"writeObj\"],[[24,[\"model\"]],[24,[\"isLoading\"]],[24,[\"messages\"]],[24,[\"result\"]],2,true,[24,[\"writer\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|');
      this.set('isLoading', true);
      assert.ok((0, _testHelpers.find)('.md-spinner'), 'loading');
      this.set('messages', [["WARNING", " FGDC writer", " citation originator role is missing", " CONTEXT is lineage method"], ["WARNING", " FGDC writer", " citation publication date is missing", " CONTEXT is lineage method"]]);
      assert.equal((0, _testHelpers.find)('.md-translator-error').textContent.replace(/[\s\n]+/g, '|').trim(), '|Translation|Warning|Warning|ocurred|during|translation.|WARNING|citation|originator|role|is|missing|FGDC|writer|context|is|lineage|method|WARNING|citation|publication|date|is|missing|FGDC|writer|context|is|lineage|method|', 'messages');
      this.set('result', '{"foo":"bar"}');
      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning').textContent.replace(/[\s\n]+/g, '|').trim(), '|Result|Preview|JSON|Format|Save|Result|', 'result');
      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning textarea').value, '{"foo":"bar"}', 'textarea value set');
      (0, _testHelpers.click)('.md-translator-preview.warning .btn-success');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-translate}}
              template block text
            {{/md-translate}}
          
      */
      {
        "id": "1qFgffnw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-translate\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/cell-content-display/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/cell-content-display', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('column', {
        propertyName: 'title'
      });
      this.set('data', Ember.Object.create({
        title: 'foo biz baz',
        uri: 'bar'
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/cell-content-display column=column record=data}}
      */
      {
        "id": "PQfhnCwq",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"models-table/cell-content-display\",null,[[\"column\",\"record\"],[[24,[\"column\"]],[24,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'foo biz baz');
      this.set('column1', {
        propertyName: 'title',
        truncate: true,
        wordLimit: 2
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/cell-content-display column=column1 record=data}}
      */
      {
        "id": "95UWO0PS",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"models-table/cell-content-display\",null,[[\"column\",\"record\"],[[24,[\"column1\"]],[24,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'foo biz ...');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/row-expand/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/row-expand', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/row-expand}}
      */
      {
        "id": "HeHLdig+",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"models-table/row-expand\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#models-table/row-expand}}
              template block text
            {{/models-table/row-expand}}
          
      */
      {
        "id": "ksixTEU6",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"models-table/row-expand\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/table-body/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/table-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/table-body}}
      */
      {
        "id": "mTRK7kno",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"models-table/table-body\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#models-table/table-body}}
              template block text
            {{/models-table/table-body}}
          
      */
      {
        "id": "amuBMJuB",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"models-table/table-body\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-address/md-address-block/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md address/md address block', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('address', {
        "addressType": ["mailing", "physical"],
        "description": "description",
        "deliveryPoint": ["deliveryPoint0", "deliveryPoint1"],
        "city": "city",
        "administrativeArea": "administrativeArea",
        "postalCode": "postalCode",
        "country": "country"
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-address/md-address-block item=address}}
      */
      {
        "id": "3D38jJSW",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-address/md-address-block\",null,[[\"item\"],[[24,[\"address\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-address/md-address-block item=address}}
              template block text
            {{/object/md-address/md-address-block}}
          
      */
      {
        "id": "RNQ15DLO",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-address/md-address-block\",null,[[\"item\"],[[24,[\"address\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-allocation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md allocation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('allocation', {
        'amount': 9.9,
        'currency': 'currency',
        'sourceId': 'source',
        'recipientId': 'recipient',
        'matching': true,
        'comment': 'comment',
        sourceAllocationId: 'sourceAllocationId'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-allocation profilePath="test" model=allocation}}
      */
      {
        "id": "WxU7VCci",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-allocation\",null,[[\"profilePath\",\"model\"],[\"test\",[24,[\"allocation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-allocation profilePath="test" model=allocation class="testme"}}
              template block text
            {{/object/md-allocation}}
          
      */
      {
        "id": "mq87gFhb",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-allocation\",null,[[\"profilePath\",\"model\",\"class\"],[\"test\",[24,[\"allocation\"]],\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-array-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        biz: 'biz1',
        baz: 'baz1'
      }, {
        biz: 'biz2',
        baz: 'baz2'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-array-table
              columns="biz,baz"
              value=data
              title="FooBar"
              data-spy="FooBar" as |f|
            }}
              <td>
                {{f.item.biz}}
              </td>
              <td>
                {{f.item.baz}}
              </td>
            {{/object/md-array-table}}
            
      */
      {
        "id": "WbGu1T5E",
        "block": "{\"symbols\":[\"f\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-array-table\",null,[[\"columns\",\"value\",\"title\",\"data-spy\"],[\"biz,baz\",[24,[\"data\"]],\"FooBar\",\"FooBar\"]],{\"statements\":[[0,\"        \"],[7,\"td\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"item\",\"biz\"]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[7,\"td\",true],[8],[0,\"\\n          \"],[1,[23,1,[\"item\",\"baz\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|biz1|baz1|Delete|1|biz2|baz2|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-array-table
              columns="biz,baz"
              value=data
              title="FooBar"
            }}
              template block text
            {{/object/md-array-table}}
          
      */
      {
        "id": "Dx2VY2vr",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-array-table\",null,[[\"columns\",\"value\",\"title\"],[\"biz,baz\",[24,[\"data\"]],\"FooBar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|template|block|text|Delete|1|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md associated', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T04:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-associated profilePath="foobar" model=model}}
      */
      {
        "id": "GjEkhvWk",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-associated\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-associated profilePath="foobar" model=model}}
              template block text
            {{/object/md-associated}}
          
      */
      {
        "id": "kv9BOMnh",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md associated/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T12:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T12:00:00.000Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-associated/preview item=model class="testme"}}
      */
      {
        "id": "3JJNArXu",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-associated/preview\",null,[[\"item\",\"class\"],[[24,[\"model\"]],\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-associated/preview item=model class="testme"}}
              template block text
            {{/object/md-associated/preview}}
          
      */
      {
        "id": "ZTN9BnAs",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated/preview\",null,[[\"item\",\"class\"],[[24,[\"model\"]],\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-attribute model=model profilePath="foobar"}}
      */
      {
        "id": "NlKKzA/m",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-attribute\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-attribute model=model profilePath="foobar"}}
              template block text
            {{/object/md-attribute}}
          
      */
      {
        "id": "3jDPPN+X",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-attribute\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md attribute/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div class="testme">{{object/md-attribute/preview model=model profilePath="foobar"}}</div>
      */
      {
        "id": "BgEXHkYj",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"testme\"],[8],[1,[28,\"object/md-attribute/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|dataType0|×|');
      assert.equal((0, _testHelpers.findAll)('.testme input').length, 3, 'render inputs');
      assert.ok((0, _testHelpers.find)('.testme .md-select'), 'render select');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-bbox/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md bbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "westLongitude": -87.52179241764053,
        "eastLongitude": -85.30119385960293,
        "southLatitude": 29.640690610830635,
        "northLatitude": 30.42485959910817
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-bbox profilePath="foobar" model=model}}
      */
      {
        "id": "W4HvGjO9",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-bbox\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|');
      var inputs = (0, _testHelpers.findAll)('input');
      assert.equal(inputs[0].value, this.model.northLatitude, 'north');
      assert.equal(inputs[1].value, this.model.eastLongitude, 'east');
      assert.equal(inputs[2].value, this.model.southLatitude, 'south');
      assert.equal(inputs[3].value, this.model.westLongitude, 'west');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-bbox profilePath="foobar" model=model}}
              template block text
            {{/object/md-bbox}}
          
      */
      {
        "id": "S4FHfW5A",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-bbox\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(3));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation-array}}
      */
      {
        "id": "MBehbRDh",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"object/md-citation-array\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation-array model=citation}}
      */
      {
        "id": "/uXqSVc7",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-citation-array\",null,[[\"model\"],[[24,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|3|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|2|title2|More...|Delete|', 'renders rows');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation-array}}
              template block text
            {{/object/md-citation-array}}
          
      */
      {
        "id": "8LMMQcD1",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation profilePath="foobar" model=citation}}
      */
      {
        "id": "RtW37Mdh",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-citation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation profilePath="foobar"}}
              template block text
            {{/object/md-citation}}
          
      */
      {
        "id": "eOi54CPK",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/body/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation/preview/body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation/preview/body citation=citation}}
      */
      {
        "id": "YuudbIQI",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-citation/preview/body\",null,[[\"citation\"],[[24,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation/preview/body}}
              template block text
            {{/object/md-citation/preview/body}}
          
      */
      {
        "id": "sUcR8ZyH",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview/body\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      this.set('editCitation', function (v) {
        assert.ok(v, 'Called external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation/preview editCitation=editCitation citation=citation}}
      */
      {
        "id": "w1mHv6wI",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-citation/preview\",null,[[\"editCitation\",\"citation\"],[[24,[\"editCitation\"]],[24,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|Edit|Citation|');
      await (0, _testHelpers.click)('.btn-success');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation/preview editCitation=editCitation}}
              template block text
            {{/object/md-citation/preview}}
          
      */
      {
        "id": "imkcj7Dl",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview\",null,[[\"editCitation\"],[[24,[\"editCitation\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-constraint/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md constraint', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-constraint profilePath="foobar" model=model}}
      */
      {
        "id": "RZXh4ND8",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-constraint\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|No|Responsible|Party|found.|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-constraint profilePath="foobar" model=model}}
              template block text
            {{/object/md-constraint}}
          
      */
      {
        "id": "QB8DUCsX",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-constraint\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|No|Responsible|Party|found.|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md date array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-date-array value=model profilePath="foobar"}}
      */
      {
        "id": "Ce/zxQyN",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-date-array\",null,[[\"value\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|No|Date|found.|Add|Date|');
      this.set('model', [{
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      }]);
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|Delete|', 'item');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-date-array value=model profilePath="foobar"}}
              template block text
            {{/object/md-date-array}}
          
      */
      {
        "id": "ZTcAMYtC",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-date-array\",null,[[\"value\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md date', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <table><tr>{{object/md-date model=model profilePath="foobar"}}</tr></table>
      */
      {
        "id": "dIggkcq3",
        "block": "{\"symbols\":[],\"statements\":[[7,\"table\",true],[8],[7,\"tr\",true],[8],[1,[28,\"object/md-date\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false],[9],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|");
      this.set('model', {
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      });
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|dateType|×|");

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <table><tr>
            {{#object/md-date profilePath="foobar"}}
              template block text
            {{/object/md-date}}
          </tr></table>
      */
      {
        "id": "BmkCkQcZ",
        "block": "{\"symbols\":[],\"statements\":[[7,\"table\",true],[8],[7,\"tr\",true],[8],[0,\"\\n\"],[4,\"object/md-date\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|template|block|text|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distribution/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distribution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "description": "description",
        "liabilityStatement": "liabilityStatement",
        "distributor": [{
          "contact": {
            "role": "role",
            "roleExtent": [{
              "temporalExtent": [{
                "timePeriod": {
                  "startDateTime": "2016-10-24T11:10:15.2-10:00"
                }
              }]
            }],
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }, {
          "contact": {
            "role": "role",
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distribution model=model profilePath="foobar"}}
      */
      {
        "id": "IjVuDFEm",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-distribution\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distribution model=model profilePath="foobar"}}
              template block text
            {{/object/md-distribution}}
          
      */
      {
        "id": "Z9yg2Qxf",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distribution\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|', 'block and list');
    });
    (0, _qunit.skip)('call actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distributor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distributor model=distributor profilePath="foobar"}}
      */
      {
        "id": "kde4eDLI",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-distributor\",null,[[\"model\",\"profilePath\"],[[24,[\"distributor\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distributor model=distributor profilePath="foobar"}}
              template block text
            {{/object/md-distributor}}
          
      */
      {
        "id": "4L4t1mtP",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor\",null,[[\"model\",\"profilePath\"],[[24,[\"distributor\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distributor/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": 0
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distributor/preview item=distributor}}
      */
      {
        "id": "KKG8Y9pR",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-distributor/preview\",null,[[\"item\"],[[24,[\"distributor\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distributor/preview class="testme" item=distributor}}
              template block text
            {{/object/md-distributor/preview}}
          
      */
      {
        "id": "Hv2mqg4O",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor/preview\",null,[[\"class\",\"item\"],[\"testme\",[24,[\"distributor\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md documentation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-documentation profilePath="foobar" model=doc}}
      */
      {
        "id": "lK+RHGL3",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-documentation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"doc\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-documentation profilePath="foobar" model=doc}}
              template block text
            {{/object/md-documentation}}
          
      */
      {
        "id": "B4gRASXT",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"doc\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md documentation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-documentation/preview item=doc}}
      */
      {
        "id": "d1q6QYMQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-documentation/preview\",null,[[\"item\"],[[24,[\"doc\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.text-muted').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-documentation/preview class="testme" item=doc}}
              template block text
            {{/object/md-documentation/preview}}
          
      */
      {
        "id": "9RRr8EXK",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation/preview\",null,[[\"class\",\"item\"],[\"testme\",[24,[\"doc\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domain/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domain', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('domain', (0, _createDictionary.createDomain)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domain profilePath="foobar" model=domain}}
      */
      {
        "id": "iBmZeHij",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-domain\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"domain\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domain profilePath="foobar" model=domain}}
              template block text
            {{/object/md-domain}}
          
      */
      {
        "id": "HY2/r6Qe",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domain\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"domain\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domainitem', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domainitem profilePath="foobar" model=item}}
      */
      {
        "id": "DQCyHSmh",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-domainitem\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"item\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domainitem profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-domainitem}}
          
      */
      {
        "id": "X6RAna9g",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domainitem/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
      */
      {
        "id": "p03DaPWz",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-domainitem/preview\",null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[24,[\"item\"]],\"table\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('input').length, 3);
      assert.equal((0, _testHelpers.findAll)('input')[0].value, 'name0', 'name');
      assert.equal((0, _testHelpers.findAll)('input')[1].value, 'value0', 'value');
      assert.equal((0, _testHelpers.findAll)('input')[2].value, 'definition0', 'definition');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
              template block text
            {{/object/md-domainitem/preview}}
          
      */
      {
        "id": "xpy0yCpN",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem/preview\",null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[24,[\"item\"]],\"table\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[\s\n]+/g, '|').trim(), '|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-entity/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md entity', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('dictionary', (0, _createDictionary.createDictionary)(1)[0].json.dataDictionary);
      this.set('entity', this.dictionary.entity[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-entity dictionary=dictionary profilePath="foobar" model=entity}}
      */
      {
        "id": "VfNF51Hq",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-entity\",null,[[\"dictionary\",\"profilePath\",\"model\"],[[24,[\"dictionary\"]],\"foobar\",[24,[\"entity\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|Attributes|3|Add|OK|#|Attribute|Name|Data|Type|Definition|Allow|Null?|0|dataType0|×|More...|Delete|1|dataType1|×|More...|Delete|2|dataType2|×|More...|Delete|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0-0|×|primaryKeyAttributeCodeName1-0|Foreign|Keys|1|Add|Foreign|Key|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|0|×|attributeCommonName0-0|referencedEntityCodeName00|×|×|referencedAttributeCodeName0-0|Delete|Entity|Indices|1|Add|#|Name|Attributes|Duplicates?|0|×|attributeCodeName0-0|?|Delete|No|Entity|Reference|found.|Add|Entity|Reference|');
      assert.dom('.md-indicator-related').isVisible({
        count: 2
      });

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-entity dictionary=(hash) profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-entity}}
          
      */
      {
        "id": "Lw1Zxth9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-entity\",null,[[\"dictionary\",\"profilePath\",\"model\"],[[28,\"hash\",null,null],\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|No|Alias|found.|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|No|Foreign|Key|found.|Add|Foreign|Key|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-extent"], function (_qunit, _emberQunit, _testHelpers, _createExtent) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-extent', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(9);
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createExtent.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-extent profilePath="foobar" extent=model}}
      */
      {
        "id": "fs1CjFbQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-extent\",null,[[\"profilePath\",\"extent\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+−|Terrain|Features|Bounding|BoxLeaflet|');
      const inputs = (0, _testHelpers.findAll)('.form-group input, .form-group textarea');
      inputs.forEach(i => assert.dom(i).hasValue());
      this.set('model.geographicExtent.firstObject.geographicElement', []);
      this.set('model.geographicExtent.firstObject.boundingBox', {});

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-extent profilePath="foobar" extent=model}}
              template block text
            {{/object/md-extent}}
          
      */
      {
        "id": "VALjKwHA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-extent\",null,[[\"profilePath\",\"extent\"],[\"foobar\",[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/spatial/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md extent/spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.deleteFeatures = function () {
        assert.ok(true, 'call delete');
      };
      this.editFeatures = function (val) {
        assert.equal(val, 9, 'call edit');
      };
      this.extent = {
        "geographicExtent": [{
          // "boundingBox": {
          //   "northLatitude": 34.741612,
          //   "southLatitude": 32.472695,
          //   "eastLongitude": -116.542054,
          //   "westLongitude": -117.729264
          // },
          "geographicElement": [{
            "type": "Feature",
            "id": "3843b29f-bec7-418d-919a-4f794ce749cf",
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[-116.542054, 32.472695], [-117.596742, 34.741612], [-117.596742, 34.741612], [-117.729264, 32.805745], [-117.729264, 32.805745], [-116.542054, 32.472695]]]
            },
            "properties": {
              "name": "New Feature"
            }
          }]
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-extent/spatial
            extent=extent
            index=9
            deleteFeatures=deleteFeatures
            editFeatures=editFeatures
            profilePath="foobar"
          }}
      */
      {
        "id": "onnypTQh",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-extent/spatial\",null,[[\"extent\",\"index\",\"deleteFeatures\",\"editFeatures\",\"profilePath\"],[[24,[\"extent\"]],9,[24,[\"deleteFeatures\"]],[24,[\"editFeatures\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+−|Terrain|FeaturesLeaflet|');
      await (0, _testHelpers.click)('.btn-primary');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": null,
        "southLatitude": null,
        "eastLongitude": null,
        "westLongitude": null
      }), 'clearBox');
      await (0, _testHelpers.click)('.btn-toolbar .btn-success');
      await (0, _testHelpers.doubleClick)('.btn-toolbar .btn-danger');
      this.empty = {
        geographicExtent: [{}]
      };
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-extent/spatial extent=empty profilePath="foobar"
      }}
              template block text
            {{/object/md-extent/spatial}}
          
      */
      {
        "id": "JmHmFY2R",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-extent/spatial\",null,[[\"extent\",\"profilePath\"],[[24,[\"empty\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md funding', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency",
          "onlineResource": [],
          "responsibleParty": []
        }],
        "timePeriod": {
          "id": "id",
          "description": "description",
          "identifier": {
            "identifier": "identifier",
            "namespace": "namespace"
          },
          "periodName": ["periodName0", "periodName1"],
          // "startDateTime": date,
          "endDateTime": "2016-12-31",
          "timeInterval": {
            "interval": 9,
            "units": "year"
          },
          "duration": {
            "years": 1,
            "months": 1,
            "days": 1,
            "hours": 1,
            "minutes": 1,
            "seconds": 1
          }
        },
        description: 'foo is bar.'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-funding model=funding profilePath="foobar"}}
      */
      {
        "id": "6q2W+QCK",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-funding\",null,[[\"model\",\"profilePath\"],[[24,[\"funding\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Allocation|1|Add|OK|#|Amount|Currency|Matching|0|9.9|currency|Not|Defined|Edit|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-funding model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-funding}}
          
      */
      {
        "id": "f9ZRveQ5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-funding\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Allocation|found.|Add|Allocation|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md funding/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency"
        }],
        "timePeriod": {
          "endDateTime": "2016-12-31"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-funding/preview item=funding}}</section>
      */
      {
        "id": "Q8uI/JwI",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"object/md-funding/preview\",null,[[\"item\"],[[24,[\"funding\"]]]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|12-31-2016|Allocations|Amount|Currency|Source|Recipient|Match?|9.9|currency|--|--|--|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-funding/preview item=(hash)}}
              template block text
            {{/object/md-funding/preview}}</section>
          
      */
      {
        "id": "Z+60OAaN",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-funding/preview\",null,[[\"item\"],[[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|Not|defined|Allocations|Amount|Currency|Source|Recipient|Match?|No|allocations|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-graphic-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md graphic array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('graphic', [{
        "fileName": "fileName",
        "fileDescription": "fileDescription",
        "fileType": "fileType",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }, {
        "fileName": "fileName1",
        "fileDescription": "fileDescription1",
        "fileType": "fileType1",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-graphic-array model=graphic}}
      */
      {
        "id": "jM9fWjKK",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-graphic-array\",null,[[\"model\"],[[24,[\"graphic\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|');
      assert.ok((0, _testHelpers.find)('.md-logo-preview').complete, 'loaded image');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-graphic-array model=graphic}}
              template block text
            {{/object/md-graphic-array}}
          
      */
      {
        "id": "2uHo3Yy4",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-graphic-array\",null,[[\"model\"],[[24,[\"graphic\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);

      // Set any properties with this.set('myProperty', 'value');
      this.set('id', [{
        "identifier": "identifier",
        "authority": {
          "title": "title"
        }
      }, {
        "identifier": "identifier1",
        "authority": {
          "title": "title1"
        }
      }]);
      this.set('edit', function (id) {
        assert.ok(id, 'called edit');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier-array model=id editItem=edit}}
      */
      {
        "id": "/3bM0zOy",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-identifier-array\",null,[[\"model\",\"editItem\"],[[24,[\"id\"]],[24,[\"edit\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier|Not|Defined|Not|Defined|More...|Delete|1|identifier1|Not|Defined|Not|Defined|More...|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.equal(this.id.length, 3, 'add item');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.id.length, 2), 'delete item';

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-identifier-array}}
              template block text
            {{/object/md-identifier-array}}
            </section>
          
      */
      {
        "id": "5Mm4RR9N",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-identifier-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-object-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier object table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(2));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier-object-table model=id}}
      */
      {
        "id": "CAHsy/y/",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-identifier-object-table\",null,[[\"model\"],[[24,[\"id\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|1|identifier1|namespace1|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-identifier-object-table}}
              template block text
            {{/object/md-identifier-object-table}}
          
      */
      {
        "id": "e+6pAH/T",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier-object-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier model=id profilePath="foobar"}}
      */
      {
        "id": "/A8dkIwJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-identifier\",null,[[\"model\",\"profilePath\"],[[24,[\"id\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|Namespace|namespace0|×|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');
      assert.equal((0, _testHelpers.find)('input').value, 'identifier0', 'assign value');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-identifier profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-identifier}}
          
      */
      {
        "id": "S0bKBB76",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), "|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md keyword citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('keyword', {
        keywordType: 'theme',
        thesaurus: (0, _createCitation.default)(1)[0]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-citation model=keyword profilePath="foobar"}}
      */
      {
        "id": "f4hP+NZa",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-keyword-citation\",null,[[\"model\",\"profilePath\"],[[24,[\"keyword\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Title|Date|Date|Type|Choose|date|type|Type|theme|?|Edition|URL|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "title0|2016-10-13|edition|http://adiwg.org", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-keyword-citation model=(hash thesaurus=(hash)) profilePath="foobar"}}
              template block text
            {{/object/md-keyword-citation}}
          
      */
      {
        "id": "2BL9vNbl",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-keyword-citation\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,[[\"thesaurus\"],[[28,\"hash\",null,null]]]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Title|Date|Date|Type|Choose|date|type|Type|Choose|keyword|type|Edition|URL|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-list/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md keyword list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
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
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-list model=model profilePath="foobar"}}
      */
      {
        "id": "H4IRxUCa",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-keyword-list\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n]+/g, '|').trim(), '|Delete|foo1|Delete|bar1|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-list model=model readOnly=false profilePath="foobar"}}
      */
      {
        "id": "KP3cNAbQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-keyword-list\",null,[[\"model\",\"readOnly\",\"profilePath\"],[[24,[\"model\"]],false,\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('tr').length, 4, 'Check number of rows.');
      assert.equal((0, _testHelpers.findAll)('input').length, 4, 'Check number of input el.');
      assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
      assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|Toggle|Thesaurus|', 'readOnly = false.');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-keyword-list profilePath="foobar"}}
              template block text
            {{/object/md-keyword-list}}</section>
          
      */
      {
        "id": "IQ1acbqm",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-keyword-list\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md lineage', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-lineage profilePath="foobar" model=lineage}}</section>
      */
      {
        "id": "S+cZidXh",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"object/md-lineage\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"lineage\"]]]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|Source|2|Add|OK|#|Description|0|More...|Delete|1|More...|Delete|Citation|2|Add|OK|#|Title|0|title|More...|Delete|1|title|More...|Delete|Scope|scopeCode|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-lineage profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-lineage}}</section>
          
      */
      {
        "id": "NQkI0apa",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-lineage\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|No|Source|found.|Add|Source|No|Citation|found.|Add|Citation|Scope|Select|type|of|resource.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md lineage/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-lineage/preview item=lineage}}</section>
      */
      {
        "id": "cyboD7KQ",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"object/md-lineage/preview\",null,[[\"item\"],[[24,[\"lineage\"]]]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|statement|Process|Step|No|process|steps|assigned.|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-lineage/preview}}
              template block text
            {{/object/md-lineage/preview}}</section>
          
      */
      {
        "id": "6CYwiqob",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-lineage/preview\",null,null,{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|Not|Defined|Process|Step|No|process|steps|assigned.|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md locale array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('locales', [{
        language: "eng",
        characterSet: "UTF-8",
        country: "USA"
      }, {
        language: "spa",
        characterSet: "UTF-32",
        country: "BDI"
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-locale-array value=locales}}
      */
      {
        "id": "HP04e62h",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-locale-array\",null,[[\"value\"],[[24,[\"locales\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Language|Character|Set|Country|0|eng|?|×|UTF-8|?|×|USA|?|×|Delete|1|spa|?|×|UTF-32|?|×|BDI|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-locale-array}}
              template block text
            {{/object/md-locale-array}}
          
      */
      {
        "id": "RpEtvD8W",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-locale-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Language|Character|Set|Country|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md locale', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('settings', Ember.Object.create({
        data: Ember.Object.create({
          language: "eng",
          characterSet: "UTF-8",
          country: "USA"
        })
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-locale settings=settings model=(hash) profilePath="foobar"}}</section>
      */
      {
        "id": "c61yMLcj",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[1,[28,\"object/md-locale\",null,[[\"settings\",\"model\",\"profilePath\"],[[24,[\"settings\"]],[28,\"hash\",null,null],\"foobar\"]]],false],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-locale settings=settings model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-locale}}</section>
          
      */
      {
        "id": "t+dPPCQy",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\",true],[8],[0,\"\\n\"],[4,\"object/md-locale\",null,[[\"settings\",\"model\",\"profilePath\"],[[24,[\"settings\"]],[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[9],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|template|block|text|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-maintenance/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md maintenance', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "frequency": "frequency",
        "date": [{
          "date": "2016-10-12",
          "dateType": "creation"
        }, {
          "date": "2016-10-12",
          "dateType": "publication"
        }],
        "scope": [{
          "scopeCode": "scopeCode0"
        }, {
          "scopeCode": "scopeCode1"
        }],
        "note": ["note0", "note1"],
        "contact": [{
          "role": "author",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "publisher",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId1"
          }]
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-maintenance profilePath="foobar" model=model}}
      */
      {
        "id": "XzuGL4wJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-maintenance\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|frequency|×|Dates|2|Add|Date|#|Date|Date|Type|Description|0|creation|?|×|Delete|1|publication|?|×|Delete|Contacts|2|Add|Contact|#|Role|Contacts|0|author|?|×|Delete|1|publisher|?|×|Delete|Notes|2|Add|Notes|0|Delete|1|Delete|Scope|×|scopeCode0|×|scopeCode1|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-maintenance profilePath="foobar"}}
              template block text
            {{/object/md-maintenance}}
          
      */
      {
        "id": "n3hfZH+Z",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-maintenance\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|Choose|a|value.|No|Date|found.|Add|Date|No|Contact|found.|Add|Contact|No|Notes|found.|Add|Note|Scope|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-medium/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md medium', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "mediumSpecification": {
          "title": "title"
        },
        "density": 9.9,
        "units": "units",
        "numberOfVolumes": 9,
        "mediumFormat": ["mediumFormat0", "mediumFormat1"],
        "note": "note",
        "identifier": {
          "identifier": "identifier"
        }
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-medium profilePath="foobar" model=model}}
      */
      {
        "id": "JLaw0qhe",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-medium\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|×|mediumFormat0|×|mediumFormat1|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-medium profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-medium}}
          
      */
      {
        "id": "CeRB0Yod",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-medium\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-object-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-object-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-object-table header="Foo Bars" attributes="biz,baz"}}
      */
      {
        "id": "mLSftx/q",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-object-table\",null,[[\"header\",\"attributes\"],[\"Foo Bars\",\"biz,baz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Foo|Bars|found.|Add|Foo|Bar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-object-table
             items=model
             header="FooBar"
             buttonText="Add FooBar"
             ellipsis=true
             profilePath="foobar"
             attributes="biz,baz" as |foo|
            }}
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            {{/object/md-object-table}}
          
      */
      {
        "id": "EKoK956b",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-object-table\",null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[24,[\"model\"]],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],{\"statements\":[[0,\"        \"],[7,\"span\",true],[8],[0,\"Biz:\"],[1,[23,1,[\"biz\"]],false],[9],[0,\"\\n        \"],[7,\"span\",true],[8],[0,\"Baz:\"],[1,[23,1,[\"baz\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|Edit|Delete|1|biz1|baz1|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-objectroute-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md objectroute table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-objectroute-table attributes="biz,baz" header="FooBar"}}
      */
      {
        "id": "FotqDrNK",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-objectroute-table\",null,[[\"attributes\",\"header\"],[\"biz,baz\",\"FooBar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|FooBar|found.|Add|FooBar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-objectroute-table
             items=model
             header="FooBar"
             buttonText="Add FooBar"
             ellipsis=true
             profilePath="foobar"
             attributes="biz,baz" as |foo|
            }}
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            {{/object/md-objectroute-table}}
          
      */
      {
        "id": "FeR2hN55",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-objectroute-table\",null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[24,[\"model\"]],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],{\"statements\":[[0,\"        \"],[7,\"span\",true],[8],[0,\"Biz:\"],[1,[23,1,[\"biz\"]],false],[9],[0,\"\\n        \"],[7,\"span\",true],[8],[0,\"Baz:\"],[1,[23,1,[\"baz\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|More...|Delete|1|biz1|baz1|More...|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-online-resource/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md online resource', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "uri": "http://URI.example.com",
        "protocol": "protocol",
        "name": "name",
        "description": "description",
        "function": "download",
        "applicationProfile": "applicationProfile",
        "protocolRequest": "protocolRequest"
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-online-resource model=model profilePath="foobar"}}
      */
      {
        "id": "5wXqjXqN",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-online-resource\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-online-resource profilePath="foobar" model=model}}
              template block text
            {{/object/md-online-resource}}
          
      */
      {
        "id": "lCJo8dT9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-online-resource\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md party array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.party = [{
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      }, {
        "role": "publisher",
        "party": [{
          "contactId": 1
        }]
      }];
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-party-array value=party profilePath="foobar"}}
      */
      {
        "id": "K0cFGeTa",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-party-array\",null,[[\"value\",\"profilePath\"],[[24,[\"party\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Role|Contacts|0|author|?|×|×|Contact0|Delete|1|publisher|?|×|×|Contact1|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-party-array model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-party-array}}
          
      */
      {
        "id": "yyKFpwnZ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party-array\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Role|Contacts|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md party', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.party = {
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      };
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-party model=party}}
      */
      {
        "id": "KOhCxx2D",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-party\",null,[[\"model\"],[[24,[\"party\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Role|author|?|×|Contacts|×|Contact0|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-party model=(hash)}}
              template block text
            {{/object/md-party}}
          
      */
      {
        "id": "LGrqDqqp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party\",null,[[\"model\"],[[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md process step', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      //
      this.step = {
        "stepId": "stepId",
        "description": "description",
        "rationale": "rationale",
        "timePeriod": {
          "startDateTime": "2016-10-15"
        },
        "processor": [{
          "role": "role",
          "party": [{
            "contactId": "0"
          }]
        }, {
          "role": "role",
          "party": [{
            "contactId": "1"
          }]
        }],
        "stepSource": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "stepProduct": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "reference": [{
          "title": "title0"
        }, {
          "title": "title1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-process-step profilePath="foobar" model=step}}
      */
      {
        "id": "uzoARtvT",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-process-step\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"step\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|");

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-process-step profilePath="foobar" model=step}}
              template block text
            {{/object/md-process-step}}
          
      */
      {
        "id": "aedjZNnb",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-process-step\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"step\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-process-step/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-process-step/preview model=source profilePath="foobar"}}
      */
      {
        "id": "Ml4L1GuD",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-process-step/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"source\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-process-step/preview model=source profilePath="foobar"}}
              template block text
            {{/object/md-process-step/preview}}
          
      */
      {
        "id": "6P6AX1CU",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-process-step/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"source\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile record=model}}
      */
      {
        "id": "koQIUq/w",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-profile\",null,[[\"record\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile record=model}}
              template block text
            {{/object/md-profile}}
          
      */
      {
        "id": "3KIb/ZG3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-profile\",null,[[\"record\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/custom/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = {
        title: 'testme',
        description: 'testing description'
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/custom record=model}}
      */
      {
        "id": "z+SNgkSX",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-profile/custom\",null,[[\"record\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/custom record=model}}
              template block text
            {{/object/md-profile/custom}}
          
      */
      {
        "id": "KM4Hbwhi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-profile/custom\",null,[[\"record\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/form/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/form record=model}}
      */
      {
        "id": "W/2x61O8",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-profile/form\",null,[[\"record\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/form record=model}}
              template block text
            {{/object/md-profile/form}}
          
      */
      {
        "id": "oE+O+NSo",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-profile/form\",null,[[\"record\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/preview  record=model}}
      */
      {
        "id": "9SAZavA7",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-profile/preview\",null,[[\"record\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/preview record=model}}
              template block text
            {{/object/md-profile/preview}}
          
      */
      {
        "id": "fj2A1Puf",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-profile/preview\",null,[[\"record\"],[[24,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/attribute/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _createRecord, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup/attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */
    (0, _qunit.todo)('it renders', async function (assert) {
      let attribute = (0, _createRecord.createAttribute)(1);
      this.set('model', attribute[0]);
      let input = (0, _mdHelpers.nestedValues)(attribute[0]).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}
      */
      {
        "id": "s5xJBO98",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-raster/attrgroup/attribute\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), "|Attribute|Description|Attribute|Identifier|1|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|Band|Boundary|Definition|×|bandBoundaryDefinition0|Transfer|Function|Type|×|transferFunctionType0|Transmitted|Polarization|×|transmittedPolarization0|Detected|Polarization|×|detectedPolarization0|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|");
      assert.equal((0, _mdHelpers.parseInput)(this.element), input);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/attrgroup }}
      */
      {
        "id": "JRuxaajN",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"object/md-raster/attrgroup\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|', 'attrgroup component renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */
    (0, _emberQunit.todo)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription",
        "attributeGroup": [{
          "attributeContentType": ["attributeContentType1", "attributeContentType2"],
          "attribute": [{
            "attributeDescription": "attributeDescription"
          }]
        }],
        "processingLevelCode": {
          "identifier": "identifier1",
          "namespace": "namespace1"
        },
        "imageDescription": {
          "imageQualityCode": {
            "identifier": "identifier2",
            "namespace": "namespace2"
          },
          "illuminationElevationAngle": 45,
          "illuminationAzimuthAngle": 90,
          "imagingCondition": "imageCondition",
          "cloudCoverPercent": 88,
          "compressionQuantity": 23,
          "triangulationIndicator": "true",
          "radiometricCalibrationAvailable": "true",
          "cameraCalibrationAvailable": "false",
          "filmDistortionAvailable": "false",
          "lensDistortionAvailable": "true"
        }
      };
      let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];
      let input = nestedValues(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster profilePath="foobar" model=model}}
      */
      {
        "id": "cbejHDsd",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-raster\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Name|Description|Attribute|Groups|1|Add|Attribute|Group|#0|Attribute|Content|Type|×|attributeContentType1|×|attributeContentType2|Attribute|1|Add|OK|#|Attribute|Description|0|More...|Delete|Processing|Level|Code|Identifier|Namespace|namespace1|×|More|Image|Description|Image|Quality|Code|Identifier|Namespace|namespace2|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'input renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/image-desc/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/image-desc', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "imageQualityCode": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "illuminationElevationAngle": 45,
        "illuminationAzimuthAngle": 90,
        "imagingCondition": "imageCondition",
        "cloudCoverPercent": 88,
        "compressionQuantity": 23,
        "triangulationIndicator": "true",
        "radiometricCalibrationAvailable": "true",
        "cameraCalibrationAvailable": "false",
        "filmDistortionAvailable": "false",
        "lensDistortionAvailable": "true"
      };
      let input = (0, _mdHelpers.nestedValues)(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/image-desc profilePath="foobar" model=model}}
      */
      {
        "id": "ssHkrvWq",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-raster/image-desc\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Image|Quality|Code|Identifier|Namespace|namespace|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|', 'md-raster/image-desc component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster/image-desc inputs render');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription"
      };
      let input = Object.values(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/preview profilePath="foobar" model=model}}
      */
      {
        "id": "//YFtB5/",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-raster/preview\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Raster|Name|Raster|Description|', 'md-raster-preview component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster-preview inputs renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-repository-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md repository array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.repo = [{
        "citation": {
          "title": "Arctic LCC data.gov"
        },
        "repository": "data.gov"
      }, {
        "citation": {
          "title": "Something"
        },
        "repository": "data.gov"
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-repository-array value=repo profilePath="foo"}}
      */
      {
        "id": "wlAh+/SZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-repository-array\",null,[[\"value\",\"profilePath\"],[[24,[\"repo\"]],\"foo\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|×|Delete|1|data.gov|?|×|Delete|');
      assert.dom('.md-input input').hasValue('Arctic LCC data.gov');
      assert.dom('.select-value').hasText('data.gov');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-repository-array profilePath="foo"}}
              template block text
            {{/object/md-repository-array}}
          
      */
      {
        "id": "l4pQMrgv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-repository-array\",null,[[\"profilePath\"],[\"foo\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-resource-type-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md resource type array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.rt = [{
        "type": "project",
        "name": "foobar"
      }, {
        "type": "map"
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-resource-type-array value=rt profilePath="foobar"}}
      */
      {
        "id": "DK9kiKq4",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-resource-type-array\",null,[[\"value\",\"profilePath\"],[[24,[\"rt\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|2|Add|#|Type|Name|0|project|?|×|Delete|1|map|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-resource-type-array profilePath="foobar"}}
              template block text
            {{/object/md-resource-type-array}}
          
      */
      {
        "id": "HUfG50uE",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-resource-type-array\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|Add|#|Type|Name|Add|Resource|Type|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-schema', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', Ember.Object.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-schema record=data}}
      */
      {
        "id": "aeWXPLJE",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-schema\",null,[[\"record\"],[[24,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.equal((0, _testHelpers.find)('.md-schema input').value, 'foo', 'render form');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-schema record=data}}
              template block text
            {{/object/md-schema}}
          
      */
      {
        "id": "nvBqZFUC",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-schema\",null,[[\"record\"],[[24,[\"data\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/form/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-schema/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', Ember.Object.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-schema/form record=data}}
      */
      {
        "id": "+MyiVzQN",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-schema/form\",null,[[\"record\"],[[24,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.equal((0, _testHelpers.find)('input').value, 'foo', 'render form');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-schema/form record=data}}
              template block text
            {{/object/md-schema/form}}
          
      */
      {
        "id": "GsxwB8iq",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-schema/form\",null,[[\"record\"],[[24,[\"data\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-simple-array-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md simple array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.model = ['biz', 'baz'];
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-simple-array-table}}
      */
      {
        "id": "elWQtSaT",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"object/md-simple-array-table\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-simple-array-table
              title="FooBar"
              required=false
              plain=true
              value=model as |foo|
            }}
              <td>
                  {{foo.item.value}}
              </td>
            {{/object/md-simple-array-table}}
          
      */
      {
        "id": "II9umch+",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-simple-array-table\",null,[[\"title\",\"required\",\"plain\",\"value\"],[\"FooBar\",false,true,[24,[\"model\"]]]],{\"statements\":[[0,\"        \"],[7,\"td\",true],[8],[0,\"\\n            \"],[1,[23,1,[\"item\",\"value\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBars|2|Add|FooBar|0|biz|Delete|1|baz|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.equal((0, _testHelpers.findAll)('.table tr').length, 3, 'addItem');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.model.length, 1, 'deleteItem');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md source', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-source profilePath="foobar" model=source}}
      */
      {
        "id": "vqCFfQaa",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-source\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"source\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Metadata|Citation|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Spatial|Reference|System|Reference|System|Type|referenceSystemType|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|distance|Value|Units|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-source profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-source}}
          
      */
      {
        "id": "liklxbTM",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Metadata|Citation|found.|Add|Metadata|Citation|Spatial|Reference|System|Reference|System|Type|Select|type|of|reference|system|used.|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md source/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-source/preview model=source profilePath="foobar"}}
      */
      {
        "id": "JirYe/lT",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-source/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"source\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-source/preview model=source profilePath="foobar"}}
              template block text
            {{/object/md-source/preview}}
          
      */
      {
        "id": "+un1IO3o",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"source\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-info/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md spatial info', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        spatialReferenceSystem: [{
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemIdentifier": {
            "identifier": "Zone 10",
            "namespace": "UTM",
            "description": "Universal Transverse Mercator Zone 10 Seattle, Washington"
          }
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemIdentifier": {
            "identifier": "4326",
            "namespace": "urn:ogc:def:crs:EPSG",
            "description": "epsg projection 4326 - wgs 84 - Latitude Longitude",
            "authority": {
              "title": "European Petroleum Survey Group"
            }
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemWKT": "PROJCS ['Wyoming 4901, Eastern Zone (1983, meters)', GEOGCS ['GRS 80', DATUM ['GRS 80', SPHEROID ['GRS 80', 6378137.000000, 298.257222]], PRIMEM ['Greenwich', 0.000000 ], UNIT ['Decimal Degree', 0.01745329251994330]], PROJECTION ['Transverse Mercator'], PARAMETER ['Scale_Factor', 0.999938], PARAMETER ['Central_Meridian', -105.166667], PARAMETER ['Latitude_Of_Origin', 40.500000], PARAMETER ['False_Easting', 200000.000000], UNIT ['Meter', 1.000000000000]]"
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemParameterSet": {
            "geodetic": {
              "datumIdentifier": {
                "identifier": "identifier"
              },
              "ellipsoidIdentifier": {
                "identifier": "identifier"
              },
              "semiMajorAxis": 9.9,
              "axisUnits": "axisUnits",
              "denominatorOfFlatteningRatio": 9.9
            }
          }
        }],
        spatialResolution: [{
          "scaleFactor": 99999
        }, {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "levelOfDetail": "levelOfDetail"
        }, {
          "geographicResolution": {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "bearingDistanceResolution": {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        }, {
          "coordinateResolution": {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }],
        spatialRepresentationType: ["vector", "stereoModel"]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-info profilePath="foobar" model=model}}
      */
      {
        "id": "xMvYgFoi",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-info\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|×|stereoModel|?|×|vector|?|Spatial|Reference|System|5|Add|OK|#|Reference|System|Type|Identifier|0|referenceSystemType|identifier|Edit|Delete|1|projected|Zone|10|Edit|Delete|2|geodeticGeographic2D|4326|Edit|Delete|3|projected|Not|Defined|Edit|Delete|4|geodeticGeographic2D|Not|Defined|Edit|Delete|Spatial|Resolution|6|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|0|99999|Not|Defined|Not|Defined|Edit|Delete|1|Not|Defined|Not|Defined|distance|Edit|Delete|2|Not|Defined|levelOfDetail|Not|Defined|Edit|Delete|3|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|4|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|5|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|Add|Spatial|Resolution|No|Raster|Description|found.|Add|Raster|Description|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-spatial-info profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-spatial-info}}
          
      */
      {
        "id": "SFe1LKyx",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-info\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|No|Spatial|Reference|System|found.|Add|Spatial|Reference|System|No|Spatial|Resolution|found.|Add|Spatial|Resolution|No|Raster|Description|found.|Add|Raster|Description|template|block|text|', 'block');
    });
    (0, _qunit.skip)('test actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-resolution/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md spatial resolution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "scaleFactor": {
          scaleFactor: 99999
        },
        "measure": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "levelOfDetail": {
          levelOfDetail: "levelOfDetail"
        },
        "geographicResolution": {
          geographicResolution: {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "bearingDistanceResolution": {
          bearingDistanceResolution: {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        },
        "coordinateResolution": {
          coordinateResolution: {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }
      };

      //Todo: Look into this
      //! this option was giving not working well with the regex experesson
      //var empty = "Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|";

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.scaleFactor}}
      */
      {
        "id": "eXxtRz+M",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"scaleFactor\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, this.model.scaleFactor.scaleFactor, 'scaleFactor');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.measure}}
      */
      {
        "id": "0eFa4FGj",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"measure\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, this.model.measure.measure.value, 'measure');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.levelOfDetail}}
      */
      {
        "id": "MUZ988Xw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"levelOfDetail\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, this.model.levelOfDetail.levelOfDetail, 'levelOfDetail');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.geographicResolution}}
      */
      {
        "id": "MOe+H7V/",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"geographicResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'geographicResolution');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.bearingDistanceResolution}}
      */
      {
        "id": "e3fWXarz",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"bearingDistanceResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'bearingDistanceResolution');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.coordinateResolution}}
      */
      {
        "id": "Oc7PDvLs",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"coordinateResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'coordinateResolution');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-spatial-resolution model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-spatial-resolution}}
          
      */
      {
        "id": "YXFsDwzP",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-resolution\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|' + 'template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-srs/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md srs', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.srs = {
        "referenceSystemType": "projected",
        "referenceSystemIdentifier": {
          "identifier": "identifier",
          "version": "version",
          "description": "description"
        }
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-srs profilePath="foobar" model=srs}}
      */
      {
        "id": "Sy6WAXJG",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-srs\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"srs\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, 'identifier|version|description|', 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-srs profilePath="foobar"}}
              template block text
            {{/object/md-srs}}
          
      */
      {
        "id": "8sDbB5EM",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-srs\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Reference|System|Type|Select|type|of|reference|system|used.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification;
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification model=model profilePath="foobar"}}
      */
      {
        "id": "RN7++R2/",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/classification\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification model=model preview=true profilePath="foobar"}}
      */
      {
        "id": "mJysUZSf",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/classification\",null,[[\"model\",\"preview\",\"profilePath\"],[[24,[\"model\"]],true,\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/classification profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/classification}}
          
      */
      {
        "id": "m7kGbppK",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/taxon/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification/taxon', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(7);
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification[0];
      this.delete = function (taxa) {
        assert.ok(taxa, 'called delete');
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification/taxon model=model deleteTaxa=delete top=top profilePath="foobar"}}
      */
      {
        "id": "crm4Gk3O",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/classification/taxon\",null,[[\"model\",\"deleteTaxa\",\"top\",\"profilePath\"],[[24,[\"model\"]],[24,[\"delete\"]],[24,[\"top\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|');
      // await click('.btn-info');

      await (0, _testHelpers.click)('.btn-success');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|', 'edit');
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');
      await (0, _testHelpers.click)('.btn-danger');
      await (0, _testHelpers.click)('.btn-danger');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|');
      await (0, _testHelpers.click)('.md-taxon .md-taxon .btn-info');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ul class="list-group md-classification">
            {{object/md-taxonomy/classification/taxon model=model preview=false top=top profilePath="foobar"}}
          </ul>
      */
      {
        "id": "MGLvUSe2",
        "block": "{\"symbols\":[],\"statements\":[[7,\"ul\",true],[10,\"class\",\"list-group md-classification\"],[8],[0,\"\\n      \"],[1,[28,\"object/md-taxonomy/classification/taxon\",null,[[\"model\",\"preview\",\"top\",\"profilePath\"],[[24,[\"model\"]],false,[24,[\"top\"]],\"foobar\"]]],false],[0,\"\\n    \"],[9]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.waitFor)('.md-taxon-form', {
        timeout: 2000,
        count: 1
      });
      assert.dom('.md-taxon-body').isVisible({
        count: 4
      });
      assert.dom('.md-taxon-body.md-spotlight-target').isVisible();
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');
      let del = (0, _testHelpers.findAll)('.md-taxon .md-taxon .btn-danger').lastObject;
      await (0, _testHelpers.click)(del);
      await (0, _testHelpers.click)(del);

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/classification/taxon model=model profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/classification/taxon}}
          
      */
      {
        "id": "QoGdMJ/5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification/taxon\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection model=model profilePath="foobar"}}
      */
      {
        "id": "hxINAx20",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/collection\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Taxonomic|System|1|Add|OK|#|Title|Modifications|0|More...|Delete|Classification|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|Observers|1|Add|#|Role|Contacts|0|pointOfContact|?|×|Delete|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|1|Add|OK|#|Specimen|0|Specimen|Edit|Delete|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications||Scope|Id Procedure|Id Completeness", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-taxonomy/collection}}
          
      */
      {
        "id": "ELqbY7+N",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Taxonomic|System|found.|Add|Taxonomic|System|Classification|No|Classification|found.|No|Observer|found.|Add|Observer|General|Scope|Identification|Procedure|Identification|Completeness|No|Voucher|found.|Add|Voucher|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/system model=model profilePath="foobar"}}
      */
      {
        "id": "WenkIkkq",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/collection/system\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|transmitted|?|×|Delete|Edition|Presentation|Form|×|webService|?|×|webSite|?|No|Responsible|Party|found.|Add|Responsible|Party|Online|Resource|1|Add|OK|#|Name|Uri|0|ITIS|website|https://www.itis.gov|Edit|Delete|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|Other|Details|1|Add|0|Delete|Graphic|1|Add|OK|0|itis_logo.jpg:|Edit|Delete|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "modifications|Integrated Taxonomic Information System (ITIS)|2019-02-26|Taxa imported from ITIS||||||Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/system model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/collection/system}}
          
      */
      {
        "id": "ThrbIf9n",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/system/preview model=model profilePath="foobar"}}
      */
      {
        "id": "NNUO0dJ0",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/collection/system/preview\",null,[[\"model\",\"profilePath\"],[[24,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/system/preview model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/collection/system/preview}}
          
      */
      {
        "id": "61zUzbnB",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system/preview\",null,[[\"model\",\"profilePath\"],[[28,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/voucher/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/voucher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].voucher[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/voucher profilePath="foobar" model=model}}
      */
      {
        "id": "78byeNMw",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy/collection/voucher\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Specimen|Repository|Role|custodian|?|×|Contacts|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Specimen|", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/voucher profilePath="foobar" model=(hash repository=(hash))}}
              template block text
            {{/object/md-taxonomy/collection/voucher}}
          
      */
      {
        "id": "4iJ3y5K3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/voucher\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,[[\"repository\"],[[28,\"hash\",null,null]]]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Specimen|Repository|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy model=model index=0 profilePath="foobar"}}
      */
      {
        "id": "hKuL6Ndg",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-taxonomy\",null,[[\"model\",\"index\",\"profilePath\"],[[24,[\"model\"]],0,\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#0:|Integrated|Taxonomic|Information|System|(ITIS)|Edit|Collection|Delete|Collection|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');
      await (0, _testHelpers.click)('li .icon');
      assert.equal((0, _testHelpers.find)('li').textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Subkingdom|Dikarya|(936287)|Division|Basidiomycota|(623881)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy}}
              template block text
            {{/object/md-taxonomy}}
          
      */
      {
        "id": "HDyTEyIi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#undefined|Edit|Collection|Delete|Collection|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-time-period/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "moment"], function (_testHelpers, _qunit, _emberQunit, _moment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md time period', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var date = new Date("2016-10-14T13:10:15-0800");
      this.model = [{
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startDateTime": date,
        "endDateTime": "2016-12-31",
        "timeInterval": {
          "interval": 9,
          "units": "year"
        },
        "duration": {
          "years": 1,
          "months": 1,
          "days": 1,
          "hours": 1,
          "minutes": 1,
          "seconds": 1
        }
      }, {
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        },
        "endGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        }
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-time-period profilePath="foobar" model=model.firstObject}}
      */
      {
        "id": "U89TaM8f",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"firstObject\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, (0, _moment.default)(date).format('YYYY-MM-DD HH:mm:ss') + '|2016-12-31 00:00:00|identifier|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-time-period profilePath="foobar" model=model.lastObject}}
      */
      {
        "id": "dFw4B4Mc",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\",\"lastObject\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      var input1 = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input1, "||identifier|description|periodName0|periodName1|||||||", 'geologic input values');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|", 'geologic age');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-time-period profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-time-period}}
          
      */
      {
        "id": "EsFl+8oJ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md transfer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-transfer profilePath="foobar" model=model}}
      */
      {
        "id": "ytYwBogl",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-transfer\",null,[[\"profilePath\",\"model\"],[\"foobar\",[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|Online|Option|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://adiwg.org/|Edit|Delete|Offline|Option|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Distribution|Formats|2|Add|#|Format|Name|Version|Compression|Method|URL|0|Delete|1|Delete|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "9.9|unitsOfDistribution|title0||||title1|||||9||||", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-transfer profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-transfer}}
          
      */
      {
        "id": "WDutFaE4",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-transfer\",null,[[\"profilePath\",\"model\"],[\"foobar\",[28,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|No|Online|Option|found.|Add|Online|Option|No|Offline|Option|found.|Add|Offline|Option|No|Distribution|Format|found.|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-transfer/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-transfer/preview item=model}}
      */
      {
        "id": "RXid3Ivo",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"object/md-transfer/preview\",null,[[\"item\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|9.9|yes(2)|yes(2)|yes(2)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-transfer/preview isTable=false item=model as |t|}}
              transferSize: {{t.transferSize}}
            {{/object/md-transfer/preview}}
          
      */
      {
        "id": "4jzQXstu",
        "block": "{\"symbols\":[\"t\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-transfer/preview\",null,[[\"isTable\",\"item\"],[false,[24,[\"model\"]]]],{\"statements\":[[0,\"        transferSize: \"],[1,[23,1,[\"transferSize\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|transferSize:|9.9|');
    });
  });
});
define("mdeditor/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass ESLint\n\n11:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n38:7 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n67:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n68:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n69:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n94:18 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/add-em.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/add-em.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/bbox-to-poly.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/bbox-to-poly.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/get-dash.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-dash.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/get-property.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-property.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/md-markdown.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/md-markdown.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/mod.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/mod.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/object-is-empty.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/object-is-empty.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/present.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/present.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/uc-words.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/uc-words.js should pass ESLint\n\n');
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
    assert.ok(false, 'initializers/local-storage-export.js should pass ESLint\n\n4:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n56:3 - Use `import Store from \'@ember-data/store\';` instead of using DS.Store (ember/use-ember-data-rfc-395-imports)');
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
  QUnit.test('mixins/cancel.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/cancel.js should pass ESLint\n\n6:16 - Don\'t create new mixins (ember/no-new-mixins)\n11:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n14:12 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('mixins/hash-poll.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/hash-poll.js should pass ESLint\n\n24:16 - Don\'t create new mixins (ember/no-new-mixins)\n30:8 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('mixins/object-template.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/object-template.js should pass ESLint\n\n13:16 - Don\'t create new mixins (ember/no-new-mixins)\n61:24 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n76:22 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('mixins/scroll-to.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/scroll-to.js should pass ESLint\n\n8:16 - Don\'t create new mixins (ember/no-new-mixins)');
  });
  QUnit.test('models/base.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/base.js should pass ESLint\n\n1:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n8:14 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:14 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n51:18 - Don\'t use observers (ember/no-observers)\n59:20 - Don\'t use observers (ember/no-observers)\n65:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n67:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n74:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n154:17 - Use of undeclared dependencies in computed property: hasDirtyAttributes (ember/require-computed-property-dependencies)\n172:14 - Use of undeclared dependencies in computed property: currentHash, jsonRevert (ember/require-computed-property-dependencies)\n174:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n198:11 - Use of undeclared dependencies in computed property: currentHash (ember/require-computed-property-dependencies)\n230:18 - Use of undeclared dependencies in computed property: constructor.modelName, customProfiles.mapById (ember/require-computed-property-dependencies)');
  });
  QUnit.test('models/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/contact.js should pass ESLint\n\n15:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n62:21 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n98:13 - Use `import { hasMany } from \'@ember-data/model\';` instead of using DS.hasMany (ember/use-ember-data-rfc-395-imports)\n101:18 - Use `import { hasMany } from \'@ember-data/model\';` instead of using DS.hasMany (ember/use-ember-data-rfc-395-imports)\n113:9 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n127:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n194:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n209:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n223:16 - Use of undeclared dependencies in computed property: contactsService.organizations, json.contactId (ember/require-computed-property-dependencies)\n227:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n233:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n235:29 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n236:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n240:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n265:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n269:28 - Use of undeclared dependencies in computed property: contactsService.organizations (ember/require-computed-property-dependencies)\n271:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n273:62 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n276:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n288:17 - Use of undeclared dependencies in computed property: contactsService.organizations, json (ember/require-computed-property-dependencies)\n301:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n307:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n311:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n332:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n351:17 - Use of undeclared dependencies in computed property: cleanJson, mdjson (ember/require-computed-property-dependencies)');
  });
  QUnit.test('models/custom-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/custom-profile.js should pass ESLint\n\n1:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n76:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n76:16 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n94:8 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n95:10 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n96:10 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n97:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n98:14 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n106:12 - Use `import { hasMany } from \'@ember-data/model\';` instead of using DS.hasMany (ember/use-ember-data-rfc-395-imports)\n107:15 - Use of undeclared dependencies in computed property: definitions.profiles (ember/require-computed-property-dependencies)\n123:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('models/dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/dictionary.js should pass ESLint\n\n2:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n39:21 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n80:12 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n83:9 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n88:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n108:17 - Use of undeclared dependencies in computed property: cleanJson, mdjson (ember/require-computed-property-dependencies)\n138:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n139:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('models/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/profile.js should pass ESLint\n\n1:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n52:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n52:16 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n69:8 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n70:10 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n71:19 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n72:18 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n73:11 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n96:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('models/record.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/record.js should pass ESLint\n\n6:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n75:12 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n78:9 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n124:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n132:9 - Use of undeclared dependencies in computed property: json.metadata.resourceInfo.resourceType.0.type (ember/require-computed-property-dependencies)\n134:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n151:14 - Use of undeclared dependencies in computed property: store (ember/require-computed-property-dependencies)\n166:18 - Use of undeclared dependencies in computed property: hasParent.identifier, store (ember/require-computed-property-dependencies)\n167:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n209:17 - Use of undeclared dependencies in computed property: mdjson (ember/require-computed-property-dependencies)\n250:52 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('models/schema.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/schema.js should pass ESLint\n\n1:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n72:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n72:17 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n91:10 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n92:8 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n93:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n94:15 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n95:12 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n96:18 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n97:13 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n100:18 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n127:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n143:14 - Use of undeclared dependencies in computed property: customSchemas.length, schemaValidator, title (ember/require-computed-property-dependencies)\n143:52 - Always return a value from computed properties (ember/require-return-from-computed)\n144:27 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n176:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('models/setting.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/setting.js should pass ESLint\n\n4:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n12:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:18 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n34:19 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n37:15 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n40:13 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n43:15 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n46:13 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n49:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n52:16 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n57:17 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n60:12 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n63:13 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n66:18 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n69:20 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n72:21 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n75:23 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n76:19 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n81:18 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n92:19 - Don\'t use observers (ember/no-observers)\n95:24 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/control/md-alert-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-alert-table/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n20:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-button-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-button-confirm/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-button-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-button-modal/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n61:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-button/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-button/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n75:15 - Use of undeclared dependencies in computed property: text.length (ember/require-computed-property-dependencies)');
  });
  QUnit.test('pods/components/control/md-contact-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-contact-link/component.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n18:32 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n19:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n20:45 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/control/md-contact-title/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-contact-title/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/control/md-crud-buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-crud-buttons/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n29:15 - Use of undeclared dependencies in computed property: settings.data.showDelete (ember/require-computed-property-dependencies)\n33:13 - Use of undeclared dependencies in computed property: settings.data.showCopy (ember/require-computed-property-dependencies)\n37:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-definition/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-definition/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/control/md-edit-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-edit-table/component.js should pass ESLint\n\n57:18 - Use of undeclared dependencies in computed property: actionBadges (ember/require-computed-property-dependencies)\n95:1 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-errors/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-errors/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-fiscalyear/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-fiscalyear/component.js should pass ESLint\n\n27:13 - Use the `not` computed property macro. (ember/require-computed-macros)\n28:13 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n32:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/control/md-import-csv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-import-csv/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n22:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n22:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n103:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n109:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n168:13 - Do not use jQuery (ember/no-jquery)\n217:17 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/components/control/md-indicator/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-indicator/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n29:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-indicator/related/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-indicator/related/component.js should pass ESLint\n\n124:12 - Use of undeclared dependencies in computed property: relatedId, relatedIdLocal, this.model (ember/require-computed-property-dependencies)\n137:17 - Use of undeclared dependencies in computed property: parent, path (ember/require-computed-property-dependencies)');
  });
  QUnit.test('pods/components/control/md-infotip/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-infotip/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-itis/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-itis/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n29:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n33:5 - Use `set(this, \'propertyName\', \'value\')` instead of assignment for untracked properties that are used as computed property dependencies (or convert to using tracked properties). (ember/no-assignment-of-untracked-properties-used-in-tracking-contexts)\n36:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n47:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n78:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n99:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n101:69 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n103:53 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n105:53 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n123:48 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n126:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/control/md-json-button/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-json-button/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n48:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-json-viewer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-json-viewer/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n54:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n54:3 - Call super in lifecycle hooks (ember/require-super-in-lifecycle-hooks)\n58:5 - Do not use jQuery (ember/no-jquery)\n62:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n64:7 - Do not use jQuery (ember/no-jquery)\n68:7 - Do not use jQuery (ember/no-jquery)\n72:18 - Do not use jQuery (ember/no-jquery)\n76:18 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/components/control/md-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-modal/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n97:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-record-table/buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n8:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-record-table/buttons/custom/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/custom/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-record-table/buttons/filter/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/filter/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n8:15 - Use the `gt` computed property macro. (ember/require-computed-macros)\n9:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n17:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n28:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-record-table/buttons/show/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/buttons/show/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/control/md-record-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-record-table/component.js should pass ESLint\n\n36:37 - Use of undeclared dependencies in computed property: actionsColumn (ember/require-computed-property-dependencies)\n128:18 - Use of undeclared dependencies in computed property: showSlider (ember/require-computed-property-dependencies)\n144:18 - Use of undeclared dependencies in computed property: data, selectProperty (ember/require-computed-property-dependencies)\n176:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n181:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n189:27 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n190:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n191:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n191:66 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n193:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n197:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n202:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n206:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/control/md-repo-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-repo-link/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n12:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-scroll-into-view/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-scroll-into-view/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n7:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)');
  });
  QUnit.test('pods/components/control/md-scroll-spy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-scroll-spy/component.js should pass ESLint\n\n8:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n14:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n63:8 - Do not use jQuery (ember/no-jquery)\n64:16 - Do not use jQuery (ember/no-jquery)\n70:20 - Do not use jQuery (ember/no-jquery)\n74:19 - Do not use jQuery (ember/no-jquery)\n94:19 - Do not use jQuery (ember/no-jquery)\n101:34 - Do not using `String` prototype extension methods. (ember/no-string-prototype-extensions)\n111:5 - Do not use jQuery (ember/no-jquery)\n123:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n126:16 - Do not use jQuery (ember/no-jquery)\n139:35 - Do not using `String` prototype extension methods. (ember/no-string-prototype-extensions)\n145:12 - Do not use jQuery (ember/no-jquery)\n154:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n170:19 - Do not use jQuery (ember/no-jquery)\n173:7 - Do not use jQuery (ember/no-jquery)\n176:5 - Do not use jQuery (ember/no-jquery)\n179:7 - Do not use jQuery (ember/no-jquery)\n190:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-select-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-select-table/component.js should pass ESLint\n\n69:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-spinner/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-spinner/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/md-spotlight/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-spotlight/component.js should pass ESLint\n\n64:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/md-status/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/md-status/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n29:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/control/subbar-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-citation/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/subbar-importcsv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-importcsv/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/subbar-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-link/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/control/subbar-spatial/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/control/subbar-spatial/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n4:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/ember-tooltip/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/ember-tooltip/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/input/md-boolean/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-boolean/component.js should pass ESLint\n\n6:9 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n9:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n9:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/input/md-codelist-multi/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-codelist-multi/component.js should pass ESLint\n\n94:17 - Use of undeclared dependencies in computed property: codelist (ember/require-computed-property-dependencies)\n114:13 - Use of undeclared dependencies in computed property: create (ember/require-computed-property-dependencies)');
  });
  QUnit.test('pods/components/input/md-codelist/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-codelist/component.js should pass ESLint\n\n44:7 - Use of undeclared dependencies in computed property: mdCodeName, namePath (ember/require-computed-property-dependencies)\n141:17 - Use of undeclared dependencies in computed property: codelist (ember/require-computed-property-dependencies)\n167:11 - Use of undeclared dependencies in computed property: defaultIcon, icons, mdCodeName, namePath, tooltipPath, valuePath (ember/require-computed-property-dependencies)\n200:13 - Use of undeclared dependencies in computed property: create (ember/require-computed-property-dependencies)\n252:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/input/md-date-range/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-date-range/component.js should pass ESLint\n\n8:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n39:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n39:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n87:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n90:8 - Always return a value from computed properties (ember/require-return-from-computed)\n91:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n99:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n102:8 - Always return a value from computed properties (ember/require-return-from-computed)\n103:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/input/md-datetime/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-datetime/component.js should pass ESLint\n\n14:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n33:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n33:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n84:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n85:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n208:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n220:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n229:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/input/md-input-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-input-confirm/component.js should pass ESLint\n\n22:15 - Use the `reads` computed property macro. (ember/require-computed-macros)\n26:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/input/md-input/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-input/component.js should pass ESLint\n\n8:9 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n13:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n80:41 - Use of undeclared dependencies in computed property: validation.options.presence.disabled, validation.options.presence.presence (ember/require-computed-property-dependencies)\n85:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n86:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/input/md-markdown-area/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-markdown-area/component.js should pass ESLint\n\n6:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n12:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n28:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n32:15 - Do not use jQuery (ember/no-jquery)\n52:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n55:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n56:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n115:12 - Use of undeclared dependencies in computed property: errorClass, length (ember/require-computed-property-dependencies)\n117:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n122:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n122:75 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n126:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n126:75 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n145:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n145:35 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n158:15 - Use of undeclared dependencies in computed property: length, required (ember/require-computed-property-dependencies)\n158:46 - Always return a value from computed properties (ember/require-return-from-computed)\n159:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n160:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n162:8 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/input/md-month/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-month/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/input/md-select-contact/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-contact/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/input/md-select-contacts/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-contacts/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/input/md-select-profile/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-profile/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n42:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/input/md-select-thesaurus/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select-thesaurus/component.js should pass ESLint\n\n9:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n11:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n11:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n49:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/input/md-select/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-select/component.js should pass ESLint\n\n11:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n15:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n74:13 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n75:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n281:14 - Use the `reads` computed property macro. (ember/require-computed-macros)\n332:17 - Use of undeclared dependencies in computed property: codelist (ember/require-computed-property-dependencies)\n354:13 - Use of undeclared dependencies in computed property: defaultIcon, namePath, tooltipPath, valuePath (ember/require-computed-property-dependencies)\n417:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/input/md-textarea/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/input/md-textarea/component.js should pass ESLint\n\n6:9 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n12:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n48:41 - Use of undeclared dependencies in computed property: validation.options.presence.disabled, validation.options.presence.presence (ember/require-computed-property-dependencies)\n53:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n54:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/input/md-toggle/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-toggle/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/layout/md-breadcrumb/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-breadcrumb/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/layout/md-card/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-card/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n12:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n252:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n256:18 - Do not use jQuery (ember/no-jquery)\n257:18 - Do not use jQuery (ember/no-jquery)\n272:9 - Do not use jQuery (ember/no-jquery)\n290:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n294:7 - Do not use jQuery (ember/no-jquery)\n296:7 - Do not use jQuery (ember/no-jquery)\n299:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/layout/md-footer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-footer/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/layout/md-nav-main/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-main/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n9:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n11:7 - Do not use jQuery (ember/no-jquery)\n14:7 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/components/layout/md-nav-secondary/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-secondary/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:1 - Don\'t use a mixin (ember/no-mixins)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n36:10 - Use of undeclared dependencies in computed property: linkWidth, model.constructor.modelName, nav.offset, navLinks, this.customProfile.defaultProfile.definition.nav (ember/require-computed-property-dependencies)\n38:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n50:42 - Use of undeclared dependencies in computed property: linkWidth, nav.offset (ember/require-computed-property-dependencies)\n69:14 - Use of undeclared dependencies in computed property: navPadding (ember/require-computed-property-dependencies)\n84:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n84:3 - Call super in lifecycle hooks (ember/require-super-in-lifecycle-hooks)');
  });
  QUnit.test('pods/components/layout/md-nav-secondary/link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-secondary/link/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n7:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n9:25 - Do not use jQuery (ember/no-jquery)\n13:33 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/layout/md-nav-sidebar/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-nav-sidebar/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n12:15 - Use of undeclared dependencies in computed property: version (ember/require-computed-property-dependencies)\n12:24 - Always return a value from computed properties (ember/require-return-from-computed)\n29:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n34:7 - Do not use jQuery (ember/no-jquery)\n37:7 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/components/layout/md-object-container/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-object-container/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n38:15 - Use of undeclared dependencies in computed property: index (ember/require-computed-property-dependencies)');
  });
  QUnit.test('pods/components/layout/md-slider/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-slider/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n12:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n12:3 - Call super in lifecycle hooks (ember/require-super-in-lifecycle-hooks)\n13:5 - Do not use jQuery (ember/no-jquery)\n23:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n28:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/layout/md-wrap/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/md-wrap/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/layout/nav/dictionary/nav-main/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/nav/dictionary/nav-main/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/layout/nav/record/nav-main/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/layout/nav/record/nav-main/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/md-help/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-help/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/md-models-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/md-models-table/components/check-all/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-models-table/components/check-all/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n4:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/md-models-table/components/check/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-models-table/components/check/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n6:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/md-models-table/components/row-body/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-models-table/components/row-body/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n10:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n17:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)');
  });
  QUnit.test('pods/components/md-models-table/components/row-buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/md-models-table/components/row-buttons/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
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
    assert.ok(false, 'pods/components/md-translate/component.js should pass ESLint\n\n6:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n32:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n32:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n103:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n109:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n112:18 - Use of undeclared dependencies in computed property: errorTitle, errors (ember/require-computed-property-dependencies)\n113:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n116:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n121:13 - Use of undeclared dependencies in computed property: writerOptions (ember/require-computed-property-dependencies)\n122:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n123:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n128:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n138:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n151:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n164:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n166:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n167:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n168:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n190:13 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n201:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n207:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n208:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n209:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n215:52 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n223:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n236:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/models-table/table-body/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/models-table/table-body/component.js should pass ESLint\n\n4:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-address/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-address/component.js should pass ESLint\n\n8:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n11:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n11:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n55:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-address/md-address-block/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-address/md-address-block/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-allocation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-allocation/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n25:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n26:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n29:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n31:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n32:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n33:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n34:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n56:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-array-table/component.js should pass ESLint\n\n8:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n14:1 - Don\'t use a mixin (ember/no-mixins)\n16:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n26:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n181:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n199:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n241:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n265:19 - Do not use jQuery (ember/no-jquery)\n266:19 - Do not use jQuery (ember/no-jquery)\n282:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-associated/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-associated/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n20:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n26:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n28:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n29:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n30:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n31:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n33:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n38:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n63:29 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n67:22 - Use of undeclared dependencies in computed property: recordId (ember/require-computed-property-dependencies)\n70:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n82:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n89:56 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n93:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-associated/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-associated/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n23:13 - Use of undeclared dependencies in computed property: item.resourceCitation (ember/require-computed-property-dependencies)\n24:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n30:29 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n33:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n36:23 - Use of undeclared dependencies in computed property: item.metadataCitation.identifier.0 (ember/require-computed-property-dependencies)\n37:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n38:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n44:29 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-attribute/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-attribute/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n48:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n60:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n61:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n64:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n66:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n67:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n68:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n69:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n70:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n71:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n92:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n101:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n104:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n106:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n107:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n108:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n114:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-attribute/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-attribute/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-bbox/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-bbox/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n45:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n45:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-citation-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation-array/component.js should pass ESLint\n\n3:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n66:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n8:22 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n10:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n12:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n14:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:25 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n20:24 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n25:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n43:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n48:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n49:25 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n53:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-citation/preview/body/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/preview/body/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-citation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-citation/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n41:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-constraint/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-constraint/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n35:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n36:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n39:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n41:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n42:35 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n43:29 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n44:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n46:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n51:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n71:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-contact-identifier-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-contact-identifier-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n23:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n43:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-date-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-date-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n9:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n20:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-date/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-date/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n19:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-distribution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distribution/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n28:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n29:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n32:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n34:9 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n79:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n84:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-distributor/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distributor/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n24:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n25:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n28:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n30:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n31:29 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n35:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n37:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n42:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n64:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n78:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-distributor/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-distributor/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-documentation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-documentation/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n19:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n20:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n23:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n26:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n27:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n31:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-documentation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-documentation/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-domain/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-domain/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n41:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n42:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n45:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n47:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n48:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n49:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n50:37 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n88:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n92:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-domainitem/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-domainitem/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n42:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n50:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n51:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n54:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n56:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n57:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n79:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-domainitem/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-domainitem/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-entity/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-entity/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n47:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n50:68 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n54:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n57:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n59:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n60:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n61:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n62:49 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n64:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n65:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n66:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n67:37 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n97:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n99:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n132:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n169:18 - Use of undeclared dependencies in computed property: model.attribute (ember/require-computed-property-dependencies)\n170:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n174:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n175:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n176:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n185:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n187:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n189:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n190:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n191:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n213:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n215:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n219:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n222:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n223:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n224:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-extent/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-extent/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-extent/spatial/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-extent/spatial/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n19:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n19:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n20:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n23:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:10 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n26:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n57:21 - Don\'t use observers (ember/no-observers)\n94:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-funding/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-funding/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n46:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n47:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n50:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n52:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n53:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n54:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n74:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-funding/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-funding/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-graphic-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-graphic-array/component.js should pass ESLint\n\n8:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n11:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n11:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n75:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-identifier-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-identifier-array/component.js should pass ESLint\n\n3:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n70:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-identifier-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-identifier-object-table/component.js should pass ESLint\n\n');
  });
  QUnit.test('pods/components/object/md-identifier/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-identifier/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n21:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n21:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n22:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n25:17 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n27:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n28:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/components/object/md-keyword-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-keyword-citation/component.js should pass ESLint\n\n9:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n33:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n33:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n36:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n42:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n45:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n55:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n58:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n68:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n71:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-keyword-list/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-keyword-list/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n10:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n13:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n17:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n25:7 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/components/object/md-lineage/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-lineage/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n13:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n15:10 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n16:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n18:33 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n23:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n48:22 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n55:19 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-lineage/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-lineage/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-locale-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-locale-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-locale/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-locale/component.js should pass ESLint\n\n21:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n40:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n40:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n43:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n47:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n52:12 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/object/md-maintenance/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-maintenance/component.js should pass ESLint\n\n6:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n19:13 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n20:14 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n21:13 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n22:16 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n28:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n37:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n61:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n64:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n65:25 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n70:11 - Use of undeclared dependencies in computed property: model.scope (ember/require-computed-property-dependencies)\n72:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-medium/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-medium/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n10:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:10 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n13:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n15:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-object-table/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n13:1 - Don\'t use a mixin (ember/no-mixins)\n16:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n46:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n57:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n267:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n267:47 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n270:12 - Use of undeclared dependencies in computed property: elementId (ember/require-computed-property-dependencies)\n304:14 - Do not using `String` prototype extension methods. (ember/no-string-prototype-extensions)\n313:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n329:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-objectroute-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-objectroute-table/component.js should pass ESLint\n\n55:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-online-resource-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-online-resource-array/component.js should pass ESLint\n\n13:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n16:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n18:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n22:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n118:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-online-resource/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-online-resource/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n27:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n27:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n28:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n31:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n34:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n56:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n59:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n71:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-party-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-party-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n6:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-party/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-party/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n36:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n44:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n59:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n59:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n60:14 - Use of undeclared dependencies in computed property: model.party (ember/require-computed-property-dependencies)\n62:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n77:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n82:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n83:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n84:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/components/object/md-phone-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-phone-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n23:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n43:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-process-step/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-process-step/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n15:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n16:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n20:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n23:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n26:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n26:60 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n27:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n28:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n29:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n30:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n31:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n32:33 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n36:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n55:19 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-process-step/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-process-step/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-profile/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-profile/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-profile/custom/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-profile/custom/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n13:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-profile/form/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-profile/form/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-profile/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-profile/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-raster/attrgroup/attribute/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/attrgroup/attribute/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n39:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n73:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n76:17 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n78:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n79:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n81:44 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n83:42 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n85:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n87:42 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n92:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-raster/attrgroup/attribute/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/attrgroup/attribute/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-raster/attrgroup/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/attrgroup/component.js should pass ESLint\n\n35:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n38:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n41:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n42:44 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n44:33 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n63:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-raster/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n28:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n45:5 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n48:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n51:20 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n52:40 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n54:42 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n56:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n62:5 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-raster/image-desc/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/image-desc/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n35:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n35:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n50:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n54:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n57:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n58:40 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/components/object/md-raster/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-raster/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-repository-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-repository-array/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n7:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n16:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n19:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n21:38 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-resource-type-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-resource-type-array/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n37:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-schema/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-schema/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-schema/form/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-schema/form/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-simple-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-simple-array-table/component.js should pass ESLint\n\n74:19 - Don\'t use observers (ember/no-observers)');
  });
  QUnit.test('pods/components/object/md-source/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-source/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n28:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n29:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n32:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n34:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n35:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n36:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n38:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n40:39 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n42:37 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n45:9 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n47:39 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n49:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n70:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-source/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-source/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-spatial-info/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-spatial-info/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n10:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n13:44 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n14:47 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n15:39 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n39:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n41:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-spatial-resolution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-spatial-resolution/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n59:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n59:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n60:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n63:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n66:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n67:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n93:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n99:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n108:25 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n110:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-srs/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-srs/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n27:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n27:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n28:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n31:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n34:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n35:47 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/components/object/md-taxonomy/classification/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/classification/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-taxonomy/classification/taxon/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/classification/taxon/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n37:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n43:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n46:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n47:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n49:43 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n53:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n62:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n68:10 - Use of undeclared dependencies in computed property: parentItem (ember/require-computed-property-dependencies)\n80:16 - Use the `reads` computed property macro. (ember/require-computed-macros)\n81:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n109:30 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n116:5 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n123:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/components/object/md-taxonomy/collection/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/collection/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n50:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n62:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n63:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n66:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n68:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n69:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n71:37 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n73:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n75:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n76:29 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n98:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n103:19 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-taxonomy/collection/system/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/collection/system/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n27:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n28:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n31:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n33:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n34:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n56:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/components/object/md-taxonomy/collection/system/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/collection/system/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-taxonomy/collection/voucher/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/collection/voucher/component.js should pass ESLint\n\n2:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n26:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n34:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n34:17 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n38:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n43:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n44:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n45:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/components/object/md-taxonomy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-taxonomy/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n7:10 - Use of undeclared dependencies in computed property: index (ember/require-computed-property-dependencies)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n13:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n19:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/components/object/md-time-period/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-time-period/component.js should pass ESLint\n\n5:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n84:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n92:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n95:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n97:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n98:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n100:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n101:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n106:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n110:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n121:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n123:8 - Always return a value from computed properties (ember/require-return-from-computed)\n124:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n132:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n134:8 - Always return a value from computed properties (ember/require-return-from-computed)\n135:18 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)');
  });
  QUnit.test('pods/components/object/md-transfer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-transfer/component.js should pass ESLint\n\n4:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n43:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n44:3 - Do not use classic ember components lifecycle hooks. Prefer using "@ember/render-modifiers" or custom functional modifiers. (ember/no-component-lifecycle-hooks)\n47:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n49:10 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n50:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n51:35 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n52:39 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n54:40 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n64:3 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)\n125:19 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/components/object/md-transfer/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/object/md-transfer/preview/component.js should pass ESLint\n\n1:8 - Use Glimmer components(@glimmer/component) instead of classic components(@ember/component) (ember/no-classic-components)\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n3:16 - Please switch to a tagless component by setting `tagName: \'\'` or converting to a Glimmer component (ember/require-tagless-components)');
  });
  QUnit.test('pods/contact/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/id/route.js should pass ESLint\n\n2:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n5:3 - Use `import { NotFoundError } from \'@ember-data/adapter/error\';` instead of using DS destructuring (ember/use-ember-data-rfc-395-imports)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n89:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/contact/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/contact/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/new/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/contact/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/contact/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/show/edit/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/contact/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/show/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/contact/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contact/show/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n45:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/contacts/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/contacts/route.js should pass ESLint\n\n23:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n32:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n41:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dashboard/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dashboard/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionaries/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionaries/route.js should pass ESLint\n\n16:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n25:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n34:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dictionary/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/id/route.js should pass ESLint\n\n3:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n6:3 - Use `import { NotFoundError } from \'@ember-data/adapter/error\';` instead of using DS destructuring (ember/use-ember-data-rfc-395-imports)\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n48:28 - Use the `or` computed property macro. (ember/require-computed-macros)\n67:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/new/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/show/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/citation/identifier/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dictionary/show/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/citation/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/citation/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/citation/identifier/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n21:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n22:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/citation/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n11:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n24:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n35:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n39:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/citation/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n15:18 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n17:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n18:37 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n20:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/item/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/item/route.js should pass ESLint\n\n11:1 - Don\'t use a mixin (ember/no-mixins)\n13:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n36:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n38:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n39:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n40:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n66:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/edit/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n24:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/index/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/domain/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/domain/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/attribute/index/route.js should pass ESLint\n\n5:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n19:18 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n21:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n23:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n24:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n32:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/attribute/route.js should pass ESLint\n\n13:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n35:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n59:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/citation/identifier/route.js should pass ESLint\n\n8:1 - Don\'t use a mixin (ember/no-mixins)\n10:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n27:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n29:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n57:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/citation/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/citation/route.js should pass ESLint\n\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n33:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n35:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n60:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/index/route.js should pass ESLint\n\n5:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:18 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n21:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n21:37 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n23:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/edit/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n24:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/import/route.js should pass ESLint\n\n24:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n43:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n76:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n79:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n95:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n105:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n132:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n142:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n143:28 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n145:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n146:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n149:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n152:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n154:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n156:61 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n182:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n197:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/index/route.js should pass ESLint\n\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n15:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n17:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n29:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/entity/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/entity/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/dictionary/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n9:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n10:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n11:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n12:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n13:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n14:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n15:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n22:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n29:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/edit/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n45:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/dictionary/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/dictionary/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/dictionary/show/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/error/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/error/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/export/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/export/route.js should pass ESLint\n\n9:1 - Don\'t use a mixin (ember/no-mixins)\n14:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n22:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n30:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:52 - Use of undeclared dependencies in computed property: store (ember/require-computed-property-dependencies)\n43:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n43:59 - Use of undeclared dependencies in computed property: store (ember/require-computed-property-dependencies)\n87:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n102:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n138:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n141:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/help/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/help/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/import/route.js should pass ESLint\n\n24:1 - Don\'t use a mixin (ember/no-mixins)\n36:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n56:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n75:14 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n77:14 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n93:20 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n119:8 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n209:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n260:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n262:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n276:13 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n338:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n343:11 - Do not use jQuery (ember/no-jquery)\n388:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n394:17 - Do not use jQuery (ember/no-jquery)\n399:13 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n408:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n427:11 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n456:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/not-found/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/not-found/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/publish/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/publish/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/publish/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/publish/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/id/route.js should pass ESLint\n\n2:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n5:3 - Use `import { NotFoundError } from \'@ember-data/adapter/error\';` instead of using DS destructuring (ember/use-ember-data-rfc-395-imports)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n60:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/new/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/associated/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/index/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/associated/resource/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/resource/index/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n27:43 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n38:37 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/associated/resource/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/resource/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n9:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n34:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n43:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/associated/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/associated/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/constraint/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/constraint/index/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/constraint/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/constraint/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/coverages/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/coverages/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/dictionary/route.js should pass ESLint\n\n13:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n35:35 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n39:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n40:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n41:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n50:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n62:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n65:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n65:49 - Use the `filterBy` computed property macro. (ember/require-computed-macros)\n70:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n84:9 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n89:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n93:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/distribution/distributor/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/distributor/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:43 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n19:47 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n22:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n22:42 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n22:46 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n29:19 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:49 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n33:37 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n36:37 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n44:9 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n44:41 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/distribution/distributor/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/distributor/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n28:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/distribution/distributor/transfer/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/distributor/transfer/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n28:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n31:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n32:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n76:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n78:19 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n79:49 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n81:22 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/distribution/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n14:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n18:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n25:7 - Do not use jQuery (ember/no-jquery)\n26:20 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/record/show/edit/distribution/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/distribution/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:40 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)');
  });
  QUnit.test('pods/record/show/edit/documents/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/citation/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:43 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/documents/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/citation/route.js should pass ESLint\n\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n26:39 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n27:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n35:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n45:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/documents/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/index/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:43 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n21:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/documents/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/documents/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/extent/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/extent/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/extent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/extent/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:25 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n14:5 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n15:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:50 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n21:49 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n23:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n25:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n31:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n49:7 - Do not use jQuery (ember/no-jquery)\n50:20 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/record/show/edit/extent/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/extent/spatial/route.js should pass ESLint\n\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n20:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n37:48 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n42:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n64:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n69:7 - Do not use jQuery (ember/no-jquery)\n70:18 - Do not use jQuery (ember/no-jquery)\n71:23 - Do not use jQuery (ember/no-jquery)\n75:7 - Do not use jQuery (ember/no-jquery)\n80:19 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n96:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n100:19 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n115:16 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n152:9 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/funding/allocation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/allocation/route.js should pass ESLint\n\n15:1 - Don\'t use a mixin (ember/no-mixins)\n17:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n20:30 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n35:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n36:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n36:41 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n38:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n46:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n54:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/funding/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/index/route.js should pass ESLint\n\n5:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n11:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:29 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n23:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n50:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/funding/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/funding/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/grid/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/grid/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/keywords/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/keywords/index/route.js should pass ESLint\n\n7:1 - Don\'t use a mixin (ember/no-mixins)\n10:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n23:27 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n24:38 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n28:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n29:42 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n36:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n44:7 - Do not use jQuery (ember/no-jquery)\n44:44 - Do not use jQuery (ember/no-jquery)\n57:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n58:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n64:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/keywords/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/keywords/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n4:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/keywords/thesaurus/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/keywords/thesaurus/route.js should pass ESLint\n\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n16:51 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n24:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n49:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n57:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n94:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/lineage/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/index/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n8:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n9:35 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js should pass ESLint\n\n5:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n45:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/citation/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n46:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:38 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:42 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n15:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n9:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:38 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n34:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n42:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/source/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/source/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n46:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/citation/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n21:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n22:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n23:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n51:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n12:35 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n12:39 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n15:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/lineageobject/step/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:35 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n28:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n36:18 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n37:21 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n46:7 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n55:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/lineage/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/lineage/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/main/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/identifier/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/main/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n34:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/main/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/citation/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/main/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n13:30 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n14:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n16:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n18:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:26 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n20:32 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n21:39 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n23:35 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n30:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n37:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/main/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/main/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/metadata/alternate/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/identifier/route.js should pass ESLint\n\n5:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:23 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n44:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/metadata/alternate/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n5:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/metadata/alternate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/alternate/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n16:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n17:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n43:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/metadata/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/identifier/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n15:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n27:7 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n30:12 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/metadata/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n8:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n14:16 - Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`. (ember/no-incorrect-calls-with-inline-anonymous-functions)\n15:37 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n17:34 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n19:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n21:44 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n23:43 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n25:40 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n27:36 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n29:48 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n31:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n39:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n46:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/metadata/parent/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/identifier/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/metadata/parent/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/index/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n10:15 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n23:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/metadata/parent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/parent/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/metadata/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/metadata/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n4:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n32:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n48:10 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('pods/record/show/edit/spatial/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/spatial/raster/attribute/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/raster/attribute/route.js should pass ESLint\n\n4:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n29:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n31:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n32:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n33:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n69:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n75:19 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n76:64 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n77:25 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n82:21 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/spatial/raster/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/raster/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n12:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n14:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n14:37 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n14:41 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n18:20 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n22:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n25:70 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/spatial/raster/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/raster/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n24:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n25:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n53:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/spatial/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/collection/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/collection/index/route.js should pass ESLint\n\n3:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n11:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n13:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n13:41 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n13:45 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n17:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n22:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/collection/itis/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/collection/itis/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n20:41 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n20:45 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n24:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/collection/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/collection/route.js should pass ESLint\n\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n28:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n29:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/collection/system/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/collection/system/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n17:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/collection/system/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/collection/system/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n19:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n46:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/index/route.js should pass ESLint\n\n12:1 - Don\'t use a mixin (ember/no-mixins)\n14:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n18:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n19:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n26:5 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)\n30:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n47:9 - Do not use jQuery (ember/no-jquery)\n48:22 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('pods/record/show/edit/taxonomy/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/edit/taxonomy/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/record/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/index/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n19:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/record/show/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/record/show/translate/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/records/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/records/route.js should pass ESLint\n\n18:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n27:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n36:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/save/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/save/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/main/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/main/route.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/profile/index/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/profile/index/controller.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n28:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/settings/profile/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/profile/index/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/profile/manage/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/profile/manage/controller.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n55:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/settings/profile/manage/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/profile/manage/route.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/profile/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/profile/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/settings/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/route.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n36:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n47:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n51:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n52:19 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n52:23 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('pods/settings/validation/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/validation/controller.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n62:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('pods/settings/validation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/settings/validation/route.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('pods/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/translate/route.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass ESLint\n\n18:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n22:5 - Do not use jQuery (ember/no-jquery)\n127:3 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)\n141:7 - Do not access controller in route outside of setupController/resetController (ember/no-controller-access-in-routes)');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
  QUnit.test('services/cleaner.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/cleaner.js should pass ESLint\n\n98:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/codelist.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/codelist.js should pass ESLint\n\n6:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/contacts.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/contacts.js should pass ESLint\n\n5:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n50:18 - Use of undeclared dependencies in computed property: defaultIcon, icons (ember/require-computed-property-dependencies)');
  });
  QUnit.test('services/custom-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/custom-profile.js should pass ESLint\n\n34:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n38:5 - Use `set(this, \'propertyName\', \'value\')` instead of assignment for untracked properties that are used as computed property dependencies (or convert to using tracked properties). (ember/no-assignment-of-untracked-properties-used-in-tracking-contexts)\n105:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n137:21 - Use of undeclared dependencies in computed property: defaultProfile.definition.components (ember/require-computed-property-dependencies)\n138:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('services/icon.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/icon.js should pass ESLint\n\n3:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/itis.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/itis.js should pass ESLint\n\n27:14 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n35:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n260:17 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n266:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('services/jsonvalidator.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/jsonvalidator.js should pass ESLint\n\n375:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/keyword.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/keyword.js should pass ESLint\n\n');
  });
  QUnit.test('services/mdjson.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/mdjson.js should pass ESLint\n\n59:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n81:22 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n83:38 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n84:33 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n86:21 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n87:31 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n89:28 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n92:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n94:30 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n198:31 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n209:33 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('services/patch.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/patch.js should pass ESLint\n\n14:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n22:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n44:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n48:41 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n49:34 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n57:24 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n61:30 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n65:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n66:38 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n87:34 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n102:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n124:27 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n126:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n128:27 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n237:26 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n240:42 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n241:36 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('services/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/profile.js should pass ESLint\n\n31:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n35:5 - Use `set(this, \'propertyName\', \'value\')` instead of assignment for untracked properties that are used as computed property dependencies (or convert to using tracked properties). (ember/no-assignment-of-untracked-properties-used-in-tracking-contexts)\n37:5 - Use `set(this, \'propertyName\', \'value\')` instead of assignment for untracked properties that are used as computed property dependencies (or convert to using tracked properties). (ember/no-assignment-of-untracked-properties-used-in-tracking-contexts)');
  });
  QUnit.test('services/publish.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/publish.js should pass ESLint\n\n4:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/schemas.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/schemas.js should pass ESLint\n\n16:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n29:5 - Use `set(this, \'propertyName\', \'value\')` instead of assignment for untracked properties that are used as computed property dependencies (or convert to using tracked properties). (ember/no-assignment-of-untracked-properties-used-in-tracking-contexts)');
  });
  QUnit.test('services/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/settings.js should pass ESLint\n\n14:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n40:45 - Use `||` or the ternary operator instead of `getWithDefault()` (ember/no-get-with-default)\n59:23 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('services/slider.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/slider.js should pass ESLint\n\n9:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n13:5 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n21:18 - Don\'t use observers (ember/no-observers)');
  });
  QUnit.test('services/spotlight.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/spotlight.js should pass ESLint\n\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n21:7 - Do not use jQuery (ember/no-jquery)\n31:5 - Do not use jQuery (ember/no-jquery)\n32:5 - Do not use jQuery (ember/no-jquery)\n39:5 - Do not use jQuery (ember/no-jquery)\n48:7 - Do not use jQuery (ember/no-jquery)\n49:7 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('transforms/json.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'transforms/json.js should pass ESLint\n\n4:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n7:16 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n7:16 - Use `import Transform from \'@ember-data/serializer/transform\';` instead of using DS.Transform (ember/use-ember-data-rfc-395-imports)');
  });
  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });
  QUnit.test('utils/md-interpolate.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/md-interpolate.js should pass ESLint\n\n');
  });
  QUnit.test('utils/md-object.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/md-object.js should pass ESLint\n\n');
  });
  QUnit.test('validators/array-required.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'validators/array-required.js should pass ESLint\n\n59:16 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('validators/array-valid.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'validators/array-valid.js should pass ESLint\n\n17:14 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('validators/messages.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/messages.js should pass ESLint\n\n');
  });
});
define("mdeditor/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('mdeditor/pods/components/control/md-alert-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-alert-table/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-button-confirm/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-button-confirm/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-button-modal/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-button-modal/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-button/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-button/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-contact-title/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-contact-title/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-crud-buttons/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-crud-buttons/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-definition/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-definition/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-edit-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-edit-table/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-errors/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-errors/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-import-csv/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-import-csv/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-indicator/related/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-indicator/related/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-indicator/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-indicator/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-infotip/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-infotip/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-itis/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-itis/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-json-button/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-json-button/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-json-viewer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-json-viewer/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-modal/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-modal/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/custom/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/custom/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/filter/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/filter/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/show/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-repo-link/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-repo-link/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-scroll-into-view/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-scroll-into-view/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-scroll-spy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-scroll-spy/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-spinner/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-spinner/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/md-status/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-status/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/subbar-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/subbar-importcsv/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-importcsv/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/subbar-link/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-link/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/control/subbar-spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-spatial/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-boolean/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-boolean/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-date-range/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-date-range/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-datetime/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-datetime/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-input-confirm/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-input-confirm/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-input/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-input/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-markdown-area/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-markdown-area/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-select-profile/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select-profile/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-select-thesaurus/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select-thesaurus/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-select/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/input/md-textarea/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-textarea/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-breadcrumb/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-breadcrumb/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-card/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-card/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-footer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-footer/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-nav-main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-main/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-nav-secondary/link/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-secondary/link/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-nav-secondary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-secondary/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-nav-sidebar/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-sidebar/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-object-container/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-object-container/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-slider/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-slider/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/md-wrap/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-wrap/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/nav/dictionary/nav-main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/nav/dictionary/nav-main/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/layout/nav/record/nav-main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/nav/record/nav-main/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-help/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-help/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-models-table/components/check-all/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/check-all/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-models-table/components/check/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/check/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-models-table/components/row-body/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/row-body/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-models-table/components/row-buttons/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/row-buttons/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-title/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-title/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/md-translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-translate/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/models-table/cell-content-display/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/models-table/cell-content-display/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/models-table/row-expand/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/models-table/row-expand/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/models-table/table-body/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/models-table/table-body/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-address/md-address-block/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-address/md-address-block/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-address/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-address/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-allocation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-allocation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-array-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-array-table/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-associated/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-associated/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-associated/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-associated/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-attribute/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-attribute/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-attribute/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-bbox/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-bbox/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-citation-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-citation/preview/body/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/preview/body/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-citation/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-constraint/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-constraint/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-contact-identifier-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-contact-identifier-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-date-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-date-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-date/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-date/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-distribution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distribution/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-distributor/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distributor/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-distributor/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distributor/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-documentation/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-documentation/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-documentation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-documentation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-domain/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domain/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-domainitem/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domainitem/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-domainitem/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domainitem/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-entity/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-entity/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-extent/spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-extent/spatial/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-extent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-extent/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-funding/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-funding/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-funding/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-funding/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-graphic-array/md-graphic-preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-graphic-array/md-graphic-preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-graphic-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-graphic-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-identifier-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-identifier-object-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier-object-table/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-keyword-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-keyword-citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-keyword-list/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-keyword-list/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-lineage/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-lineage/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-lineage/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-lineage/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-locale-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-locale-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-locale/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-locale/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-maintenance/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-maintenance/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-medium/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-medium/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-object-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-object-table/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-online-resource-array/md-image-preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource-array/md-image-preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-online-resource-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-online-resource/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-party-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-party-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-party/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-party/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-phone-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-phone-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-process-step/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-process-step/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-process-step/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-process-step/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-profile/custom/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-profile/custom/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-profile/form/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-profile/form/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-profile/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-profile/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-profile/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-profile/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/attrgroup/attribute/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/attrgroup/attribute/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/attrgroup/attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/attrgroup/attribute/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/attrgroup/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/attrgroup/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/image-desc/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/image-desc/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-raster/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-raster/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-repository-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-repository-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-resource-type-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-resource-type-array/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-schema/form/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-schema/form/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-schema/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-schema/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-source/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-source/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-source/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-source/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-spatial-info/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-spatial-info/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-spatial-resolution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-spatial-resolution/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-srs/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-srs/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/classification/taxon/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/classification/taxon/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/classification/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/classification/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/system/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/system/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/system/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/system/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/voucher/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/voucher/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-taxonomy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-time-period/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-time-period/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-transfer/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-transfer/preview/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/components/object/md-transfer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-transfer/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/new/id/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/new/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/edit/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contact/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/contacts/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contacts/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dashboard/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dashboard/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionaries/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionaries/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/new/id/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/new/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/item/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/item/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/attribute/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/attribute/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/attribute/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/import/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/import/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/dictionary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/error/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/error/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/export/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/export/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/help/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/help/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/import/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/import/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/not-found/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/not-found/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/publish/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/publish/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/publish/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/publish/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/nav/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/new/id/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/new/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/associated/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/associated/resource/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/resource/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/associated/resource/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/resource/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/associated/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/constraint/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/constraint/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/constraint/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/constraint/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/coverages/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/coverages/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/dictionary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/dictionary/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/distribution/distributor/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/distributor/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/distribution/distributor/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/distributor/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/distribution/distributor/transfer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/distributor/transfer/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/distribution/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/distribution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/documents/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/documents/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/documents/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/documents/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/extent/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/extent/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/extent/spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/extent/spatial/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/extent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/extent/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/funding/allocation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/allocation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/funding/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/funding/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/grid/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/grid/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/keywords/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/keywords/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/keywords/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/keywords/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/keywords/thesaurus/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/keywords/thesaurus/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/source/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/source/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/source/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/source/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/lineage/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/main/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/main/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/main/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/main/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/identifier/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/metadata/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/spatial/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/spatial/raster/attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/raster/attribute/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/spatial/raster/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/raster/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/spatial/raster/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/raster/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/itis/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/itis/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/system/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/system/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/system/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/system/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/nav/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/show/translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/translate/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/record/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/records/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/records/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/save/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/save/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/main/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/profile/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/profile/index/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/profile/manage/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/profile/manage/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/profile/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/profile/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/settings/validation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/validation/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/pods/translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/translate/template.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/templates/head.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/head.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('mdeditor/templates/nav-secondary.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/nav-secondary.hbs should pass TemplateLint.\n\n');
  });
});
define("mdeditor/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/pods/components/layout/md-breadcrumb-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/components/layout/md-breadcrumb-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/contact/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/copy-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/contact/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/new-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/contacts/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contacts/contacts-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/dictionary/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/copy-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/dictionary/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/new-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/record/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/copy-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/pods/record/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/new-test.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-citation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-citation.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-contact.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-dictionary.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-extent.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-extent.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-identifier.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-identifier.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-map-layer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-map-layer.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-profile.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-record.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-record.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/create-taxonomy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-taxonomy.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/flash-message.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/flash-message.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/md-helpers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/md-helpers.js should pass ESLint\n\n41:7 - Unexpected console statement. (no-console)');
  });
  QUnit.test('helpers/modal-asserts.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/modal-asserts.js should pass ESLint\n\n11:23 - Do not use jQuery (ember/no-jquery)\n16:23 - Do not use jQuery (ember/no-jquery)\n21:20 - Do not use jQuery (ember/no-jquery)');
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
    assert.ok(true, 'integration/components/feature-table-test.js should pass ESLint\n\n');
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
    assert.ok(true, 'integration/components/leaflet-table-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/helpers/object-is-empty-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/object-is-empty-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/present-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/present-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/word-limit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/word-limit-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-alert-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-alert-table/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-button-confirm/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button-confirm/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-button-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button-modal/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-button/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/control/md-edit-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-edit-table/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/control/md-indicator/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-indicator/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-indicator/related/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-indicator/related/component-test.js should pass ESLint\n\n14:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('integration/pods/components/control/md-infotip/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-infotip/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-itis/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-itis/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-json-button/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-json-button/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/md-json-viewer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/md-json-viewer/component-test.js should pass ESLint\n\n19:18 - Do not use jQuery (ember/no-jquery)');
  });
  QUnit.test('integration/pods/components/control/md-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-modal/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/control/md-scroll-into-view/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-scroll-into-view/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/control/subbar-importcsv/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/control/subbar-importcsv/component-test.js should pass ESLint\n\n13:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n14:7 - Use the @action decorator instead of declaring an actions hash (ember/no-actions-hash)');
  });
  QUnit.test('integration/pods/components/control/subbar-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-link/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/control/subbar-spatial/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-spatial/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/ember-tooltip/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/ember-tooltip/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/input/md-boolean/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-boolean/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/input/md-codelist-multi/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-codelist-multi/component-test.js should pass ESLint\n\n25:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n71:28 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n96:28 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
  });
  QUnit.test('integration/pods/components/input/md-codelist/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-codelist/component-test.js should pass ESLint\n\n21:18 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n55:28 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n78:28 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
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
    assert.ok(false, 'integration/pods/components/input/md-input/component-test.js should pass ESLint\n\n24:19 - Do not use jQuery (ember/no-jquery)');
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
    assert.ok(true, 'integration/pods/components/input/md-select-profile/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/input/md-select-thesaurus/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-thesaurus/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/input/md-select/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/pods/components/input/md-select/component-test.js should pass ESLint\n\n74:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)\n113:20 - Use ES5 getters (`this.property`) instead of Ember\'s `get` function (ember/no-get)');
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
    assert.ok(false, 'integration/pods/components/layout/md-nav-secondary/component-test.js should pass ESLint\n\n48:21 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('integration/pods/components/layout/md-nav-secondary/link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-secondary/link/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/md-nav-sidebar/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-sidebar/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/md-object-container/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-object-container/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/md-slider/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-slider/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/md-wrap/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-wrap/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/nav/dictionary/nav-main/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/nav/dictionary/nav-main/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/layout/nav/record/nav-main/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/nav/record/nav-main/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/md-models-table/components/row-body/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/row-body/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/md-models-table/components/row-buttons/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/row-buttons/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/md-title/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-title/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/md-translate/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-translate/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/models-table/cell-content-display/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/models-table/cell-content-display/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/models-table/row-expand/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/models-table/row-expand/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/models-table/table-body/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/models-table/table-body/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/object/md-extent/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-extent/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-extent/spatial/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-extent/spatial/component-test.js should pass ESLint\n\n');
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
    assert.ok(false, 'integration/pods/components/object/md-keyword-list/component-test.js should pass ESLint\n\n33:18 - Do not use jQuery (ember/no-jquery)\n34:18 - Do not use jQuery (ember/no-jquery)');
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
  QUnit.test('integration/pods/components/object/md-object-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-object-table/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/object/md-process-step/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-process-step/preview/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-profile/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-profile/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-profile/custom/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-profile/custom/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-profile/form/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-profile/form/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-profile/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-profile/preview/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-raster/attrgroup/attribute/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-raster/attrgroup/attribute/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-raster/attrgroup/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-raster/attrgroup/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-raster/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-raster/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-raster/image-desc/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-raster/image-desc/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-raster/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-raster/preview/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-repository-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-repository-array/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-resource-type-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-resource-type-array/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-schema/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-schema/component-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/pods/components/object/md-schema/form/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-schema/form/component-test.js should pass ESLint\n\n');
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
  QUnit.test('integration/pods/components/object/md-transfer/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-transfer/preview/component-test.js should pass ESLint\n\n');
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
    assert.ok(true, 'unit/initializers/leaflet-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/initializers/local-storage-export-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/local-storage-export-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/instance-initializers/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/profile-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/instance-initializers/route-publish-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/route-publish-test.js should pass ESLint\n\n24:50 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('unit/instance-initializers/settings-sciencebase-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/instance-initializers/settings-sciencebase-test.js should pass ESLint\n\n25:50 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)');
  });
  QUnit.test('unit/instance-initializers/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/settings-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/mixins/cancel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/cancel-test.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n8:24 - Don\'t create new mixins (ember/no-new-mixins)');
  });
  QUnit.test('unit/mixins/hash-poll-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/hash-poll-test.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n8:26 - Don\'t create new mixins (ember/no-new-mixins)');
  });
  QUnit.test('unit/mixins/object-template-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/object-template-test.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n8:32 - Don\'t create new mixins (ember/no-new-mixins)');
  });
  QUnit.test('unit/mixins/scroll-to-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/scroll-to-test.js should pass ESLint\n\n2:1 - Don\'t use a mixin (ember/no-mixins)\n8:26 - Don\'t create new mixins (ember/no-new-mixins)');
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
    assert.ok(true, 'unit/models/record-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/contact/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/index/route-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/record/show/edit/distribution/distributor/transfer/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/distributor/transfer/route-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/record/show/edit/extent/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/extent/index/route-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/record/show/edit/keywords/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/index/route-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/record/show/edit/spatial/raster/attribute/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/raster/attribute/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/record/show/edit/spatial/raster/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/raster/index/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/record/show/edit/spatial/raster/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/raster/route-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/pods/settings/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/index/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/main/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/main/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/profile/index/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/profile/index/controller-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/profile/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/profile/index/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/profile/manage/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/profile/manage/controller-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/profile/manage/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/profile/manage/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/profile/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/profile/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/route-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/validation/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/validation/controller-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/pods/settings/validation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/validation/route-test.js should pass ESLint\n\n');
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
    assert.ok(false, 'unit/serializers/application-test.js should pass ESLint\n\n2:1 - Imports from @ember-data packages should be preferred over imports from ember-data (ember/use-ember-data-rfc-395-imports)\n31:17 - Native JS classes should be used instead of classic classes (ember/no-classic-classes)\n31:17 - Use `import Model from \'@ember-data/model\';` instead of using DS.Model (ember/use-ember-data-rfc-395-imports)\n32:13 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n33:14 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)\n34:20 - Use `import { attr } from \'@ember-data/model\';` instead of using DS.attr (ember/use-ember-data-rfc-395-imports)');
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
  QUnit.test('unit/services/custom-profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/custom-profile-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/services/schemas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/schemas-test.js should pass ESLint\n\n');
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
  QUnit.test('unit/utils/md-interpolate-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/md-interpolate-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/md-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/md-object-test.js should pass ESLint\n\n');
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
define("mdeditor/tests/test-helper", ["mdeditor/app", "mdeditor/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("mdeditor/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
    (0, _qunit.test)('it has a importData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.importData === 'function');
    });
    (0, _qunit.test)('it has a exportData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.exportData === 'function');
    });
  });
});
define("mdeditor/tests/unit/helpers/bbox-to-poly-test", ["mdeditor/helpers/bbox-to-poly", "qunit"], function (_bboxToPoly, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | bbox to poly', function () {
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _bboxToPoly.bboxToPoly)([{
        southLatitude: 1,
        northLatitude: 2,
        westLongitude: 3,
        eastLongitude: 4
      }]);
      assert.equal("[[1,3],[2,3],[2,4],[1,4]]", JSON.stringify(result));
    });
  });
});
define("mdeditor/tests/unit/helpers/get-dash-test", ["mdeditor/helpers/get-dash", "qunit"], function (_getDash, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | get dash', function () {
    (0, _qunit.test)('it works', function (assert) {
      let obj = {
        foo: 'bar'
      };
      let result = (0, _getDash.getDash)([obj, 'foo']);
      assert.equal(result, 'bar', 'value');
      result = (0, _getDash.getDash)([obj, 'biz']);
      assert.equal(result, '--', 'dash');
    });
  });
});
define("mdeditor/tests/unit/helpers/make-range-test", ["mdeditor/helpers/make-range", "qunit"], function (_makeRange, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | make range', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _makeRange.makeRange)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/helpers/md-markdown-test", ["mdeditor/helpers/md-markdown", "qunit"], function (_mdMarkdown, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | md markdown', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mdMarkdown.mdMarkdown)('# Test');
      assert.equal(result.string.trim(), '<p>#</p>');
    });
  });
});
define("mdeditor/tests/unit/helpers/mod-test", ["mdeditor/helpers/mod", "qunit"], function (_mod, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | mod', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mod.mod)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/initializers/leaflet-test", ["mdeditor/initializers/leaflet", "qunit"], function (_leaflet, _qunit) {
  "use strict";

  let application;
  (0, _qunit.module)('Unit | Initializer | leaflet', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(function () {
        application = Ember.Application.create();
        application.deferReadiness();
      });
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      _leaflet.default.initialize(application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/initializers/local-storage-export-test", ["mdeditor/initializers/local-storage-export", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_localStorageExport, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Initializer | local storage export', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.application.deferReadiness();
      });
    });
    hooks.afterEach(function () {
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _localStorageExport.initialize)(this.application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/profile-test", ["mdeditor/instance-initializers/profile", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_profile, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | profile', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _profile.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/route-publish-test", ["mdeditor/instance-initializers/route-publish", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_routePublish, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | route publish', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    (0, _qunit.test)('it works', function (assert) {
      let a = [{
        route: 'test'
      }];
      this.appInstance.register('service:publish', Ember.Service.extend({
        catalogs: a
      }));
      (0, _routePublish.initialize)(this.appInstance);
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-sciencebase-test", ["mdeditor/instance-initializers/settings-sciencebase", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_settingsSciencebase, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | settings sciencebase', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    let a = [];

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      this.appInstance.register('service:publish', Ember.Service.extend({
        catalogs: a
      }));
      (0, _settingsSciencebase.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(this.appInstance.lookup('service:publish').catalogs.findBy('route', 'sciencebase'));
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-test", ["mdeditor/instance-initializers/settings", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_settings, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | settings', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _settings.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/mixins/cancel-test", ["mdeditor/mixins/cancel", "qunit"], function (_cancel, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | cancel', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let CancelObject = Ember.Object.extend(_cancel.default);
      let subject = CancelObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/hash-poll-test", ["mdeditor/mixins/hash-poll", "qunit"], function (_hashPoll, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | hash poll', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let HashPollObject = Ember.Object.extend(_hashPoll.default);
      let subject = HashPollObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/object-template-test", ["mdeditor/mixins/object-template", "qunit"], function (_objectTemplate, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | object template', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ObjectTemplateObject = Ember.Object.extend(_objectTemplate.default);
      let subject = ObjectTemplateObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/scroll-to-test", ["mdeditor/mixins/scroll-to", "qunit"], function (_scrollTo, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | scroll to', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ScrollToObject = Ember.Object.extend(_scrollTo.default);
      let subject = ScrollToObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/models/base-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | base', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').modelFor('base'));
      // let store = this.store();
      assert.equal(model.modelName, 'base');
    });
  });
});
define("mdeditor/tests/unit/models/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(3);
      me.set('json.name', 'bar');
      me.set('json.positionName', 'foo');
      assert.equal(me.get('title'), 'bar');
      me.set('json.name', null);
      me.set('json.isOrganization', false);
      assert.equal(me.get('title'), 'foo');
      me.set('json.isOrganization', true);
      assert.equal(me.get('title'), null);
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(2);
      me.set('json.isOrganization', true);
      assert.equal(me.get('icon'), 'users');
      me.set('json.isOrganization', false);
      assert.equal(me.get('icon'), 'user');
    });
  });
});
define("mdeditor/tests/unit/models/dictionary-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary'));
      assert.expect(1);
      me.set('json.dataDictionary.citation.title', 'bar');
      assert.equal(me.get('title'), 'bar');
    });
  });
});
define("mdeditor/tests/unit/models/record-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | record', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      assert.expect(1);
      me.set('json.metadata.resourceInfo.citation.title', 'foo');
      assert.equal(me.get('title'), 'foo');
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      const list = this.owner.lookup('service:icon');
      assert.expect(1);
      me.set('json.metadata.resourceInfo.resourceType.firstObject.type', 'project');
      assert.equal(me.get('icon'), list.get('project'));
    });
  });
});
define("mdeditor/tests/unit/models/setting-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | setting', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('setting'));
      // let store = this.store();
      assert.ok(!!model);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contacts/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contacts');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dashboard/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dashboard', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dashboard');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionaries/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionaries', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionaries');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/item/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/item', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/item');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/error/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | error', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:error');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/export/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | save', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:save');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/help/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | help', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:help');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/not-found/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | not found', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:not-found');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/publish/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/publish/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:publish');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/associated', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/associated');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/coverages/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/coverages', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/coverages');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/dictionary/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/dictionary');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/transfer/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/transfer', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/transfer');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/distribution', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/distribution');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/documents', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/documents');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/extent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/extent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/allocation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/allocation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/allocation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/grid/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/grid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/grid');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/keywords', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/keywords');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/thesaurus/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/thesaurus', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/thesaurus');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/extent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/extent/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/itis/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/itis');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/records/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | records', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:records');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/index');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/manage');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/manage');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:settings');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/validation');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/validation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/publish/sciencebase-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish/sciencebase', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/sciencebase');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/serializers/application-test", ["ember-data", "qunit", "ember-qunit"], function (_emberData, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it serializes records', function (assert) {
      assert.expect(2);
      let serializer = this.owner.lookup('serializer:application');
      let store = this.owner.lookup('service:store');
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
      this.owner.register('model:test', model);
      Ember.run(function () {
        record = store.createRecord('test', data);
      });
      assert.deepEqual(record.serialize(), expected, 'record serialized OK');
      assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
    });
  });
});
define("mdeditor/tests/unit/services/cleaner-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | cleaner', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:cleaner');
      const obj = {
        test: [[], {}, '', null, undefined],
        foo: 'bar',
        bar: null,
        biz: {},
        baz: {
          foo: [undefined]
        },
        jim: [{
          jam: ''
        }],
        hey: {
          ya: ['', 'keep', true, false],
          zoo: []
        }
      };
      assert.ok(service);
      assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: true,
        preserveRootOnly: false
      })), '{"test":[[]],"foo":"bar","baz":{"foo":[]},"jim":[],"hey":{"ya":["keep",true,false],"zoo":[]}}', 'preserveArrays: true, preserveRootOnly: false');
      assert.equal(JSON.stringify(service.clean(obj)), '{"test":[],"foo":"bar","jim":[],"hey":{"ya":["keep",true,false]}}', 'preserveArrays: true, preserveRootOnly: true');
      assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: false,
        preserveRootOnly: true
      })), '{"foo":"bar","hey":{"ya":["keep",true,false]}}', 'preserveArrays: false, preserveRootOnly: true');
    });
  });
});
define("mdeditor/tests/unit/services/codelist-test", ["qunit", "ember-qunit", "mdcodes/resources/js/mdcodes.js"], function (_qunit, _emberQunit, _mdcodes) {
  "use strict";

  (0, _qunit.module)('Unit | Service | codelist', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('all codelists are present', function (assert) {
      var service = this.owner.lookup('service:codelist');
      Object.keys(_mdcodes.default).forEach(function (key) {
        if (key === 'default') return;
        const name = key.replace(/^(iso_|adiwg_)/, '');
        assert.ok(service.get(name), name + ' is present.');
      });
    });
  });
});
define("mdeditor/tests/unit/services/contacts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:contacts');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/custom-profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | custom-profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:custom-profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/icon-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | icon', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:icon');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/itis-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:itis');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/jsonvalidator-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | jsonvalidator', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('test jsonapi validation', function (assert) {
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
      assert.ok(service.validator.validate('jsonapi', obj));
    });
  });
});
define("mdeditor/tests/unit/services/keyword-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | keyword', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:keyword');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/mdjson-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | mdjson', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:mdjson');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/patch-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | patch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:patch');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/publish-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:publish');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/schemas-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | schemas', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:schemas');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/settings-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:settings');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/slider-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | slider', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:slider');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/spotlight-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | spotlight', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:spotlight');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/transforms/json-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Transform | json', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it deserialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      let obj = transform.deserialize('{"foo":"bar"}');
      assert.equal(obj.get('foo'), "bar");
      assert.equal(Object.keys(obj)[0], 'foo');
      assert.equal(Object.keys(obj).length, 1);
    });
    (0, _qunit.test)('it serialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      assert.equal(transform.serialize({
        foo: 'bar'
      }), '{"foo":"bar"}');
    });
  });
});
define("mdeditor/tests/unit/utils/config-test", ["mdeditor/utils/config", "qunit"], function (_config, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | config', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = _config.default.name;
      assert.equal(result, 'ScienceBase');
    });
  });
});
define("mdeditor/tests/unit/utils/md-interpolate-test", ["mdeditor/utils/md-interpolate", "qunit"], function (_mdInterpolate, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | md-interpolate', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);
      let note = "The attribute <em>${value1}</em> has an associated domain: <strong>${value2}</strong>.";
      let result = (0, _mdInterpolate.interpolate)(note, {
        value1: 'foo',
        value2: 'bar'
      });
      assert.equal(result, 'The attribute <em>foo</em> has an associated domain: <strong>bar</strong>.');
      let result2 = (0, _mdInterpolate.parseArgs)(note);
      assert.deepEqual(result2, ['value1', 'value2']);
    });
  });
});
define("mdeditor/tests/unit/utils/md-object-test", ["mdeditor/utils/md-object", "qunit"], function (_mdObject, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | md-object', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.equal(_mdObject.default.isEmpty({}), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: ''
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: []
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: 'bar'
      }), false);
      assert.equal(_mdObject.default.isEmpty({
        foo: {
          bar: {}
        }
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: false
      }), false);
    });
  });
});
define("mdeditor/tests/unit/utils/sb-tree-node-test", ["mdeditor/utils/sb-tree-node", "qunit"], function (_sbTreeNode, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | sb tree node', function () {
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);
      let result = _sbTreeNode.default.create({
        _record: {
          recordId: 'theid'
        }
        //config: this.get('config')
      });

      assert.equal(result.uuid, 'theid');
      assert.equal(result.uuid, result.identifier, 'set ids');
    });
  });
});
define("mdeditor/tests/unit/validators/array-required-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Validator | array-required', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-required');
      assert.ok(validator);
    });
  });
});
define("mdeditor/tests/unit/validators/array-valid-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Validator | array-valid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-valid');
      assert.ok(validator);
    });
  });
});
define('mdeditor/config/environment', [], function() {
  var prefix = 'mdeditor';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
