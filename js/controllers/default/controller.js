var moduleName = require('../moduleName');
angular.module(moduleName)
  .controller('DefaultCtrl', function ($scope, $state, storage) {
    function redirect(){
      if(storage.get('zip')){
        $state.go('app.petList');
      } else {
        $state.go('welcome');
      }
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(toState.name === 'default'){
        redirect();
      }
    });
  });