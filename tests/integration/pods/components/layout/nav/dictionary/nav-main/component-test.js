import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
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

module('Integration | Component | layout/nav/dictionary/nav-main', function (
  hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs `{{layout/nav/dictionary/nav-main model=model}}
      {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
      `);

    assert.dom(this.element).hasText('testme');

    // Template block usage:
    await render(hbs `
      {{#layout/nav/dictionary/nav-main model=model}}
        template block text
      {{/layout/nav/dictionary/nav-main}}
      {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
    `);

    assert.dom(this.element).hasText('testme');
  });
});
