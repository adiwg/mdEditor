import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 * A simple file picker component that replaces ember-cli-file-picker.
 * 
 * Usage:
 *   <FilePicker 
 *     @fileLoaded={{this.handleFile}} 
 *     @accept=".json,.xml" 
 *     @readAs="readAsText"
 *     class="my-class"
 *   >
 *     <button type="button">Click to select file</button>
 *   </FilePicker>
 * 
 * @class FilePickerComponent
 */
export default class FilePickerComponent extends Component {
  @tracked isDragging = false;

  /**
   * The FileReader method to use: readAsText, readAsDataURL, readAsArrayBuffer, readAsBinaryString
   * @type {String}
   */
  get readAs() {
    return this.args.readAs || 'readAsText';
  }

  /**
   * File types to accept (e.g., ".json,.xml")
   * @type {String}
   */
  get accept() {
    return this.args.accept || '*';
  }

  /**
   * Whether to show a preview (not implemented in this simple version)
   * @type {Boolean}
   */
  get preview() {
    return this.args.preview !== false;
  }

  @action
  handleClick(event) {
    // Find the hidden file input and trigger a click
    const container = event.currentTarget;
    const input = container.querySelector('input[type="file"]');
    if (input) {
      input.click();
    }
  }

  @action
  handleFileChange(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
    // Reset the input so the same file can be selected again
    event.target.value = '';
  }

  @action
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @action
  handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @action
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      // Call the fileLoaded action with file info
      // Match the ember-cli-file-picker API: { filename, type, data, file }
      if (this.args.fileLoaded) {
        this.args.fileLoaded({
          filename: file.name,
          name: file.name,  // alias for compatibility
          type: file.type,
          data: data,
          file: file,
          size: file.size,
          lastModified: file.lastModified,
        });
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };

    // Use the specified read method
    const method = this.readAs;
    if (typeof reader[method] === 'function') {
      reader[method](file);
    } else {
      reader.readAsText(file);
    }
  }
}
