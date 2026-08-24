import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';
import Service from '@ember/service';

module('Integration | Component | control/md-indicator/related', function (
  hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    let router = Service.extend({
      transitionTo() {
        assert.ok(true, 'Transition started');
      },
      generateURL(route, models) {
        assert.equal(route, 'dictionary.show.edit.domain.edit', 'route OK');
        assert.deepEqual(models, [0], 'model ids OK');
        return '#';
      },
    });
    this.owner.register('service:-routing', router);
    this.owner.setupRouter();
  });

  test('it renders', async function (assert) {
    assert.expect(6);

    this.set('values', {
      foo: 'attribute1',
      bar: 'codeName0',
    });

    this.set('dictionary', EmberObject.create(
      createDictionary(1)[0].json.dataDictionary
    ));
    this.set('model', this.dictionary.entity[0].attribute[0]);

    await render(hbs`{{control/md-indicator/related
      model=this.model
      icon="cog"
      note="The attribute \${foo} has an associated domain: \${bar}."
      route="this.dictionary.show.edit.domain.edit"
      values=this.values
      parent=this.dictionary
      relatedId="domainId"
      path="domain"
      title="Related Indicator Test"
      linkText="Go to Domain"
      type="warning"
      popperContainer="#ember-testing"
      routeIdPaths=(array "relatedIndex")
    }}`);

    assert.dom('.md-indicator-related').exists({ count: 1 });
    assert.dom('.md-indicator-related .fa').hasClass('fa-cog');

    await triggerEvent('.md-indicator-related .fa', 'mouseenter');

    assertTooltipContent(assert, {
      contentString: `Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`
    });

    await click('.btn');
  });
});
