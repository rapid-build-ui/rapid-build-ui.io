/******************
 * BUFFER MESSAGES
 ******************/
module.exports = {
	get(e, stdout, stderr) {
		let msgs = { e: '', stds: '' };
		if (e && typeof e.message === 'string') {
			msgs.e = this.getE(e);
			return msgs;
		}
		stdout = this.getStd(stdout, 'stdout');
		stderr = this.getStd(stderr, 'stderr');
		msgs.stds = `${stdout}\n${stderr}`.trim();
		return msgs;
	},

	getE(e) {
		const msg = 'Error';
		if (!e || typeof e.message !== 'string') return msg;
		return `${msg}: ${e.message}`;
	},

	getStd(std, type) {
		if (!(std && typeof std === 'string')) return '';
		return `${type}: ${std.replace(/\\n/g,'')}`.trim();
	}
};