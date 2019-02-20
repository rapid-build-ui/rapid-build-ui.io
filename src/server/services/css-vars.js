/************************
 * CSS VARIABLES SERVICE
 ************************/
const util      = require('util');
const fs        = require('fs');
const path      = require('path');
const exists    = fs.existsSync;
const mkdir     = util.promisify(fs.mkdir);
const readFile  = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/* Private
 **********/
const getClientJsPath = (clientPath, component) => { // :string
	return path.join(clientPath, 'node_modules', '@rapid-build-ui', component, 'scripts', `${component}.js`);
}

const getClientJsFile = async (clientPath, component) => { // :string (file contents)
	const _path = getClientJsPath(clientPath, component);
	const file  = await readFile(_path); // :Buffer
	return file.toString();
}

const getServerCssVarsDir = () => { // :string
	// .dot dir to prevent nodemon from
	// refreshing server (only applies to dev build)
	return path.join(__dirname, '..', 'data', '.css-vars');
}

const getServerCssVarsPath = component => { // :string
	return path.join(getServerCssVarsDir(), `${component}.json`);
}

const getCssVarsStructure = () => { // :{}
	return { common: {}, light: {}, dark: {} };
}

const getCssVarsFromJsFile = async (clientPath, component) => { // :{}
	const cssVars = getCssVarsStructure();
	const _path   = getServerCssVarsPath(component); // for testing writeFile()

	const js = await getClientJsFile(clientPath, component);
	// await writeFile(_path, js);

	let css = js.match(/(?<=<style>)[^]*(?=<\/style>)/g)[0]; // get the css
	// await writeFile(_path, css);

	css = css.match(/(?<=\()--rb.+?(?=\))/g).join('\n'); // get all css vars, ex: --rb-nav-link-color, blue
	// await writeFile(_path, css);

	css = css.replace(/(?<=--rb\S*?),\s?/g, ': '); // each line replace first comma with colon space
	// await writeFile(_path, css);

	css = css.replace(/$/gm, ';'); // add semicolon to line endings
	// await writeFile(_path, css);

	// populate cssVars
	for (const [type, theme] of Object.entries(cssVars)) {
		const regex = type === 'light' ? /--rb.+-light.+/g
					: type === 'dark' ? /--rb.+-dark.+/g
					: /--rb-(?!.+(-light|-dark)).+/g;
		const vars = css.match(regex) || []; // :[] | null (get all theme variables)
		for (const _var of vars) {
			const name = _var.match(/.+(?=:)/g)[0]; // variable name, ex: --rb-nav-link-color
			const val  = _var.match(/(?<=:\s*)\S+.+(?=;)/g)[0]; // variable value, ex: blue
			theme[name] = val;
		}
	}

	return cssVars;
}

const writeCssVarsFile = async (clientPath, component) => { // :void
	try {
		const dir = getServerCssVarsDir();
		if (!exists(dir)) await mkdir(dir);
		const cssVars     = await getCssVarsFromJsFile(clientPath, component);
		const cssVarsPath = getServerCssVarsPath(component);
		await writeFile(cssVarsPath, JSON.stringify(cssVars, null, '\t'));
	} catch(error) {
		console.error(error);
	}
}

const getCssVars = async (clientPath, component) => { // :{}
	const cssVarsPath = getServerCssVarsPath(component);
	// catch if file doesn't exist
	// technique to only write file once
	try {
		return require(cssVarsPath);
	} catch(error) {
		await writeCssVarsFile(clientPath, component);
		return require(cssVarsPath);
	}
}

/* API
 * Todo:
 * - sort css variables nicely
 * - create api method that returns
 *   a css or sass variables template
 *************************************/
module.exports = {
	async getCssVars(clientPath, component, theme = null) { // :json (theme: common | light | dark)
		const cssVars = await getCssVars(clientPath, component);
		if (!theme) return cssVars; // return all
		return cssVars[theme];
	}
}