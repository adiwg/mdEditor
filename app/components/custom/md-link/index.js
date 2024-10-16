import LinkComponent from '@ember/routing/link-component';

export default class MdLinkComponent extends LinkComponent {
  attributeBindings = ['data-toggle', 'data-placement'];
}
