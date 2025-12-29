export function initialize(appInstance) {
  const intl = appInstance.lookup('service:intl');
  
  // Ensure locale is set before any translations are attempted
  if (!intl._locale) {
    intl.setLocale('en-us');
  }
}

export default {
  name: 'ember-intl-setup',
  initialize
};
