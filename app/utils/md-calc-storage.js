let mdCalcStorage = (obj) => {
  let blob = new Blob([JSON.stringify(obj)]).size / 1000
  return blob;
}

export default mdCalcStorage;
