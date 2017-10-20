import Ember from 'ember';
import layout from '../templates/components/sb-publisher';

const {
  computed,
  Component,
  get,
  isEmpty,
  $,
  set,
  Object: EmObject,
  inject: {
    service
  }
} = Ember;

const jossoURL =
  'https://www.sciencebase.gov/catalog/jossoHelper/sessionInfo?includeJossoSessionId=true';

const TreeNode = EmObject.extend({
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
          " ")
        .splice(0, 50)
        .join(" ");
    }),
  sbParentId: computed('_record.parentIds.@each.identifier',
    function () {
      let parentIds = this.get('_record.parentIds');

      if(!parentIds) {
        return false;
      }

      return parentIds.findBy('namespace', 'gov.sciencebase.catalog');
    })
});

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    this.checkCredentials();
  },

  classNames:['sb-publisher'],
  store: service(),
  publishService: service('publish'),
  config: computed('publishService', function() {
    return this.get('publishService.catalogs').findBy('name', 'ScienceBase');
  }),

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

      if(isEmpty(records)){
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
      _record: rec
    });
  },

  checkCredentials(login) {
    let username = this.get('username');
    let pw = this.get('password');
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
      let tree = this.get('model.firstObject.children');
      let rootURI = this.get('config.rootURI');
      let jossoParam = `?josso=${this.get('credInfo.jossoSessionId')}`;

      if(tree.length) {
        let record = tree.objectAt(0);
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

        $.ajax(url+jossoParam, {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            context: this
          })
          .then(function (response) {
            //this.sendAction("select", response);
            //console.info(response);

            set(record, 'isLoading', false);

            if(response.id) {
              //TODO: add sbID to record
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
    }
  }
});
