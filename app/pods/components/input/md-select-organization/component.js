import Ember from 'ember';
import Select from '../md-codelist-multi/component';

export default Select.extend({
  classNames: ['md-select-organization'],
  //layoutName: 'components/input/md-select',
  /**
   * Specialized select list control for displaying and selecting
   * organizations.
   *
   * @class md-select-organization
   * @module mdeditor
   * @submodule components-input
   * @constructor
   * @extends md-select
   */
  contacts: Ember.inject.service(),
  mdCodes: Ember.computed('contacts.organizations.[]', function() {
    return Ember.Object.create({
      organizations: Ember.Object.create({
        codelist: this.get('contacts').get('organizations')
      })
    });
  }),
  valuePath: 'json.contactId',
  namePath: 'json.name'
});
