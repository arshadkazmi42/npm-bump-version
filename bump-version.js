'use strict';


const Fs = require('fs');


class BumpVersion {

  constructor(filePath) {
    this.path = filePath;

    this.loadFileData();
  }

  isFileExists() {
    if (!Fs.existsSync(this.path)) {
      return false;
    }

    return true;
  }

  loadFileData() {

    if (!this.isFileExists()) {
      return;
    }

    try {
      const fileData = this.readFile();
      this.data = JSON.parse(fileData);
    } catch (err) {
      throw new Error(`Unable to parse file ${this.path}`);
    }
  }

  getFileData() {
    return this.data;
  }

  getVersion() {
    return this.data.version;
  }

  upgradeVersion() {

    const version = this.data.version;
    
    const versionValues = version.split('.');
    const lastIndex = versionValues.length - 1;

    versionValues[lastIndex] = parseInt(versionValues[lastIndex]) + 1;

    this.data.version = versionValues.join('.');
  }

  readFile() {
    return Fs.readFileSync(this.path, {
      encoding: 'utf8',
      flag: 'r'
    });
  }

  writeFile() {
    return Fs.writeFileSync(this.path, JSON.stringify(
      this.data, null, 2
    ));
  }
}


module.exports = BumpVersion;
