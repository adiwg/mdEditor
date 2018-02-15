import Ember from 'ember';

export function bboxToPoly(params/*, hash*/) {
  let bbox  = params[0];

  if(!(bbox.southLatitude && bbox.westLongitude &&
      bbox.northLatitude && bbox.eastLongitude)) {
    return null;
  }

  return [
    [bbox.southLatitude, bbox.westLongitude],
    [bbox.northLatitude, bbox.westLongitude],
    [bbox.northLatitude, bbox.eastLongitude],
    [bbox.southLatitude, bbox.eastLongitude]
  ];  
}

export default Ember.Helper.helper(bboxToPoly);
