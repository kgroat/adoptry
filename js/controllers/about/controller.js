var moduleName = require('../moduleName');
angular.module(moduleName)
  .controller('AboutCtrl', function ($scope, config) {
    $scope.version = config.version;
  });