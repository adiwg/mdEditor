mdEditor
========

[![Build Status](https://travis-ci.org/adiwg/mdEditor.svg?branch=develop)](https://travis-ci.org/adiwg/mdEditor)

![mdEditor Logo](https://www.mdeditor.org/img/mdEditor_logo.png)

Web application for writing metadata. Built using [ember.js](http://emberjs.com/). Go to https://www.mdeditor.org/ to use the application.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for info on making contributions.

Also, see the [wiki](https://github.com/adiwg/mdEditor/wiki) for more info about the project.

## Prerequisites (for development)

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/adiwg/mdEditor.git` this repository
* `cd mdEditor` change into the new directory
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

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
