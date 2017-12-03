angular.module('rapid-build').directive('rbaBuilder', [
	'$compile', 'idService', '$document', '$timeout',
	function($compile, idService, $document, $timeout) {
		var doc, link;
		doc = $document[0];
		link = function(scope, iElement, iAttrs, controller) {
			var buildStr, builderWatch, canDestroy, id, oldScope, timer;
			buildStr = iAttrs.rbaBuilder;
			if (!buildStr) {
				return;
			}
			id = 'built___' + idService.next();
			oldScope = null;
			timer = null;
			canDestroy = false;
			builderWatch = scope.$watch(buildStr, function(newVal, oldVal) {
				var compileScope, elmBuilt, elmChild, elmChildren, elmTemplate, isFlexsetOrTable, isValid, quotationMarks, template;
				if (newVal === void 0) {
					return;
				}
				elmBuilt = doc.getElementById(id);
				if (elmBuilt) {
					angular.element(elmBuilt).replaceWith(iElement);
				}
				template = newVal.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
				template = '<div id="' + id + '">' + template + '</div>';
				elmTemplate = angular.element(template);
				elmChild = elmTemplate.children().eq(0);
				elmChildren = elmTemplate[0].childNodes;
				if (elmChildren.length === 1 && elmChildren[0].nodeType === 1) {
					elmChild.attr('id', id);
					isFlexsetOrTable = elmChild[0].nodeName && elmChild[0].nodeName.toLowerCase().indexOf('flexset') !== -1 || elmChild[0].nodeName.toLowerCase().indexOf('table') !== -1;
					if (!isFlexsetOrTable) {
						template = elmChild[0].outerHTML;
					}
				}
				quotationMarks = template.match(/"/g);
				isValid = quotationMarks && quotationMarks.length % 2 === 0;
				if (isValid === false) {
					return;
				}
				compileScope = !angular.isUndefined(iAttrs.newScope) ? scope.$new() : scope;
				$compile(template)(compileScope, function(elm) {
					if (iElement.children().eq(0)) {
						iElement.children().eq(0).remove();
					}
					iElement.replaceWith(elm);
					if (oldScope && oldScope.$destroy && canDestroy) {
						oldScope.$destroy();
						oldScope = null;
					}
					return timer = $timeout(function() {
						oldScope = isFlexsetOrTable ? elm.children().eq(0).isolateScope() : elm.isolateScope();
						if (!oldScope) {
							oldScope = elm.scope();
						}
						return canDestroy = oldScope && scope.$id !== oldScope.$id;
					}, 0);
				});
				return elmBuilt = elmTemplate = elmChild = elmChildren = null;
			});
			scope.$on('$destroy', function() {
				if (timer) {
					$timeout.cancel(timer);
				}
				return builderWatch();
			});
		};
		return {
			link: link,
			restrict: 'A'
		};
	}
]);
