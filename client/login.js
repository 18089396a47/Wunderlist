require('angular-ui-router');
require('angular-cookies');
var app = angular.module('loginForm', ['ui.router', 'ngCookies'])
	.controller('loginController', ['$state', '$cookieStore', function($state, $cookieStore) {
		$cookieStore.remove('user');
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
					$http.post('/login', {
							username: name,
							password: pass
						})
						.then(function() {
							$cookieStore.put('user', name);
							$state.go('main');
						}, function() {});
				});
			}
		};
	})
	.directive('registerSubmit', function($http, $cookieStore, $state) {
		return {
			restrict: 'EAM',
			controller: 'loginController',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					e.preventDefault();
					var name = document.querySelector('#register-form #username').value;
					var pass = document.querySelector('#register-form #password').value;
					var passConf = document.querySelector('#register-form #confirm-password').value;
					if (pass !== passConf) {
						alert('Please, confirm the password');
					} else {
						$http.post('/register', {
								username: name,
								password: pass
							})
							.then(function() {
								$cookieStore.put('user', name);
								$state.go('main');
							}, function() {});
					}
				});
			}
		};
	});

module.exports = app.name;