# Bootstrap Migration Plan: 3.4.3 → 5.x

## Overview
This document outlines the migration plan for upgrading mdEditor from Bootstrap 3.4.3 to Bootstrap 5.x, with an intermediate step through Bootstrap 4 to minimize risk and breaking changes.

## Current State Analysis

### Dependencies
- `bootstrap-sass: ~3.4.3` - Main Bootstrap package
- `bootstrap-3-card: ^0.2.0` - Bootstrap 3 card component extension  
- `ember-cli-bootstrap-datetimepicker: ~0.9.4` - Bootstrap 3 datetime picker

### Custom SCSS Structure
The application has extensive custom styling with 25+ SCSS files:
- Heavy grid customizations (`_col_xxl.scss`, `_col_xxxl.scss`)
- Component overrides (buttons, modals, forms, etc.)
- Custom Bootstrap variable overrides in `_bootstrap_custom.scss`

## Migration Strategy: Phased Approach

### Phase 1: Pre-Migration Setup (Week 1-2)
- [ ] Create feature branch for migration
- [ ] Audit all Bootstrap-dependent components
- [ ] Document current custom variables and mixins
- [ ] Set up visual regression testing
- [ ] Create component inventory

### Phase 2: Bootstrap 4 Migration (Week 3-6)
**Rationale**: Bootstrap 4 maintains similar concepts while modernizing the codebase

#### 2.1 Package Updates
- [ ] Replace `bootstrap-sass` with `bootstrap`
- [ ] Update or replace `bootstrap-3-card` (cards are native in BS4+)
- [ ] Evaluate `ember-cli-bootstrap-datetimepicker` alternatives

#### 2.2 Grid System Migration
- [ ] Update grid classes (`col-xs-*` → `col-*`)
- [ ] Migrate custom `col_xxl`/`col_xxxl` to Bootstrap 4 utilities
- [ ] Test responsive behavior across breakpoints

#### 2.3 Component Updates
- [ ] Panels → Cards migration
- [ ] Update button classes (`btn-default` → `btn-secondary`)
- [ ] Navbar structure updates
- [ ] Form control updates

#### 2.4 Variable Migration
- [ ] Update Bootstrap variable names (`$gray-darker` → `$gray-800`)
- [ ] Migrate custom color scheme
- [ ] Update spacing variables

### Phase 3: Custom SCSS Reduction (Week 7-8)
- [ ] Replace custom utilities with Bootstrap 4 utilities
- [ ] Consolidate or remove redundant custom styles
- [ ] Update spacing using Bootstrap's spacing utilities

### Phase 4: Bootstrap 5 Migration (Week 9-12)
**Major Changes in BS5:**
- No jQuery dependency
- Updated color system
- Enhanced utilities
- Updated form controls

#### 4.1 jQuery Removal Impact
- [ ] Audit jQuery usage in Bootstrap components
- [ ] Update Ember integration patterns
- [ ] Test modal, dropdown, and collapse functionality

#### 4.2 Utility-First Approach
- [ ] Replace remaining custom CSS with BS5 utilities
- [ ] Implement new color palette
- [ ] Update spacing system

### Phase 5: Testing & Optimization (Week 13-14)
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Final cleanup of unused SCSS

## Key Breaking Changes to Address

### Bootstrap 3 → 4
- Flexbox grid system
- Panels → Cards
- Button class changes
- Navbar restructure
- Form updates

### Bootstrap 4 → 5
- jQuery removal
- Color system updates
- Utility API changes
- Form control updates
- Updated breakpoints

## Risk Mitigation

### High Risk Areas
1. **Grid System**: Custom `col_xxl`/`col_xxxl` classes
2. **JavaScript Components**: Modal, dropdown behavior
3. **Form Controls**: Extensive form customizations
4. **Custom Variables**: Color scheme dependencies

### Mitigation Strategies
- Incremental migration by component
- Parallel development environment
- Automated visual regression testing
- Component-by-component user testing

## Testing Strategy

### Automated Testing
- [ ] Set up Percy or similar for visual regression
- [ ] Extend existing QUnit tests for UI components
- [ ] Add responsive design tests

### Manual Testing
- [ ] Test all major user workflows
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing with screen readers

## Success Metrics
- [ ] Reduce custom SCSS by 60-70%
- [ ] Maintain visual consistency
- [ ] No breaking changes to user workflows
- [ ] Improved accessibility scores
- [ ] Better mobile responsiveness

## Rollback Plan
- Maintain feature branch until migration is stable
- Document all changes for potential rollback
- Keep Bootstrap 3 dependencies available for quick revert

## Timeline Estimate
**Total Duration**: 14 weeks
- Pre-migration: 2 weeks
- Bootstrap 4 migration: 4 weeks  
- SCSS reduction: 2 weeks
- Bootstrap 5 migration: 4 weeks
- Testing & optimization: 2 weeks

## Next Steps
1. Get stakeholder approval for timeline
2. Set up development environment
3. Begin component inventory and documentation
4. Create visual regression testing framework
