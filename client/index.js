require('angular-ui-router');
module.exports = angular.module('index', [require('./login'), require('./main'), 'ui.router'])
	.controller('indexController', function($state) {
	})
	.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'main.html'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'login.html'
			});
		$locationProvider.html5Mode(true);
	}]);