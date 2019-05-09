/****************
 * ROUTE SERVICE
 ****************/
const Type = require('./type');

module.exports = {
	get: {
		code(req) { // HttpStatusCode<int>
			let { code } = req.query;
			if (Type.is.string(code) && code.trim().length)
				code = parseInt(code);
			if (!Type.is.int(code)) code = 200;
			return code;
		},
		delay(req) { // Promise<seconds<int>>
			let { delay } = req.query;
			if (Type.is.string(delay) && delay.trim().length)
				delay = parseFloat(delay);
			if (!Type.is.int(delay)) delay = 0;
			return new Promise(resolve => {
				if (!delay) return resolve(delay);
				const msDelay = delay * 1000; // seconds to milliseconds
				setTimeout(resolve, msDelay, delay);
			})
		}
	}
};