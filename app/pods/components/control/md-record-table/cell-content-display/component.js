import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import layout from './template';

export default setComponentTemplate(layout, templateOnly());
