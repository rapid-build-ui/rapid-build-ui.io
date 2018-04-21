/******
 * LOG
 ******/
module.exports = (msg, type='attn') => {
	var hasLines, length, lines, method, newLine, sep;
	method   = type === 'error' ? 'error' : 'log';
	newLine  = '\n';
	hasLines = msg.indexOf(newLine) !== -1;
	length   = hasLines ? 0 : msg.length;

	if (hasLines) {
		lines = msg.split(newLine);
		for (let line of lines) {
			if (line.length <= length) continue;
			length = line.length;
		}
	}

	sep = '-'.repeat(length);
	console[method](sep[type]);
	console[method](msg[type]);
	console[method](sep[type]);
};