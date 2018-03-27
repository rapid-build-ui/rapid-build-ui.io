/* TEMPLATE TAGS HELPER
 ***********************/
// Helpers
const Helpers = {
	cleanArray(array) { // :[]
		return array.filter(entry => /\S/.test(entry));
	},
	stripIndent(string) { // :string
		return string.replace(/\t/g,'');
	}
}

/* API
 ******/
const Templates = {
	stripIndent(tpls, ...exps) { // :string
		let results = [];
		for (const [i, tpl] of tpls.entries()) {
			let result = exps[i] ? tpl + exps[i] : tpl;
			result = Helpers.stripIndent(result);
			results.push(result);
		}
		return results.join('').trim();
	},

	underline(tpls, ...exps) { // :string
		const underline = '-';
		let results     = [];
		let lines       = []
		let longestLine = 0;
		for (const [i, tpl] of tpls.entries()) {
			let result = exps[i] ? tpl + exps[i] : tpl;
			results.push(result);
		}
		results = this.stripIndent`${results.join('')}`;
		lines   = lines.concat(results.split('\n'));
		for (const line of lines) {
			let length = line.length;
			if (length <= longestLine) continue;
			longestLine = length + 1;
		}
		if (longestLine) results += `\n${Array(longestLine).join(underline)}`;
		return results;
	}
}

/* Export It!
 *************/
module.exports = Templates;