# jQuery Removal - Critical Issues & Solutions

**Date**: 2025-12-29
**Phase**: 2 (Post Ember 3.28 Upgrade)
**Status**: 🔴 BLOCKING ISSUES IDENTIFIED

---

## Critical Errors

### 1. ✅ RESOLVED: ember-resolver Module Not Found
**Error**: `Could not find module 'ember-resolver' imported from 'mdeditor/app'`

**Root Cause**: Build cache issue after jQuery removal

**Solution**:
```bash
rm -rf dist tmp
yarn build:development
```

**Status**: ✅ FIXED - Build cache cleanup resolved the issue

---

### 2. 🔴 ACTIVE: bootstrap-datetimepicker Requires jQuery

**Error**:
```
bootstrap-datetimepicker.js:46 Uncaught bootstrap-datetimepicker requires jQuery to be loaded first
```

**Root Cause**:
- `ember-cli-bootstrap-datetimepicker` (~0.9.4) has hard jQuery dependency
- Used in: `app/pods/components/input/md-datetime/template.hbs`
- Only 1 component uses this addon

**Impact**:
- Date/time picker component is broken
- Any form using date/time inputs will fail
- Blocks ability to disable jQuery integration for Ember 4

---

## Solutions for bootstrap-datetimepicker Issue

### Option 1: Replace with Modern Datetime Picker (RECOMMENDED) ⭐

**Replace `ember-cli-bootstrap-datetimepicker` with `ember-flatpickr`**

**Pros**:
- ✅ No jQuery dependency
- ✅ Actively maintained
- ✅ Ember 4 compatible
- ✅ Modern, lightweight (~15KB)
- ✅ Better mobile support

**Cons**:
- ⚠️ Requires component refactoring
- ⚠️ API is different from bootstrap-datetimepicker
- ⚠️ ~1-2 hours of work

**Implementation**:
```bash
# Remove old addon
yarn remove ember-cli-bootstrap-datetimepicker

# Add new addon
yarn add -D ember-flatpickr

# Refactor component at:
# app/pods/components/input/md-datetime/
```

**Component Changes Needed**:
```handlebars
{{! OLD }}
{{bs-datetimepicker
  date=_date
  format=format
  ...
}}

{{! NEW }}
{{ember-flatpickr
  date=_date
  enableTime=true
  dateFormat=format
  ...
}}
```

---

### Option 2: Use Native HTML5 datetime-local

**Replace with native `<input type="datetime-local">`**

**Pros**:
- ✅ No dependencies
- ✅ No library needed
- ✅ Modern browsers have good support
- ✅ Simplest solution

**Cons**:
- ⚠️ Less control over appearance
- ⚠️ Browser differences in UI
- ⚠️ Limited customization
- ⚠️ Timezone handling is tricky

**Implementation**:
```handlebars
<input
  type="datetime-local"
  value={{this.isoDateTime}}
  {{on "input" this.handleDateChange}}
  class="form-control"
>
```

---

### Option 3: Temporarily Re-enable jQuery (NOT RECOMMENDED) ❌

**Re-add jQuery just for this addon**

**Pros**:
- ✅ Quick fix
- ✅ No refactoring needed
- ✅ Component works as-is

**Cons**:
- ❌ Defeats purpose of jQuery removal
- ❌ Blocks Ember 4 upgrade
- ❌ Adds unnecessary bundle size
- ❌ Technical debt
- ❌ **Cannot upgrade to Ember 4 with jQuery enabled**

**Implementation**:
```json
// config/optional-features.json
{
  "jquery-integration": true  // Revert
}
```

```bash
yarn add -D @ember/jquery
```

---

## Recommended Action Plan

### Phase 2.5: Fix jQuery Dependency (IMMEDIATE)

**Timeline**: 1-2 hours

**Steps**:
1. ✅ Install `ember-flatpickr`
2. ✅ Refactor `md-datetime` component
3. ✅ Update template to use ember-flatpickr
4. ✅ Test datetime functionality
5. ✅ Remove `ember-cli-bootstrap-datetimepicker`
6. ✅ Verify jQuery is truly not needed

---

## Alternative: Defer to Phase 3

If time is limited, we can:

1. **Temporarily re-enable jQuery** for now
2. **Document as Phase 3 task** (component modernization)
3. **Fix during component refactoring** phase
4. **Remove jQuery** once all components are modernized

**Trade-off**: Delays Ember 4 upgrade until Phase 3 is complete

---

## Component Usage Analysis

**File**: `app/pods/components/input/md-datetime/component.js`
- Classic component using `.extend()`
- Uses moment.js AND dayjs (redundant)
- Good candidate for Glimmer component conversion
- Already has most logic in place

**Usage in App**:
```bash
grep -r "md-datetime" app --include="*.hbs" | wc -l
# Result: ~XX usages (need to verify)
```

---

## Decision Matrix

| Option | Effort | jQuery-free | Ember 4 Ready | User Experience |
|--------|--------|-------------|---------------|-----------------|
| ember-flatpickr | Medium (1-2h) | ✅ Yes | ✅ Yes | Excellent |
| Native HTML5 | Low (30min) | ✅ Yes | ✅ Yes | Good |
| Re-enable jQuery | Very Low (5min) | ❌ No | ❌ No | Same |

---

## Recommendation

**DO NOW**: Replace with `ember-flatpickr` (1-2 hours)

**Rationale**:
1. Blocks Ember 4 upgrade otherwise
2. Modern, maintained solution
3. Better UX than native HTML5
4. Clean break from jQuery
5. Small scope (1 component)

**Defer Decision**: If stakeholders need immediate Ember 4 readiness timeline, we can:
- Temporarily re-enable jQuery
- Document as technical debt
- Address in Phase 3 (Component Modernization)

---

## Next Steps

**Immediate**:
- [ ] Decision: Replace now OR defer to Phase 3?
- [ ] If replace now: Implement ember-flatpickr
- [ ] If defer: Re-enable jQuery, document debt

**Phase 3** (if deferred):
- [ ] Replace bootstrap-datetimepicker
- [ ] Remove jQuery completely
- [ ] Verify Ember 4 compatibility

---

## Additional jQuery Dependencies to Check

Run this to find other potential jQuery usage:
```bash
# Check for this.$() usage
grep -r "this\.\$" app --include="*.js" | wc -l

# Check for Ember.$() usage
grep -r "Ember\.\$" app --include="*.js" | wc -l

# Check for $(  usage
grep -r "\$(.*)" app --include="*.js" | wc -l
```

**Status**: Not yet analyzed

---

## References

- [ember-flatpickr](https://github.com/shipshapecode/ember-flatpickr)
- [Ember 4 jQuery Removal](https://guides.emberjs.com/release/configuring-ember/optional-features/#toc_jquery-integration)
- [Flatpickr Documentation](https://flatpickr.js.org/)

---

**Created**: 2025-12-29
**Updated**: 2025-12-29
**Priority**: 🔴 HIGH - Blocks Ember 4 upgrade
