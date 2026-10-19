"use strict";

// ember-cli-app-version was removed earlier in the Ember 5.x migration
// spike (its initializer wouldn't resolve under the newer build) and
// nothing replaced it, leaving config.APP.version undefined everywhere
// it's read (services/settings.js's lastVersion comparison,
// control/md-repo-link's displayed version). Undefined never persists as
// a comparable value once round-tripped through a save, so
// settings.js's `lastVersion !== version` check was true on every single
// boot forever - the Update Alert splash could never actually be
// dismissed for good. Reading package.json's version directly is the
// simplest stable replacement; this file runs in Node at build time, so
// require() works fine here.
var appVersion = require("../package.json").version;

module.exports = function (environment) {
  var deployTarget = process.env.DEPLOY_TARGET;
  var ENV = {
    contentSecurityPolicy: {
      "style-src": "'self' 'unsafe-inline'",
    },
    modulePrefix: "mdeditor",
    podModulePrefix: "mdeditor/pods",
    environment: environment,
    rootURL: '/',
    // 'auto' is deprecated (Ember 4.x, removed in 5.0) - every other
    // environment below already overrides to 'history', so this just makes
    // the local dev-server default consistent with test/staging/production
    // for no behavior change (per the deprecation's own guidance).
    locationType: 'history',
    thesauriManifestUrl: 'https://cdn.jsdelivr.net/gh/adiwg/mdKeywords@master/resources/manifest.json',
    profilesManifestUrl: 'https://cdn.jsdelivr.net/gh/adiwg/mdProfiles@master/resources/manifest.json',
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
    "ember-local-storage": {
      fileExport: true,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      repository: "https://github.com/adiwg/mdEditor",
      defaultProfileId: "org.adiwg.profile.full",
      version: appVersion,
    },
    "ember-load": {
      loadingIndicatorClass: "md-load-indicator",
    },

    "ember-toggle": {
      includedThemes: [],
      //excludedThemes: ['flip'],
      // defaultShowLabels: true, // defaults to false
      defaultTheme: "light", // defaults to 'default'
      //defaultSize: 'small', // defaults to 'medium'
      // defaultOffLabel: 'False', // defaults to 'Off'
      // defaultOnLabel: 'True' // defaults to 'On'
    },
    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 1500,
      preventDuplicates: true,
      //sticky: true
      // ember-cli-flash's automatic `application.inject(factory, 'flashMessages', ...)`
      // has been a no-op since Ember 4.0 (owner.inject no longer injects into resolved
      // instances) - it was only producing 4 deprecation warnings per page load and
      // masking routes/controllers that never declared `@service flashMessages`
      // explicitly. Disable it; inject the service explicitly everywhere it's used.
      injectionFactories: [],
    },
    resizeServiceDefaults: {
      debounceTimeout: 200,
      heightSensitive: true,
      widthSensitive: true,
      // Same dead application.inject() situation as flashMessageDefaults above.
      // Every current consumer (md-nav-secondary, leaflet-table) already injects
      // `@service('resize') resizeService` explicitly.
      injectionFactories: [],
    },
    "ember-cli-bootstrap-datetimepicker": {
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-angle-double-left",
        next: "fa fa-angle-double-right",
        close: "fa fa-times",
        clear: "fa fa-trash",
        today: "fa fa-home",
      },
    },
  };

  console.log("environment", environment);

  if (environment === "development") {
    ENV.keycloakConfig = {
      realm: "ScienceBase-B",
      clientId: "catalog",
      url: "https://www.sciencebase.gov/auth",
    };
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.rootURL = "/";
    ENV.locationType = "history";

    ENV["ember-local-storage"] = {
      namespace: "test",
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "staging") {
    ENV.rootURL = "/";
    ENV.locationType = "history";
  }

  if (environment === "production") {
    ENV.locationType = "history";
    ENV.keycloakConfig = {
      realm: "ScienceBase",
      clientId: "catalog",
      url: "https://www.sciencebase.gov/auth",
    };
  }

  if (deployTarget === "dev") {
    ENV.rootURL = "/";
    ENV.locationType = "history";
  }
  return ENV;
};
