# Contributing to mdEditor

The mdEditor project openly welcomes contributions (bug reports, bug fixes, code
enhancements/features, etc.).  This document will outline some guidelines on
contributing to the project.

## Style Guide rules

TBD - work in progress, see [#11](https://github.com/adiwg/mdEditor/issues/11). Should follow [Ember.js JavaScript Style Guide](https://github.com/emberjs/ember.js/blob/master/STYLEGUIDE.md) at a minimum.

## GitHub

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
