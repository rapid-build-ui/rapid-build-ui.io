/*******************
 * CHANGELOG ROUTES
 *******************/
const axios    = require('axios');
const mdToHtml = require('marked');
const renderer = new mdToHtml.Renderer();

/* Html Tweaks
 **************/
renderer.link = (href, title, text) => { // :string (add to all links: target="_blank")
	const attrs = {
		title: !!title ? ` title="${title}"` : ''
	}
	return `<a target="_blank" href="${href}"${attrs.title}>${text}</a>`;
}

/* Routes
 *********/
const Routes = app => {
	app.get('/api/:component/changelog', async (req, res) => {
		const component = req.params.component;
		const branch    = req.query.branch || 'master';
		const config = {
			method: 'get',
			baseURL: 'https://raw.githubusercontent.com/rapid-build-ui/',
			url: `${component}/${branch}/CHANGELOG.md`
		}
		try {
			const changelog = await axios.request(config);
			const data      = changelog.data;
			const markdown  = mdToHtml(data, { renderer });
			res.type('html').send(markdown);
		} catch (error) {
			const { status, statusText } = error.response;
			const data = {
				status,
				statusText,
				message: error.message
			}
			res.type('json').status(status).send(data);
		}
	});
}

/* Export it!
 *************/
module.exports = Routes;