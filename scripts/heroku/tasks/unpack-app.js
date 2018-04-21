/*************
 * UNPACK APP
 *************/
module.exports = paths => {
	const path    = require('path');
	const unzip   = require('extract-zip');
	const bufMsgs = require(`${paths.helpers}/buffer-msgs`);
	const appZip  = path.join(paths.root, 'app.zip');

	const runTask = () => {
		const opts = { dir: paths.root };
		return new Promise((resolve, reject) => {
			return unzip(appZip, opts, e => {
				if (e) return reject(bufMsgs.getE(e));
				return resolve('Unpacked App');
			});
		});
	};

	return runTask();
};