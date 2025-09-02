import classic from 'ember-classic-decorator';
import { classNameBindings, classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';

@classic
@classNames('md-slider')
@classNameBindings('visible:in')
export default class MdSlider extends Component {
  visible = false;

  didReceiveAttrs() {
    $('body')
      .toggleClass('slider', this.visible === true);
  }

  fromName = null;

  @computed('fromName')
  get name() {
    return this.fromName || 'md-slider-content';
  }

  @action
  toggleVisibility() {
    this.toggleProperty('visible');

    if(!this.visible) {
      let context = this.get('context.isDestroying');

      this.set('fromName', null);

      if(!context) {
        this.onClose
          .call(this);
      }
    }
  }
}
