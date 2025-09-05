// Shim for @ember/string to provide backward compatibility with ember-tether
(function() {
  if (typeof window !== 'undefined' && window.define) {
    window.define('@ember/string', ['@ember/template'], function(template) {
      return {
        htmlSafe: template.htmlSafe,
        isHTMLSafe: template.isHTMLSafe,
        default: {
          htmlSafe: template.htmlSafe,
          isHTMLSafe: template.isHTMLSafe
        }
      };
    });
  }
})();
