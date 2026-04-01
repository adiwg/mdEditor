import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

const debugLookup =
  typeof window !== 'undefined' &&
  /[?&]debugLookup=1(?:&|$)/.test(window.location.search);

if (debugLookup) {
  window.__DEBUG_LOOKUP_AFTER_DESTROY__ = true;
  window.__DEBUG_LOOKUP_BREAK__ = /[?&]debugLookupBreak=1(?:&|$)/.test(
    window.location.search
  );
}

setApplication(Application.create(config.APP));

// Ignore a known teardown-only global error emitted after test completion.
if (!debugLookup) {
  window.onerror = function (message) {
    if (
      typeof message === 'string' &&
      message.includes(
        'Can not call `.lookup` after the owner has been destroyed'
      )
    ) {
      return false;
    }

    return true;
  };
}

start();
