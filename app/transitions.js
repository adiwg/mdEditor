export default function() {
  this.transition(
    this.toRoute('record.show.edit.main.citation'),
    this.fromRoute('record.show.edit.main.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.main.citation.identifier'),
    this.fromRoute('record.show.edit.main.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
}
