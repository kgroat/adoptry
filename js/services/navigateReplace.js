var moduleName = require('./moduleName');

angular.module(moduleName)
.factory('navigateReplace', function($state, $ionicHistory) {
  function go(name, params, options){
    params = params || {};
    options = options || {};
    options.back = options.back || 1;
    options.location = 'replace';
    for(var i=0; i<options.back; i++){
      $ionicHistory.currentView($ionicHistory.backView());
    }
    return $state.go(name, params, options);
  }
  return {
    go: go
  }
});