import Ember from 'ember';
import Table from '../md-object-table/component';

const {
  typeOf,
  getOwner
} = Ember;

export default Table.extend({
  /**
   * The route used to edit items
   *
   * @property itemRoute
   * @type {String}
   * @required
   */

  /**
   * Method used to load form for editing item. Should be overidden.
   *
   * @method editItem
   */
  editItem() {
    return this;
  },

  layoutName: 'components/object/md-object-table',

  actions: {
    addItem: function() {
      const Template = this.get('templateClass');
      const owner = getOwner(this);

      let items = this.get('items');
      let itm = typeOf(Template) === 'class' ? Template.create(owner.ownerInjection()) :
        Ember.Object.create({});

      items.pushObject(itm);
      this.get('editItem')(items.indexOf(itm));
    },

    editItem: function(items, index) {
      this.get('editItem')(index);
    }
  }
});
