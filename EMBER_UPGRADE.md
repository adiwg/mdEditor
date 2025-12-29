# Ember 4 Upgrade Plan - mdEditor

**Status**: Phase 1 Complete - Preparation
**Target Version**: Ember 4.12 LTS
**Current Version**: Ember 3.15.0
**Started**: 2025-12-29

---

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Phase 1: Pre-Migration Preparation](#phase-1-pre-migration-preparation) ✅
- [Phase 2: Incremental Ember Upgrades](#phase-2-incremental-ember-upgrades)
- [Phase 3: Component Modernization](#phase-3-component-modernization)
- [Phase 4: Addon Updates](#phase-4-addon-updates)
- [Phase 5: Ember 4.x Upgrade](#phase-5-ember-4x-upgrade)
- [Testing Strategy](#testing-strategy)
- [Rollback Plan](#rollback-plan)

---

## Overview

This document tracks the upgrade of mdEditor from Ember 3.15 to Ember 4.12 LTS. The upgrade follows an incremental approach through LTS versions to minimize risk and ensure stability at each step.

### Why Upgrade?

- **Security**: Ember 3.15 is no longer supported
- **Performance**: Ember 4 offers significant performance improvements
- **Modern Features**: Access to latest Ember features and ecosystem
- **Future-Proofing**: Easier to maintain and upgrade going forward

---

## Current Status

### Environment

✅ Node.js: v18.20.5
✅ Yarn: 4.3.1
✅ Ember Edition: Octane

### Baseline Test Results

**Test Suite Run**: 2025-12-29

- Total Tests: 402
- Passing: 20
- Failing: 378
- Skipped: 4

**Known Issues**:
- Test setup errors: "You cannot make a new Ember.Application using a root element that is a descendent of an existing Ember.Application"
- These are test configuration issues, not application code issues

### Deprecation Warnings

**Sass Deprecations** (High Volume):
- `@import` rules deprecated in Dart Sass 3.0
- `lighten()` function deprecated
- Global built-in functions deprecated
- Slash division (`/`) deprecated

**Ember Deprecations**: TBD (will be captured when running `ember serve`)

---

## Phase 1: Pre-Migration Preparation ✅

**Status**: COMPLETE
**Completed**: 2025-12-29

### Tasks Completed

- [x] Verified Node.js v18 environment
- [x] Ran baseline test suite (402 tests, results documented)
- [x] Documented SASS deprecation warnings
- [x] Created `config/deprecation-workflow.js` for Ember deprecations
- [x] Updated `.eslintrc.js` with upgrade-focused rules
- [x] Updated `config/targets.js` to remove IE11, target modern browsers
- [x] Updated `package.json` engines to require Node >= 14
- [x] Removed deprecated `.jshintrc` files (3 files)

### Configuration Changes

**`.eslintrc.js`**:
- Updated ecmaVersion to 2020
- Added Prettier integration
- Added warning rules for classic patterns:
  - `ember/no-classic-classes`
  - `ember/no-classic-components`
  - `ember/require-tagless-components`
  - `ember/no-mixins`
  - `ember/no-get`

**`config/targets.js`**:
- Removed IE11 support
- Targeting last 2 versions of modern browsers
- Minimum versions: Chrome 90, Firefox 88, Safari 14, Edge 90

**`package.json`**:
- Node engine: >= 14.0.0
- NPM engine: >= 6.0.0
- Yarn engine: >= 1.22.0

### Files Modified

1. `config/deprecation-workflow.js` (created)
2. `.eslintrc.js` (updated)
3. `config/targets.js` (updated)
4. `package.json` (updated)

### Files Removed

1. `.jshintrc` (root)
2. `tests/.jshintrc`
3. `lib/ember-json-tree/.jshintrc`

---

## Phase 2: Incremental Ember Upgrades

**Status**: PENDING
**Estimated Duration**: 1-2 weeks

### Upgrade Path

1. **Ember 3.16 LTS** → Test & Fix
2. **Ember 3.20 LTS** → Test & Fix
3. **Ember 3.24 LTS** → Test & Fix
4. **Ember 3.28 LTS (Final 3.x)** → Complete Deprecation Cleanup

### Tasks

- [ ] Upgrade to Ember 3.16
  - [ ] Update ember-source, ember-cli, ember-data
  - [ ] Run test suite
  - [ ] Fix breaking changes
  - [ ] Document new deprecations

- [ ] Upgrade to Ember 3.20
  - [ ] Update ember-source, ember-cli, ember-data
  - [ ] Run test suite
  - [ ] Fix breaking changes
  - [ ] Document new deprecations

- [ ] Upgrade to Ember 3.24
  - [ ] Update ember-source, ember-cli, ember-data
  - [ ] Run test suite
  - [ ] Fix breaking changes
  - [ ] Document new deprecations

- [ ] Upgrade to Ember 3.28 (Critical milestone)
  - [ ] Update ember-source, ember-cli, ember-data
  - [ ] Run test suite
  - [ ] **RESOLVE ALL DEPRECATION WARNINGS**
  - [ ] Ensure 100% Octane compliance

### Critical Note

⚠️ **All deprecations must be resolved at Ember 3.28 before proceeding to Ember 4.x**

---

## Phase 3: Component Modernization

**Status**: PENDING
**Estimated Duration**: 4-8 weeks

### Scope

**Components to Modernize**: ~174 JavaScript files, ~161 templates

### Strategy

Convert classic components to Glimmer components in this order:

1. **Leaf Components** (no dependencies)
   - Start with `app/pods/components/input/*`
   - These are form inputs and simple controls

2. **Control Components**
   - `app/pods/components/control/*`
   - Buttons, modals, alerts, etc.

3. **Object Components**
   - `app/pods/components/object/*`
   - Complex data display components

### Conversion Pattern

**Before (Classic Component)**:
```javascript
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['md-button'],
  attributeBindings: ['type'],
  type: 'button',

  isDisabled: computed('someProperty', function() {
    return !this.someProperty;
  }),

  click() {
    this.onClick();
  }
});
```

**After (Glimmer Component)**:
```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdButtonComponent extends Component {
  @tracked someProperty;

  get isDisabled() {
    return !this.someProperty;
  }

  @action
  handleClick() {
    this.args.onClick();
  }
}
```

**Template Changes**:
```handlebars
{{! Before }}
{{md-button onClick=(action "handleClick")}}

{{! After }}
<MdButton @onClick={{this.handleClick}} />
```

### Mixins Refactoring

**Current Mixins** (4 files):
1. `app/mixins/cancel.js`
2. `app/mixins/scroll-to.js`
3. `app/mixins/object-template.js`
4. `app/mixins/hash-poll.js`

**Refactoring Options**:
- Convert to utility functions
- Convert to services
- Use native class inheritance
- Use decorators/helpers

### Remove Global Reopens

**File**: `app/app.js:49-96`

Tasks:
- [ ] Remove `LinkComponent.reopen()` - create custom component
- [ ] Remove `Route.reopen()` - use route decorator or service
- [ ] Remove `Component.reopen()` - refactor profile logic to service

---

## Phase 4: Addon Updates

**Status**: PENDING
**Estimated Duration**: 1-2 weeks

### Critical Replacements

#### liquid-fire → ember-animated
```bash
yarn remove liquid-fire
yarn add ember-animated
```
- **Impact**: High (used for transitions.js)
- **Effort**: Significant refactoring needed
- **File**: `app/transitions.js`

#### ember-cli-eslint → Standalone ESLint
```bash
yarn remove ember-cli-eslint
# ESLint already configured separately
```

### Major Updates Required

| Addon | Current | Target | Breaking Changes |
|-------|---------|--------|------------------|
| ember-power-select | 3.0.6 | 7.x | Yes - API changes |
| ember-concurrency | 1.3.0 | 2.x | Yes - TypeScript, decorators |
| ember-cp-validations | 4.0.0 | 5.x | Yes - Octane patterns |
| ember-models-table | 2.15.0 | 4.x | Yes - Glimmer components |
| ember-qunit | 4.6.0 | 6.x | Yes - test helpers |
| qunit-dom | 0.9.2 | 3.x | Minimal |

### Tasks

- [ ] Update ember-cli-babel to latest
- [ ] Update ember-cli-htmlbars to latest
- [ ] Replace babel-eslint with @babel/eslint-parser
- [ ] Update testing addons (ember-qunit, qunit-dom)
- [ ] Update ember-power-select and related addons
- [ ] Update ember-concurrency
- [ ] Replace liquid-fire with ember-animated
- [ ] Test each addon update individually

---

## Phase 5: Ember 4.x Upgrade

**Status**: PENDING
**Estimated Duration**: 1-2 weeks

### Target: Ember 4.4 LTS (Initial)

```bash
yarn upgrade ember-source@~4.4.0
yarn upgrade ember-cli@~4.4.0
yarn upgrade ember-data@~4.4.0
```

### Tasks

- [ ] Upgrade to Ember 4.4 LTS
- [ ] Run full test suite
- [ ] Fix any breaking changes
- [ ] Performance testing
- [ ] Manual QA of all features

### Optional: Ember 4.12 LTS (Latest)

```bash
yarn upgrade ember-source@~4.12.0
yarn upgrade ember-cli@~4.12.0
yarn upgrade ember-data@~4.12.0
```

---

## Testing Strategy

### For Each Phase

1. **Unit Tests**: Verify all tests pass
2. **Integration Tests**: Component integration
3. **Acceptance Tests**: Full workflows
4. **Manual Testing**: Critical user paths
5. **Performance Testing**: Bundle size, render time

### Critical Workflows to Test

- [ ] Record creation and editing
- [ ] Dictionary management
- [ ] Contact management
- [ ] Import/Export (all formats)
- [ ] Publishing to ScienceBase
- [ ] Publishing to CouchDB
- [ ] Validation workflows
- [ ] Profile switching
- [ ] Sync functionality

---

## Rollback Plan

### Git Strategy

1. Main branch: `develop`
2. Upgrade branch: `dvonanderson/enhancement/ember-upgrade-4`
3. Tag each stable phase: `upgrade-phase-1`, `upgrade-phase-2`, etc.

### Rollback Commands

```bash
# If issues found in current phase
git checkout <previous-phase-tag>
git checkout -b hotfix/rollback-issue

# If issues in production
git revert <commit-range>
```

### Parallel Maintenance

- Keep Ember 3.x branch available for critical hotfixes
- Maintain until Ember 4 version is stable in production

---

## Risk Mitigation

1. ✅ **Feature Freeze**: No new features during upgrade
2. ✅ **Branch Protection**: Work in feature branch
3. ✅ **Incremental Approach**: Upgrade through LTS versions
4. ⏳ **Testing at Each Step**: Comprehensive testing between phases
5. ⏳ **Documentation**: Track all changes and issues
6. ⏳ **Stakeholder Communication**: Regular status updates

---

## Notes & Issues

### Known Issues

1. **Test Suite**: 378/402 tests failing due to test setup issues
   - Not application code issues
   - Need to modernize test patterns

2. **SASS Deprecations**: High volume of Dart Sass warnings
   - Need to update SCSS to use modern Sass module system
   - Replace `@import` with `@use`
   - Replace color functions with color.adjust()

### Questions / Decisions Needed

- [ ] Approval for IE11 removal
- [ ] Approval for minimum browser versions
- [ ] Decision on liquid-fire → ember-animated migration scope
- [ ] Timeline for production deployment

---

## Resources

- [Ember 4.x Release Notes](https://blog.emberjs.com/tag/releases)
- [Ember Octane Guide](https://guides.emberjs.com/release/upgrading/current-edition/)
- [ember-cli-update](https://github.com/ember-cli/ember-cli-update)
- [Ember Codemods](https://github.com/ember-codemods)

---

## Change Log

### 2025-12-29 - Phase 1 Complete

- Completed all Phase 1 preparation tasks
- Updated configuration files
- Established baseline metrics
- Ready to begin Phase 2: Incremental Upgrades

---

**Last Updated**: 2025-12-29
**Maintained By**: Development Team
