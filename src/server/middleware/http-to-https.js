/******************************
 * REDIRECT HTTP TO HTTPS
 * opts:
 *   ignoreHostnames :string[]
 *   ignoreRoutes    :string[]
 ******************************/
const isHttps = req => {
	if (req.secure) return true;
	return (req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https';
};

/* Export It!
 *************/
module.exports = (opts={}) => {
	return (req, res, next) => {
		var host, method, redirectUrl, result;
		opts.ignoreHostnames = opts.ignoreHostnames || [];
		opts.ignoreRoutes    = opts.ignoreRoutes || [];

		if (isHttps(req)) return next()
		if (opts.ignoreHostnames.includes(req.hostname)) return next();
		if (opts.ignoreRoutes.includes(req.path)) return next();

		method = req.method.toLowerCase();

		if (['get','head'].includes(method)) {
			host        = req.headers['x-forwarded-host'] || req.headers.host;
			redirectUrl = `https://${host}${req.originalUrl}`;
			return res.redirect(301, redirectUrl);
		}

		result = {
			status: 403,
			action: method,
			message: 'Please use HTTPS when submitting data to this server.'
		};

		return res.status(result.status).json(result);
	};
};