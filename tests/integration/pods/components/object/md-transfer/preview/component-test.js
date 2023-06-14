import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | object/md-transfer/preview',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        unitsOfDistribution: 'unitsOfDistribution',
        transferSize: 9.9,
        onlineOption: [
          {
            uri: 'http://adiwg.org',
          },
          {
            uri: 'http://adiwg.org/',
          },
        ],
        offlineOption: [
          {
            mediumSpecification: {
              title: 'title0',
            },
          },
          {
            mediumSpecification: {
              title: 'title1',
            },
          },
        ],
        transferFrequency: {
          months: 9,
        },
        distributionFormat: [
          {
            formatSpecification: {
              title: 'title0',
            },
          },
          {
            formatSpecification: {
              title: 'title1',
            },
          },
        ],
      };

      await render(hbs`{{object/md-transfer/preview item=model}}`);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|9.9|yes(2)|yes(2)|yes(2)|'
      );

      // Template block usage:
      await render(hbs`
      {{#object/md-transfer/preview isTable=false item=model as |t|}}
        transferSize: {{t.transferSize}}
      {{/object/md-transfer/preview}}
    `);

      assert.equal(
        this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
        '|transferSize:|9.9|'
      );
    });
  }
);
