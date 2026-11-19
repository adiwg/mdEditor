import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import createProfile from 'mdeditor/tests/helpers/create-profile';

module('Integration | Component | object/md-profile/preview', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.model = createProfile(1)[0];

    await render(hbs`
      <Object::MdProfile::Preview @record={{this.model}} />
    `);

    assert.dom('.text-muted').exists('applies muted styling on the wrapper');
    assert.equal(
      this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'
    );

    await render(hbs`
      <Object::MdProfile::Preview @record={{this.model}} class='list-group-item-text'>
        template block text
      </Object::MdProfile::Preview>
    `);

    assert.dom('.text-muted.list-group-item-text').exists(
      'merges caller class with muted wrapper'
    );
    assert.equal(
      this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|'
    );
  });
});
