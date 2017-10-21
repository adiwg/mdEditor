import EmberObject from '@ember/object';
import moment from 'moment';
import {A} from '@ember/array';

import {
  computed,
  getWithDefault,
  get,
  set
} from '@ember/object';

export default EmberObject.extend({
  _record: null,
  label: computed.alias('_record.title'),
  id: computed.alias('_record.recordId'),
  icon: computed.alias('_record.icon'),
  type: computed.alias(
    '_record.json.metadata.resourceInfo.resourceType.firstObject.type'),
  checkable: computed.not('_record.hasParent'),
  hideCheck: computed.bool('_record.hasParent'),
  isExpanded: true,
  //hideToggle: true,
  draggable: true,
  definition: computed('_record.json.metadata.resourceInfo.abstract',
    function () {
      return get(this, '_record.json.metadata.resourceInfo.abstract')
        .split(
          ' ')
        .splice(0, 50)
        .join(' ');
    }),

  sbId: computed(
    '_record.json.metadata.resourceInfo.citation.identifier.@each.identifier',
    function () {
      let record = this.get('_record');

      if(record.get('recordIdNamespace') === 'gov.sciencebase.catalog') {
        return this.get('id');
      }

      let ids = record.get(
          'json.metadata.resourceInfo.citation.identifier')
        .findBy('namespace', 'gov.sciencebase.catalog');

      return ids ? get(ids, 'identifier') : null;

    }),

  sbParentId: computed('_record.parentIds.@each.identifier',
    function () {
      let parentIds = this.get('_record.parentIds');

      if(!parentIds) {
        return false;
      }

      return parentIds.findBy('namespace', 'gov.sciencebase.catalog');
    }),

  addSbId(id) {
    let record = get(this, '_record');
    let path = 'json.metadata.resourceInfo.citation.identifier';
    let arr = A();

    set(record, path, getWithDefault(record, path, arr));

    get(record, path).pushObject({
      authority: {
        date: [{
          date: moment()
            .toISOString,
          dateType: 'published',
          description: 'Published using mdEditor'
        }],
        title: 'ScienceBase'
      },
      identifier: id,
      namespace: 'gov.sciencebase.catalog',
      description: 'Identifier imported from ScienceBase during publication'
    });
  }
});
