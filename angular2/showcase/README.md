* jspm install angular2 reflect-metadata es6-shim

* jspm install typescript

  jspm: creates config.js and fills jspm section in package.json file.

* tsd init

  tsd init: creates tsd.json file

  change default path to src/typings
  change default bundle to src/typings/tsd.d.ts

* tsd query angular2 -s --action install

  install typescript definitions for angular2 and save in tsd.json
