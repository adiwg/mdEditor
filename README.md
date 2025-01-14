# MdEditor
![](mdeditor.png)

Web application for writing metadata. Built using [ember.js](http://emberjs.com/). Go to https://www.mdeditor.org/ to use the application.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Prerequisites (for development)](#prerequisites-for-development)
- [Installation](#installation)
- [Contributing](#contributing)
  - [Branching](#branching)
  - [Building ToC](#building-toc)
- [Running / Development](#running--development)
  - [Building Application for Production](#building-application-for-production)
  - [Running Tests](#running-tests)
  - [Deploying](#deploying)
- [Further Reading / Useful Links](#further-reading--useful-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prerequisites (for development)

You will need the following things properly installed on your computer.

- [Git][git]
- [Node.js][node]
  - Supported versions: `v18`.
  - **Apple Silicon Users**:  if you experience problems building or running try Node v14.
  - We are now using Yarn V4. Here are the steps in setting it up.
    - Make sure that you have Node Version 18 doesn't matter the minor semantic changes.
    - Enable corepack by using the `corepack enable` command.
    - Remove `node_modules` folder
    - Run `yarn` to install packages again using Yarn V4.
    - All other commands are the same.
- [Yarn][yarn] installed globally
- [Google Chrome][chrome]
- [Firefox][firefox]


## Installation

* `git clone https://github.com/adiwg/mdEditor.git` this repository
* `cd mdEditor` change into the new directory
* `yarn install`

List of available project commands.  `yarn run <command-name>`

| Command | Description |
| ------- | ----------- |
| build:development | Builds the application in development mode. |
| build | Builds the application for production. |
| lint | Runs all lint commands. |
| lint:hbs | Lints `hbs` template files. |
| lint:js | Lints `js` files. |
| lint:sass | Lints `scss` files. |
| format | Runs all auto-formatters. |
| format:js | Auto-formats `js` files using Prettier. |
| format:sass | Auto-formats `scss` files using Prettier. |
| start | Runs the dummy app local server. |
| test | Runs all tests in random order, with coverage reporting. |
| doc:toc | Automatically generates a table of contents for this README file. |

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for info on making contributions.

Also, see the [wiki](https://github.com/adiwg/mdEditor/wiki) for more info about the project.

### Branching

### Building ToC

To autogenerate a ToC (table of contents) for this README,
run `yarn doc:toc`.  Please update the ToC whenever editing the structure
of README.

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Building Application for Production

To build this UI for production, run the following commads from this folder:

```bash
yarn install
yarn build
```

### Running Tests

- `npm test` runs full tests in random order with coverage
- `ember test --server`

Keep in mind that tests are executed in random order.  This is intentional
and helps to prevent hard-to-debug order dependencies among tests.

Please also note that we report test coverage.  We strive for "the right amount
of testing".  Use test coverage as a guide to help you identify untested
high-value code.

We rely on `ember-a11y-testing` to validate accessibility in acceptance tests.
If you write acceptance tests, please ensure at least one validation per
route using `await a11yAudit();`.

### Deploying

By default, this will deploy to GitHub pages:

 `ember deploy staging`

 Note that the `gh-pages` branch must exist in the git repository. See [ember-cli-deploy-git](https://github.com/ef4/ember-cli-deploy-git#usage) for details.
 Visit https://<GitHub Username>.github.io/mdEditor

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
