// Debug script to check slider state
// Run this in the browser console when you see the overlay issue

console.log('=== Slider Debug Info ===');

// Check if slider element exists and its state
const sliderElement = document.querySelector('.md-slider');
if (sliderElement) {
  console.log('Slider element found:', sliderElement);
  console.log('Slider classes:', sliderElement.className);
  console.log('Slider display style:', getComputedStyle(sliderElement).display);
  console.log('Slider width:', getComputedStyle(sliderElement).width);
  console.log('Slider z-index:', getComputedStyle(sliderElement).zIndex);
  console.log('Has "in" class:', sliderElement.classList.contains('in'));
} else {
  console.log('No slider element found');
}

// Check body classes
console.log('Body classes:', document.body.className);
console.log(
  'Body has slider class:',
  document.body.classList.contains('slider')
);

// Check if there's an Ember app instance
if (window.require && window.require.has('mdeditor/app')) {
  try {
    const app = window.require('mdeditor/app').default.create();
    const sliderService = app.lookup('service:slider');
    console.log('Slider service showSlider:', sliderService.get('showSlider'));
    console.log('Slider service fromName:', sliderService.get('fromName'));
  } catch (e) {
    console.log('Could not access Ember app:', e);
  }
}

// Check for any elements with high z-index that might be causing overlay
const highZIndexElements = Array.from(document.querySelectorAll('*')).filter(
  (el) => {
    const zIndex = parseInt(getComputedStyle(el).zIndex);
    return zIndex > 1000;
  }
);

console.log(
  'Elements with high z-index (>1000):',
  highZIndexElements.map((el) => ({
    element: el,
    zIndex: getComputedStyle(el).zIndex,
    classes: el.className,
  }))
);
