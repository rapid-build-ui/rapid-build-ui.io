angular.module('rapid-build').constant 'BROWSER_SUPPORT', [
	# CHROME
	# ======
	browser: '
		<rb-icon
			size="2.5"
			kind="chrome"
			title="Chrome"
			source="brands">
		</rb-icon>
	'
	notes: '
		Fully supported.
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'no support': null
,
	# SAFARI
	# ======
	browser: '
		<rb-icon
			size="2.5"
			kind="safari"
			title="Safari"
			source="brands">
		</rb-icon>
	'
	notes: '
		Fully supported.
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'no support': null
,
	# OPERA
	# =====
	browser: '
		<rb-icon
			size="2.5"
			kind="opera"
			title="Opera"
			source="brands">
		</rb-icon>
	'
	notes: '
		Fully supported.
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'no support': null
,
	# FIREFOX
	# =======
	browser: '
		<rb-icon
			size="2.5"
			kind="firefox"
			title="Firefox"
			source="brands">
		</rb-icon>
	'
	notes: '
		Fully supported via enabling Firefox\'s
		dom.webcomponents.shadowdom.enabled
		preference (needs to be set to true).
		To change, open its
		<a target="_blank" href="https://goo.gl/cmG8fk">configuration editor</a>.<br>
		Fully supported starting at
		<a target="_blank" href="https://goo.gl/eckZud">version 63</a>.
	'
	'full support': '
		<rb-icon
			size="1.65"
			kind="flag"
			source="solid"
			class="full-support"
			title="Supported Behind Flag">
		</rb-icon>
	'
	'no support': null
,
	# EDGE
	# ====
	browser: '
		<rb-icon
			size="2.5"
			kind="edge"
			title="Microsoft Edge"
			source="brands">
		</rb-icon>
	'
	notes: '
		Edge is currently unsupported
		until they release a version with
		custom elements and shadow dom support.
		Hopefully <a target="_blank" href="https://goo.gl/WB51yG">coming soon</a>.
	'
	'full support': null
	'no support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="no-support">
		</rb-icon>
	'
,
	# INTERNET EXPLORER
	# =================
	browser: '
		<rb-icon
			size="2.5"
			kind="internet-explorer"
			title="Internet Explorer"
			source="brands">
		</rb-icon>
	'
	notes: '
		Internet Explorer unsupported.
	'
	'full support': null
	'no support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="no-support">
		</rb-icon>
	'
]