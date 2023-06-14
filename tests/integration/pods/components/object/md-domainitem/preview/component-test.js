import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | object/md domainitem/preview',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        name: 'name0',
        value: 'value0',
        definition: 'definition0',
        reference: {
          title: 'domainReference',
        },
      });

      await render(
        hbs`{{object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}`
      );

      assert.equal(findAll('input').length, 3);
      assert.equal(findAll('input')[0].value, 'name0', 'name');
      assert.equal(findAll('input')[1].value, 'value0', 'value');
      assert.equal(findAll('input')[2].value, 'definition0', 'definition');

      // Template block usage:
      await render(hbs`
      {{#object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
        template block text
      {{/object/md-domainitem/preview}}
    `);

      assert.equal(
        find('table')
          .textContent.replace(/[\s\n]+/g, '|')
          .trim(),
        '|',
        'block'
      );
    });
  }
);
