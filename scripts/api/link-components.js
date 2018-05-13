/********************************************
 * FOR DEVELOPMENT - YARN LINK RB-COMPONENTS
 ********************************************/
require('../bootstrap/colors');
const clog         = require('../helpers/component-log');
const components   = process.argv.slice(2); // :['component names']
const rbComponents = new(require('../helpers/components'))(components);
const message      = 'showcase presetup';

/* PRESETUP BEGIN
 *****************/
clog.setupBegin(rbComponents.names, message, {
	prepend: `Yarn link rb-components in src/client/`
});

/* YARN LINK COMPONENTS
 ***********************/
rbComponents.yarnLink();

/* PRESETUP COMPLETE
 ********************/
clog.setupComplete(rbComponents.names, message);