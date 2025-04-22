<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Contributing to mdEditor](#contributing-to-mdeditor)
- [Exploring Ember.js Octane and Native JavaScript](#exploring-emberjs-octane-and-native-javascript)
  - [Ember Octane](#ember-octane)
  - [Native JavaScript](#native-javascript)
  - [Updating Documentation](#updating-documentation)
- [GitHub and Workflows](#github-and-workflows)
  - [Git Workflow: Branching model](#git-workflow-branching-model)
    - [Creating new branches](#creating-new-branches)
    - [Develop, Release, and Master](#develop-release-and-master)
      - [Develop](#develop)
      - [Release](#release)
      - [Master](#master)
    - [Unit Tests](#unit-tests)
    - [Deleting branches](#deleting-branches)
  - [Milestone and Issue Tracking](#milestone-and-issue-tracking)
  - [Commit Messages](#commit-messages)
  - [Semantic Versioning](#semantic-versioning)
- [Coding conventions](#coding-conventions)
  - [User specified default values](#user-specified-default-values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Contributing to mdEditor

The mdEditor project openly welcomes contributions (bug reports, bug fixes, code
enhancements/features, etc.).  This document will outline some guidelines **on**
contributing to the project.

# Exploring Ember.js Octane and Native JavaScript

We encourage contributors to not only upgrade the existing Ember application but also considering leveraging the latest features and best practices introduced in newer versions, especially Ember Octane and Native JavaScript.

## Ember Octane

[Ember Octane](https://emberjs.com/editions/octane/) is the latest edition of Ember.js, designed to provide a more modern and enjoyable developer experience. It introduces several improvements, including a more explicit and component-centric structure, Glimmer components, and simplified syntax.

When making contributions, please consider the following:

1. **Glimmer Components:** Explore the use of Glimmer components instead of classic components. Glimmer components offer improved performance and a more efficient rendering engine.

2. **Modifiers and Helpers:** Utilize the new Octane-friendly modifiers and helpers for a cleaner and more maintainable codebase.

3. **Angle Bracket Invocation:** Transition to angle bracket component invocation syntax, a key feature of Octane. This syntax improves readability and aligns with modern web component standards.

## Native JavaScript

Ember has been progressively embracing modern JavaScript features and syntax. When making contributions, consider leveraging native JavaScript features introduced in recent Ember versions:

1. **Decorators:** Take advantage of JavaScript decorators for defining computed properties, actions, and other decorators in Ember classes.

2. **Async/Await:** Utilize async/await syntax for cleaner and more readable asynchronous code in your Ember application.

3. **Native Classes:** Explore the use of native JavaScript classes for defining Ember components and services, providing a more idiomatic JavaScript experience.

## Updating Documentation

If you choose to adopt Ember Octane or leverage Native JavaScript features, please update relevant documentation or create new documentation to help fellow contributors and maintainers understand the changes.

Remember that while embracing these new features can bring several benefits, it's essential to consider the impact on existing code and the overall project. Discuss major architectural changes with maintainers and the community to ensure alignment with project goals.

Thank you for contributing to the continuous improvement of our Ember application!


# GitHub and Workflows

Code, tests, documentation, wiki and issue tracking are all managed on GitHub. Make sure you have a [GitHub account](https://github.com/signup/free).

## Git Workflow: Branching model
The mdEditor project uses a workflow based on the *branching model*.

This model distinguishes four types of branches:

**master** – main branch: only fully stable, working releases. **Exception**: releases in the 0.0.x series are subject to breaking changes and **should not** be considered stable.

**release** – branch serving as a testing space before releases

**develop** – this is the place where all development happens

**feature/fix/hotfix-branches** – a single branch which can be created by any developer, which is responsible for new features, fixes or reported bugs. Every feature branch name should start with the proper prefix *and* be named after the corresponding issue with the appropriate label. Branch names should follow the following format: `{prefix}-{issue number}-{descriptive-name}`. The `{descriptive-name}` doesn't need to match the issue name exactly(keep it short), but I should convey the purpose of the branch.

Examples:

 - release: release-v0.9.1
 - feature: feature-11-contact-component
 - fix: fix-12-new-contact-action
 - docs: docs-15-update-readme
 - hotfix: hotfix-13-fatal-crash

### Creating new branches

New branches ***must*** be created from *develop*. Branches may be created either by forking, or in the main repo (if you have permissions). Forking is recommended, especially for minor or experimental features. Core feature branches may be created in the main repo to ease collaboration. **NOTE**: An exception is made for ***critical*** hotfix branches - they may be diverged from master, but must be merged into both master *and* develop.

### Develop, Release, and Master

#### Develop
Branch on which the main development happens. New feature/fix branches must be created from *develop*. Feature branch pull requests must be made against *develop*. It is recommended to rebase the feature branch to clean/fix/squash unnecessary commits prior to any pull request. Merge conflicts must be resolved by the branch owner (or person issuing pull request).

#### Release
Branches used for testing before releasing. Release branches are diverged from the develop branch. Release branches constitute a "feature-freeze". Any bugs may be fixed via pull request using fix branches created from the newest release branch. However, changes must be synced back to develop.

#### Master
The main branch that contains only fully stable, already released iterations of project. Accepts merges from the latest release branch only. Every merge to master must be properly tagged.

### Unit Tests
Branches must include tests for new functionality and pass(or update) existing tests before Pull Requests will be accepted.

### Deleting branches
Branches merged into master or develop will be deleted from the main repository. An exception is made to maintain branches for the last version of major releases so that bug fixes may be applied. ["Stale"](https://help.github.com/articles/viewing-branches-in-your-repository/) branches will be reviewed after minor releases and deleted if no longer relevant.

## Milestone and Issue Tracking
GitHub is used for issue tracking. Accepted "bug" or "enhancement" issues must be assigned an appropriate milestone and tag[`fix|hotfix|feature`]. Semantic versioning is used for Milestones and corresponding Release Tags.

Issues should be closed by a feature branch via a [commit message](https://help.github.com/articles/closing-issues-via-commit-messages/) or [pull request](https://github.com/blog/1506-closing-issues-via-pull-requests).

The goal is to generate changelogs from closed issues related to a milestone.

## Commit Messages
See [this post from chris.beams.io](http://chris.beams.io/posts/git-commit). Summarized below:

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```
## Semantic Versioning

Releases follow rules outlined by [http://semver.org/](http://semver.org/)


# Coding conventions

TBD - work in progress, see [#11](https://github.com/adiwg/mdEditor/issues/11). Should follow [Ember.js JavaScript Style Guide](https://github.com/emberjs/ember.js/blob/master/STYLEGUIDE.md) at a minimum.


## User specified default values
User supplied default URLs will generally be entered without trailing slashes. Code that makes use of user defined settings should assume that any values entered by a user, do not contain trailing slashes. Path separators must be provided by the code.

Yes:
```
User-setting: https://api.sciencebase.gov/sbmd-service

Code:
   VAR1 = User-setting + "/mdjson"
```

No:
```
User-setting: https://api.sciencebase.gov/sbmd-service/

Code:
   VAR1 = User-setting + "mdjson"
```
