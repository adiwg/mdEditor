'use strict';

const API_HOST = process.env.API_HOST || '';

module.exports = function (environment) {
  let policy = {
    // Deny everything by default
    'default-src': ["'none'"],
    'script-src': ["'self'"],
    'frame-src': ["'self'"],
    'font-src': ["'self'", 'https:'],
    'connect-src': ["'self'", 'https:', 'ws:', 'wss:'],
    'img-src': ["'self'", 'data:'],
    'style-src': ["'self'", 'https:'],
    'media-src': ["'self'"],
    'manifest-src': ["'self'"],
    'style-src-attr': ["'self'"],
  };

  // Unsafe policy is necessary in development and test environments, but should
  // not be used in production.
  if (environment === 'development') {
    policy['script-src'].push("'unsafe-eval'");
    policy['style-src'].push("'unsafe-inline'");
    policy['style-src-attr'].push("'unsafe-inline'");
    policy['img-src'].push('https:', 'http:', 'blob:');
    policy['font-src'].push("'unsafe-inline'");
    if (API_HOST) policy['connect-src'].push(API_HOST);
    // Local CouchDB (docker-compose.couchdb.yml) for testing services/couch.js's
    // Pouch <-> Couch sync - plain http, so not covered by the broad `https:`
    // entry above.
    policy['connect-src'].push('http://localhost:5984');
  }

  //enable csp meta tag only in dev env
  return {
    delivery: ['meta'],
    enabled: environment === 'development',
    policy,
    reportOnly: false,
  };
};
