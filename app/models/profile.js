import DS from 'ember-data';
import { or, alias } from '@ember/object/computed';

// [{
//   "id": "full",
//   "namespace": "org.adiwg.profile",
//   "alternateId": [""],
//   "title": "Full",
//   "description": "Evey supported component",
//   "version": "0.0.0",
//   "components": {
//     "record": {},
//     "contact": {},
//     "dictionary": {}
//   },
//   "nav": {
//     "record": [{
//       "title": "",
//       "target": "",
//       "tip": ""
//     }]
//   }
// }]

export default DS.Model.extend({
  uri: DS.attr('string'),
  alias: DS.attr('string'),
  altDescription: DS.attr('string'),
  config: DS.attr('json'),

  title: or('alias','config.title'),
  identifier: alias('config.identifier'),
  namespace: alias('config.namespace'),
  description: or('altDescription','config.description'),
  version: alias('config.version'),
  components: alias('config.components'),
  nav: alias('config.nav')
});
