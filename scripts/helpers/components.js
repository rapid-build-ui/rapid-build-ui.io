/* FOR DEVELOPMENT - RB COMPONENTS HELPER
 *****************************************/
const fs       = require('fs');
const fse      = require('fs-extra');
const path     = require('path');
const clog     = require('./component-log');
const template = require('./template-tags');
const CWD      = process.cwd();
const { execSync } = require('child_process');

/* Class
 ********/
class RbComponents {
	constructor(names=[]) {
		this.names = names;
	}

	/* getters
	 **********/
	get globalPath() { // :string
		let gPath = execSync('yarn global dir').toString(); // yarn's global path
		let _path = path.join('..', 'link', this.scopedName);
			_path = path.join(gPath, _path);
		let exist = fse.pathExistsSync(_path); // validation
		if (exist) return _path;
		clog.noComponents({exit:true});
	}

	get globalPaths() { // :string[]
		let gPath    = this.globalPath;
		let names    = this.names;
		let paths    = [];
		let unlinked = [];
		for (const [i, name] of names.entries()) {
			let _path = path.join(gPath, name);
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
	}

	get names() { // :string['rb-alert']
		return this._names;
	}

	get prefix() { // :string
		return 'rb-';
	}

	get projectPaths() { // :string[]
		let realPaths = this.realPaths;
		let paths     = [];
		for (const [i, realPath] of realPaths.entries()) {
			const _path = path.join(realPath, '..', '..');
			paths.push(_path);
		}
		return paths;
	}

	get realPaths() { // :string['symlink's real path']
		let gPaths = this.globalPaths;
		let paths  = [];
		for (const [i, gPath] of gPaths.entries()) {
			const _path = fs.realpathSync(gPath);
			paths.push(_path);
		}
		return paths;
	}

	get scopedName() { // :string
		return '@rapid-build-ui';
	}

	get showcaseClientPath() { // :string
		return path.join(CWD, 'src', 'client');
	}

	get showcasePkg() { // :{} package.json
		let _path = path.join(this.showcaseClientPath, 'package.json');
		return require(_path);
	}

	get showcasePkgNames() { // :string['@rapid-build-ui/rb-alert']
		let pkg      = this.showcasePkg;
		let deps     = pkg.dependencies;
		let pkgNames = [];
		for (const [dep, version] of Object.entries(deps)) {
			if (!dep.includes(this.scopedName)) continue;
			pkgNames.push(dep);
		}
		return pkgNames.sort(); // asc order
	}

	/* setters
	 **********/
	set names(names=[]) {
		let pkgNames = this.showcasePkgNames;
		pkgNames = pkgNames.map(name => name.split('/')[1]);
		if (!names.length) return this._names = pkgNames; // return all
		// prep names
		names = names.map(name => {
			name = name.toLowerCase();
			if (!name.indexOf(this.prefix)) return name;
			return `${this.prefix}${name}`
		});
		// validation
		for (let name of names) {
			if (pkgNames.includes(name)) continue;
			clog.invalidComponent(name,{exit:true});
		}
		this._names = names;
	}

	/* methods
	 **********/
	gitPull() { // :void
		// let cmd       = 'git status'
		// let cmd       = 'git error'
		let cmd       = 'git pull'
		let projPaths = this.projectPaths;
		for (const [i, projPath] of projPaths.entries()) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			clog.pullComponent(name, cmd);
			let opts   = { cwd: projPath };
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}

	runSetup() { // :void
		let cmd       = 'npm run setup'
		let projPaths = this.projectPaths;
		for (const [i, projPath] of projPaths.entries()) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1)
			clog.setupComponent(name, cmd);
			let opts   = { cwd: projPath };
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}
}

/* Export It!
 *************/
module.exports = RbComponents;