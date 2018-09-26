/****************************
 * CREATE RB COMPONENT MIXIN
 ****************************/
require('../bootstrap/colors');
const clog        = require('../helpers/component-log');
const component   = process.argv.slice(2)[0]; // :string (new mixin name)
const rbComponent = new(require('../helpers/create-component'))(component, { type: 'mixin' });
const message     = 'create component mixin';

/* Do It!
 *********/
clog.setupBegin(rbComponent.name, message);

!async function() { // :Promise<any>
	const created = await rbComponent.create();
	if (!created) return;
	clog.setupComplete(rbComponent.clonedRepoPath, message);
}();