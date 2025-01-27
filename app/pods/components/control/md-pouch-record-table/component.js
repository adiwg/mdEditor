import MdModelsTable from 'mdeditor/pods/components/md-models-table/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdPouchRecordTable extends MdModelsTable {
  classNames = ['md-record-table']
}