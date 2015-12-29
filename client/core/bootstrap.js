require('./vendor')();
var appModule = require('../');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
  });
});