import config from '../config/environment';

/**
 * Temporary test-only lookup debug hook.
 *
 * Enable by adding `debugLookup=1` to the test runner URL.
 * Optional: add `debugLookupBreak=1` to trigger a debugger break.
 */
export function initialize(appInstance) {
  if (config.environment !== 'test') {
    return;
  }

  if (typeof window === 'undefined' || !window.__DEBUG_LOOKUP_AFTER_DESTROY__) {
    return;
  }

  const container = appInstance?.__container__;
  const proto = container && Object.getPrototypeOf(container);

  if (
    !proto ||
    typeof proto.lookup !== 'function' ||
    proto.__lookupDebugPatched
  ) {
    return;
  }

  const originalLookup = proto.lookup;

  proto.lookup = function (...args) {
    if (this.isDestroyed || this.isDestroying) {
      const fullName = args[0];
      const stack = new Error('[POST_DESTROY_LOOKUP]').stack;

      // eslint-disable-next-line no-console
      console.warn('[POST_DESTROY_LOOKUP]', fullName, stack);

      // eslint-disable-next-line no-debugger
      if (window.__DEBUG_LOOKUP_BREAK__) debugger;
    }

    return originalLookup.apply(this, args);
  };

  proto.__lookupDebugPatched = true;
}

export default {
  initialize,
};
