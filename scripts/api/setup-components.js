/*************************************
 * FOR DEVELOPMENT - SETUP COMPONENTS
 *************************************/
require('../bootstrap/colors');
const clog         = require('../helpers/component-log');
const components   = process.argv.slice(2); // :['component names']
const rbComponents = new(require('../helpers/components'))(components);
const message      = 'rb-components setup';

/* SETUP BEGIN
 **************/
clog.setupBegin(rbComponents.names, message);

/* TESTING
 **********/
// let result;
// result = rbComponents.globalPath;
// result = rbComponents.globalPaths;
// result = rbComponents.names;
// result = rbComponents.pkgNames;
// result = rbComponents.pkgNamesAll;
// result = rbComponents.prefix;
// result = rbComponents.projectPaths;
// result = rbComponents.realPaths;
// result = rbComponents.scopedName;
// result = rbComponents.scopedNameFull;
// result = rbComponents.showcaseClientPath;
// result = rbComponents.showcasePkg;
// console.log(result);

/* GIT PULL AND NPM RUN SETUP
 *****************************/
rbComponents.gitPull();
rbComponents.runSetup();

/* SETUP COMPLETE
 *****************/
clog.setupComplete(rbComponents.names, message);