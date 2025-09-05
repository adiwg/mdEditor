import { htmlSafe, isHTMLSafe } from '@ember/template';

export function initialize(application) {
  // Register a module for @ember/string that provides htmlSafe/isHTMLSafe 
  // This allows older addons like ember-tether to import from the old location
  if (typeof window !== 'undefined' && window.define) {
    window.define('@ember/string', function() {
      return {
        htmlSafe: htmlSafe,
        isHTMLSafe: isHTMLSafe,
        default: {
          htmlSafe: htmlSafe,
          isHTMLSafe: isHTMLSafe
        }
      };
    });
  }
}

export default {
  name: 'htmlsafe-polyfill',
  initialize
};
