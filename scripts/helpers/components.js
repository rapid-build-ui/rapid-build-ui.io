/* FOR DEVELOPMENT - RB COMPONENTS HELPER
 *****************************************/
const fs           = require('fs');
const path         = require('path');
const fse          = require('fs-extra');
const { execSync } = require('child_process');
const template     = require('./template-tags');

/* Constants
 ************/
const CLIENT_PATH    = 'src/client';
const RB_SCOPED_NAME = '@rapid-build-ui';
const YARN_LINK_PATH = path.join(execSync('yarn global dir').toString(), '..', 'link');
const RB_GLOBAL_PATH = path.join(YARN_LINK_PATH, RB_SCOPED_NAME);

/* Messages
 ***********/
const Messages = {
	noComponents: template.stripIndent`
		${template.underline`NO RB-COMPONENTS LINKED`.error}
		Go to every component directory and run:
		npm run setup
	`.info + '\n'
}

/* API
 ******/
const RbComponents = {
	getLinkedPath() { // :string
		const exist = fse.pathExistsSync(RB_GLOBAL_PATH);
		if (exist) return RB_GLOBAL_PATH;
		console.error(Messages.noComponents);
		process.exit();
	},
	getLinkedComponents() { // :string[]
		const components = fse.readdirSync(this.getLinkedPath());
		if (components.length) return components;
		console.error(Messages.noComponents);
		process.exit();
	},
	getLinkedComponentsPath() { // :string[]
		const rbPath     = this.getLinkedPath();
		const components = this.getLinkedComponents();
		let paths = [];
		for (const [i, component] of components.entries()) {
			const _path = path.join(rbPath, component);
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		return paths;
	},
	getComponentsRealPath() { // :string[]
		const linkedPaths = this.getLinkedComponentsPath();
		let paths = [];
		for (const [i, linkedPath] of linkedPaths.entries()) {
			const _path = fs.realpathSync(linkedPath);
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		return paths;
	},
	getComponentsProjectPath() { // :string[]
		const realPaths = this.getComponentsRealPath();
		let paths = [];
		for (const [i, realPath] of realPaths.entries()) {
			const _path = path.join(realPath, '..', '..');
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		return paths;
	},
	update() { // :void
		const cmd       = 'git pull'
		// const cmd       = 'git status'
		const projPaths = this.getComponentsProjectPath();
		for (const [i, projPath] of projPaths.entries()) {
			const name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			console.info(template.underline`${i+1}. ${name}`.attn);
			const opts   = { cwd: projPaths[0] }
			const result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	},
	runSetup() { // :void
		const cmd       = 'npm run setup'
		const projPaths = this.getComponentsProjectPath();
		for (const [i, projPath] of projPaths.entries()) {
			const name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			console.info(template.underline`${i+1}. ${name}`.attn);
			const opts   = { cwd: projPaths[0] }
			const result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}
}

/* Export It!
 *************/
module.exports = RbComponents;