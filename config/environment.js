'use strict';

module.exports = function(environment) {
  var ENV = {
    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'"
    },
    modulePrefix: 'mdeditor',
    podModulePrefix: 'mdeditor/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      repository: 'https://github.com/adiwg/mdEditor'
    },
    'ember-load': {
      loadingIndicatorClass: 'md-load-indicator'
    },
    'ember-local-storage': {
      fileExport: true
    },
    'ember-toggle': {
      includedThemes: [],
      //excludedThemes: ['flip'],
      defaultShowLabels: true, // defaults to false
      defaultTheme: 'light', // defaults to 'default'
      //defaultSize: 'small', // defaults to 'medium'
      defaultOffLabel: 'False', // defaults to 'Off'
      defaultOnLabel: 'True' // defaults to 'On'
    },
    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 1500,
      //sticky: true
    },
    'ember-cli-bootstrap-datetimepicker': {
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-angle-double-left',
        next: 'fa fa-angle-double-right',
        close: 'fa fa-times',
        clear: 'fa fa-trash',
        today: 'fa fa-home'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.rootURL = '/mdEditor';
    ENV.locationType = 'hash';
  }

  if (environment === 'beta') {
    ENV.locationType = 'hash';
  }

  if (environment === 'production') {
    //ENV.rootURL = '/mdEditor';
    ENV.locationType = 'hash';
  }

  return ENV;
};
