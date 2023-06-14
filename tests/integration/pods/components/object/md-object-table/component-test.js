import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-object-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.model = [
      {
        biz: 'biz0',
        baz: 'baz0',
      },
      {
        biz: 'biz1',
        baz: 'baz1',
      },
    ];

    await render(
      hbs`{{object/md-object-table header="Foo Bars" attributes="biz,baz"}}`
    );

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Foo|Bars|found.|Add|Foo|Bar|'
    );

    // Template block usage:
    await render(hbs`
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
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|Edit|Delete|1|biz1|baz1|Edit|Delete|',
      'block'
    );
  });
});
