/************************
 * CSS VARIABLES SERVICE
 ************************/
const Help = require('../helpers');

/* Populated in API.init()
 **************************/
const Components = [];
const Paths = {
	client: {
		components: {
			path: '' // client/node_modules/@rapid-build-ui
			// [component]: path
		}
	},
	server: {
		components: {
			path: '' // server/data/.css-vars (.dot dir to prevent nodemon from refreshing server on dev build)
			// [component]: path
		}
	}
}

/* Helpers
 **********/
const CssVars = {
	getStructure() { // :{}
		return { common: {}, light: {}, dark: {} };
	},
	async getFromJsFile(component) { // :{}
		const cssVars = CssVars.getStructure();
		const _path   = Paths.server.components[component]; // for testing Help.writeFile()

		const js = await Help.readFile(Paths.client.components[component]); // client js file
		// await Help.writeFile(_path, js);

		let css = js.match(/(?<=<style>)[^]*(?=<\/style>)/g)[0]; // get the css
		// await Help.writeFile(_path, css);

		const matches = css.match(/(?<=\()--rb.+?(?=\)(?!\)))/g) || []; // get all css vars, ex: --rb-nav-link-color, blue
		css = matches.join('\n'); // covert back to string for more parsing
		// await Help.writeFile(_path, css);

		css = css.replace(/(?<!var\(.*?)(?<=--rb\S*?),\s?/g, ': '); // each line replace first comma with colon space
		// await Help.writeFile(_path, css);

		css = css.replace(/$/gm, ';'); // add semicolon to line endings
		// await Help.writeFile(_path, css);

		// populate cssVars
		for (const [type, theme] of Object.entries(cssVars)) {
			const regex = type === 'light' ? /--rb.+-light.+/g
						: type === 'dark' ? /--rb.+-dark.+/g
						: /--rb-(?!.+(-light|-dark)).+/g;
			const vars = css.match(regex) || []; // :[] | null (get all theme variables)
			for (const _var of vars) {
				const name = _var.match(/.+(?=:)/g)[0]; // variable name, ex: --rb-nav-link-color
				const val  = _var.match(/(?<=:\s*)\S+.*(?=;)/g)[0]; // variable value, ex: blue
				theme[name] = val;
			}
		}

		return cssVars;
	},
	async writeJsonFile(component) { // :void
		try {
			const dir = Paths.server.components.path;
			if (!Help.exists(dir)) await Help.mkdir(dir);
			const cssVars = await CssVars.getFromJsFile(component);
			await Help.writeFile(Paths.server.components[component], JSON.stringify(cssVars, null, '\t'));
		} catch(error) {
			const eMsg = !!error.stack ? error.stack : error.toString();
			console.error(eMsg.error);
		}
	},
	async getJson(component) { // :{}
		const cssVarsPath = Paths.server.components[component];
		// catch if file doesn't exist
		// technique to only write file once
		try {
			return require(cssVarsPath);
		} catch(error) {
			await CssVars.writeJsonFile(component);
			return require(cssVarsPath);
		}
	}
}

/* API
 * Todo:
 * - sort css variables nicely
 * - create api method that returns
 *   a css or sass variables template
 *************************************/
const API = {
	async init(paths) { // :Promise<void>
		if (Components.length) return;
		// set root paths
		Paths.client.components.path = `${paths.client}/node_modules/@rapid-build-ui`;
		Paths.server.components.path = `${paths.server}/data/.css-vars`;
		// set components
		let components = await Help.readDir(Paths.client.components.path);
		components = components.filter(dir => dir.indexOf('rb-') !== -1);
		for (const component of components) Components.push(component);
		// set component paths
		for (const component of Components)
			Paths.client.components[component] = `${Paths.client.components.path}/${component}/scripts/${component}.js`
		for (const component of ['globals', 'form-controls', ...Components])
			Paths.server.components[component] = `${Paths.server.components.path}/${component}.json`
	},
	async getCssVars(component, theme = null) { // :json (theme: common | light | dark)
		const cssVars = await CssVars.getJson(component);
		if (!theme) return cssVars; // return all
		return cssVars[theme];
	},
	async makeCssVars() { // :Promise<void>
		for (const component of Components)
			await this.getCssVars(component);
	}
}

/* Export it!
 *************/
module.exports = API;