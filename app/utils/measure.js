/**
 * Simple replacement for liquid-fire's measure function
 * Returns the dimensions of an element
 */
export function measure(element) {
  if (!element) {
    return { width: 0, height: 0 };
  }

  const rect = element.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export default measure;
