/**
 * Ember CLI Deprecation Workflow Configuration
 *
 * This file manages how deprecation warnings are handled during the Ember upgrade process.
 *
 * To populate this file with current deprecations:
 * 1. Run: ember serve
 * 2. Visit the app in your browser
 * 3. Open console and copy the deprecation workflow command
 * 4. Run it to update this file
 *
 * Or manually add deprecations as they're encountered.
 */

// eslint-disable-next-line no-undef
self.deprecationWorkflow = self.deprecationWorkflow || {};
// eslint-disable-next-line no-undef
self.deprecationWorkflow.config = {
  // Set to 'throw' to fail tests on deprecations
  // Set to 'log' to log deprecations
  // Set to 'silence' to suppress deprecations
  workflow: [
    // Ember 3.16 Deprecations
    { handler: "log", matchId: "globals-resolver" },

    // Add additional deprecations as they're identified during the upgrade process
  ]
};
