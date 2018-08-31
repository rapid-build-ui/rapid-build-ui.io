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
		Fully supported (rock solid!).
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'partial support': null
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
		All good besides a
		few minor display issues.
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'partial support': null
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
		(needs to be set to true).
		To change preferences in Firefox, visit
		<a target="_blank" href="https://goo.gl/cmG8fk">about:config</a>.
	'
	'full support': '
		<rb-icon
			size="1.65"
			kind="flag"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'partial support': null
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
		Fully supported (never ceases to amaze).
	'
	'full support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="full-support">
		</rb-icon>
	'
	'partial support': null
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
		Edge has major issues, however
		some things do work via including the
		<a target="_blank" href="https://git.io/vFMnE">webcomponentsjs polyfill</a>.
	'
	'full support': null
	'partial support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="partial-support">
		</rb-icon>
	'
	'no support': null
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
		Internet Explorer not supported. We only support
		<a target="_blank" href="https://goo.gl/q9cxrY">evergreen browsers</a>.
	'
	'full support': null
	'partial support': null
	'no support': '
		<rb-icon
			size="2"
			kind="check"
			source="solid"
			class="no-support">
		</rb-icon>
	'
]