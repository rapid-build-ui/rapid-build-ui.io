/*************
 * CLEAN HOST
 *************/
module.exports = paths => {
	const del  = require('del');
	const path = require('path');

	// all besides: package.json, client/ and server/
	const delFiles = [
		path.join(paths.root, '.slugignore'),
		path.join(paths.root, 'app.zip'),
		path.join(paths.root, 'node_modules'),
		path.join(paths.root, 'scripts')
	];

	const runTask = () => {
		const opts = { force: true };
		return del(delFiles, opts).then(_paths => {
			return 'Cleaned Host';
		});
	};

	return runTask();
};