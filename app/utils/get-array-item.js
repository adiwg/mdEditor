import { isArray } from '@ember/array';

export default function getArrayItem(items, index) {
  if (!isArray(items)) {
    return undefined;
  }

  let normalizedIndex = Number.parseInt(index, 10);

  if (Number.isNaN(normalizedIndex) || normalizedIndex < 0) {
    return undefined;
  }

  if (typeof items.objectAt === 'function') {
    return items.objectAt(normalizedIndex);
  }

  return items[normalizedIndex];
}
