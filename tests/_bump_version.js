'use strict';


const { expect } = require('chai');
const BumpVersion = require('../bump-version');


const FILE_PATHS = {
  VALID: `${process.cwd()}/package.json`,
  INVALID: `${process.cwd()}/test.json`,
  INVALID_DATA: `${process.cwd()}/index.js`
};


describe('lib/bump-version.js', () => {
  it('should initialize the object', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    const fileData = bumpVersion.getFileData();
    expect(bumpVersion.path).to.be.equals(FILE_PATHS.VALID);
    expect(fileData).to.be.an('object');
    expect(fileData.name).to.be.equals('npm-bump-version');
    expect(fileData.author).to.be.equals('Arshad Kazmi');
  });
  it('should validate file not exists', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.INVALID);
    expect(bumpVersion.isFileExists()).to.be.false;
  });
  it('should validate file exists', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    expect(bumpVersion.isFileExists()).to.be.true;
  });
  it('should read file data', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    const fileData = JSON.parse(bumpVersion.readFile());
    expect(fileData).to.be.an('object');
    expect(fileData.name).to.be.equals('npm-bump-version');
    expect(fileData.author).to.be.equals('Arshad Kazmi');
  });
  it('should read file invalid data', () => {
    try {
      new BumpVersion(FILE_PATHS.INVALID_DATA);
    } catch (err) {
      expect(err.message).to.be.equals(
        'Unable to parse file /home/arshad/workspace/opensource/npm-bump-version/index.js'
      );
    }
  });
  it('should upgrade version by 0.0.1', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    bumpVersion.data.version = '1.0.0';
    bumpVersion.upgradeVersion();

    expect(bumpVersion.data.version).to.deep.equals('1.0.1');
  });
  it('should upgrade version and write in file', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    bumpVersion.data.version = '1.0.0';
    bumpVersion.upgradeVersion();
    bumpVersion.writeFile();
    const newData = JSON.parse(bumpVersion.readFile());

    expect(newData.version).to.deep.equals('1.0.1');
  });
  it('should return version', () => {
    const bumpVersion = new BumpVersion(FILE_PATHS.VALID);
    bumpVersion.data.version = '1.0.0';
    
    expect(bumpVersion.getVersion()).to.be.equals('1.0.0');
  });
});

