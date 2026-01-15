import Component from '@ember/component';

export default class BodyComponent extends Component {
  constructor() {
    super(...arguments);

    this.profilePath = this.profilePath || 'preview';
  }
}
