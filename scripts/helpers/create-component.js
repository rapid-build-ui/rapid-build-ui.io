/* FOR DEVELOPMENT - RB CREATE COMPONENT HELPER
 ***********************************************/
const fs       = require('fs');
const fse      = require('fs-extra');
const path     = require('path');
const del      = require('del');
const util     = require('util');
const request  = require('request');
const mustache = require('mustache');
const Glob     = require('glob').Glob;
const clog     = require('./component-log');
const { execSync } = require('child_process');
const RbComponents = require('../helpers/components');

/* Class
 ********/
class RbCreateComponent extends RbComponents {
	constructor(name, opts={}) {
		super();
		this.type = opts.type;
		this.name = name;
	}

	/* getters
	 **********/
	get clonedRepoPath() { // :string (destination path)
		return path.join(this.projectPaths[0], '..', this.name);
	}

	get componentsPath() { // :string
		return 'scripts/components';
	}

	get ghApi() { // :{}
		return {
			url: null, // must be set via Object.assign()
			json: true,
			headers: {
				'user-agent': 'http://developer.github.com/v3/#user-agent-required'
			}
		};
	}

	get ghRepoApi() { // :string
		return `https://api.github.com/repos/${this.ghUsername}/${this.name}`;
	}

	get ghRepoContentsApi() { // :string
		return `https://api.github.com/repos/${this.ghUsername}/${this.name}/contents`;
	}

	get ghRepo() { // :string
		return `${this.ghUrl}.git`;
	}

	get ghUrl() { // :string
		return `https://github.com/${this.ghUsername}/${this.name}`;
	}

	get ghUsername() { // :string
		return 'rapid-build-ui';
	}

	get name() { // :string
		return this._name;
	}

	get scaffolding() { // :{} (scaffolding tools)
		const name = this.name;
		return {
			glob: new Glob(`${this.tempPath}/**/{.git*,*.*}`), // include .git files otherwise they are ignored
			viewData: {
				name,
				upName: name.toUpperCase(),
				className: name.split('-').map(v=>`${v.charAt(0).toUpperCase()}${v.substr(1).toLowerCase()}`).join('')
			},
			tplFileSuffix: `-tpl`,
			tplFileReplace: name.slice(name.indexOf('-')) // ex: -nav
		};
	}

	get scaffoldPath() { // :string
		return `${this.componentsPath}/scaffold`;
	}

	get tempClonedRepoName() { // :string
		return `.${this.name}`; // prefix name for safety
	}

	get tempClonedRepoPath() { // :string
		return `${this.componentsPath}/${this.tempClonedRepoName}`;
	}

	get tempPath() { // :string
		return `${this.componentsPath}/.temp`;
	}

	get type() { // :string (component || mixin)
		return this._type;
	}

	get types() { // :string[]
		return ['component', 'mixin'];
	}

	/* setters
	 **********/
	set name(name) {
		const isMixin = this.type === 'mixin';
		name = this.formatName(name, isMixin); // validation (must be unique component or mixin)
		this.names.includes(name) && clog.componentExist(name, {exit:true});
		this._name = name;
	}

	set type(type) { // component || mixin
		type = typeof type === 'string' ? type.toLowerCase() : 'component';
		!this.types.includes(type) && clog.invalidType(type, {exit:true}); // validation
		this._type = type;
	}

	/* private
	 **********/
	_clean() { // :string['deleted paths'] (deletes temp and cloned repo dir)
		return del.sync(`${this.componentsPath}/.*`);
	}

	_cloneRepo() { // :void
		const opts = { cwd: this.componentsPath };
		const cmd  = `git clone ${this.ghRepo} ${this.tempClonedRepoName}`;
		execSync(cmd, opts);
	}

	_clonedRepoPathExists() { // :boolean (validation - repo destination must not exist)
		let exist = fse.pathExistsSync(this.clonedRepoPath); // validation
		if (!exist) return false;
		clog.componentExist(this.clonedRepoPath, {exit:true});
		return true;
	}

	_createTempDir() { // :void (copy scaffold files to temp dir - work is done in temp)
		fse.copySync(this.scaffoldPath, this.tempPath);
	}

