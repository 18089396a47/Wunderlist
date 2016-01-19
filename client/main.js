require('angular-cookies');
var app = angular.module('mainForm', ['ngCookies'])
	.controller('mainController', ['$scope', '$cookies', '$http', function($scope, $cookieStore, $http) {
		$scope.user = $cookieStore.get('user').split('\"')[1];
		$http.get('/', {
				params: {
					user: $scope.user
				}
			})
			.then(function(res) {
				$scope.lists = res.data;
			}, function() {});
	}])
	.controller('listController', ['$scope', '$http', '$location', function($scope, $http, $location) {
		if (!$scope.$parent.list) {
			var id = $location.$$url;
			var list = id.substr(id.lastIndexOf('/') + 1);
			$scope.$parent.list = list;
		}
		$http.get('/list/' + $scope.$parent.list, {
				params: {
					list: $scope.$parent.list
				}
			})
			.then(function(res) {
				$scope.$parent.tasks = res.data;
			}, function() {});
	}])
	.config(function($stateProvider, $locationProvider) {
		$stateProvider
			.state('main.list', {
				url: 'list/:id',
				templateUrl: '',
				controller: 'listController'
			});
		$locationProvider.html5Mode(true);
	})
	.directive('addButton', function($http) {
		return {
			restrict: 'EAM',
			link: function(scope, element, attrs) {
				var isEnter = false;
				element.on('mouseenter', function(e) {
					element[0].classList.add('focus');
					isEnter = true;
				});
				element.on('mouseleave', function(e) {
					if (document.activeElement !== element[0].children[1] && !element[0].children[1].value) {
						element[0].classList.remove('focus');
					}
					isEnter = false;
				});
				element[0].children[1].addEventListener('focusout', function(e) {
					if (!element[0].children[1].value && !isEnter) {
						element[0].classList.remove('focus');
					}
				});
				element.on('keydown', function(e) {
					if (e.keyCode === 13) {
						var val = element[0].children[1].value;
						if (val) {
							var name = element[0].children[0].innerText;
							element[0].children[1].value = '';
							if (name === 'Add List') {
								$http.post('/', {
										listname: val,
										user: scope.user
									})
									.then(function(res) {
										scope.lists.push({
											name: val
										});
									}, function() {
										console.log(arguments);
									});
							} else if (name === 'Add Task') {
								$http.post('/list/' + scope.list, {
										taskname: val,
										listname: scope.list
									})
									.then(function(res) {
										scope.tasks.push({
											name: val
										});
									}, function() {
										console.log(arguments);
									});
							} else if (name === 'Share To User') {
								$http.put('/list/' + scope.list.name, {
										user: val,
										listname: scope.list
									})
									.then(function(res) {
										scope.$parent.flag = !scope.$parent.flag;
									}, function() {
										console.log(arguments);
										scope.$parent.flag = !scope.$parent.flag;
									});
							} else {}
						}
					}
				});
			}
		};
	})
	.directive('list', function($http, $state) {
		return {
			restrict: 'EAM',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					$http.get('/list/' + scope.$parent.list, {
							params: {
								list: scope.$parent.list
							}
						})
						.then(function(res) {
							scope.$parent.tasks = res.data;
						}, function() {});
					$state.go('main.list', {
						id: scope.$parent.list
					});
				});
			}
		};
	})
	.directive('share', function($http) {
		return {
			restrict: 'EAM',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					//$http.put
				});
			}
		};
	});
module.exports = app.name;