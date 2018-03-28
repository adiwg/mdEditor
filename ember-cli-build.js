/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets',
        'bower_components/bootstrap-3-card/sass',
        // 'bower_components/select2/src/scss',
        // 'bower_components/select2-bootstrap-theme/src',
        'bower_components/jquery-jsonview/src'
      ]
    },
    'ember-math-helpers': {
      only: ['round']
    },
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
        'images/spritesheet-2x.png',
        'images/spritesheet.png',
        'worker'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  //bootstrap js
  app.import(app.bowerDirectory +
    '/bootstrap-sass/assets/javascripts/bootstrap/transition.js');
  app.import(app.bowerDirectory +
    '/bootstrap-sass/assets/javascripts/bootstrap/collapse.js');
  // app.import(app.bowerDirectory +
  //   '/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js');
  app.import(app.bowerDirectory +
    '/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js');
  app.import(app.bowerDirectory +
    '/bootstrap-sass/assets/javascripts/bootstrap/tab.js');
  app.import(app.bowerDirectory +
    '/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js');

  //select2
  // app.import(app.bowerDirectory +
  //   '/select2/dist/js/select2.js');

  //jquery-jsonview
  app.import(app.bowerDirectory +
    '/jquery-jsonview/dist/jquery.jsonview.js');

  //papaparse for worker
  app.import('node_modules/papaparse/papaparse.js',{outputFile:'assets/workers/worker_papaparse.js'});

  return app.toTree();
};
