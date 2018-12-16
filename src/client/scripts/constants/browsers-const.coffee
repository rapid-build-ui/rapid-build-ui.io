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
		Chrome full support.
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
		Safari full support.
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
		Firefox full support.
		<rb-popover fit-content icon-size="1.1">
			Firefox full support starting at
			<a target="_blank" href="https://goo.gl/eckZud">version 63</a>.<br>
			For versions less than 63 do the following:
			<ol>
				<li>
					Open its <a target="_blank" href="https://goo.gl/cmG8fk">configuration editor</a>.
				</li>
				<li>
					Set the following <strong>preferences to true</strong>:
					<ul>
						<li>dom.webcomponents.customelements.enabled</li>
						<li>dom.webcomponents.shadowdom.enabled</li>
					</ul>
				</li>
			</ol>
		</rb-popover>
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
		Opera full support.
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
		Microsoft Edge currently unsupported until
		<strong>custom elements</strong> and
		<strong>shadow dom</strong> is supported.
		<a target="_blank" href="https://goo.gl/WB51yG" title="Microsoft Edge Dev Blog">Please
		join the thousands of people and upvote for them</a>.
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