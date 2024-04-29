let fixExportLiabilityTypo = async (store) => {
  let records = store.peekAll('record');
  let promises = records.map((record) => {
    let jsonData = record.json;
    if (jsonData) {
      let metadata = jsonData.metadata;
      if (metadata) {
        let resourceDistribution = metadata.resourceDistribution;
        if (resourceDistribution && resourceDistribution.length > 0) {
          let distribution = resourceDistribution[0];
          let liabilityStatement = distribution.liablityStatement;
          if (liabilityStatement) {
            distribution.liabilityStatement = liabilityStatement;
            delete distribution.liablityStatement;
            jsonData.metadata = metadata;
            return record.save();
          }
        }
      }
    }
  }).filter(Boolean);
  return Promise.all(promises);
}

let fixImportLiabilityTypo = (files) => {
  files.records?.forEach((record) => {
    const jsonObject = record.attributes.json;
    if (jsonObject.metadata && jsonObject.metadata.resourceDistribution) {
      jsonObject.metadata.resourceDistribution.forEach((distribution) => {
        if (distribution.liablityStatement) {
          distribution.liabilityStatement = distribution.liablityStatement;
          delete distribution.liablityStatement;
        }
      });
      record.attributes.json = jsonObject;
    }
  });
}


export { fixExportLiabilityTypo, fixImportLiabilityTypo }
