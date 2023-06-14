/* eslint-env node */
'use strict';

const pkg = require('../package.json');
const semver = require('semver');
const getChannelURL = require('ember-source-channel-url');

module.exports = function () {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary'),
  ]).then((urls) => {
    return {
      /*
        `command` - a single command that, if set, will be the default command used by `ember-try`.
        P.S. The command doesn't need to be an `ember <something>` command, they can be anything.
        Keep in mind that this config file is JavaScript, so you can code in here to determine the command.
      */
      command: semver.lt(semver.coerce(pkg.version), '1.0.0')
        ? 'ember test'
        : 'ember test',
      /*
        If set to true, the `versionCompatibility` key under `ember-addon` in `package.json` will be used to
        automatically generate scenarios that will deep merge with any in this configuration file.
      */
      useVersionCompatibility: false,
      /*
        If set to true, all npm scenarios will use `yarn` for install with the `--no-lockfile` option. At cleanup, your
        dependencies will be restored to their prior state.
      */
      useYarn: true,
      scenarios: [
        // {
        //   name: 'ember-lts-2.18',
        //   env: {
        //     EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })
        //   },
        //   npm: {
        //     devDependencies: {
        //       '@ember/jquery': '^0.5.1',
        //       'ember-source': '~2.18.0'
        //     }
        //   }
        // },
        // {
        //   name: 'ember-lts-3.4',
        //   npm: {
        //     devDependencies: {
        //       'ember-source': '~3.4.0'
        //     }
        //   }
        // },
        // The default `.travis.yml` runs this scenario via `npm test`,
        // not via `ember try`. It's still included here so that running
        // `ember try:each` manually or from a customized CI config will run it
        // along with all the other scenarios.
        {
          name: 'ember-default',
          npm: {
            devDependencies: {},
          },
        },
        // {
        //   name: 'ember-default-with-jquery',
        //   env: {
        //     EMBER_OPTIONAL_FEATURES: JSON.stringify({
        //       'jquery-integration': true
        //     })
        //   },
        //   npm: {
        //     devDependencies: {
        //       '@ember/jquery': '^0.5.1'
        //     }
        //   }
        // }
        {
          name: 'ember-release',
          allowedToFail: true,
          npm: {
            devDependencies: {
              'ember-source': urls[0],
            },
          },
        },
        {
          name: 'ember-beta',
          command: 'ember test --silent',
          allowedToFail: true,
          npm: {
            devDependencies: {
              'ember-source': urls[1],
            },
          },
        },
        {
          name: 'ember-canary',
          command: 'ember test --silent',
          allowedToFail: true,
          npm: {
            devDependencies: {
              'ember-source': urls[2],
            },
          },
        },
      ],
    };
  });
};
