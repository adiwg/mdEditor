import EmberObject from '@ember/object';
import moment from 'moment';
import {
  A
} from '@ember/array';
import {
  allSettled
} from "rsvp";
import {
  isPresent
} from "@ember/utils";
import {
  computed,
  getWithDefault,
  get,
  set
} from '@ember/object';

import $ from "jquery";

export default EmberObject.extend({
  _record: null,
  label: computed.alias('_record.title'),
  id: computed.alias('_record.recordId'),
  uuid: computed.alias('id').readOnly(),
  identifier: computed.alias('id').readOnly(),
  icon: computed.alias('_record.icon'),
  type: computed.alias(
    '_record.defaultType'),
  //checkable: computed.not('_record.hasParent'),
  hideCheck: computed.bool('_record.hasParent'),
  isLoading: false,
  isExpanded: true,
  notSelectable: computed('sbId', 'isSelected', 'parentNode',
    'parentNode.isSelected',
    function() {
      let parent = this.get('parentNode');

      if(!isPresent(parent)) {
        return false;
      }

      if(parent.get('isSelected')) {
        return false;
      }

      if(this.get('sbParentId')) {
        return false;
      }

      return true;
    }),
  //hideToggle: true,
  draggable: true,
  definition: computed('_record.json.metadata.resourceInfo.abstract',
    function() {
      return get(this, '_record.json.metadata.resourceInfo.abstract')
        .split(
          ' ')
        .splice(0, 50)
        .join(' ');
    }),

  sbId: computed(
    '_record.json.metadata.resourceInfo.citation.identifier.@each.identifier',
    function() {
      let record = this.get('_record');

      return this.findSbId(record);

    }),

  sbParentId: computed('_record.parentIds.@each.identifier',
    '_record.defaultParent',
    function() {
      let parentIds = this.get('_record.parentIds');

      if(!parentIds) {
        return false;
      }

      let primary = parentIds.findBy('namespace',
        'gov.sciencebase.catalog');

      if(primary) {
        return get(primary, 'identifier');
      }

      return this.findSbId(this.get('_record.defaultParent'));
    }),

  findSbId(record) {
    if(!record) {
      return null;
    }

    if(record.get('recordIdNamespace') === 'gov.sciencebase.catalog') {
      return this.get('id');
    }

    let ids = record.get(
      'json.metadata.resourceInfo.citation.identifier');
    let id = ids ? ids.findBy('namespace', 'gov.sciencebase.catalog') :
      null;

    return id ? get(id, 'identifier') : null;
  },

  addSbId(id) {
    let record = get(this, '_record');
    let path = 'json.metadata.resourceInfo.citation.identifier';
    let arr = A();

    set(record, path, getWithDefault(record, path, arr));

    get(record, path).pushObject({
      authority: {
        date: [{
          date: moment()
            .toISOString(),
          dateType: 'published',
          description: 'Published using mdEditor'
        }],
        title: 'ScienceBase'
      },
      identifier: id,
      namespace: 'gov.sciencebase.catalog',
      description: 'Identifier imported from ScienceBase during publication'
    });
  },

  addChildren(records) {
    let children = records.filter((itm) => {
        let parentIds = itm.get('parentIds');

        if(!parentIds) {
          return false;
        }

        return parentIds.findBy('identifier', get(this, 'id'));
      })
      .map(rec => {
        return this.constructor.create({
          _record: rec,
          config: this.get('config')
        });
      });

    set(this, 'children', children);

    return children;
  },

  publish(jossoParam) {
    let record = this;
    let sbId = record.get('sbId');
    let rootURI = this.get('config.rootURI');
    let defaultParent = this.get('config.defaultParent');
    let url = record.get('type') === 'project' ? rootURI +
      'project' :
      rootURI +
      'product';
    let urlPut = sbId ? '/' + sbId : '';

    let data = {
      data: {
        parentid: record.get('sbParentId') || record.get(
          'parentNode.sbId') || defaultParent,
        mdjson: record.get('_record.formatted'),
        type: 'records'
      }
    };

    set(record, 'isLoading', true);

    let promise = $.ajax(url + urlPut + jossoParam, {
        type: sbId ? 'PUT' : 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        context: this
      })
      .then(function(response) {
        set(record, 'isLoading', false);

        if(response.id) {
          //let sbId = record.get('sbId');
          console.log(sbId !== response.id);
          if(!sbId) {
            record.addSbId(response.id);
          } else if(sbId !== response.id) {
            throw new Error(
              'Publishing error! ScienceBase identifier mismatch!');
          }

          set(this, 'result', response);
          record.propertyDidChange('_record.defaultParent');

          // return record;
          //
          return allSettled(record.children.filterBy('isSelected').map((
            child) => {
              set(child, 'isLoading', true);
            return child.publish(jossoParam);
          }));
        } else {
          set(this, 'errors', response.error);
          // get(this, 'flashMessages')
          //   .danger('Publishing error!');
          throw new Error('Publishing error!');
        }
      }, (response) => {
        let error =
          `Error Publishing:
        ${response.status}: ${response.statusText}`;

        set(record, 'isLoading', false);
        set(this, 'xhrError', error);
        // get(this, 'flashMessages')
        //   .danger(error);
        throw new Error(error);
      });

    return promise;
  }
});
