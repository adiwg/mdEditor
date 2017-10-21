import Ember from 'ember';
import layout from '../templates/components/sb-publisher';
import TreeNode from  '../utils/sb-tree-node';

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
  config: computed('publishService', function () {
    return this.get('publishService.catalogs')
      .findBy('name', 'ScienceBase');
  }),
  selected: A(),
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
        let children = this.addChildren(node);

        if(children) {
          children.forEach(itm => this.addChildren(itm));
        }

        return node;
      });

      return [{
        label: 'ScienceBase',
        icon: 'globe',
        checkable: false,
        isExpanded: true,
        draggable: false,
        children: tree,
        hideToggle: true,
        hideCheck: true,
        isRoot: true
      }];
    }),

  canLogin: computed('password', 'username', function () {
    return !(this.get('password') && this.get('username'));
  }),

  addChildren(record) {
    let records = this.get('records');
    let children = records.filter((itm) => {
        let parentIds = itm.get('parentIds');

        if(!parentIds) {
          return false;
        }

        return parentIds.findBy('identifier', get(record, 'id'));
      })
      .map(this.createNode);

    set(record, 'children', children);

    return children;
  },

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
        } : {}
      })
      .then(function (response) {
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
      let selected = this.get('selected');
      let rootURI = this.get('config.rootURI');
      let jossoParam = `?josso=${this.get('credInfo.jossoSessionId')}`;

      if(selected.length) {
        let record = selected.objectAt(0);
        let url = record.type === 'project' ? rootURI + 'project' : rootURI +
          'product';

        let data = {
          data: {
            parentid: '59d66bf9e4b05fe04cc6af41',
            mdjson: record.get('_record.formatted'),
            type: 'records'
          }
        };

        set(record, 'isLoading', true);

        $.ajax(url + jossoParam, {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            context: this
          })
          .then(function (response) {
            set(record, 'isLoading', false);

            if(response.id) {
              //TODO: add sbID to record
              record.addSbId(response.id);
              set(this, 'result', response);

            } else {
              set(this, 'errors', response.error);
              get(this, 'flashMessages')
                .danger('Publishing error!');
            }
          }, (response) => {
            let error =
              `Error Publishing:
            ${response.status}: ${response.statusText}`;

            set(this, 'xhrError', error);
            get(this, 'flashMessages')
              .danger(error);
          });
      }
    },

    login() {
      this.checkCredentials(true);
    },

    selectRecord(node /*, path*/ ) {
      let selected = this.get('selected');
      let target = selected.findBy('id', node.uuid);

      if(node.isSelected && target === undefined) {
        selected.pushObject(node);
      } else {
        selected.removeObject(target);
      }
    },
  }
});
