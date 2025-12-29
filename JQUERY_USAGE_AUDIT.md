# jQuery Usage Audit - mdEditor Application

**Date**: 2025-12-29
**Ember Version**: 3.28.12
**Status**: 🔴 13+ jQuery Dependencies Found

---

## Summary

After attempting to remove jQuery for Ember 4 compatibility, we discovered **13+ locations** where jQuery is still used in the application code.

---

## jQuery Dependencies Found

### 1. Component: `md-markdown-area`
**File**: `app/pods/components/input/md-markdown-area/component.js`
```javascript
let $el = this.$();
```
**Usage**: DOM element access
**Severity**: Medium

---

### 2. Component: `md-nav-main`
**File**: `app/pods/components/layout/md-nav-main/component.js`
```javascript
this.$('[data-toggle="tooltip"]')
```
**Usage**: Bootstrap tooltip initialization
**Severity**: Medium

---

### 3. Component: `md-card` (2 instances)
**File**: `app/pods/components/layout/md-card/component.js`
```javascript
let card = this.$();
let body = this.$(' > .card-collapse');
```
**Usage**: DOM manipulation for card collapse
**Severity**: Medium

---

### 4. Component: `md-nav-secondary/link`
**File**: `app/pods/components/layout/md-nav-secondary/link/component.js`
```javascript
let width = measure(this.$()).width;
```
**Usage**: Measuring element width
**Severity**: Low

---

### 5. Component: `md-online-resource`
**File**: `app/pods/components/object/md-online-resource/component.js`
```javascript
//this.$('.import-file-picker input:file').val('');
```
**Usage**: File input clearing (commented out)
**Severity**: Low (commented)

---

### 6. Component: `md-array-table` (2 instances)
**File**: `app/pods/components/object/md-array-table/component.js`
```javascript
let panel = this.$('.panel-collapse');
let input = this.$('.panel-collapse tbody tr:last-of-type input').first();
```
**Usage**: Panel collapse and input focus
**Severity**: Medium

---

### 7. Component: `md-json-viewer` (4 instances)
**File**: `app/pods/components/control/md-json-viewer/component.js`
```javascript
this.$('.md-viewer-body')  // Multiple uses
let body = this.$('.md-viewer-body');
let body = this.$('.md-viewer-body')
```
**Usage**: JSON viewer DOM manipulation
**Severity**: High - Multiple uses

---

### 8. Addon: `ember-cli-bootstrap-datetimepicker`
**Package**: `ember-cli-bootstrap-datetimepicker@~0.9.4`
**Component**: `app/pods/components/input/md-datetime/`
**Usage**: Date/time picker widget
**Severity**: 🔴 **CRITICAL** - Hard addon dependency

---

## Total jQuery Dependencies

| Category | Count | Severity |
|----------|-------|----------|
| Component Code | 12 instances | Medium |
| Addon Dependencies | 1 (datetimepicker) | Critical |
| **TOTAL** | **13+** | **High** |

---

## Impact Analysis

### What Works Without jQuery
- ✅ Build process
- ✅ Routing
- ✅ Most components
- ✅ Services
- ✅ Models

### What Breaks Without jQuery
- ❌ Date/time picker (hard dependency)
- ❌ Tooltips initialization
- ❌ Card collapse animations
- ❌ Panel expand/collapse
- ❌ JSON viewer functionality
- ❌ Element measurements
- ❌ DOM queries in components

---

## Migration Strategy

### Option A: Incremental Replacement (Phase 3)

**Recommended**: Replace jQuery usage during component modernization

**Timeline**: As part of Phase 3 (4-8 weeks)

**Approach**:
1. Convert classic components to Glimmer
2. Replace `this.$()` with `this.element` or `@tracked` DOM refs
3. Use native DOM APIs instead of jQuery
4. Replace bootstrap-datetimepicker addon

**Pros**:
- ✅ Proper, sustainable fix
- ✅ Part of planned modernization
- ✅ Learn modern patterns

**Cons**:
- ⏳ Takes time
- ⏳ Part of larger effort

---

