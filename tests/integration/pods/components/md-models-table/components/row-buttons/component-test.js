import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md-models-table/components/row-buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(6);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('myAction', function (col, index, record) {
      assert.equal(record.title, 'foo', 'called passed action');
      this.expandRow(index, record);
    });

    await render(hbs`{{md-models-table/components/row-buttons}}`);

    this.set('data', [{
      title: 'foo',
      type: 'bar'
    }, {
      title: 'biz',
      type: 'baz'
    }]);

    this.set('columns', [{
      propertyName: 'title',
      title: 'Title'
    }, {
      propertyName: 'type',
      title: 'Type'
    }, {
      component: 'components/md-models-table/components/row-buttons',
      disableFiltering: true,
      disableSorting : true,
      mayBeHidden: false,
      className: 'text-center',
      buttons: [{
        title: 'foo',
        type: 'info',
        icon: 'house',
        action: this.myAction
      },{
        title: 'biz',
        type: 'danger',
        icon: 'times',
        confirm: true,
        action: this.myAction
      }]
    }]);

    await render(hbs`{{md-models-table data=data columns=columns expandedRowComponent=(component "md-models-table/components/row-body" spotlighted=true)}}`);

    assert.dom('.md-row-buttons .btn').exists({ count: 4 });
    assert.dom('.md-row-buttons .btn-danger').exists({ count: 2 });
    assert.dom('.md-button-confirm').hasText('biz');
    assert.dom('.md-button-confirm.btn-danger .fa').hasClass('fa-times');

    await click('.md-button-confirm');
    assert.dom('.md-button-confirm').hasText('Confirm');

    await click('.btn-info');
  });
});
