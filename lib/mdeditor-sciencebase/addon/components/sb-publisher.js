import Ember from 'ember';
import layout from '../templates/components/sb-publisher';
import TreeNode from '../utils/sb-tree-node';
import EmberObject from "@ember/object";
import {
  allSettled
} from "rsvp";

const {
  computed,
  Component,
  get,
  getWithDefault,
  setProperties,
  isEmpty,
  $,
  A,
  set,
  inject: {
    service
  }
} = Ember;

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    let settings = this.get('settings.data.publishOptions');
    let config = this.get('config');
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
      sbId: getWithDefault(settings, 'sb-defaultParent', get(config,
        'defaultParent')),
      config: config,
      willDestroy() {
        let children = this.get('children');

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
  config: computed('publishService', function () {
    return this.get('publishService.catalogs')
      .findBy('name', 'ScienceBase');
  }),
  credInfo: computed.alias('config.credInfo'),
  selected: A(),
  publishable: computed('selected', 'selected.[]', 'isPublishing', function () {
    if(this.get('isPublishing')) {
      return [];
    }

    return this.get('selected')
      .filter((itm) => {
        let path = get(itm, 'path');
        let length = get(path, 'length');

        return(itm.get('sbParentId')) || length <
          3 || path.objectAt(length - 2)
          .get('isSelected');
      });
  }),
  canPublish: computed.bool('publishable.length'),
  records: computed('store', function () {
    return this.get('store')
      .peekAll('record')
      .rejectBy(
        'hasSchemaErrors');
  }),
  model: computed('records.@each.recordId', 'records.@each.parentIds',
    function () {
      let all = this.get('records');
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

      let treeRoot = this.get('treeRoot');

      //tree.sortBy('sortOrder','label');
      treeRoot.set('children', tree);

      return [treeRoot];
    }),

  canLogin: computed('password', 'username', function () {
    return !(this.get('password') && this.get('username'));
  }),
  willDestroyElement() {
    this._super(...arguments);

    let selected = this.get('selected');

    selected.forEach(itm => set(itm, 'isSelected', false));
    selected.clear();
    this.get('treeRoot')
      .destroy();
  },
  createNode(rec) {
    let config = this.get('config');
    let settings = this.get('settings.data.publishOptions');

    setProperties(config, {
      defaultParent: getWithDefault(settings, 'sb-defaultParent', get(
        config,
        'defaultParent')),
      defaultCommunity: settings.get('sb-defaultCommunity'),
      defaultOrganization: settings.get('sb-defaultOrganization')
    });

    return TreeNode.create({
      _record: rec,
      config: this.get('config')
    });
  },

  checkCredentials(login) {
    let username = this.get('username');
    let pw = this.get('password');
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
          get(this, 'flashMessages')
            .warning('Not Logged In!');
        }
      }, (response) => {
        let error =
          `Error Logging In:
        ${response.status}: ${response.statusText}`;

        set(this, 'xhrError', error);
        get(this, 'flashMessages')
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
      let selected = this.get('publishable')
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
          get(this, 'flashMessages')
            .danger('Publishing error!');
        });
    },

    login() {
      this.checkCredentials(true);
    },

    selectRecord(nodeModel, path) {
      let selected = this.get('selected');
      let target = selected.findBy('id', get(nodeModel, 'id'));

      if(get(nodeModel, 'isSelected') && target === undefined && !nodeModel
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
