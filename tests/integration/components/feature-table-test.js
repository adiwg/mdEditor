import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

moduleForComponent('feature-table', 'Integration | Component | feature table', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('data', createMapLayer(2));
  this.set('showForm', function () {
    return false;
  });

  this.render(hbs `{{feature-table data=data.features showForm=showForm}}`);

  assert.equal($(this.$()
      .html()
      .replace('&nbsp;', ''))
    .text()
    .trim()
    .replace(/[ \n]+/g, '|'),
    'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50'
  );
});
