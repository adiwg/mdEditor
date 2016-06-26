import Ember from 'ember';

export default Ember.Component.extend({
  
  /**
   * mdEditor class for input and edit of mdJSON 'onlineResource' object 
   * arrays. 
   * The class manages the maintenance of an array of online resource 
   * objects using the md-object-table class. 
   *
   * @class md-online-resource-array
   * @constructor
   */
  
  /**
   * mdJSON 'contact' object containing the 'onlineResource' array.
   * 
   * @property model
   * @type Object
   * @required
   */
  
  /**
   * Name of the mdJSON 'onlineResource' array in the 'contact' object. 
   * The property is used to compute items2 which is passed to 
   * md-object-table for configuration. 
   * 
   * @property propertyArrayName
   * @type String
   * @default 'onlineResource'
   */
  propertyArrayName: 'onlineResource',
  
  /**
   * List of mdJSON 'onlineResource' object attributes to display in  
   * md-object-table to aid in choosing the onlineResource to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   * 
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes: 'name, uri',
  
  /**
   * Name to place on the mdEditor panel header for entry and edit of 
   * 'onlineResource' objects. 
   * The property is passed to md-object-table for configuration.
   * 
   * @property label
   * @type String
   * @default 'Online Resource'
   */
  label: 'Online Resource',
  
  items2: Ember.computed('model', function() {
    if (this.get('model.' + this.get('propertyArrayName')) === undefined) {
      this.set('model.' + this.get('propertyArrayName'), []);
    }
    return this.get('model.' + this.get('propertyArrayName'));
  })
});
