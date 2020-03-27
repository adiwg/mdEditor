import { run } from '@ember/runloop';

let mdObjectSize = (obj) => {
  let blob = new Blob([JSON.stringify(obj)]).size / 1000
  return blob;
}

let storageSize = () => {
  //value of current storage
  let currStorageSize = mdObjectSize(window.localStorage)
  //percent of current local storage
  let currStoragePercent = ((currStorageSize / 5000) * 100).toFixed(2)
  return {
    percent: currStoragePercent,
    sizeInKB: currStorageSize
  }
}

setInterval(() => {
  run(function () {
    storageSize()
  })
}, 30000);


export {
  mdObjectSize,
  storageSize
};
