import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank, typeOf } from '@ember/utils';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Table from '../md-object-table/component';

export default class MdObjectrouteTable extends Table {
  /**
   * The route used to edit items
   *
   * @property itemRoute
   * @type {String}
   * @required
   */

  /**
   * Comma separated string of addtional route parameters
   *
   * @property routeParams
   * @type {String}
   * @default undefined
   */

  /**
   * Indicates whether to show alert if no items are present
   *
   * @property alertIfEmpty
   * @type {Boolean}
   * @default "true"
   */
  alertIfEmpty = true;

  /**
   * Indicates whether to immediately navigate to the edit route on add
   *
   * @property editOnAdd
   * @type {Boolean}
   * @default "true"
   */
  editOnAdd = true;

  editBtnText = 'More...';
  layoutName = 'components/object/md-object-table';

  /**
   * Method used to load form for editing item. Should be overidden.
   *
   * @method editItemHandler
   */
  editItemHandler() {
    return this;
  }

  @action
  addItem() {
    const Template = this.templateClass;
    const owner = getOwner(this);

    let editItem = this.editItemHandler;
    let items = this.items;
    let itm =
      typeOf(Template) === 'class'
        ? Template.create(owner.ownerInjection())
        : EmberObject.create({});

    if (isBlank(editItem)) {
      assert(`You must supply an editItem method to ${this.toString()}.`);
    }

    items.pushObject(itm);

    if (this.editOnAdd) {
      editItem(
        items.indexOf(itm),
        this.routeParams,
        `${this.scrollToId}-${this.items.length - 1}`
      );
    }
  }

  @action
  editItem(items, index, scrollTo) {
    this.editItemHandler(index, this.routeParams, scrollTo);
  }
}
