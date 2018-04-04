/***********
 * {{upName}}
 ***********/
import { PolymerElement, html } from '../../../@polymer/polymer/polymer-element.js';
import template from '../views/{{name}}.html';

export class {{className}} extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
	}

	/* Properties
	 *************/
	static get properties() {
		return {
			kind: {
				type: String,
				value: 'default'
			}
		}
	}

	/* Template
	 ***********/
	static get template() { // :string
		return html template;
	}
}

customElements.define('{{name}}', {{className}});
