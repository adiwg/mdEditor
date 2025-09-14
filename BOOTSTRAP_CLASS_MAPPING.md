# Bootstrap Class Migration Mapping

## Overview
This document maps Bootstrap 3.x classes currently used in mdEditor to their Bootstrap 4/5 equivalents.

## Grid System Changes

### Bootstrap 3 → 4/5
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `col-xs-*` | `col-*` | xs breakpoint becomes default |
| `col-*-offset-*` | `offset-*-*` | Offset syntax changes |
| `col-xs-push-*` | `order-*` | Push/pull replaced with flexbox order |
| `col-xs-pull-*` | `order-*` | Push/pull replaced with flexbox order |

### Custom Grid Extensions (REQUIRES WORK)
| Current Custom | Bootstrap 4/5 Alternative | Action Required |
|----------------|---------------------------|-----------------|
| `col-xxl-*` | `col-xl-*` or custom utilities | Evaluate if xl is sufficient |
| `col-xxxl-*` | Custom breakpoint or utilities | May need custom breakpoint |
| `col-*-offset-*` | `offset-*-*` | Update all offset classes |

## Button Classes

### No Changes Needed ✅
- `btn`, `btn-primary`, `btn-secondary`, `btn-success`, `btn-danger`, `btn-warning`, `btn-info`
- `btn-sm`, `btn-lg`, `btn-block`

### Changes Required
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `btn-default` | `btn-secondary` | Default becomes secondary |
| `btn-xs` | `btn-sm` | xs size removed, use sm |

## Panel → Card Migration

### Complete Restructure Required
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `panel` | `card` | Complete restructure |
| `panel-default` | `card` | Remove panel-default |
| `panel-primary` | `card border-primary` | Use border utilities |
| `panel-heading` | `card-header` | Direct replacement |
| `panel-body` | `card-body` | Direct replacement |
| `panel-footer` | `card-footer` | Direct replacement |

## Form Classes

### Mostly Compatible ✅
- `form-control`, `form-group` remain the same
- `form-horizontal`, `form-inline` remain the same

### Changes Required
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `control-label` | `form-label` (BS5) or `col-form-label` | Context dependent |
| `input-group-addon` | `input-group-text` | Addon becomes text |
| `input-group-btn` | `input-group-prepend/append` | Structure changes |

## Navigation Changes

### Navbar - Major Changes Required
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `navbar-default` | `navbar-light bg-light` | Separate background classes |
| `navbar-inverse` | `navbar-dark bg-dark` | Separate background classes |
| `navbar-fixed-top` | `fixed-top` | Utility class |
| `navbar-toggle` | `navbar-toggler` | Name change |
| `navbar-nav` | `navbar-nav` | Same ✅ |

## Utility Classes

### Changes Required
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `pull-left` | `float-left` | New float utilities |
| `pull-right` | `float-right` | New float utilities |
| `center-block` | `mx-auto d-block` | Use margin and display utilities |
| `hidden-*` | `d-*-none` | New display utilities |
| `visible-*` | `d-*-block/inline/etc` | New display utilities |

## Component Changes

### Labels → Badges
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `label` | `badge` | Name change |
| `label-default` | `badge-secondary` | Default becomes secondary |
| `label-pill` | `badge-pill` | Same concept |

### Wells → Cards or Custom
| Bootstrap 3 | Bootstrap 4/5 | Notes |
|-------------|---------------|-------|
| `well` | Custom or `card` | Wells removed, use cards or custom |
| `well-sm` | Custom padding | Use spacing utilities |
| `well-lg` | Custom padding | Use spacing utilities |

## Text and Display Utilities

### Mostly Compatible ✅
- `text-center`, `text-left`, `text-right` - Same
- `text-muted` - Same  
- `sr-only` - Same

### New Utility Opportunities
With Bootstrap 4/5, many custom SCSS utilities can be replaced:
- Spacing: `m-*`, `p-*` utilities
- Display: `d-*` utilities  
- Flexbox: `d-flex`, `justify-content-*`, `align-items-*`
- Colors: `text-*`, `bg-*` utilities

## Migration Priority

### High Priority (Breaking Changes)
1. **Grid system** - `col-xs-*` → `col-*`
2. **Panels** - Complete restructure to cards
3. **Navbar** - Structure and class changes
4. **Buttons** - `btn-default` → `btn-secondary`

### Medium Priority  
1. **Utility classes** - `pull-*`, `hidden-*`, `visible-*`
2. **Forms** - Input group structure
3. **Labels** - Rename to badges

### Low Priority
1. **Wells** - Custom replacement
2. **Custom grid extensions** - Evaluate necessity
3. **Component-specific customizations**

## Custom SCSS Reduction Opportunities

Many current custom SCSS files can be replaced with Bootstrap utilities:
- `_flex.scss` → Native flexbox utilities
- `_typography.scss` → Text utilities  
- `_borders.scss` → Border utilities
- Spacing utilities throughout
