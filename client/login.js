require('angular-ui-router');
require('angular-cookies');
var app = angular.module('loginForm', ['ui.router', 'ngCookies'])
	.controller('loginController', ['$state', function($state) {
		$state.go('loginForm');
	}])
	.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
		$stateProvider
			.state('loginForm', {
				templateUrl: 'views/login.view.html',
				controller: 'loginController'
			});
		$locationProvider.html5Mode(true);
	}])
	.directive('loginTab', function() {
		return {
			restrict: 'EAM',
			controller: 'loginController',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					e.preventDefault();
					document.querySelector('#login-form')
						.classList.add('active');
					document.querySelector('#register-form')
						.classList.remove('active');
				});
			}
		};
	})
	.directive('registerTab', function() {
		return {
			restrict: 'EAM',
			controller: 'loginController',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					e.preventDefault();
					document.querySelector('#login-form')
						.classList.remove('active');
					document.querySelector('#register-form')
						.classList.add('active');
				});
			}
		};
	})
	.directive('loginSubmit', function($http, $cookieStore, $state) {
		return {
			restrict: 'EAM',
			controller: 'loginController',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					e.preventDefault();
					var name = document.querySelector('#username').value;
					var pass = document.querySelector('#password').value;
				//	console.log(name, pass);
					$http.post('/login', {
							username: name,
							password: pass
						})
						.then(function() {
							//console.log(arguments[0]);
							$cookieStore.put('user', name);
							$state.go('main');
						}, function() {
							//console.log(arguments[0]);
						});
				});
			}
		};
	});

module.exports = app.name;