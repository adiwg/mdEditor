/**
 * Base component with profile support
 * Modern alternative to Component.reopen() for profile functionality
 */
import Component from '@ember/component';
import ProfileSupportMixin from '../mixins/profile-support';

export default class BaseProfileComponent extends Component.extend(
  ProfileSupportMixin
) {
  // This component extends the regular Component with profile support
  // Components that need profile functionality can extend this instead of Component
}
