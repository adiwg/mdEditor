'use strict';

module.exports = function(environment) {
  var deployTarget = process.env.DEPLOY_TARGET;
  var ENV = {
    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'"
    },
    hinting: false,
    modulePrefix: 'mdeditor',
    podModulePrefix: 'mdeditor/pods',
    environment: environment,
    rootURL: '/',
    vocabulariesUrl: 'https://cdn.jsdelivr.net/gh/adiwg/mdKeywords@master/resources/vocabularies.json',
    locationType: 'auto',
    profilesListUrl: 'https://s3.amazonaws.com/sit-cdn.xentity/mdeditor/profilesList.json',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    'ember-local-storage': {
      fileExport: true
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      repository: 'https://github.com/adiwg/mdEditor',
      defaultProfileId: 'org.adiwg.profile.full'
    },
    'ember-load': {
      loadingIndicatorClass: 'md-load-indicator'
    },

    'ember-toggle': {
      includedThemes: [],
      //excludedThemes: ['flip'],
      // defaultShowLabels: true, // defaults to false
      defaultTheme: 'light', // defaults to 'default'
      //defaultSize: 'small', // defaults to 'medium'
      // defaultOffLabel: 'False', // defaults to 'Off'
      // defaultOnLabel: 'True' // defaults to 'On'
    },
    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 1500,
      preventDuplicates: true
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

    ENV['ember-local-storage'] = {
      namespace: 'test'
    }

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.rootURL = '/';
    ENV.locationType = 'hash';
  }

  if (environment === 'production') {
    //ENV.rootURL = '/mdEditor';
    ENV.locationType = 'hash';
  }

  if (deployTarget === 'dev') {
    ENV.rootURL = '/';
    ENV.locationType = 'hash';
  }
  return ENV;
};