	_gitCommitAndPush() { // :boolean
		const opts = { cwd: this.clonedRepoPath };
		const cmd  = `
			git add . &&
			git commit -am "feat(${this.name}): init" &&
			git push &&
			git checkout -b continuous &&
			git push -u origin continuous
		`.trim().replace(/\t/g,'').replace(/\n/g,' ');
		try {
			clog.pushComponent(this.name, cmd);
			const result = execSync(cmd, opts).toString();
			console.info(result.minor);
			return true;
		} catch (e) {
			console.log(e.message.error, '\n');
			return false;
		}
	}

	_isCollaborator() { // :boolean (validation - must be a collaborator)
		const opts = { cwd: this.tempClonedRepoPath };
		const cmd  = `git push --dry-run`;
		try {
			execSync(cmd, opts).toString();
			return true;
		} catch (e) {
			if (!e.message.includes('403')) return false;
			this._clean();
			clog.notCollaborator(this.name, {exit:true});
			return false;
		}
	}

	_moveTempClonedRepoToClonedRepodDest() { // :void
		fse.moveSync(
			this.tempClonedRepoPath,
			this.clonedRepoPath,
			{ overwrite: false }
		);
	}

	_moveTempToTempClonedRepo() { // :void (move temp dir into temp cloned repo)
		fse.copySync(this.tempPath, this.tempClonedRepoPath);
		fse.removeSync(this.tempPath);
	}

	_renameTplFiles(file, scaffolding) { // :void (in temp dir)
		if (!file.includes(scaffolding.tplFileSuffix)) return;
		const isMixin = this.type === 'mixin';
		// component names are prefixed with 'rb-', mixins are not
		// file = scripts/components/.temp/src/client/scripts/rb-tpl.js
		const base          = path.basename(file); // rb-tpl.js
		const replaceString = isMixin ? base.slice(0, base.lastIndexOf('.')) : scaffolding.tplFileSuffix; // rb-tpl || -tpl
		const newString     = isMixin ? this.name : scaffolding.tplFileReplace; // awesome || -awesome
		const newFile       = file.replace(replaceString, newString); // awesome.js || rb-awesome.js
		fs.renameSync(file, newFile);
	}

	_replaceTplTags(file, scaffolding) { // :void (in temp dir)
		let contents = fs.readFileSync(file).toString();
			contents = mustache.render(contents, scaffolding.viewData);
		fs.writeFileSync(file, contents);
	}

	async _repoEmpty() { // :boolean (validation - github repo must have at least one file)
		const opts   = Object.assign(this.ghApi, { url: this.ghRepoContentsApi });
		const result = await util.promisify(request.get)(opts);
		if (result.statusCode !== 404 && result.body.length) return false;
		clog.componentRepoEmpty(this.name, {exit:true});
		return true;
	}

	async _repoExists() { // :boolean (validation - github repo must exist)
		const opts   = Object.assign(this.ghApi, { url: this.ghRepoApi });
		const result = await util.promisify(request.get)(opts);
		if (result.statusCode !== 404) return true;
		clog.noComponentRepo(this.name, {exit:true});
		return false;
	}

	_runScaffolding() { // :Promise<boolean>
		this._createTempDir();
		const scaffolding = this.scaffolding;
		return new Promise((resolve, reject) => {
			scaffolding.glob.on('match', file => {
				this._replaceTplTags(file, scaffolding);
				this._renameTplFiles(file, scaffolding);
			});
			scaffolding.glob.on('end', files => {
				this._moveTempToTempClonedRepo();
				this._moveTempClonedRepoToClonedRepodDest();
				this._setupClonedRepo();
				const pushed = this._gitCommitAndPush(); // also creates continuous branch
				resolve(pushed);
			});
		});
	}

	_setupClonedRepo() { // :void
		clog.setupBegin(this.name, 'component setup', { logType: 'alert' });
		const opts   = { cwd: this.clonedRepoPath };
		const cmd    = 'npm install && npm run setup'
		const result = execSync(cmd, opts).toString();
		console.info(result.minor);
	}

	/* methods
	 **********/
	async create() { // :boolean
		this._clean();
		await this._clonedRepoPathExists(); // validation
		await this._repoExists();           // validation
		await this._repoEmpty();            // validation
		this._cloneRepo();
		this._isCollaborator();             // validation
		return await this._runScaffolding();
	}
}

/* Export It!
 *************/
module.exports = RbCreateComponent;