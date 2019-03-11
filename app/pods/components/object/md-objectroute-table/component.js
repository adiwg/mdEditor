import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank, typeOf } from '@ember/utils';
import { assert } from '@ember/debug';
import Table from '../md-object-table/component';

export default Table.extend({
  /**
   * The route used to edit items
   *
   * @property itemRoute
   * @type {String}
   * @required
   */

  alertIfEmpty: true,

  /**
  * Indicates whether to immediately navigate to the edit route on add
  *
  * @property editOnAdd
  * @type {Boolean}
  * @default "true"
  */
  editOnAdd: true,

  /**
   * Method used to load form for editing item. Should be overidden.
   *
   * @method editItem
   */
  editItem() {
    return this;
  },

  editBtnText: 'More...',
  layoutName: 'components/object/md-object-table',

  actions: {
    addItem: function () {
      const Template = this.templateClass;
      const owner = getOwner(this);

      let editItem = this.editItem;
      let items = this.items;
      let itm = typeOf(Template) === 'class' ? Template.create(owner.ownerInjection()) :
        EmberObject.create({});

      if(isBlank(editItem)) {
        assert(
          `You must supply an editItem method to ${this.toString()}.`
        );
      }

      items.pushObject(itm);

      if(this.editOnAdd) {
        editItem(items.indexOf(itm));
      }
    },

    editItem: function (items, index) {
      this.editItem(index);
    }
  }
});
