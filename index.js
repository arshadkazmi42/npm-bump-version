#!/usr/bin/env node

'use strict';


const BumpVersion = require('./bump-version');


const FILE_PATH = `${process.cwd()}/package.json`;


const bumpVersion = () => {

  const bumpVersion = new BumpVersion(FILE_PATH);

  bumpVersion.upgradeVersion();
  bumpVersion.writeFile();

  console.log('✔', `Version bumped to v${bumpVersion.getVersion()}`);
};


bumpVersion();
