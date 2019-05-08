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
		Chrome fully supported.
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
		Safari fully supported.
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
		Firefox fully supported.
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
		Opera fully supported.
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
	# EDGE CHROMIUM
	# =============
	browser: '
		<rb-icon
			size="2.5"
			kind="edge"
			title="Microsoft Edge"
			source="brands">
		</rb-icon>
	'
	notes: '
		Microsoft Edge on Chromium fully supported.
		<ul>
			<li>
				future version
			</li>
			<li>
				<a target="_blank" href="https://www.youtube.com/watch?v=dKmzyj-ovkg" title="preview video">
					coming soon...
				</a>
			</li>
			<li>
				<a target="_blank" href="https://www.microsoftedgeinsider.com/">
					download here
				</a>
			</li>
		</ul>
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
		Microsoft Edge unsupported.
	'
	'full support': null
	'no support': '
		<rb-icon
			size="2.07"
			kind="times"
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
			size="2.07"
			kind="times"
			source="solid"
			class="no-support">
		</rb-icon>
	'
]