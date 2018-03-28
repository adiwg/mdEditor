import Route from '@ember/routing/route';
import {
  max,
  min,
  equal,
  not,
  gt
} from '@ember/object/computed';
import {
  typeOf,
  isPresent,
  isBlank
} from '@ember/utils';
import EmberObject from '@ember/object';
import uuidV4 from "npm:uuid/v4";

import {
  get,
  getWithDefault,
  set,
  computed
} from '@ember/object';

export default Route.extend({
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set('entity', EmberObject.create({
      entityId: uuidV4(),
      attribute: []
    }));
  },

  /**
   * The template object for columns
   *
   * @property columnObject
   * @type {Ember.Object}
   * @static
   * @readOnly
   */
  columnObject: EmberObject.extend({
    domain: [],
    import: true,
    range: false,
    importName: null,
    importType: null,
    min: min('domain'),
    max: max('domain'),
    domainWarn: gt('domain.length', 50),
    isNumber: equal('dataType', 'number'),
    disableRange: not('isNumber'),
    example: computed('domain', function () {
      return get(this, 'domain').slice(0, 10);
    })
  }),

  /**
   * Returns the dataType code value for the JavaScript type.
   *
   * @method columnType
   * @param {string} type The JavaScript type
   * @return {string}
   */
  columnType(type) {
    return {
      'string': 'character varying',
      'number': 'numeric',
      'boolean': 'boolean',
      'integer': 'integer'
    }[type] || 'unknown';
  },

  createAttribute(columnName, column) {
    let domain = get(column, 'hasDomain') ? EmberObject.create({
      domainId: uuidV4(),
      codeName: columnName,
      domainItem: get(column, 'domain').filter(i => isPresent(i)).map(
        (itm) => {
          return {
            name: itm.toString(),
            value: itm.toString(),
            definition: null
          };
        })
    }) : false;

    let attribute = {
      codeName: column.importName,
      dataType: column.importType,
      allowNull: column.allowNull,
      maxValue: column.get('range') ? column.get('max').toString() : null,
      minValue: column.get('range') ? column.get('min').toString() : null,
      domainId: domain ? get(domain, 'domainId') : null
    };

    return {
      attribute: attribute,
      domain: domain
    };
  },

  generateData() {
    let columns = this.get('controller.columns');
    let domains = [];
    let attributes = [];

    Object.keys(columns).forEach((columnName) => {
      let col = columns[columnName];

      if(!col.import) {
        return;
      }

      let attr = this.createAttribute(columnName, col);

      attributes.pushObject(attr.attribute);

      if(attr.domain) {
        domains.pushObject(attr.domain);
      }

    });

    return {
      attributes: attributes,
      domains: domains
    };
  },

  actions: {
    cancelImport() {
      set(this, 'controller.columns', null);
      set(this, 'controller.processed', false);
    },
    doImport() {
      let data = this.generateData();
      let entity = this.get('controller.entity');
      let dataDictionary = this.get('controller.model.json.dataDictionary');

      if(get(data,'domains.length')) {
        set(dataDictionary,'domain', getWithDefault(dataDictionary,
          'domain', []));

        set(dataDictionary, 'domain', get(dataDictionary, 'domain').concat(data.domains));
      }

      set(dataDictionary,'entity', getWithDefault(dataDictionary, 'entity', []));
      set(entity, 'attribute', data.attributes);
      get(dataDictionary, 'entity').push(entity);

      this.transitionTo('dictionary.show.edit.entity.edit', get(
        dataDictionary, 'entity.length') - 1);

        get(this, 'flashMessages')
          .success('Entity imported from CSV!');
    },
    processData(data) {
      let template = this.get('columnObject');
      let typer = this.get('columnType');

      set(this, 'controller.processed', false);

      set(this, 'controller.columns', data.meta.fields.reduce(function (map,
        obj) {
        let type = typeOf(data.data[0][obj]);

        set(map, obj, template.create({
          dataType: type,
          domain: [],
          importName: obj,
          importType: typer(type)
        }));
        return map;
      }, EmberObject.create({})));
    },
    reduceData(data) {
      let columns = Object.keys(this.get('controller.columns'));

      columns.forEach((columnName) => {
        let path = 'controller.columns.' + columnName + '.domain';
        let existing = get(this, path);

        // if(get(existing,'length' )<= get(this,'maxDomain')){
        let unique = [...new Set(data.map(item => item[columnName]))];

        set(this, path, [...new Set([...existing, ...unique])]);
        // }
      });

    },
    processComplete() {
      let columns = this.get('controller.columns');
      let columnNames = Object.keys(columns);

      columnNames.forEach((columnName) => {
        let col = columns[columnName];

        if(col.importType === 'numeric') {
          let isInteger = col.domain.any(itm => Number.isInteger(itm));

          col.importType = isInteger ? 'integer' : 'numeric';
        }

        col.allowNull = col.domain.any(itm => isBlank(itm));
      });

      set(this, 'controller.processed', true);

    }
  }
});
