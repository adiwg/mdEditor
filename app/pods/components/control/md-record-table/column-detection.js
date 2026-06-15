import { get } from '@ember/object';

export function readColumnComponentKey(column, componentMap = {}) {
  if (!column) {
    return '';
  }

  const candidates = [
    get(column, 'component'),
    get(column, 'originalDefinition.component'),
  ];

  for (const comp of candidates) {
    if (typeof comp === 'string' && comp.length > 0) {
      return comp;
    }

    if (typeof comp === 'function') {
      for (const [key, klass] of Object.entries(componentMap)) {
        if (klass === comp) {
          return key;
        }
      }
    }
  }

  return '';
}

export function isCheckColumnDefinition(column, componentMap = {}) {
  if (readColumnComponentKey(column, componentMap) === 'md-check') {
    return true;
  }

  return (
    readSortCellComponentKey(column, componentMap) === 'md-check-all' &&
    get(column, 'className') === 'text-center'
  );
}

export function isCustomButtonColumnDefinition(column, componentMap = {}) {
  if (readColumnComponentKey(column, componentMap) === 'md-custom-button') {
    return true;
  }

  return !!(
    get(column, 'buttonConfig') ||
    get(column, 'originalDefinition.buttonConfig')
  );
}

export function isButtonsColumnDefinition(column, componentMap = {}) {
  const key = readColumnComponentKey(column, componentMap);

  if (key === 'md-buttons') {
    return true;
  }

  return (
    get(column, 'className') === 'md-actions-column' &&
    !isCustomButtonColumnDefinition(column)
  );
}

export function isButtonsShowColumnDefinition(column, componentMap = {}) {
  return readColumnComponentKey(column, componentMap) === 'md-buttons-show';
}

export function readSortCellComponentKey(column, componentMap = {}) {
  if (!column) {
    return '';
  }

  const candidates = [
    get(column, 'componentForSortCell'),
    get(column, 'originalDefinition.componentForSortCell'),
  ];

  for (const comp of candidates) {
    if (typeof comp === 'string' && comp.length > 0) {
      return comp;
    }

    if (typeof comp === 'function') {
      for (const [key, klass] of Object.entries(componentMap)) {
        if (klass === comp) {
          return key;
        }
      }
    }
  }

  return '';
}

export function isCheckAllColumnDefinition(column, componentMap = {}) {
  if (readSortCellComponentKey(column, componentMap) === 'md-check-all') {
    return true;
  }

  return isCheckColumnDefinition(column, componentMap);
}
