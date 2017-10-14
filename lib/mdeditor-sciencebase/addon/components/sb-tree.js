import Ember from 'ember';
//import layout from 'mdeditor/components/tree-view/template';
import Tree from 'mdeditor/components/tree-view';

const {
  computed,
  get,
  set,
  Object: EmObject,
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

    let tree = records.map((rec) => {
      let node = this.createNode(rec);
      let children = this.addChildren(node);

      if(children) {
        children.forEach(itm => this.addChildren(itm));
      }

      return node;
    });

    return tree;
  }),

  createNode(rec){
    return EmObject.create({
      _record: rec,
      label: rec.get('title'),
      id: rec.get('recordId'),
      checkable: true,
      definition: rec.get('json.metadata.resourceInfo.abstract').split(
        " ").splice(0, 50).join(" ")
    });
  },

  addChildren(record) {
    let records = this.get('records');
    let children = records.filter((itm) => {
      let parentIds = itm.get('parentIds');

      if(!parentIds) {
        return false;
      }

      return parentIds.findBy('identifier', get(record, 'id'));
    }).map(this.createNode);

    set(record, 'children', children);

    return children;
  },

  emptyMessage: `No records are available to export. To qualify, records must
  pass validation.`,
  emptyTitle: 'No Records Available!'
});
