import { run } from '@ember/runloop';

export default function destroyApp(application) {
  var store = application.__container__.lookup('service:store');

  if(store) {
    run(function() {
      store.unloadAll();
      application.destroy();
    });
  } else {
    run(application, 'destroy');
  }
}
