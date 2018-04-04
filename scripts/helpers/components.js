/* FOR DEVELOPMENT - RB COMPONENTS HELPER
 *****************************************/
const fs   = require('fs');
const fse  = require('fs-extra');
const path = require('path');
const clog = require('./component-log');
const CWD  = process.cwd();
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
		for (const name of names) {
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

	get names() { // :string['rb-nav']
		return this._names;
	}

	get pkgNames() { // :string['corresponding to this.names']
		let names    = this.names;
		let pkgNames = []
		for (let name of names) { // ex: '@rapid-build-ui/rb-nav'
			pkgNames.push(`${this.scopedNameFull}${name}`);
		}
		return pkgNames;
	}

	get pkgNamesAll() { // :string['from showcase package.json']
		let pkg      = this.showcasePkg;
		let deps     = pkg.dependencies;
		let pkgNames = [];
		for (const [dep, version] of Object.entries(deps)) {
			if (!dep.includes(this.scopedNameFull)) continue;
			pkgNames.push(dep);
		}
		return pkgNames.sort(); // asc order
	}

	get prefix() { // :string
		return 'rb-';
	}

	get projectPaths() { // :string[]
		let realPaths = this.realPaths;
		let paths     = [];
		for (const realPath of realPaths) {
			const _path = path.join(realPath, '..', '..');
			paths.push(_path);
		}
		return paths;
	}

	get realPaths() { // :string['symlink's real path']
		let gPaths = this.globalPaths;
		let paths  = [];
		for (const gPath of gPaths) {
			const _path = fs.realpathSync(gPath);
			paths.push(_path);
		}
		return paths;
	}

	get scopedName() { // :string
		return '@rapid-build-ui';
	}

	get scopedNameFull() { // :string
		return `${this.scopedName}/`;
	}

	get showcaseClientPath() { // :string
		return path.join(CWD, 'src', 'client');
	}

	get showcasePkg() { // :{} package.json
		let _path = path.join(this.showcaseClientPath, 'package.json');
		return require(_path);
	}

	/* setters
	 **********/
	set names(names=[]) {
		let pkgNames = this.pkgNamesAll;
		pkgNames = pkgNames.map(name => name.replace(this.scopedNameFull,''));
		if (!names.length) return this._names = pkgNames; // return all
		// prep names
		names = names.map(name => this.formatName(name));
		// validation
		for (let name of names) {
			if (pkgNames.includes(name)) continue;
			clog.invalidComponent(name,{exit:true});
		}
		this._names = names;
	}

	/* helpers
	 **********/
	formatName(name) { // :string
		!name && clog.componentRequired({exit:true}); // validation
		name = name.toLowerCase();
		if (!name.indexOf(this.prefix)) return name;
		return `${this.prefix}${name}`
	}

	/* methods
	 **********/
	gitPull() { // :void
		// let cmd       = 'git status'
		// let cmd       = 'git error'
		let cmd       = 'git pull'
		let projPaths = this.projectPaths;
		for (const projPath of projPaths) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1);
			clog.pullComponent(name, cmd);
			let opts   = { cwd: projPath };
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}

	runSetup() { // :void
		let cmd       = 'npm run setup'
		let projPaths = this.projectPaths;
		for (const projPath of projPaths) {
			let name = projPath.substr(projPath.lastIndexOf(path.sep) + 1);
			clog.setupComponent(name, cmd);
			let opts   = { cwd: projPath };
			let result = execSync(cmd, opts).toString();
			console.info(result.minor);
		}
	}

	yarnLink() { // :void
		let pkgNames = this.pkgNames;
		let gPaths   = this.globalPaths; // for validation
		let cmd      = `yarn link ${this.pkgNames.join(' ')}`;
		let opts     = { cwd: this.showcaseClientPath };
		let result   = execSync(cmd, opts).toString();
		console.info(result.minor);
	}
}

/* Export It!
 *************/
module.exports = RbComponents;