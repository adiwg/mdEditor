import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import createProfile from 'mdeditor/tests/helpers/create-profile';

module('Integration | Component | object/md-profile', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.model = createProfile(1)[0];

    await render(hbs`
      <Object::MdProfile @record={{this.model}} />
    `);

    assert.equal(
      this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'
    );
  });
});
