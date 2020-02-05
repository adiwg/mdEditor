import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { createDictionary } from 'mdeditor/tests/helpers/create-dictionary';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';


module('Integration | Component | control/md-indicator/related', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3)

    this.set('values', {
      foo:"attribute1",
      bar: "codeName0",
    })

    this.set('dictionary', createDictionary(1)[0].json.dataDictionary);
    this.set('model', this.dictionary.entity[0].attribute[0])


    await render(hbs `{{control/md-indicator/related
      model=model
      route=true
      icon="sticky-note"
      note="The attribute \${foo} has an associated domain: \${bar}."
      route="dictionary.show.edit.entity"
      values=values
      parent=dictionary
      relatedId="domainId"
      path="domain"
      title="Related Indicator Test"
      linkText="Go to Domain"
      type="warning"
      popperContainer="body"
    }}`)

    assert.dom('.md-indicator-related .md-indicator').isVisible({count: 1});
    assert.equal(this.element.textContent.trim(), '');

    await triggerEvent(".md-indicator-related .md-indicator", "mouseenter")
    assertTooltipContent(assert, {
      contentString:`Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`
    });

    //Todo - still in need of a way to grab button
    // await click('.btn')
  });
})
