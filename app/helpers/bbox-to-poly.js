import { helper as buildHelper } from '@ember/component/helper';

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

export default buildHelper(bboxToPoly);
