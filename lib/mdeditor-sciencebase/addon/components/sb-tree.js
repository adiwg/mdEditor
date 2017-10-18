import Ember from 'ember';
import Tree from 'mdeditor/components/tree-view';

const {
  get,
  getWithDefault,
  set
} = Ember;

export default Tree.extend({
  //layout,

  emptyMessage: `No records are available to export. To qualify, records must
  pass validation.`,
  emptyTitle: 'No Records Available!',

  validateDrag(ev) {
    let target = ev.currentTarget;
    let dragged = this.get('dragged.element');

    let valid = target !== dragged && !dragged.contains(target);
    // console.info({target:target,dragged:dragged});
    // console.info(valid);
    return valid;
  },

  handleDrop(obj, opts) {
    let record = get(obj, 'model._record');
    let parentIds = record.get('parentIds');
    let oldParentId = obj.get('nodeDepth') > 1 ? obj.get(
      'path.lastObject.id') : null;
    let newParent = opts.target;
    let newParentId = newParent.get(
      'model._record.json.metadata.metadataInfo.metadataIdentifier'
    );

    if(!newParentId) {
      parentIds
        .removeAt(parentIds
          .indexOf(parentIds.findBy('identifier', oldParentId)));
      record.propertyDidChange('parentIds');

      return;
    }

    if(oldParentId) {
      parentIds
        .replace(parentIds
          .indexOf(parentIds.findBy('identifier', oldParentId)), 1, [
            newParentId
          ]);
      record.propertyDidChange('parentIds');

      return;
    }

    let path = 'json.metadata.metadataInfo.parentMetadata';
    let arr = [];

    set(record, path, getWithDefault(record, path, {}));
    set(record, path + '.identifier', getWithDefault(record, path +
      'identifier', arr));
    arr.pushObject(newParentId);

    record.propertyDidChange('parentIds');
  }
});
