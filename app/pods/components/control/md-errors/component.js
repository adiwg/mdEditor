import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

@classic
export default class MdErrorsComponent extends Component {
  @service router;
  @service slider;

  classNames = ['md-error-list'];

  // Extract the record ID from the current URL
  get recordId() {
    const url = this.router.currentURL;
    const match = url.match(/\/record\/([^/]+)(?:\/|$)/);
    return match ? match[1] : null;
  }

  constructor() {
    super(...arguments);

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
  }

  // Function to preprocess and transform errors
  transformErrors(errors) {
    // First, group compound errors (anyOf, oneOf, etc.) with their related errors
    let groupedErrors = this.groupCompoundErrors(errors);

    // Transform each error into a consistent format
    return groupedErrors.map((error) => this.handleError(error));
  }

  // Group compound errors (anyOf, oneOf, etc.) with their related errors
  groupCompoundErrors(errors) {
    let groupedErrors = [];
    let processedErrors = new Set();

    // Process errors from end to start
    for (let i = errors.length - 1; i >= 0; i--) {
      let error = errors[i];

      if (processedErrors.has(error)) {
        continue;
      }

      if (error.keyword === 'anyOf' || error.keyword === 'oneOf') {
        let relatedErrors = [];

        // Get the schemaPath of the anyOf/oneOf error
        let schemaPath = error.schemaPath;

        // Collect preceding errors that are related to this anyOf/oneOf error
        for (let j = i - 1; j >= 0; j--) {
          let prevError = errors[j];

          if (processedErrors.has(prevError)) {
            continue;
          }

          // If the prevError's schemaPath starts with the anyOf/oneOf's schemaPath
          if (prevError.schemaPath.startsWith(schemaPath + '/')) {
            relatedErrors.unshift(prevError);
            processedErrors.add(prevError);
          } else {
            // Stop if we reach an error that is not related
            break;
          }
        }

        error.relatedErrors = relatedErrors;
        groupedErrors.unshift(error);
        processedErrors.add(error);
      } else {
        if (!processedErrors.has(error)) {
          groupedErrors.unshift(error);
          processedErrors.add(error);
        }
      }
    }

    return groupedErrors;
  }

  // Main error handling function
  handleError(error) {
    // If the error is an 'errorMessage', extract the actual error
    if (error.keyword === 'errorMessage') {
      return this.handleErrorMessageError(error);
    }

    // Use the appropriate handler based on the keyword
    let handler = this.errorHandlers[error.keyword] || this.handleUnknownError;
    return handler.call(this, error);
  }

  // Handler for 'errorMessage' errors
  handleErrorMessageError(error) {
    let actualError = error.params.errors[0];
    // Use the actual keyword for the type
    actualError.dataPath = actualError.dataPath || error.dataPath;

    let transformedError = this.handleError(actualError);

    // Use the message from the original 'errorMessage' error
    transformedError.messages = [error.message || transformedError.message];

    return transformedError;
  }

  // Handlers for different error types
  errorHandlers = {
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

      const message = `Should not have fewer than ${limit} items in ${propertyName}.`;
      const messages = [message];

      if (error.dataPath === '/contact') {
        messages.push(
          'If you already have contacts in your contacts list, you need to add a contact to this record to eliminate this error.'
        );
        messages.push(
          'In this case, one of the below errors is also probably related to this error.'
        );
        messages.push(
          'If you do not have any contacts, you need to create a contact and then add it to this record.'
        );
      }

      return {
        type: 'minItems',
        header: `Minimum Items Required for ${propertyName}`,
        messages,
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
        header: `At Least 1 of Multiple Fields Required in ${propertyName}`,
        messages: messages,
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'type' keyword
    type(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let expectedType = error.params.type;

      return {
        type: 'type',
        header: `Invalid Type in ${propertyName}`,
        messages: [`Expected type '${expectedType}' in ${propertyName}.`],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'oneOf' keyword
    oneOf(error) {
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
        type: 'oneOf',
        header: `One of Multiple Schemas Must Be Valid in ${propertyName}`,
        messages: messages,
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'not' keyword
    not(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'not',
        header: `Invalid Value in ${propertyName}`,
        messages: [
          error.message,
          'Details are limited for this error. Resolving related errors might fix this issue.',
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'enum' keyword
    enum(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let allowedValues = error.params.allowedValues.join(', ');

      return {
        type: 'enum',
        header: `Invalid Value in ${propertyName}`,
        messages: [
          `Value should be one of the allowed values: ${allowedValues}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },
  };

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
  }

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
      citation: 'Citation',
      abstract: 'Abstract',
      timePeriod: 'Time Period',
      status: 'Status',
      pointOfContact: 'Point of Contact',
      type: 'Type',
      dataQuality: 'Data Quality',
      report: 'Report',
      // Add more mappings as needed
    };

    let propertyName = pathSegments
      .map((segment) => friendlyNames[segment] || segment)
      .join(' > ');

    if (propertyName.startsWith('Metadata > ')) {
      propertyName = propertyName.replace('Metadata > ', '');
    }

    return propertyName;
  }

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

    // Now process the path segments
    if (pathSegments[0] === 'metadataInfo') {
      endpoint = 'metadata';
    } else if (pathSegments[0] === 'resourceInfo') {
      // Handle resourceInfo
      if (pathSegments[1]) {
        switch (pathSegments[1]) {
          case 'citation':
            endpoint += '/citation';
            break;
          case 'extent':
            endpoint = 'extent';
            break;
          case 'constraint':
            endpoint = 'constraint';
            break;
          case 'spatialReferenceSystem':
          case 'spatialResolution':
            endpoint = 'spatial';
            break;
          case 'taxonomy':
            endpoint = 'taxonomy';
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              endpoint += `/${pathSegments[2]}`;
            }
            break;
          case 'keyword':
            endpoint = 'keywords';
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              endpoint += `/thesaurus/${pathSegments[2]}`;
            }
            break;
        }
      }
    } else if (pathSegments[0] === 'contact') {
      return '/contacts';
    } else if (pathSegments[0] === 'dataQuality') {
      endpoint = 'dataquality';
    } else if (pathSegments[0] === 'associatedResource') {
      endpoint = 'associated';
    } else if (pathSegments[0] === 'resourceDistribution') {
      endpoint = 'distribution';
    } else if (pathSegments[0] === 'funding') {
      endpoint = 'funding';
    } else if (pathSegments[0] === 'additionalDocumentation') {
      endpoint = 'documents';
    } else if (pathSegments[0] === 'resourceLineage') {
      endpoint = 'lineage';
    }

    // Build the URL
    let url = `/record/${recordId}/edit/${endpoint}`;
    return url;
  }

  closeSlider() {
    this.slider.set('fromName', 'md-slider-error');
    this.slider.toggleSlider(false);
  }

  @action
  navigateToEndpoint(url) {
    this.closeSlider();
    this.router.transitionTo(url);
  }
}
