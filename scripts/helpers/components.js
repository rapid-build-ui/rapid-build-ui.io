/* FOR DEVELOPMENT - RB COMPONENTS HELPER
 *****************************************/
const fs       = require('fs');
const fse      = require('fs-extra');
const path     = require('path');
const clog     = require('./component-log');
const template = require('./template-tags');
const { execSync } = require('child_process');

/* Constants
 ************/
const CWD            = process.cwd();
const CLIENT_PATH    = path.join(CWD, 'src', 'client');
const RB_SCOPED_NAME = '@rapid-build-ui';

/* API
 ******/
const RbComponents = {
	getGlobalPath() { // :string
		let gPath = execSync('yarn global dir').toString(); // yarn's global path
		let _path = path.join('..', 'link', RB_SCOPED_NAME);
			_path = path.join(gPath, _path);
		let exist = fse.pathExistsSync(_path); // validation
		if (exist) return _path;
		clog.noComponents({exit:true});
	},

	getPkg() { // :{}
		let _path = path.join(CLIENT_PATH, 'package.json');
		return require(_path);
	},

	getPkgNames() { // :string[]
		let pkg      = this.getPkg();
		let deps     = pkg.dependencies;
		let pkgNames = [];
		for (const [dep, version] of Object.entries(deps)) {
			if (!dep.includes(RB_SCOPED_NAME)) continue;
			pkgNames.push(dep);
		}
		return pkgNames.sort(); // asc order
	},

	getNames() { // :string[]
		let pkgNames = this.getPkgNames();
		return pkgNames.map(val => val.split('/')[1]);
	},

	getGlobalPaths() { // :string[]
		let gPath    = this.getGlobalPath();
		let names    = this.getNames();
		let paths    = [];
		let unlinked = [];
		for (const [i, name] of names.entries()) {
			let _path = path.join(gPath, name);
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		// validation
		for (const [i, _path] of paths.entries()) {
			let exist = fse.pathExistsSync(_path);
			if (exist) continue;
			let name = names[i];
			unlinked.push(name);
			clog.noComponent(name);
		}
		!!unlinked.length && process.exit();
		return paths;
	},

	getRealPaths() { // :string[]
		let gPaths = this.getGlobalPaths();
		let paths  = [];
		for (const [i, gPath] of gPaths.entries()) {
			const _path = fs.realpathSync(gPath);
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		return paths;
	},

	getProjectPaths() { // :string[]
		let realPaths = this.getRealPaths();
		let paths     = [];
		for (const [i, realPath] of realPaths.entries()) {
			const _path = path.join(realPath, '..', '..');
			// console.info(`${i+1}. ${_path}`.info);
			paths.push(_path);
		}
		return paths;
	},

	gitPull() { // :void
		// let cmd       = 'git status'
		// let cmd       = 'git error'
		let cmd       = 'git pull'
		let projPaths = this.getProjectPaths();
		for (const [i, projPath] of projPaths.entries()) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			clog.pullComponent(name, cmd);
			let opts   = { cwd: projPaths[0] }
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	},

	runSetup() { // :void
		let cmd       = 'npm run setup'
		let projPaths = this.getProjectPaths();
		for (const [i, projPath] of projPaths.entries()) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			clog.setupComponent(name, cmd);
			// console.info(template.underline`${i+1}. ${name}`.attn);
			let opts   = { cwd: projPaths[0] }
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}
}

/* Export It!
 *************/
module.exports = RbComponents;