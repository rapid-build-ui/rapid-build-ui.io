/* FOR DEVELOPMENT - SETUP COMPONENTS
 *************************************/
require('../bootstrap/colors');
const clog         = require('../helpers/component-log');
const components   = process.argv.slice(2); //: [] (component names)
const rbComponents = new(require('../helpers/components'))(components);

/* SETUP BEGIN
 **************/
clog.setupBegin(rbComponents.names);

/* TESTING
 **********/
// let result;
// result = rbComponents.globalPath;
// result = rbComponents.globalPaths;
// result = rbComponents.names;
// result = rbComponents.prefix;
// result = rbComponents.projectPaths;
// result = rbComponents.realPaths;
// result = rbComponents.scopedName;
// result = rbComponents.showcaseClientPath;
// result = rbComponents.showcasePkg;
// result = rbComponents.showcasePkgNames;
// console.log(result);

/* GIT PULL AND NPM RUN SETUP
 *****************************/
rbComponents.gitPull();
rbComponents.runSetup();

/* SETUP COMPLETE
 *****************/
clog.setupComplete(rbComponents.names);