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

export default class FormComponent extends Component {
  typeOptions = typeOptions;
}
