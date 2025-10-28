# Date/Time Picker Migration Guide

## Overview

✅ **MIGRATION COMPLETE**: We have successfully migrated from the jQuery-dependent `ember-cli-bootstrap-datetimepicker` to a modern, jQuery-free solution using `ember-flatpickr`. This ensures Ember 4.0 compatibility.

## Status: Legacy Removed ✅

The old `ember-cli-bootstrap-datetimepicker` has been **completely removed** from the project. All date/time pickers now use the modern jQuery-free implementation.

## Quick Migration

### For Simple Date/Time Inputs

**Old (jQuery-dependent):**
```handlebars
<MdDatetime 
  @model={{this.model}} 
  @valuePath="createdDate" 
  @label="Created Date" 
  @format="YYYY-MM-DD"
/>
```

**New (jQuery-free):**
```handlebars
<MdDatetimeModern 
  @model={{this.model}} 
  @valuePath="createdDate" 
  @label="Created Date" 
  @format="YYYY-MM-DD"
  @precision="Date"
/>
```

### Auto-Detection (Recommended)

Use the smart wrapper that automatically chooses the right implementation:

```handlebars
<MdDatetimeSmart 
  @model={{this.model}} 
  @valuePath="createdDate" 
  @label="Created Date" 
  @format="YYYY-MM-DD"
  @precision="Date"
/>
```

## Component Comparison

| Feature | Old (Bootstrap) | New (Flatpickr) |
|---------|----------------|-----------------|
| jQuery Dependency | ✅ Required | ❌ None |
| Ember 4.0 Compatible | ❌ No | ✅ Yes |
| Bundle Size | Larger | Smaller |
| Theming | Bootstrap only | CSS customizable |
| Accessibility | Basic | Enhanced |
| Mobile Support | Limited | Excellent |

## Migration Steps

### 1. Install Dependencies

```bash
yarn add ember-flatpickr flatpickr
```

### 2. Update Component Usage

Replace `{{md-datetime}}` with `{{md-datetime-smart}}` throughout your templates.

### 3. Handle Special Cases

#### Fiscal Year Component

The fiscal year component has been updated to use event-based communication instead of jQuery manipulation:

**Before:**
```javascript
// jQuery manipulation (breaks without jQuery)
context.$('.start .date').data("DateTimePicker").date(start);
```

**After:**
```javascript
// Event-based communication
if (context && context.updateFiscalDates) {
  context.updateFiscalDates(start, end);
}
```

### 4. Update Styles (Optional)

Add custom styles for Flatpickr if needed:

```scss
// app/styles/components/_flatpickr.scss
.flatpickr-calendar {
  // Custom theme styles
}
```

## Configuration Options

### Precision Types

- `"Date"` - Date only picker
- `"Time"` - Time only picker  
- `"DateTime"` - Date and time picker (default)

### Format Options

Uses dayjs formatting:
- `"YYYY-MM-DD"` - ISO date
- `"YYYY-MM-DDTHH:mm:ssZ"` - ISO datetime (default)
- `"MM/DD/YYYY"` - US date format

## Rollback Plan

If issues arise, you can temporarily rollback by:

1. Setting date picker service to use legacy mode:
```javascript
this.settings.set('datePickerImplementation', 'legacy');
```

2. Or keeping the old `ember-cli-bootstrap-datetimepicker` installed until fully migrated.

## Benefits

- ✅ **Ember 4.0 Ready** - No jQuery dependency
- ✅ **Better Performance** - Smaller bundle size
- ✅ **Modern UX** - Better mobile support
- ✅ **Maintainable** - Active development
- ✅ **Flexible** - Easy to customize

## Testing

The new components maintain the same API surface, so existing tests should continue to work with minimal changes.
