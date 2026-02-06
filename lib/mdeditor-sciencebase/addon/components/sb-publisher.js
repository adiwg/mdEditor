import { alias, bool } from '@ember/object/computed';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import layout from '../templates/components/sb-publisher';
import TreeNode from '../utils/sb-tree-node';
import EmberObject, { set, setProperties, get, computed } from '@ember/object';
import { allSettled } from 'rsvp';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    let rawOptions = this.get('settings.data.publishOptions');
    let publishOptions = Array.isArray(rawOptions) ? rawOptions : [];
    // Support both legacy 'catalog' field and new 'publisher' field
    let settings =
      publishOptions.find(
        (option) =>
          option.catalog === 'ScienceBase' || option.publisher === 'ScienceBase'
      ) || {};
    let config = this.get('config');
    this.set(
      'treeRoot',
      EmberObject.create({
        label: 'ScienceBase Default',
        icon: 'globe',
        checkable: false,
        isExpanded: true,
        draggable: false,
        notSelectable: true,
        children: null,
        hideToggle: true,
        hideCheck: true,
        isRoot: true,
        nodeClass: 'sb-tree-root',
        sbId: get(settings, 'sb-defaultParent') || get(config, 'defaultParent'),
        config: config,
        willDestroy() {
          let children = this.get('children');
          if (children) {
            children.forEach((itm) => {
              itm.destroy();
            });
          }
        },
      })
    );
  },

  classNames: ['sb-publisher'],
  store: service(),
  settings: service(),
  publishService: service('publish'),
  config: computed('publishService', function () {
    return this.get('publishService.catalogs').findBy('name', 'ScienceBase');
  }),
  tokenService: service('token'),

  selected: A(),

  publishable: computed('selected', 'selected.[]', 'isPublishing', function () {
    if (this.get('isPublishing')) {
      return [];
    }
    return this.get('selected').filter((itm) => {
      let path = get(itm, 'path');
      let length = get(path, 'length');

      return (
        itm.get('sbParentId') ||
        length < 3 ||
        path.objectAt(length - 2).get('isSelected')
      );
    });
  }),

  canPublish: bool('publishable.length'),
  records: computed('store', function () {
    return this.get('store').peekAll('record').rejectBy('hasSchemaErrors');
  }),
  hasToken: bool('tokenService.token'),

  model: computed(
    'records.@each.recordId',
    'records.@each.parentIds',
    function () {
      let all = this.get('records');
      let records = all.rejectBy('hasParent');
      if (isEmpty(records)) {
        return null;
      }
      let tree = records.map((rec) => {
        let node = this.createNode(rec);
        let children = node.addChildren(all);
        if (children) {
          children.forEach((itm) => {
            set(itm, 'parentNode', node);
            itm.addChildren(all);
          });
        }
        return node;
      });
      let treeRoot = this.get('treeRoot');
      treeRoot.set('children', tree);
      return [treeRoot];
    }
  ),

  willDestroyElement() {
    this._super(...arguments);
    let selected = this.get('selected');
    selected.forEach((itm) => set(itm, 'isSelected', false));
    selected.clear();
    this.get('treeRoot').destroy();
  },

  createNode(rec) {
    let config = this.get('config');
    let rawOpts = this.get('settings.data.publishOptions');
    let publishOptions = Array.isArray(rawOpts) ? rawOpts : [];
    // Support both legacy 'catalog' field and new 'publisher' field
    let settings =
      publishOptions.find(
        (option) =>
          option.catalog === 'ScienceBase' || option.publisher === 'ScienceBase'
      ) || {};
    setProperties(config, {
      defaultParent: get(settings, 'sb-defaultParent') || get(config, 'defaultParent'),
      defaultCommunity: get(settings, 'sb-defaultCommunity'),
      defaultOrganization: get(settings, 'sb-defaultOrganization'),
    });
    return TreeNode.create({
      _record: rec,
      config: this.get('config'),
      settings: settings,
    });
  },

  actions: {
    hash(val) {
      this.set('password', btoa(val));
    },

    publish() {
      let selected = this.get('publishable').filter(
        (itm) =>
          get(itm, 'path.length') < 3 || !get(itm, 'parentNode.isSelected')
      );
      this.set('isPublishing', true);
      const promises = selected.map((record) => {
        set(record, 'isLoading', true);
        return record.publish(this.tokenService.token);
      });
      allSettled(promises).then(
        () => {
          set(this, 'isPublishing', false);
        },
        () => {
          get(this, 'flashMessages').danger('Publishing error!');
        }
      );
    },

    addToken() {
      const token = this.tokenService.addToken(this.rawToken);
      if (!token) {
        set(this, 'rawToken', null);
      }
    },

    selectRecord(nodeModel, path) {
      let selected = this.get('selected');
      let target = selected.findBy('id', get(nodeModel, 'id'));
      if (
        get(nodeModel, 'isSelected') &&
        target === undefined &&
        !nodeModel.get('notSelectable')
      ) {
        set(nodeModel, 'path', path);
        selected.pushObject(nodeModel);
      } else {
        selected.removeObject(target);
        set(nodeModel, 'path', []);
        let nodeChildren = nodeModel.get('children') || [];
        nodeChildren.forEach(function (itm) {
          if (itm.get('notSelectable') && itm.get('isSelected')) {
            set(itm, 'isSelected', false);
            this.actions.selectRecord.call(this, itm);
          }
        }, this);
      }
    },
  },
});
