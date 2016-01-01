module.exports = angular.module('app', [])
	.controller('appController', ['$scope', function($scope) {
		$scope.user = {};
		$scope.user.firstName = 'Joe';
	}]);