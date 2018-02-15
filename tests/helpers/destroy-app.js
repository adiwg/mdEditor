import Ember from 'ember';

export default function destroyApp(application) {
  var store = application.__container__.lookup('service:store');

  if(store) {
    Ember.run(function() {
      store.unloadAll();
      application.destroy();
    });
  } else {
    Ember.run(application, 'destroy');
  }
}
