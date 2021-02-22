import { registerDeprecationHandler } from '@ember/debug';

export function initialize(): void {
  registerDeprecationHandler((message, options, next) => {
    if (options && options.until && options.until !== '2.0.0') {
      return;
    } else {
      next(message, options);
    }
  });
}

export default {
  initialize,
};
