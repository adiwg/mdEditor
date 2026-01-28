# Deprecation Migration Plan: Component.reopen() and Route.reopen()

## Overview

This document outlines the migration plan for fixing the following Ember deprecation:

```
DEPRECATION: Reopening the Ember.Component super class itself is deprecated.
Consider alternatives such as installing event listeners on the document or
add the customizations to specific subclasses.
[deprecation id: ember.component.reopen]
```

**Source**: `app/app.js` (lines 47-89)

## Current Implementation

### Route.reopen() (Lines 47-52)

Adds a `currentRouteModel()` helper method to ALL routes:

```javascript
Route.reopen({
  currentRouteModel: function () {
    return this.modelFor(this.routeName);
  }
});
```

**Usage**: 19 route files

### Component.reopen() (Lines 54-89)

Adds profile-based visibility functionality to ALL components:

```javascript
Component.reopen({
  init() {
    this._super(...arguments);

    let profile = this.profile;
    let path = this.profilePath;
    let visibility = this.visibility;
    let isVisible = isNone(visibility) ? true : visibility;

    if(path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');

      defineProperty(this, 'isVisible', computed(
        'profile.active',
        function () {
          if(!profile.activeComponents) {
            return isVisible;
          }
          return get(profile.activeComponents, path) ?? isVisible;
        }));
    }
  }
});
```

**Usage**: 156 files (templates and components)

---

## Recommended Approach: Template Helper

### Why This Approach

1. **No JS file changes** - Works with existing template-only components
2. **Explicit** - Clear in templates what's controlling visibility
3. **Future-proof** - Works with Glimmer components and Ember Octane patterns
4. **Service-based** - Helper injects the profile service directly, simplifying the API
5. **Incremental** - Can migrate templates one at a time while keeping the old system working

---

## Migration Plan

### Phase 1: Create New Infrastructure (No Breaking Changes)

#### Step 1.1: Create the helper

Create `app/helpers/profile-visible.js`:

```javascript
import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class ProfileVisibleHelper extends Helper {
  @service('custom-profile') profile;

  compute([path, defaultVisibility = true]) {
    if (!path) {
      return defaultVisibility;
    }

    if (!this.profile.activeComponents) {
      return defaultVisibility;
    }

    return get(this.profile.activeComponents, path) ?? defaultVisibility;
  }
}
```

#### Step 1.2: Test the helper works alongside existing system

---

### Phase 2: Migrate Templates (Incremental)

Migrate templates from implicit `isVisible` to explicit helper:

**BEFORE** (Relies on Component.reopen magic):

```handlebars
<MdCitation
  @profile={{this.profile}}
  @profilePath="record.main.citation"
  @visibility={{true}}
>
  {{#if isVisible}}
    ...content...
  {{/if}}
</MdCitation>
```

**AFTER** (Explicit helper):

```handlebars
<MdCitation>
  {{#if (profile-visible "record.main.citation")}}
    ...content...
  {{/if}}
</MdCitation>
```

#### Migration Order (by complexity)

1. Simple templates with single `profilePath` usage
2. Templates with nested `profilePath` usages
3. Components with JS files that reference `isVisible`

#### Estimated Scope

- ~100 template files need `{{#if (profile-visible ...)}}` updates
- ~40 component JS files may need cleanup (remove `profilePath` handling)

---

### Phase 3: Cleanup

#### Step 3.1
Remove `Component.reopen()` from `app/app.js`

#### Step 3.2
Remove unused `profilePath`, `profile`, `visibility` arguments from component invocations

#### Step 3.3
Remove any `isVisible` references in component JS files

---

### Phase 4: Route.reopen() Fix (Separate, Simpler)

#### Step 4.1: Create base route

Create `app/routes/base.js`:

```javascript
import Route from '@ember/routing/route';

export default class BaseRoute extends Route {
  currentRouteModel() {
    return this.modelFor(this.routeName);
  }
}
```

#### Step 4.2: Update route files

Update the following 19 route files to extend `BaseRoute` instead of `Route`:

- `app/pods/record/show/edit/associated/resource/index/route.js`
- `app/pods/dictionary/new/id/route.js`
- `app/pods/dictionary/show/route.js`
- `app/pods/contact/new/id/route.js`
- `app/pods/contact/show/route.js`
- `app/pods/record/new/id/route.js`
- `app/pods/record/show/route.js`
- `app/routes/application.js`
- `app/pods/record/show/edit/taxonomy/index/route.js`
- `app/pods/record/show/edit/funding/index/route.js`
- `app/pods/record/show/edit/extent/route.js`
- `app/pods/record/show/edit/keywords/index/route.js`
- `app/pods/import/route.js`
- `app/pods/record/show/edit/keywords/thesaurus/route.js`
- `app/pods/record/show/edit/spatial/raster/index/route.js`
- `app/pods/record/show/edit/distribution/index/route.js`
- `app/pods/record/show/edit/route.js`
- `app/pods/dictionary/show/edit/route.js`
- `app/pods/dictionary/show/edit/entity/edit/attribute/route.js`

#### Step 4.3
Remove `Route.reopen()` from `app/app.js`

---

## Effort Estimate

| Phase | Files | Effort |
|-------|-------|--------|
| Phase 1 (Helper) | 1 file | Low |
| Phase 2 (Templates) | ~100 files | High |
| Phase 3 (Cleanup) | ~40 files | Medium |
| Phase 4 (Routes) | 20 files | Low |

**Total**: This is a significant refactor, best done as a dedicated effort separate from the Ember 4 upgrade itself.

---

## Alternative: Defer with Suppression

If you want to complete the Ember 4 upgrade first, you can suppress this deprecation temporarily.

Add to `app/app.js` before the `Component.reopen()` call:

```javascript
import { registerDeprecationHandler } from '@ember/debug';

registerDeprecationHandler((message, options, next) => {
  if (options?.id === 'ember.component.reopen') {
    return; // silence this deprecation
  }
  next(message, options);
});
```

Then tackle the migration as a follow-up project.

---

## Alternative Approaches Considered

### Option A: Base Component Class

Create a base component that all components extend.

**Pros**: Similar to current behavior
**Cons**: Need to update every single component to extend BaseComponent

### Option B: Decorator

Create an opt-in decorator for components that need visibility.

```javascript
// app/decorators/with-profile-visibility.js
export function withProfileVisibility(ComponentClass) {
  return class extends ComponentClass {
    init() {
      super.init(...arguments);
      // ... visibility logic
    }
  };
}

// Usage in component
@withProfileVisibility
export default class MyCitationComponent extends Component {}
```

**Pros**: Explicit, modern pattern
**Cons**: Need to add decorator to all components using profilePath, some template-only components need JS files created

### Option D: Defer

Suppress the deprecation and address later.

**Pros**: Allows Ember 4 upgrade to proceed
**Cons**: Technical debt remains

---

## Files Reference

### Files using `profilePath`

Run this command to get the current list:

```bash
grep -r "profilePath" app --include="*.hbs" --include="*.js" -l
```

### Files using `currentRouteModel()`

Run this command to get the current list:

```bash
grep -r "currentRouteModel()" app --include="*.js" -l
```
