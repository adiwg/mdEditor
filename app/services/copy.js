import Service from '@ember/service';

/**
 * Copy service provides deep copying functionality as a replacement for ember-copy
 */
export default class CopyService extends Service {
  /**
   * Deep copy an object using structured cloning with fallback to JSON serialization
   * @param {any} obj - Object to copy
   * @returns {any} Deep copy of the object
   */
  copy(obj) {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }

    // Use structuredClone if available (modern browsers)
    if (typeof structuredClone !== 'undefined') {
      try {
        return structuredClone(obj);
      } catch (e) {
        // Fall back to JSON method if structuredClone fails
      }
    }

    // Fallback to JSON serialization for deep copy
    // This works well for plain objects, arrays, and JSON-serializable data
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      // If JSON serialization fails, create a shallow copy
      console.warn('Copy service: Could not deep copy object, falling back to shallow copy', e);
      if (Array.isArray(obj)) {
        return [...obj];
      }
      return { ...obj };
    }
  }
}
