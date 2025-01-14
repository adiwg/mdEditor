export function fixLiabilityTypo(files) {
  files.records?.forEach((record) => {
    // Directly accessing 'attributes.json' assuming 'record' is a plain object
    const jsonString = record.attributes.json;
    const jsonObject = JSON.parse(jsonString);
    if (jsonObject.metadata && jsonObject.metadata.resourceDistribution) {
      jsonObject.metadata.resourceDistribution.forEach((distribution) => {
        if (distribution.liablityStatement) {
          distribution.liabilityStatement = distribution.liablityStatement;
          delete distribution.liablityStatement;
        }
      });
      const updatedJsonString = JSON.stringify(jsonObject);
      // Assuming 'record' is a plain object and setting the property directly
      record.attributes.json = updatedJsonString;
    }
  });
}
