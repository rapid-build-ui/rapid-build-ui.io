/* FOR DEVELOPMENT - SETUP COMPONENTS
 *************************************/
require('../bootstrap/colors');
const clog         = require('../helpers/component-log');
const rbComponents = require('../helpers/components');
const components   = rbComponents.getNames();

clog.setupBegin(components);
// let result = rbComponents.getGlobalPath();
// let result = rbComponents.getPkg();
// let result = rbComponents.getPkgNames();
// let result = rbComponents.getNames();
// let result = rbComponents.getGlobalPaths();
// let result = rbComponents.getRealPaths();
// let result = rbComponents.getProjectPaths();
// console.log(result);
rbComponents.gitPull();
rbComponents.runSetup();

/* SETUP COMPLETE
 *****************/
clog.setupComplete(); // (Whoot, There It Is!)