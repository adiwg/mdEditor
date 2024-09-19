// component.js

import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),
  slider: service(),
  classNames: ['md-error-list'],

  init() {
    this._super(...arguments);

    console.log('Errors:', this.errors);

    this.formattedErrors = [];

    // Process each error group (default and custom)
    this.errors.forEach((errorGroup) => {
      let title = errorGroup.title || 'Validation Errors';
      let errors = errorGroup.errors || [];

      // Preprocess and transform errors
      let transformedErrors = this.transformErrors(errors);

      this.formattedErrors.push({
        title: title,
        errors: transformedErrors,
      });
    });
  },

  // Extract the record ID from the current URL
  recordId: computed('router.currentURL', function () {
    const url = this.router.currentURL;
    const match = url.match(/\/record\/([^\/]+)\//);
    return match ? match[1] : null;
  }),

  // Function to preprocess and transform errors
  transformErrors(errors) {
    // First, group any 'anyOf' errors with their related errors
    let groupedErrors = this.groupAnyOfErrors(errors);

    // Transform each error into a consistent format
    return groupedErrors.map((error) => this.handleError(error));
  },

  // Group 'anyOf' errors with their related errors
  groupAnyOfErrors(errors) {
    let groupedErrors = [];
    let processedErrors = new Set();

    errors.forEach((error) => {
      if (processedErrors.has(error)) {
        return;
      }

      if (error.keyword === 'anyOf') {
        // Find related errors (e.g., 'required') with the same dataPath
        let relatedErrors = errors.filter(
          (e) =>
            e !== error &&
            e.dataPath === error.dataPath &&
            !processedErrors.has(e)
        );

        error.relatedErrors = relatedErrors;

        groupedErrors.push(error);

        // Mark related errors as processed
        relatedErrors.forEach((e) => processedErrors.add(e));
      } else if (error.keyword === 'errorMessage') {
        // Handle 'errorMessage' errors separately
        groupedErrors.push(error);
      } else if (!processedErrors.has(error)) {
        groupedErrors.push(error);
      }

      processedErrors.add(error);
    });

    return groupedErrors;
  },

  // Main error handling function
  handleError(error) {
    // If the error is an 'errorMessage', extract the actual error
    if (error.keyword === 'errorMessage') {
      return this.handleErrorMessageError(error);
    }

    // Use the appropriate handler based on the keyword
    let handler = this.errorHandlers[error.keyword] || this.handleUnknownError;
    return handler.call(this, error);
  },

  // Handler for 'errorMessage' errors
  handleErrorMessageError(error) {
    let actualError = error.params.errors[0];
    // Use the actual keyword for the type
    actualError.dataPath = actualError.dataPath || error.dataPath;

    let transformedError = this.handleError(actualError);

    // Use the message from the original 'errorMessage' error
    transformedError.message = error.message || transformedError.message;

    return transformedError;
  },

  // Handlers for different error types
  errorHandlers: {
    required(error) {
      let missingProperty = error.params.missingProperty;
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'required',
        header: `Required Field: ${missingProperty}`,
        messages: [
          `The '${missingProperty}' field is required in ${propertyName}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    minItems(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let limit = error.params.limit;

      return {
        type: 'minItems',
        header: `Minimum Items Required for ${propertyName}`,
        messages: [
          `Should not have fewer than ${limit} items in ${propertyName}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    contains(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'contains',
        header: `Contains Error in ${propertyName}`,
        messages: [error.message],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    const(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'const',
        header: `Constant Value Mismatch in ${propertyName}`,
        messages: [error.message],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    anyOf(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let messages = [];

      if (error.relatedErrors && error.relatedErrors.length > 0) {
        // Transform related errors
        messages = error.relatedErrors.map((e) => {
          let transformed = this.handleError(e);
          return transformed.messages[0];
        });
      } else {
        messages.push(error.message);
      }

      return {
        type: 'anyOf',
        header: `One of Multiple Fields Required in ${propertyName}`,
        messages: messages,
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },
  },

  // Handler for unknown error types
  handleUnknownError(error) {
    let propertyName = this.getPropertyName(error.dataPath);

    return {
      type: error.keyword,
      header: `Validation Error in ${propertyName}`,
      messages: [error.message],
      path: error.dataPath,
      url: this.mapDataPathToEndpoint(error.dataPath),
    };
  },

  // Helper function to extract a human-readable property name from the dataPath
  getPropertyName(dataPath) {
    if (!dataPath) {
      return 'the record';
    }

    // Convert dataPath to a human-readable form
    let pathSegments = dataPath.split('/').filter((segment) => segment);

    // Map known segments to friendly names
    let friendlyNames = {
      metadata: 'Metadata',
      metadataInfo: 'Metadata',
      resourceInfo: 'Main',
      contact: 'Contacts',
      keyword: 'Keywords',
      extent: 'Extent',
      taxonomy: 'Taxonomy',
      constraint: 'Constraints',
      associatedResource: 'Associated Resources',
    };

    let propertyName = pathSegments
      .map((segment) => friendlyNames[segment] || segment)
      .join(' > ');

    if (propertyName.startsWith('Metadata > ')) {
      propertyName = propertyName.replace('Metadata > ', '');
    }

    return propertyName;
  },

  // Map data paths to endpoints for the 'Go To Error' button
  mapDataPathToEndpoint(dataPath) {
    const recordId = this.recordId;

    // Remove leading '/' and split the data path
    let pathSegments = dataPath.startsWith('/')
      ? dataPath.slice(1).split('/')
      : dataPath.split('/');

    // Remove 'metadata' from the pathSegments if present
    if (pathSegments[0] === 'metadata') {
      pathSegments.shift();
    }

    let endpoint = 'main'; // default endpoint
    let extraPath = ''; // any extra path to append
    let index = null;

    // Now process the path segments
    if (pathSegments[0] === 'resourceInfo') {
      // Handle resourceInfo
      if (pathSegments[1]) {
        switch (pathSegments[1]) {
          case 'extent':
            endpoint = 'extent';
            // Do not include index for extent
            break;
          case 'taxonomy':
            endpoint = 'taxonomy';
            // Include index if present
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              index = pathSegments[2];
            }
            break;
          case 'keyword':
            endpoint = 'keywords';
            extraPath = 'thesaurus';
            // Include index if present
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              index = pathSegments[2];
            } else {
              // When index is missing, default to index 0
              index = '0';
            }
            break;
          case 'constraint':
            endpoint = 'constraint';
            // Do not include index for constraint
            break;
          case 'citation':
          case 'abstract':
          case 'timePeriod':
          case 'status':
          case 'pointOfContact':
            endpoint = 'main';
            break;
          default:
            endpoint = 'main';
            break;
        }
      } else {
        endpoint = 'main';
      }
    } else if (pathSegments[0] === 'contact') {
      // Special case for contacts
      return '/contacts';
    } else {
      // Other cases, stay on main or handle as needed
      endpoint = 'main';
    }

    // Build the URL
    let url = `/record/${recordId}/edit/${endpoint}`;
    if (extraPath) {
      url += `/${extraPath}`;
    }
    if (index !== null && endpoint !== 'constraint' && endpoint !== 'extent') {
      url += `/${index}`;
    }

    return url;
  },

  closeSlider() {
    this.slider.set('fromName', 'md-slider-error');
    this.slider.toggleSlider(false);
  },

  actions: {
    navigateToEndpoint(url) {
      this.closeSlider();
      this.router.transitionTo(url);
    },
  },
});
