import { find, findAll, render } from '@ember/test-helpers';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

//Stub profile service
const profiles = {
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
};

const profileStub = Service.extend({
  getActiveProfile() {
    const active = this.get('active');
    const profile = active && typeof active === 'string' ? active :
      'full';
    const profiles = this.get('profiles');

    return profiles[profile];
  },
  profiles: profiles
});

module('Integration | Component | md nav secondary', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:profile', profileStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "profileService" within each test
    this.profileService = this.owner.lookup('service:profile');
  });

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{layout/md-nav-secondary}}`);

    var more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

    // Template block usage:
    await render(hbs `
      {{#layout/md-nav-secondary}}
        <li>template block text</li>
      {{/layout/md-nav-secondary}}
    `);

    more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|template|block|text|');
  });

  test('render after setting profile', async function(assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('profileService.active', 'basic');

    await render(hbs `{{layout/md-nav-secondary}}`);

    var more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|');
  });
});
