/****************************
 * TRAVIS DEV GET COMPONENTS
 ****************************/
const RB_PREFIX   = 'rapid-build-ui';
const SCOPED_NAME = `@${RB_PREFIX}/`;
const REPO_PREFIX = `https://github.com/${RB_PREFIX}/`

/* Helpers
 **********/
const getNames = pkgDeps => { // :string[]
	let names = [];
	for (const [dep, version] of Object.entries(pkgDeps)) {
		if (!dep.includes(SCOPED_NAME)) continue;
		let name = dep.replace(`${SCOPED_NAME}`,'');
		names.push(name);
	}
	return names.sort(); // asc order
}

const getRepoNames = names => { // :string[]
	let repoNames = [];
	for (const name of names) {
		let repoName = `${REPO_PREFIX}${name}`;
		repoNames.push(repoName);
	}
	return repoNames;
}

/* Export
 *********/
const getComponents = paths => { // :{}
	const pkg     = require(`${paths.showcase}/src/client/package.json`);
	const pkgDeps = pkg.dependencies;
	let components = {
		names: [],
		repoNames: []
	};
	components.names     = getNames(pkgDeps);
	components.repoNames = getRepoNames(components.names);
	return components;
};

/* Export It!
 *************/
module.exports = getComponents;
