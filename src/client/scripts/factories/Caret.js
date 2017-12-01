angular.module('rapid-build').factory('Caret', ['$log',
	function($log) {
		var Caret;
		return Caret = (function() {
			var getCaret, setCaret;

			getCaret = function(o) {
				var caret;
				if (o == null) {
					o = {};
				}
				caret = {};
				caret.start = typeof o.start === 'number' ? o.start : 0;
				caret.end = typeof o.end === 'number' ? o.end : 0;
				caret.text = typeof o.text === 'string' ? o.text : null;
				caret.keyCode = typeof o.keyCode === 'number' ? o.keyCode : void 0;
				caret.ctrlKey = typeof o.ctrlKey === 'boolean' ? o.ctrlKey : void 0;
				caret.shiftKey = typeof o.shiftKey === 'boolean' ? o.shiftKey : void 0;
				return caret;
			};

			setCaret = function(o) {
				this.caret = getCaret(o);
				return this;
			};

			function Caret(elm) {
				this.setElement(elm);
				setCaret.call(this);
			}

			Caret.prototype.setElement = function(elm) {
				this.elm = !elm ? null : elm;
				return this;
			};

			Caret.prototype.set = function(o) {
				var caret, selRange;
				if (o == null) {
					o = {};
				}
				caret = getCaret(o);
				caret.start = o.start;
				caret.end   = o.end || o.start;
				this.elm.selectionStart = caret.start;
				this.elm.selectionEnd   = caret.end;

				if (typeof this.elm.value !== 'undefined') {
					caret.text = this.elm.value.substring(caret.start, caret.end);
				}
				setCaret.call(this, caret);
				return this;
			};

			Caret.prototype.getElement = function() {
				return this.elm;
			};

			Caret.prototype.get = function(e) {
				var caret, range, selection, stored_range, val;
				if (e == null) {
					e = {};
				}
				caret = getCaret(e);
				caret.start = this.elm.selectionStart;
				caret.end   = this.elm.selectionEnd;

				if (typeof this.elm.value !== 'undefined') {
					caret.text = this.elm.value.substring(caret.start, caret.end);
				}
				setCaret.call(this, caret);
				return this.caret;
			};

			Caret.prototype.destroy = function() {
				return this.elm = null;
			};

			return Caret;

		})();
	}
]);
