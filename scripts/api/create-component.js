/********************************************
 * FOR DEVELOPMENT - YARN LINK RB-COMPONENTS
 ********************************************/
require('../bootstrap/colors');
const clog        = require('../helpers/component-log');
const component   = process.argv.slice(2)[0]; // :string (new component name)
const rbComponent = new(require('../helpers/create-component'))(component);
const message     = 'create component';

/* CREATE COMPONENT
 *******************/
clog.setupBegin(rbComponent.name, message);

!async function() {
	const created = await rbComponent.create();
	if (!created) return;
	clog.setupComplete(rbComponent.clonedRepoPath, message);
}();