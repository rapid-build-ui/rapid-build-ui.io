/******************************
 * COMMON RB COMPONENT OPTIONS
 ******************************/
angular.module('rapid-build').constant('RB_COMMON_API', {
options:
[
	{
		attribute: 'content',
		description: `
			<em class="info-heading">not attribute</em>
			Content inside tag.
		`,
		options: null,
		type: 'html | string',
		required: false
	},
	{
		attribute: 'dark',
		description: `
			<em class="info-heading">updates style</em>
			Applies dark theme suitable for dark backgrounds.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'data',
		description: `
			Array of
			<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
			values or
			<a target="_blank" href="https://goo.gl/uZEoeU">objects</a>.
			<em class="info-sub">see label-key
			when data is an array of objects</em>
		`,
		options: null,
		type: 'array',
		required: true
	},
	{
		attribute: 'disabled',
		description: `Disables component.`,
		options: null,
		type: `n/a | bool`,
		required: false
	},
	{
		attribute: 'horizontal',
		description: `Displays component horizontally.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'icon-burst',
		description: `
			<em class="info-heading">animation</em>
			Bursts icon.
		`,
		options: null,
		type: `n/a | bool`,
		required: false
	},
	{
		attribute: 'icon-flip',
		description: `
			Flips icon.
		`,
		options: 'horizontal | vertical | both',
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-kind',
		description: `Adds icon to component.`,
		options: `
			<a href="/components/rb-icon">rb-icon kind</a>
		`,
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-left',
		description: `
			Position icon left.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'icon-position',
		description: `
			<em class="info-heading">defaults to right</em>
			Icon position.
		`,
		options: 'left',
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-pulse',
		description: `
			<em class="info-heading">animation</em>
			Pulsates icon.
		`,
		options: null,
		type: `n/a | bool`,
		required: false
	},
	{
		attribute: 'icon-right',
		description: `
			Position icon right.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'icon-rotate',
		description: `
			<em class="info-heading">number of degrees</em>
			Rotates icon.
		`,
		options: null,
		type: 'number',
		required: false
	},
	{
		attribute: 'icon-size',
		description: `Changes icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},
	{
		attribute: 'icon-speed',
		description: `
			<em class="info-heading">defaults to 2</em>
			Animation speed. Number of seconds to complete one cycle.
		`,
		options: null,
		type: 'number',
		required: false
	},
	{
		attribute: 'icon-spin',
		description: `
			<em class="info-heading">animation</em>
			Spins icon.
		`,
		options: null,
		type: `n/a | bool`,
		required: false
	},
	{
		attribute: 'icon-source',
		description: `Refer to options.`,
		options: `
			<a href="/components/rb-icon">rb-icon source</a>
		`,
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-valign',
		description: `Vertically aligns icon.`,
		options: `
			<a href="/components/rb-icon">rb-icon valign</a>
		`,
		type: 'string',
		required: false
	},
	{
		attribute: 'inline',
		description: `
			Sets display to
			<a target="_blank" href="https://goo.gl/fpGxpN">inline</a>.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'kind',
		description: `Varies look of display.`,
		options: `danger | info | neutral | success | warning`,
		type: 'string',
		required: false
	},
	{
		attribute: 'label',
		description: `Label text.`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'label-key',
		description: `
			<em class="info-heading">data must be array of objects</em>
			Property name in data object used for component's sublabels.
		`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'name',
		description: `
			Required when doing a native browser
			form submit to submit the value.
		`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'placeholder',
		description: `Placeholder text.`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'popover',
		description: `
			<em class="info-heading">slot not attribute</em>
			Add <a href="/components/rb-popover">rb-popover</a>
			via placing it inside tag with slot="popover".
		`,
		options: null,
		type: 'html',
		required: false
	},
	{
		attribute: 'readonly',
		description: `
			Makes component's value
			readable but not editable.
		`,
		options: null,
		type: `n/a | bool`,
		required: false
	},
	{
		attribute: 'right',
		description: `Align's component right.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'size',
		description: `Changes the size.`,
		options: 'big | small',
		type: 'string',
		required: false
	},
	{
		attribute: 'sublabel',
		description: `Sublabel text.`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'subtext',
		description: `Additional information.`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'type',
		description: `
			<em class="info-heading">defaults to text</em>
			Input type attribute.
		`,
		options: 'number',
		type: 'string',
		required: false
	},
	{
		attribute: 'validation',
		description: `
			Validation for component's value.
			<em class="info-sub">for a detailed explanation
			refer to
			<a href="/components/rb-input">rb-input validation</a></em>
		`,
		options: null,
		type: 'array',
		required: false
	},
	{
		attribute: 'value',
		description: `
			Any
			<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
			value or
			<a target="_blank" href="https://goo.gl/uZEoeU">object</a>.
		`,
		options: null,
		type: `primitives | object`,
		required: false
	}
],

/* Get Option (always use this)
 *******************************/
get(attr, overrides={}) { // :{} (common option)
	const overKeys = Object.keys(overrides);
	const optKeys  = Object.keys(this.options[0]);
	const attrKey  = optKeys[0]; // attribute
	let opt = this.options.find(obj => obj[attrKey] === attr);
	opt = Object.assign({}, opt); // clone common api option
	if (!Object.keys(opt).length) {
		console.error(`Invalid common api option: "${attr}"`);
		return opt;
	}
	if (!overKeys.length) return opt;
	const valids   = optKeys.slice(1);
	const invalids = overKeys.filter(key => !valids.includes(key));
	for (const invalid of invalids) {
		let error = `Invalid common api option property: "${invalid}"`;
		if (invalid === attrKey) error += ` is readonly`;
		delete overrides[invalid];
		console.error(error);
	}
	Object.assign(opt, overrides);
	return opt;
}
})