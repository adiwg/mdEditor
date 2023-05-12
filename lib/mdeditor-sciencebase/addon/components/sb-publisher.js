import { alias, bool } from '@ember/object/computed';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import $ from 'jquery';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import layout from '../templates/components/sb-publisher';
import TreeNode from '../utils/sb-tree-node';
import EmberObject, {
  set,
  setProperties,
  getWithDefault,
  get,
  computed
} from "@ember/object";
import {
  allSettled
} from "rsvp";

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    let settings = this.get('settings.data.publishOptions');
    let config = this.config;
    this.checkCredentials();

    this.set('treeRoot', EmberObject.create({
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
      sbId: (get(settings, 'sb-defaultParent') === undefined ? config.defaultParent : get(settings, 'sb-defaultParent')),
      config: config,
      willDestroy() {
        let children = this.children;

        if(children) {
          children.forEach(itm => {
            itm.destroy();
          });
        }
      }
    }));
  },

  classNames: ['sb-publisher'],
  store: service(),
  settings: service(),
  publishService: service('publish'),
  config: computed('publishService.catalogs', function () {
    return this.get('publishService.catalogs')
      .findBy('name', 'ScienceBase');
  }),
  credInfo: alias('config.credInfo'),
  selected: A(),
  publishable: computed('selected', 'selected.[]', 'isPublishing', function () {
    if(this.isPublishing) {
      return [];
    }

    return this.selected
      .filter((itm) => {
        let path = itm.path;
        let length = path.length;

        return(itm.get('sbParentId')) || length <
          3 || path.objectAt(length - 2)
          .get('isSelected');
      });
  }),
  canPublish: bool('publishable.length'),
  records: computed('store', function () {
    return this.store
      .peekAll('record')
      .rejectBy(
        'hasSchemaErrors');
  }),
  model: computed('records.@each.{parentIds,recordId}', 'treeRoot',
    function () {
      let all = this.records;
      let records = all.rejectBy('hasParent');

      if(isEmpty(records)) {
        return null;
      }

      let tree = records.map((rec) => {
        let node = this.createNode(rec);
        let children = node.addChildren(all);

        if(children) {
          children.forEach(itm => {
            set(itm, 'parentNode', node);
            itm.addChildren(all);
          });
        }

        return node;
      });

      let treeRoot = this.treeRoot;

      //tree.sortBy('sortOrder','label');
      treeRoot.set('children', tree);

      return [treeRoot];
    }),

  canLogin: computed('password', 'username', function () {
    return !(this.password && this.username);
  }),
  willDestroyElement() {
    this._super(...arguments);

    let selected = this.selected;

    selected.forEach(itm => set(itm, 'isSelected', false));
    selected.clear();
    this.treeRoot
      .destroy();
  },
  createNode(rec) {
    let config = this.config;
    let settings = this.get('settings.data.publishOptions');

    setProperties(config, {
      defaultParent: (get(settings, 'sb-defaultParent') === undefined ? config.defaultParent : get(settings, 'sb-defaultParent')),
      defaultCommunity: get(settings, 'sb-defaultCommunity'),
      defaultOrganization: get(settings, 'sb-defaultOrganization')
    });

    return TreeNode.create({
      _record: rec,
      config: this.config
    });
  },

  checkCredentials(login) {
    let username = this.username;
    let pw = this.password;
    let jossoURL = this.get('config.jossoURL');
    let jossoParam = this.get('credInfo.jossoSessionId') ?
      `&josso=${this.get('credInfo.jossoSessionId')}` : '';

    set(this, 'isLoadingCreds', true);

    $.ajax(jossoURL + jossoParam, {
        type: 'POST',
        dataType: 'json',
        context: this,
        headers: login ? {
          "Authorization": "Basic " + btoa(username + ":" + atob(pw))
        } : null
      })
      .then(function (response) {
        set(this, 'isLoadingCreds', false);

        if(response.isLoggedIn) {
          set(this, 'config.credInfo', response);
        } else {
          set(this, 'config.credInfo', false);
          this.flashMessages
            .warning('Not Logged In!');
        }
      }, (response) => {
        let error =
          `Error Logging In:
        ${response.status}: ${response.statusText}`;

        set(this, 'xhrError', error);
        this.flashMessages
          .danger(error);
      })
      .then(() => {
          set(this, 'isLoadingCreds', false);
          set(this, 'password', null);
        }

      );
  },

  actions: {
    hash(val) {
      this.set('password', btoa(val));

    },
    publish() {
      //this.checkCredentials();
      let selected = this.publishable
        .filter((itm) => {
          return(get(itm, 'path.length') < 3 || !get(itm,
            'parentNode.isSelected'));
        });
      // let rootURI = this.get('config.rootURI');
      // let defaultParent = this.get('config.defaultParent');
      let jossoParam = `?josso=${this.get('credInfo.jossoSessionId')}`;
      //let promises = A();

      this.set('isPublishing', true);

      let promises = selected.map((record) => {
        set(record, 'isLoading', true);
        return record.publish(jossoParam);
      });

      allSettled(promises)
        .then((/*array*/) => {
          //TODO display errors
          //console.log(array);
          set(this, 'isPublishing', false);

        }, function ( /*error*/ ) {
          this.flashMessages
            .danger('Publishing error!');
        });
    },

    login() {
      this.checkCredentials(true);
    },

    selectRecord(nodeModel, path) {
      let selected = this.selected;
      let target = selected.findBy('id', nodeModel.id);

      if(nodeModel.isSelected && target === undefined && !nodeModel
        .get(
          'notSelectable')) {
        set(nodeModel, 'path', path);
        selected.pushObject(nodeModel);
      } else {
        selected.removeObject(target);
        set(nodeModel, 'path', []);

        let nodeChildren = nodeModel.get('children') || [];

        nodeChildren.forEach(function (itm) {
          if(itm.get('notSelectable') && itm.get('isSelected')) {
            set(itm, 'isSelected', false);
            this.actions.selectRecord.call(this, itm);
          }
        }, this);
      }
    },
  }
});