### Option B: Quick jQuery Removal (Immediate)

**Not Recommended**: Fix all jQuery usage now (before Phase 3)

**Timeline**: 1-2 days

**Approach**:
1. Replace all `this.$()` with native DOM
2. Replace datetimepicker addon
3. Update all jQuery-dependent code

**Pros**:
- ✅ jQuery-free immediately
- ✅ Ember 4 ready faster

**Cons**:
- ⚠️ Rushed refactoring
- ⚠️ May introduce bugs
- ⚠️ Still need Phase 3 work

---

### Option C: Temporary Re-enable (Pragmatic) ⭐ RECOMMENDED

**Re-enable jQuery until Phase 3 component modernization**

**Timeline**: 5 minutes now, fix in Phase 3

**Approach**:
```json
// config/optional-features.json
{
  "jquery-integration": true
}
```

```bash
yarn add -D @ember/jquery
```

**Pros**:
- ✅ App functional immediately
- ✅ No rushed refactoring
- ✅ Fix properly in Phase 3
- ✅ Clear technical debt

**Cons**:
- ⏳ Delays jQuery removal
- ⏳ Delays Ember 4 upgrade
- 📝 Technical debt documented

---

## Recommended Action

**RE-ENABLE JQUERY TEMPORARILY**

### Rationale
1. **13+ jQuery dependencies** is not trivial
2. Proper fix requires component modernization anyway
3. Rushing jQuery removal may introduce bugs
4. Phase 3 (Component Modernization) will handle this properly
5. Better to delay Ember 4 than ship broken features

### Implementation
```bash
# Re-enable jQuery
echo '{"jquery-integration": true}' > config/optional-features.json

# Re-install jQuery
yarn add -D @ember/jquery

# Rebuild
yarn build:development

# Document as Phase 3 work
# All jQuery usage will be removed during component conversion
```

---

## Phase 3 jQuery Removal Plan

When converting components to Glimmer (Phase 3):

### Pattern Replacements

**OLD (Classic + jQuery)**:
```javascript
import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    let $el = this.$();
    $el.find('.tooltip').tooltip();
  }
});
```

**NEW (Glimmer + Native DOM)**:
```javascript
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action
  setupTooltips(element) {
    // Use native DOM or modern library
    element.querySelectorAll('.tooltip').forEach(el => {
      // Use ember-tooltips or native implementation
    });
  }
}
```

**Template**:
```handlebars
<div {{did-insert this.setupTooltips}}>
  ...
</div>
```

---

## Component Conversion Priority

When doing Phase 3, prioritize components by jQuery usage:

| Priority | Component | jQuery Uses | Effort |
|----------|-----------|-------------|--------|
| 1 (High) | md-json-viewer | 4 | Medium |
| 2 | md-datetime | 1 (addon) | High |
| 3 | md-array-table | 2 | Medium |
| 4 | md-card | 2 | Medium |
| 5 | md-nav-main | 1 | Low |
| 6 | md-markdown-area | 1 | Low |
| 7 | md-nav-secondary/link | 1 | Low |

---

## Testing Checklist

After jQuery removal in Phase 3:

- [ ] Date/time picker works
- [ ] Tooltips initialize
- [ ] Cards expand/collapse
- [ ] Panels expand/collapse
- [ ] JSON viewer displays
- [ ] Element measurements accurate
- [ ] All DOM queries work
- [ ] No console errors

---

## Conclusion

**DECISION**: Re-enable jQuery temporarily

**RATIONALE**:
- 13+ jQuery dependencies require proper refactoring
- Component modernization (Phase 3) is the right time to fix
- Keeping app functional is priority
- Ember 4 can wait for proper migration

**NEXT STEPS**:
1. Re-enable jQuery integration
2. Add @ember/jquery package
3. Document as Phase 3 task
4. Continue with current Ember 3.28 build
5. Address jQuery removal during component modernization

---

**Created**: 2025-12-29
**Priority**: 📋 DOCUMENTED - Fix in Phase 3
**Tracking**: Add to EMBER_UPGRADE.md Phase 3 tasks
