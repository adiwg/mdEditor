import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';
import Service from '@ember/service';

module(
  'Integration | Component | control/md-indicator/related',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function (assert) {
      let router = Service.extend({
        transitionTo() {
          assert.ok(true, 'Transition started');
        },
        generateURL(route, models) {
          assert.equal(route, 'dictionary.show.edit.entity', 'route OK');
          assert.deepEqual(models, ['attribute1'], 'model ids OK');
        },
      });
      this.owner.register('service:-routing', router);
      //this.router=router;
      this.owner.setupRouter();
    });

    test('it renders', async function (assert) {
      assert.expect(6);

      this.set('values', {
        foo: 'attribute1',
        bar: 'codeName0',
      });

      this.set('dictionary', createDictionary(1)[0].json.dataDictionary);
      this.set('model', this.dictionary.entity[0].attribute[0]);

      await render(hbs`{{control/md-indicator/related
      model=model
      route=true
      icon="cog"
      note="The attribute \${foo} has an associated domain: \${bar}."
      route="dictionary.show.edit.entity"
      values=values
      parent=dictionary
      relatedId="domainId"
      path="domain"
      title="Related Indicator Test"
      linkText="Go to Domain"
      type="warning"
      popperContainer="#ember-testing"
      routeIdPaths=(array "values.foo")
    }}`);

      assert.dom('.md-indicator-related .md-indicator').isVisible({ count: 1 });
      assert.dom('.md-indicator .fa').hasClass('fa-cog');

      await triggerEvent('.md-indicator-related .md-indicator', 'mouseenter');

      assertTooltipContent(assert, {
        contentString: `Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`,
      });

      await click('.btn');
    });
  }
);
