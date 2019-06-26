import { find, findAll, render } from '@ember/test-helpers';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
  },
  {
    identifier: 'basic',
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'FooBar',
        target: 'record.show.edit.index'

      }, {
        title: 'BarFoo',
        target: 'record.show.edit.metadata'

      }]
    }
  }
];


const profileStub = Service.extend({
  coreProfiles: profiles
});

module('Integration | Component | md nav secondary', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:profile', profileStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "profileService" within each test
    this.profileService = this.owner.lookup('service:profile');
    this.customService = this.owner.lookup('service:custom-profile');
    this.model = {
      constructor:{
        modelName: 'record'
      }
    }
  });

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{layout/md-nav-secondary model=model}}`);

    var more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('.nav').textContent
      .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

    // Template block usage:
    await render(hbs `
      {{#layout/md-nav-secondary model=model}}
        <li>template block text</li>
      {{/layout/md-nav-secondary}}
    `);

    more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('.nav').textContent
      .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|template|block|text|');
  });

  test('render after setting profile', async function(assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('customService.active', 'org.adiwg.profile.basic');

    await render(hbs `{{layout/md-nav-secondary model=model}}`);

    var more = findAll('.overflow-nav').length ? '|More' : '';

    assert.equal(find('.nav').textContent
      .replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|');
  });
});
