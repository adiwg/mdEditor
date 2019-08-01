import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import createExtent from 'mdeditor/tests/helpers/create-extent';

module('Integration | Component | object/md-extent', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(9);
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', createExtent(1)[0]);

    await render(hbs `{{object/md-extent profilePath="foobar" extent=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+−|Terrain|Features|Bounding|BoxLeaflet|'
    );

    const inputs = findAll('.form-group input, .form-group textarea');

    inputs.forEach(i => assert.dom(i).hasValue());

    this.set('model.geographicExtent.firstObject.geographicElement',
      []);
    this.set('model.geographicExtent.firstObject.boundingBox', {});

    // Template block usage:
    await render(hbs `
      {{#object/md-extent profilePath="foobar" extent=model}}
        template block text
      {{/object/md-extent}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|'
    );
  });
});
