angular.module('rapid-build').run(['$rootScope', '$location', 'typeService', ($rootScope, $location, typeService) => {
	const doc             = window.document;
	const SEPARATOR       = '·';
	const DOC_TITLE       = `${doc.title} ${SEPARATOR}`;
	const SEPARATOR_INDEX = DOC_TITLE.indexOf(SEPARATOR) + 2;
	const COMMON_TITLE    = DOC_TITLE.slice(0, SEPARATOR_INDEX);
	const FORMAT_MAP = {
		nodashes(v) { return v.replace(/-/g, ' ') },
		lowercase: 'toLowerCase',
		titlecase: 'toTitleCase',
		uppercase: 'toUpperCase'
	}

	var setTitle = title => { // :void
		doc.title = `${COMMON_TITLE} ${title}`;
	};

	var getTitle = (title, opts={}) => { // :string
		switch(typeService.get(opts.format)) {
			case 'boolean': title = title; break;
			case 'string': title = getFormattedTitle(title, opts.format); break;
			case 'array':
				for (let format of opts.format)
					title = getFormattedTitle(title, format);
				break;
			default:
				for (let format of ['nodashes', 'titlecase'])
					title = getFormattedTitle(title, format);
		}
		return title;
	};

	var getFormattedTitle = (title, format) => { // :string
		if (!typeService.is.string(format)) return title;
		format = format.toLowerCase();
		for (let [key, formatter] of Object.entries(FORMAT_MAP)) {
			if (key !== format) continue;
			title = typeService.is.function(formatter) ? formatter(title) : title[formatter]();
		}
		return title;
	};

	$rootScope.$on('$routeChangeSuccess', (e, current, previous) => { // :void
		if (!current.$$route) return;
		if (current.redirectTo) return;
		var path = $location.path();

		// route is homepage
		if (path === '/') return setTitle('Web Components');

		// route.title :string
		var title     = current.$$route.title, // :string | {}
			titleOpts = typeService.is.object(title) ? title : void 0;
		if (typeService.is.string(title)) return setTitle(title);

		// route.title :{} | undefined
		var lastChar = path[path.length - 1];
		if (lastChar === '/') path = path.slice(0, -1);
		var index = path.lastIndexOf('/') + 1, // last url slash index
			title = path.slice(index);         // last url segment

		title = getTitle(title, titleOpts);
		setTitle(title);
	});
}]);