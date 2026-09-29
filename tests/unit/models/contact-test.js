import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | contact', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('contact'));
    // var store = this.store();
    assert.ok(!!model);
  });

  test('should correctly compute title', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

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

  test('should correctly compute icon', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

    assert.expect(2);
    me.set('json.isOrganization', true);
    assert.equal(me.get('icon'), 'users');
    me.set('json.isOrganization', false);
    assert.equal(me.get('icon'), 'user');
  });

  test('should correctly compute defaultOrganization', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

    assert.expect(2);
    assert.equal(me.get('defaultOrganization'), null);
    me.set('json.memberOfOrganization', ['org-1']);
    assert.equal(me.get('defaultOrganization'), 'org-1');
  });

  test('should correctly compute combinedName from a member organization', function(assert) {
    const store = this.owner.lookup('service:store');
    run(() => store.createRecord('contact', {
      json: { contactId: 'org-1', isOrganization: true, name: 'Acme Org' },
    }));
    const me = run(() => store.createRecord('contact', {
      json: {
        contactId: 'person-1',
        isOrganization: false,
        name: 'Jane Doe',
        memberOfOrganization: ['org-1'],
      },
    }));

    assert.expect(1);
    assert.equal(me.get('combinedName'), 'Acme Org: Jane Doe');
  });

  test('should correctly compute defaultLogo from the logo graphic', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('contact'));

    assert.expect(2);
    assert.equal(me.get('defaultLogo'), null);
    me.set('json.logoGraphic', [
      { fileUri: [{ uri: 'https://example.com/logo.png' }] },
    ]);
    assert.equal(me.get('defaultLogo'), 'https://example.com/logo.png');
  });
});
