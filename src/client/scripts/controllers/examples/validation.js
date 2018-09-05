angular.module('rapid-build').controller('validationController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) => {

		// Builder
		// =======

		$scope.markup =  `
<form name="demoForm" action="/examples/validation">
	<rb-input
		label="First Name"
		validation='[
			"required"
		]'>
	</rb-input>

	<button type="submit">Submit</button>
</form>
		`.trim();


}]);