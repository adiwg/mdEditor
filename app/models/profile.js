import DS from 'ember-data';
import { or, alias } from '@ember/object/computed';

// [{
//   "uuid": "",
//   "title": "",
//   "description": "",
//   "version": "",
//   "components": {
//     "record": {},
//     "contact": {},
//     "dictionary": {}
//   },
//   "nav": [{
//     "title": "",
//     "target": "",
//     "tip": ""
//   }]
// }]

export default DS.Model.extend({
  uri: DS.attr('string'),
  alias: DS.attr('string'),
  config: DS.attr('json'),

  title: or('alias','config.title')
});
