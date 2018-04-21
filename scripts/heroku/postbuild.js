/********************
 * HEROKU POST BUILD
 ********************/
require('../bootstrap/colors');
const q        = require('q');
const path     = require('path');
const dir      = __dirname;
const rootPath = process.cwd();
const paths = {
	root:    rootPath,
	tasks:   path.join(dir, 'tasks'),
	helpers: path.join(rootPath, 'scripts', 'helpers')
};
const log = require(`${paths.helpers}/log`);
const Tasks = {
	unpackApp:   require(`${paths.tasks}/unpack-app`),
	cleanupHost: require(`${paths.tasks}/clean-host`)
};

const runTasks = () => {
	let results = [];
	const tasks = [
		()  => { return Tasks.unpackApp(paths); },
		res => {
			results.push(res);
			return Tasks.cleanupHost(paths);
		}
	];
	return tasks.reduce(q.when, q()).then(res => {
		results.push(res);
		return results.filter(Boolean).join('\n');
	});
};

runTasks().then(res => {
	log('Installed App');
	if (!res || typeof res !== 'string') return;
	console.log(res.attn);
}).catch(e => {
	log('Failed to Install app', 'error');
	if (e) console.error(e);
});