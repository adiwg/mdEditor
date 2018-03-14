/* eslint-env node */
const pkg = require('../package.json');
const semver = require('semver');

module.exports = function () {
  return {
    /*
      `command` - a single command that, if set, will be the default command used by `ember-try`.
      P.S. The command doesn't need to be an `ember <something>` command, they can be anything.
      Keep in mind that this config file is JavaScript, so you can code in here to determine the command.
    */
    command: semver.lt(semver.coerce(pkg.version), '1.0.0') ?
      'ember build' : 'ember test',
    /*
      `bowerOptions` - options to be passed to `bower`.
    */
    //bowerOptions: ['--allow-root=true'],
    /*
      `npmOptions` - options to be passed to `npm`.
    */
    //npmOptions: ['--loglevel=silent', '--no-shrinkwrap=true'],
    /*
      If set to true, the `versionCompatibility` key under `ember-addon` in `package.json` will be used to
      automatically generate scenarios that will deep merge with any in this configuration file.
    */
    useVersionCompatibility: false,

    scenarios: [{
        name: "default",
        bower: {
          dependencies: {}
        },
        npm: {
          devDependencies: {
            bower: "^1.8.2"
          }
        }
      },
      {
        name: "ember-release",
        allowedToFail: true,
        bower: {
          dependencies: {
            ember: "release"
          }
        },
        npm: {
          devDependencies: {
            bower: "^1.8.2"
          }
        }
      },
      {
        name: "ember-beta",
        allowedToFail: true,
        bower: {
          dependencies: {
            ember: "beta"
          }
        },
        npm: {
          devDependencies: {
            bower: "^1.8.2"
          }
        }
      },
      {
        name: "ember-canary",
        allowedToFail: true,
        bower: {
          dependencies: {
            ember: "canary"
          }
        },
        npm: {
          devDependencies: {
            bower: "^1.8.2"
          }
        }
      }
    ]
  };
};
