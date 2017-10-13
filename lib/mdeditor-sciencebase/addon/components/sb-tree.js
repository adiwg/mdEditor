import Ember from 'ember';
//import layout from 'mdeditor/components/tree-view/template';
import Tree from 'mdeditor/components/tree-view';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Tree.extend({
  //layout,
  store: service(),

  records: computed('store', function() {
    return this.get('store').peekAll('record').rejectBy(
      'hasSchemaErrors');
  }),
  model: computed('records.@each.recordId', function() {
    let records = this.get('records');

    return records.map((rec) => {
      return {
        _record: rec,
        label: rec.get('title'),
        id: rec.get('recordId'),
        checkable: true,
        definition: rec.get('json.metadata.resourceInfo.abstract').split(
          " ").splice(0, 50).join(" ")
      };
    });
  })
});
