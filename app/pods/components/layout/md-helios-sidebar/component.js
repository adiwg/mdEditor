import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'mdeditor/config/environment';

/**
 * Helios Design System sidebar navigation component
 *
 * @class MdHeliosSidebarComponent
 * @extends {Component}
 */
export default class MdHeliosSidebarComponent extends Component {
  // Services
  @service router;

  // Tracked properties
  @tracked showHelp = false;
  @tracked collapsedPanels = [];

  /**
   * Get the application version without the build hash
   *
   * @readonly
   * @memberof MdHeliosSidebarComponent
   */
  get version() {
    const version = config.APP.version;
    return version.substring(0, version.indexOf('+'));
  }

  /**
   * Determine if the current version is a prerelease (alpha/beta)
   *
   * @readonly
   * @memberof MdHeliosSidebarComponent
   */
  get prerelease() {
    const version = this.version;

    if (version.substring(0, 3) === '0.0') {
      return 'alpha';
    }

    if (version.substring(0, 1) === '0' && version.substring(0, 3) > 0) {
      return 'beta';
    }

    return '';
  }

  /**
   * Toggle the help panel visibility
   *
   * @memberof MdHeliosSidebarComponent
   */
  @action
  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  /**
   * Toggle the sidebar visibility
   *
   * @memberof MdHeliosSidebarComponent
   */
  @action
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Toggle a panel's collapsed state
   *
   * @param {string} panelId - The ID of the panel to toggle
   * @memberof MdHeliosSidebarComponent
   */
  @action
  togglePanel(panelId) {
    const index = this.collapsedPanels.indexOf(panelId);

    if (index !== -1) {
      // Create a new array without the panelId
      this.collapsedPanels = this.collapsedPanels.filter(
        (id) => id !== panelId
      );
    } else {
      // Create a new array with the panelId added
      this.collapsedPanels = [...this.collapsedPanels, panelId];
    }
  }

  /**
   * Check if a panel is collapsed
   *
   * @param {string} panelId - The ID of the panel to check
   * @return {boolean} True if the panel is collapsed
   * @memberof MdHeliosSidebarComponent
   */
  @action
  isPanelCollapsed(panelId) {
    return this.collapsedPanels.includes(panelId);
  }
}
