/*****************
 * EDITOR FACTORY
 *****************/
angular.module('rapid-build').factory('Editor', [function() {
	// true if phone or tablet
	const IS_MOBILE = typeof window.orientation !== 'undefined' ||
					  navigator.userAgent.indexOf('IEMobile') !== -1;

	const Modes = { // convenience map
		bash:       { name: 'shell' },
		shell:      { name: 'shell' },
		css:        { name: 'css' },
		less:       { name: 'text/x-less' },
		sass:       { name: 'text/x-scss' },
		htmlmixed:  { name: 'htmlmixed' },
		html:       { name: 'xml', htmlMode: true }, // default
		javascript: { name: 'javascript' },
		js:         { name: 'javascript' },
		json:       { name: 'javascript', json: true }
	};

	const getPrivates = () => {
		return {
			_code:   undefined,
			_opts:   {},
			_props:  {},
			_events: {},

			get code() { // :{} CodeMirror Instance
				return this._code;
			},

			get opts() { // :{}
				return Object.assign(this._opts, this._props, this._events);
			},

			set code(editor) {
				this._code = editor;
			},

			set props(opts) {
				this._props = {
					smartIndent:    false,
					viewportMargin: Infinity, // monitor performance (maybe 50)
					indentWithTabs: opts.indentWithTabs === false ? false : true,
					placeholder:    opts.placeholder,
					lineNumbers:    opts.lineNumbers !== undefined,
					lineWrapping:   opts.lineWrap  !== undefined,
					readOnly:       !!opts.readonly && true,
					mode:           Modes[opts.mode] || Modes.html,
					theme:          opts.theme || 'one-dark'
				}
			},

			set events(opts) {
				this._events = {
					onLoad: editor => { // :void
						this.code = editor;

						if (this._code.getOption('readOnly'))
							this._updateReadonlyOpts();

						setTimeout(() => {
							if (!this._code) return;
							this._code.refresh(); // ensures accurate display
						});
					}
				}
			},

			destroy() { // :void
				if (!this._code) return;
				this._code.off('copy', this._handlers.copy);
				this._code = null;
			},

			_updateReadonlyOpts() { // :void
				this._code.setOption('cursorBlinkRate', -1); // hides cursor
				if (!IS_MOBILE) return;
				// mobile only: prevents keyboard from popping up
				this._code.setOption('readOnly', 'nocursor');
				this._handlers.copy = this._handlers.copy.bind(this);
				this._code.on('copy', this._handlers.copy);
			},

			_handlers: {
				copy(cm, evt) { // :void (mobile only)
					evt.codemirrorIgnore = true; // ignore codemirror copy and use browser's
				}
			}
		};
	}

	return function(opts={}) {
		const __ = getPrivates();

		class Editor {
			constructor(opts) {
				__.props  = opts;
				__.events = opts;
			}

			/* API
			 ******/
			get code() { // :{} (set in __.events.onload())
				return __.code;
			}

			get modes() { // :{}
				return Modes;
			}

			get opts() { // :{}
				return __.opts;
			}

			destroy() { // :void
				__.destroy();
			}
		}

		return new Editor(opts);
	}
}]);
