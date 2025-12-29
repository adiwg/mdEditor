'use strict';

module.exports = function (environment) {
  let deployTarget = process.env.DEPLOY_TARGET;
  let ENV = {
    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'",
    },
    modulePrefix: 'mdeditor',
    podModulePrefix: 'mdeditor/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    thesauriManifestUrl:
      'https://cdn.jsdelivr.net/gh/adiwg/mdKeywords@master/resources/manifest.json',
    profilesManifestUrl:
      'https://cdn.jsdelivr.net/gh/adiwg/mdProfiles@master/resources/manifest.json',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    'ember-local-storage': {
      fileExport: true,
      loadInitializer: false,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      repository: 'https://github.com/adiwg/mdEditor',
      defaultProfileId: 'org.adiwg.profile.full',
    },
    'ember-load': {
      loadingIndicatorClass: 'md-load-indicator',
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
    'ember-intl': {
      locales: ['en-us'],
      baseLocale: 'en-us',
      publicOnly: true,
      fallbackLocale: 'en-us',
      autoPolyfill: true,
    },
    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 1500,
      preventDuplicates: true,
      //sticky: true
    },
    // Modern date picker configuration (jQuery-free)
    datePicker: {
      // Force implementation: 'modern' | 'legacy' | 'auto'
      implementation: 'modern', // Default to modern since legacy is removed
      // Default options for Flatpickr
      defaultOptions: {
        enableTime: true,
        time_24hr: true,
        allowInput: true,
        altInput: true,
      },
    },
  };

  console.log('environment', environment);

  if (environment === 'development') {
    ENV.keycloakConfig = {
      realm: 'ScienceBase-B',
      clientId: 'catalog',
      url: 'https://www.sciencebase.gov/auth',
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'history';

    ENV['ember-local-storage'] = {
      namespace: 'test',
      loadInitializer: false,
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.rootURL = '/';
    ENV.locationType = 'history';
  }

  if (environment === 'production') {
    ENV.locationType = 'history';
    ENV.keycloakConfig = {
      realm: 'ScienceBase',
      clientId: 'catalog',
      url: 'https://www.sciencebase.gov/auth',
    };
  }

  if (deployTarget === 'dev') {
    ENV.rootURL = '/';
    ENV.locationType = 'history';
  }
  return ENV;
};
