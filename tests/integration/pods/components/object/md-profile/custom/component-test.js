import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-profile/custom', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.model = {
      title: 'testme',
      description: 'testing description'
    };

    await render(hbs`
      <Object::MdProfile::Custom @record={{this.model}} />
    `);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Description|Description|testing|description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|'
    );

    await render(hbs`
      <Object::MdProfile::Custom @record={{this.model}}>
        template block text
      </Object::MdProfile::Custom>
    `);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Description|Description|testing|description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|template|block|text|'
    );
  });
});
