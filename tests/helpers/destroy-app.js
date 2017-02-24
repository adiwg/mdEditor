import Ember from 'ember';

export default function destroyApp(application) {
var store = application.__container__.lookup('service:store');
  if(store) {store.unloadAll();}

  Ember.run(application, 'destroy');
}
