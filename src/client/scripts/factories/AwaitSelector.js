/*************************
 * AWAIT SELECTOR FACTORY
 *************************/
angular.module('rapid-build').factory('AwaitSelector', [function() {
	const AwaitSelector = (selector, callback, opts={}) => {
		opts.once = opts.once || false;
		opts.root = opts.root || document;

		const api = {
			observer: undefined,
			promise: undefined,
			destroy: undefined
		};

		api.promise = new Promise((resolve, reject) => {
			let status = 'pending';

			api.observer = new MutationObserver(mutations => { // :void
				try { // try in case bad selector
					const newElms = [];

					for (const mutation of mutations) {
						const nodes = mutation.addedNodes;
						for (const node of nodes) {
							if (node.nodeType !== 1) continue; // 1 is element node
							if (node.matches(selector) && !newElms.includes(node)) {
								newElms.push(node); // added node is selector
								continue;
							}
							const elms = node.querySelectorAll(selector);
							for (const elm of elms) {
								if (newElms.includes(elm)) continue;
								newElms.push(elm); // added node has selector
							}
						}
					}

					if (!newElms.length) return;
					callback(null, newElms);

					if (!opts.once) return;
					status = 'resolved';
					api.destroy();
					return resolve(newElms);
				}
				catch(error) {
					callback(error, []);
					status = 'rejected';
					api.destroy();
					return reject(error);
				}
			});

			api.observer.observe(opts.root, {
				childList: true,
				subtree: true
			});

			api.destroy = () => { // :void
				if (status === 'pending') resolve([]);
				api.observer.disconnect();
				api.observer = null;
			}
		})

		return api;
	}

	return AwaitSelector;
}]);
