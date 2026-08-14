import { set, get } from '@ember/object';
import { A } from '@ember/array';
import Tree from 'mdeditor/components/tree-view';

export default Tree.extend({
  //layout,

  emptyMessage: `No records are available to export. To qualify, records must
  pass validation.`,
  emptyTitle: 'No Records Available!',
  disableCheck: true,
  sortKeys: ['sortOrder', 'sbParentId', 'label'],

  init() {
    this._super(...arguments);
    // Both methods are passed as unbound callbacks; bind them so 'this' is
    // always the sb-tree instance regardless of how they are called.
    this.handleDrop = this.handleDrop.bind(this);
    this.validateDrag = this.validateDrag.bind(this);
  },

  validateDrag() {
    return true;
  },

  handleDrop(obj, opts) {
    if (
      get(obj, 'model.id') &&
      get(opts.target, 'model.id') &&
      get(obj, 'model.id') === get(opts.target, 'model.id')
    ) {
      return;
    }

    let record = get(obj, 'model._record');
    let parentIds = record.get('parentIds');
    let oldParentId =
      obj.get('nodeDepth') > 1 ? obj.get('path.lastObject.id') : null;
    let newParent = opts.target;
    let newParentId = newParent.get(
      'model._record.json.metadata.metadataInfo.metadataIdentifier'
    );
    let newParentSbId = newParent.get('model.sbId');
    let sbParentId = obj.get('model.sbParentId');
    let sbParentIdx = parentIds
      ? parentIds.indexOf(parentIds.findBy('identifier', sbParentId))
      : -1;

    // Mark drop target (parent) as dropped for orange visual feedback;
    // resolve _record directly so a missing value never aborts handleDrop
    let newParentRecord = get(newParent, 'model._record');
    if (newParentId && newParentRecord) {
      set(newParentRecord, '_dropped', true);
    } else {
      set(obj, 'model._record._dropped', true);
    }

    if (get(obj, 'model.isSelected')) {
      obj.selected.removeObject(obj.model);
    }

    if (!newParentId) {
      if (sbParentIdx > -1) {
        parentIds.removeAt(sbParentIdx);
      }

      let idx = parentIds
        ? parentIds.indexOf(parentIds.findBy('identifier', oldParentId))
        : -1;

      if (idx > -1) {
        parentIds.removeAt(idx);
      }

      if (get(newParent, 'model.isRoot')) {
        get(obj, 'model').addSbParentId(newParentSbId);
      }

      record.notifyPropertyChange('parentIds');
      record.notifyPropertyChange('hasDirtyHash');

      let onDrop = this.get('onDropComplete');
      if (onDrop) {
        onDrop();
      }

      return;
    }

    if (oldParentId) {
      parentIds.replace(
        parentIds.indexOf(parentIds.findBy('identifier', oldParentId)),
        1,
        [newParentId]
      );
    } else {
      let path = 'json.metadata.metadataInfo.parentMetadata';
      let arr = A();

      set(
        record,
        path,
        get(record, path) || {
          title:
            'Metadata: ' +
            newParent.get(
              'model._record.json.metadata.resourceInfo.citation.title'
            ),
        }
      );
      set(
        record,
        path + '.identifier',
        get(record, path + '.identifier') || arr
      );
      record.get('parentIds').pushObject(newParentId);
    }

    if (newParentSbId) {
      let newSbParent = {
        identifier: newParentSbId,
        namespace: 'gov.sciencebase.catalog',
      };
      let parentIds = record.get('parentIds');
      let sbParentIdx = parentIds
        ? parentIds.indexOf(parentIds.findBy('identifier', sbParentId))
        : null;

      if (sbParentIdx > -1) {
        record.get('parentIds').replace(sbParentIdx, 1, [newSbParent]);
      } else {
        record.get('parentIds').pushObject(newSbParent);
      }
    }

    record.notifyPropertyChange('parentIds');
    record.notifyPropertyChange('hasDirtyHash');

    let onDrop = this.get('onDropComplete');
    if (onDrop) {
      onDrop();
    }
  },
});
