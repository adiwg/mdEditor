/**
 * Utility functions for scrolling without jQuery
 */

/**
 * Smoothly scroll to a specific position
 * @param {number} targetPosition - The target scroll position
 * @param {number} duration - Animation duration in milliseconds (default: 500)
 */
export function scrollToPosition(targetPosition, duration = 500) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out)
    const easeInOut =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * easeInOut);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Scroll to the bottom of the document
 * @param {number} duration - Animation duration in milliseconds (default: 500)
 */
export function scrollToBottom(duration = 500) {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  scrollToPosition(documentHeight - window.innerHeight, duration);
}

/**
 * Scroll to a specific element
 * @param {Element|string} element - Element or selector string
 * @param {number} offset - Offset from top (default: 0)
 * @param {number} duration - Animation duration in milliseconds (default: 500)
 */
export function scrollToElement(element, offset = 0, duration = 500) {
  const targetElement =
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!targetElement) {
    console.warn('scrollToElement: Target element not found');
    return;
  }

  const elementTop =
    targetElement.getBoundingClientRect().top + window.pageYOffset;
  scrollToPosition(elementTop - offset, duration);
}
