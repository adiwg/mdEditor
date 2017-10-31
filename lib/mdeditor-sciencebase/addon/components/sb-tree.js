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
  disableCheck: true,

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
    let newParentSbId = newParent.get('model.sbId');
    let sbParentId = obj.get('model.sbParentId');
    let sbParentIdx = parentIds ? parentIds.indexOf(parentIds.findBy(
      'identifier',
      sbParentId)) : -1;

    set(obj,'model._record._dropped', true);

    if(get(obj, 'model.isSelected')) {
      obj.selected.removeObject(obj.model);
    }

    if(!newParentId) {
      if(sbParentIdx > -1) {
        parentIds.removeAt(sbParentIdx);
      }

      let idx = parentIds ? parentIds.indexOf(parentIds.findBy('identifier',
        oldParentId)) : -1;

      if(idx > -1) {
        parentIds.removeAt(idx);
      }

      if(get(newParent, 'model.isRoot')) {
        get(obj, 'model').addSbParentId(newParentSbId);
      }

      record.propertyDidChange('parentIds');

      return;
    }

    if(oldParentId) {
      parentIds
        .replace(parentIds
          .indexOf(parentIds.findBy('identifier', oldParentId)), 1, [
            newParentId
          ]);
    } else {

      let path = 'json.metadata.metadataInfo.parentMetadata';
      let arr = [];

      set(record, path, getWithDefault(record, path, {
        title: 'Metadata: ' + (newParent.get(
          'model._record.json.metadata.resourceInfo.citation.title'
        ))
      }));
      set(record, path + '.identifier', getWithDefault(record, path +
        'identifier', arr));
      record.get('parentIds').pushObject(newParentId);

    }

    if(newParentSbId) {
      let newSbParent = {
        identifier: newParentSbId,
        namespace: 'gov.sciencebase.catalog'
      };
      let parentIds = record.get('parentIds');
      let sbParentIdx = parentIds ? parentIds.indexOf(parentIds.findBy(
        'identifier',
        sbParentId)) : null;

      if(sbParentIdx > -1) {
        record.get('parentIds')
          .replace(sbParentIdx, 1, [newSbParent]);
      } else {
        record.get('parentIds')
          .pushObject(newSbParent);
      }
    }

    record.propertyDidChange('parentIds');
  }
});
