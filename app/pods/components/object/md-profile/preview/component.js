import Component from '@ember/component';
import { or } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['textMuted'],
  textMuted: true,
  config: or('record.config', 'record')
});
