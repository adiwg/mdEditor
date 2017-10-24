import Ember from 'ember';
import layout from '../templates/components/sb-publisher';
import TreeNode from '../utils/sb-tree-node';
import {
  allSettled
} from "rsvp";

const {
  computed,
  Component,
  get,
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
    this.checkCredentials();
  },

  classNames: ['sb-publisher'],
  store: service(),
  publishService: service('publish'),
  config: computed('publishService', function() {
    return this.get('publishService.catalogs')
      .findBy('name', 'ScienceBase');
  }),
  selected: A(),
  publishable: computed('selected.[]', 'isPublishing', function() {
    if(this.get('isPublishing')) {
      return [];
    }

    return this.get('selected').filter((itm) => {
      let path = get(itm, 'path');
      let length = get(path, 'length');

      return(itm.get('sbParentId')) || length <
        3 || path.objectAt(length - 2).get('isSelected');
    });
  }),
  canPublish: computed.bool('publishable.length'),
  records: computed('store', function() {
    return this.get('store')
      .peekAll('record')
      .rejectBy(
        'hasSchemaErrors');
  }),
  model: computed('records.@each.recordId', 'records.@each.parentIds',
    function() {
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

      return [{
        label: 'ScienceBase',
        icon: 'globe',
        checkable: false,
        isExpanded: true,
        draggable: false,
        notSelectable: true,
        children: tree,
        hideToggle: true,
        hideCheck: true,
        isRoot: true,
        sbId: this.get('config.rootItemURL')
      }];
    }),

  canLogin: computed('password', 'username', function() {
    return !(this.get('password') && this.get('username'));
  }),

  createNode(rec) {
    return TreeNode.create({
      _record: rec,
      config: this.get('config')
    });
  },

  checkCredentials(login) {
    let username = this.get('username');
    let pw = this.get('password');
    let jossoURL = this.get('config.jossoURL');

    set(this, 'isLoadingCreds', true);

    $.ajax(jossoURL, {
        type: 'POST',
        dataType: 'json',
        context: this,
        headers: login ? {
          "Authorization": "Basic " + btoa(username + ":" + pw)
        } : null
      })
      .then(function(response) {
        set(this, 'isLoadingCreds', false);

        if(response.isLoggedIn) {
          set(this, 'credInfo', response);
        } else {
          set(this, 'credInfo', false);
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
      });
  },

  actions: {
    publish() {
      //this.checkCredentials();
      let selected = this.get('publishable').filter((itm) => {
        return(get(itm, 'path.length') < 3 || !get(itm,
          'parentNode.isSelected'));
      });
      // let rootURI = this.get('config.rootURI');
      // let defaultParent = this.get('config.defaultParent');
      let jossoParam = `?josso=${this.get('credInfo.jossoSessionId')}`;
      //let promises = A();

      this.set('isPublishing', true);

      let promises = selected.map((record) => {
        return record.publish(jossoParam);
      });

      allSettled(promises).then((array) => {
        console.log(array);
        set(this, 'isPublishing', false);

      }, function( /*error*/ ) {
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

        nodeModel.get('children').forEach(function(itm) {
          if(itm.get('notSelectable') && itm.get('isSelected')) {
            set(itm, 'isSelected', false);
            this.actions.selectRecord.call(this, itm);
          }
        }, this);
      }
    },
  }
});
