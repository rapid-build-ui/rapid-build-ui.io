/**********************************************
 * AWAIT ELEMENTS TO BE INSERTED INTO DOM
 * Promise resolves when observer disconnects.
 **********************************************/
const AwaitSelector = (selector, callback, opts = {}) => new Promise((resolve, reject) => {
	const { once = false, root = document } = opts;

	let observer = new MutationObserver(mutations => { // :void
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

			if (!once) return;
			destroy(); return resolve(newElms);
		}
		catch(error) {
			callback(error, []);
			destroy(); return reject(error);
		}
	});

	observer.observe(root, {
		childList: true,
		subtree: true
	});

	const destroy = () => { // :void
		observer.disconnect();
		observer = null;
	}
});

/* Export it!
 *************/
export default AwaitSelector;