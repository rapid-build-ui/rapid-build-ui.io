/***********
 * {{upName}}
 ***********/
import { RbBase, props, html } from '../../rb-base/scripts/rb-base.js';
import template                from '../views/{{name}}.html';

export class {{className}} extends RbBase() {
	/* Properties
	 *************/
	static get props() {
		return {
			kind: props.string
		};
	}

	/* Template
	 ***********/
	render({ props, state }) { // :string
		return html template;
	}
}

customElements.define('{{name}}', {{className}});
