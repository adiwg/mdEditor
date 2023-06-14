import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md medium', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.model = {
      mediumSpecification: {
        title: 'title',
      },
      density: 9.9,
      units: 'units',
      numberOfVolumes: 9,
      mediumFormat: ['mediumFormat0', 'mediumFormat1'],
      note: 'note',
      identifier: {
        identifier: 'identifier',
      },
    };

    await render(hbs`{{object/md-medium profilePath="foobar" model=model}}`);

    assert.equal(
      find('form')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|×|mediumFormat0|×|mediumFormat1|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-medium profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-medium}}
    `);

    assert.equal(
      find('form')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|template|block|text|',
      'block'
    );
  });
});
