import classic from 'ember-classic-decorator';
import Component from '@ember/component';

const typeOptions = [{
  name: 'Metadata',
  value: 'record',
  //tip: 'tooltip'
}, {
  name: 'Contact',
  value: 'contact',
  //tip: 'tooltip'
}, {
  name: 'Dictionary',
  value: 'dictionary',
  //tip: 'tooltip'
}];

@classic
export default class Form extends Component {
  typeOptions = typeOptions;
}
