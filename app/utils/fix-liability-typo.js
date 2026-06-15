import { get, set } from '@ember/object';

export function fixLiabilityTypo(files) {
  files.records?.forEach((record) => {
    const jsonString = get(record, 'attributes.json');
    if (!jsonString) {
      return;
    }
    const jsonObject = JSON.parse(jsonString);
    if (jsonObject.metadata && jsonObject.metadata.resourceDistribution) {
      jsonObject.metadata.resourceDistribution.forEach((distribution) => {
        if (distribution.liablityStatement) {
          distribution.liabilityStatement = distribution.liablityStatement;
          delete distribution.liablityStatement;
        }
      });
      const updatedJsonString = JSON.stringify(jsonObject);
      set(record, 'attributes.json', updatedJsonString);
    }
  });
}
