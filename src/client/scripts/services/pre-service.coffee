angular.module('rapid-build').service 'preService', [->
	# private
	# =======
	PRE_REGEX = /(<pre\s*?[^]*?>)([^]*?)(<\/\s*?pre\s*?>)/gi

	# methods
	# =======
	@has =
		newLines: (text) ->
			index = text.indexOf '\n'
			index isnt -1

		pre: (text) ->
			PRE_REGEX.test text

		tabs: (text) ->
			index = text.indexOf '\t'
			index isnt -1

	@get =
		firstCharIndex: (text) ->
			text.search /\S/

		firstLineTabsCnt: (text) ->
			index      = @firstCharIndex text
			whitespace = text.substring 0, index
			tabs       = whitespace.match /\t/g
			return 0 unless tabs
			tabs.length

		formattedText: (text) ->
			tabsCnt = @firstLineTabsCnt text
			re      = new RegExp "\n\t{#{tabsCnt}}", 'g'
			text    = text.trim().replace re, '\n'
			text

		text: (text) =>
			return text if typeof text isnt 'string'
			text = text.trimRight()
			return text.trim() unless @has.newLines(text) and @has.tabs text
			text = @get.formattedText text

		pre: (text) => # formatted
			return text unless @has.pre text
			text.replace PRE_REGEX, (match, open, content, close) =>
				content = @get.text content
				"#{open}#{content}#{close}"

	return
]