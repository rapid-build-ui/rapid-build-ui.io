/* FOR DEVELOPMENT - YARN LINK RB-COMPONENTS
 ********************************************/
require('../bootstrap/colors');

/* Requires
 ***********/
const fse               = require('fs-extra');
const path              = require('path');
const { execSync }      = require('child_process');
const clientPath        = 'src/client';
const rbScopedName      = '@rapid-build-ui';

/* Messages
 ***********/
const initMsg           = `yarn link rb-components in: ${clientPath}/`;
const successMsg        = 'SUCCESS: rb-components linked';
const msgSeparator      = Array(initMsg.length+1).join('-'); // nice separator for log
const noRbComponentsMsg = `\nNO RB-COMPONENTS LINKED: go to each project and run -> npm run setup`;

/* Change Working Directory to src/client/
 ******************************************/
process.chdir(clientPath);

/* Get Yarn's @rapid-build-ui Symlink Path
 ******************************************/
const rbSymlinksPath   = path.join(execSync('yarn global dir').toString(), '..', 'link', rbScopedName);
const rbSymlinksExists = fse.pathExistsSync(rbSymlinksPath);
if (!rbSymlinksExists) return console.error(noRbComponentsMsg.error);

/* Prepare Yarn Link Statement
 ******************************/
const rbComponents = fse.readdirSync(rbSymlinksPath);
if (!rbComponents.length) return console.error(noRbComponentsMsg.error);
var yarnLinkStatement = 'yarn link';

console.log(`\n${initMsg}`.attn);
console.log(msgSeparator.info);
for (let i in rbComponents) {
	i = parseInt(i);
	let rbComponent    = `${rbScopedName}/${rbComponents[i]}`
	yarnLinkStatement += ` ${rbComponent}`;
	console.log(`${i+1}. ${rbComponent}`.info);
}
console.log(msgSeparator.info);

/* Yarn Link rb-components
 *************************/
execSync(yarnLinkStatement);
console.log(successMsg.info); // (Whoot, There It Is!)
