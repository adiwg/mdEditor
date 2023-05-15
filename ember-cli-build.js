'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    hinting: false,
    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets',
        'node_modules/bootstrap-3-card/sass',
        // 'node_modules/select2/src/scss',
        // 'node_modules/select2-bootstrap-theme/src',
        'node_modules/jquery-jsonview/src'
      ]
    },
    'ember-cli-terser': {
      enabled: true,

      exclude: ['vendor.js'],

      terser: {
        compress: {
          sequences: 50,
        },
        output: {
          semicolons: true,
        },
      },

      // Tell broccoli-terser-sourcemap to not add sourcemap URLs
      hiddenSourceMap: true,
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
    },

    autoImport: {
      webpack: {
        node: {
          http: true,
          //https: true
        }
      }
    },

    'ember-models-table': {
      includeDefaultCss: true
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
  app.import(
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js'
  );
  app.import(
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js');
  app.import(
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js');
  app.import(
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js');
  app.import(
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js'
  );
  //jquery-jsonview
  app.import('node_modules/jquery-jsonview/dist/jquery.jsonview.js');
  //papaparse for worker
  app.import('node_modules/papaparse/papaparse.js', { outputFile: 'assets/workers/worker_papaparse.js' });
  //marked
  app.import('node_modules/marked/marked.min.js');

  return app.toTree();
};
