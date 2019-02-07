import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | control/md itis', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);
    // Set any properties with this.set('myProperty', 'value');
    this.set('taxonomy', {
      taxonomicClassification: []
    });
    this.set('taxa', [EmberObject.create({
      "kingdom": "Animalia",
      "name": "Calotes rouxii",
      "rank": "Species",
      "tsn": "1055525",
      "taxonomy": [
        [{
          "rank": "Kingdom",
          "value": "Animalia",
          "order": 0,
          "tsn": "202423"
        }, {
          "rank": "Subkingdom",
          "value": "Bilateria",
          "order": 1,
          "tsn": "914154"
        }, {
          "rank": "Genus",
          "value": "Calotes",
          "order": 12,
          "tsn": "209043"
        }, {
          "rank": "Species",
          "value": "Calotes rouxii",
          "order": 13,
          "tsn": "1055525",
          "common": ["Roux's Forest Lizard", "Forest Blood Sucker"]
        }]
      ],
      "common": [{
        "name": "Roux's Forest Lizard",
        "language": "English"
      }, {
        "name": "Forest Blood Sucker",
        "language": "English"
      }],
      "status": "valid"
    })]);
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-itis taxonomy=taxonomy}}`);

    assert.equal(find('.md-itis').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Search|Value|Kingdom|(optional)|Select|a|kingdom.|Click|to|send|search|request|Search|'
    );

    // await fillIn('.md-input-input input.ember-text-field', 'shark');
    // await click('button[type=submit]');
    // await settled();

    await render(hbs`{{control/md-itis taxonomy=taxonomy searchResult=taxa found=true}}`);

    assert.ok(find('.md-itis-taxalist'), 'renders search result');

    await click('.md-itis-taxalist .list-group-item .btn-success');

    assert.ok(find('.md-itis-selectedlist .list-group-item'), 'renders selected item');
  });
});
