import Service from '@ember/service';
import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

//Stub profile service
const profileStub = Service.extend({
  getActiveProfile() {
    const active = this.get('active');
    const profile = active && typeof active === 'string' ? active :
      'full';
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

moduleForComponent('layout/md-nav-secondary',
  'Integration | Component | md nav secondary', {
    integration: true,

    beforeEach: function () {
      this.register('service:profile', profileStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "profileService" within each test
      this.inject.service('profile', {
        as: 'profileService'
      });
    }
  });

test('it renders', function (assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{layout/md-nav-secondary}}`);

  var more = this.$('.overflow-nav').length ? '|More' : '';

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

  // Template block usage:
  this.render(hbs `
    {{#layout/md-nav-secondary}}
      <li>template block text</li>
    {{/layout/md-nav-secondary}}
  `);

  more = this.$('.overflow-nav').length ? '|More' : '';

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), more + '|Foo|Bar|template|block|text|');
});

test('render after setting profile', function (assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('profileService.active', 'basic');

  this.render(hbs `{{layout/md-nav-secondary}}`);

  var more = this.$('.overflow-nav').length ? '|More' : '';

  assert.equal(this.$()
    .text()
    .replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|');
});
