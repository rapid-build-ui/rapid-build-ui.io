angular.module('rapid-build').controller('validationController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) => {
		// Builder
		// =======
		$scope.markup = `
<form action="/examples/validation">
	<rb-input
		name="name"
		label="Name"
		validation='[
			"required"
		]'>
	</rb-input>
	<rb-button
		size="small"
		type="submit">
		Submit
	</rb-button>
</form>
		`.trim();
}]);