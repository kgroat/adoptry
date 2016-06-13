var moduleName = require('../moduleName');
angular.module(moduleName)
  .controller('PetListFilterCtrl', function ($scope, navigateReplace, storage) {
    $scope.filter = {};
    $scope.filter.zip = storage.get('zip');
    $scope.filter.animal = storage.get('animal');
    $scope.filter.size = storage.get('size');
    $scope.filter.sex = storage.get('sex');
    $scope.filter.age = storage.get('age');

    var backCount = 1;

    $scope.submit = function(){
      storage.set('zip', $scope.filter.zip);
      storage.set('animal', $scope.filter.animal);
      storage.set('size', $scope.filter.size);
      storage.set('sex', $scope.filter.sex);
      storage.set('age', $scope.filter.age);
      navigateReplace.go('app.petList');
    }
  });