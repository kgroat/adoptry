var moduleName = require('./moduleName');
angular.module(moduleName)
.factory('Error', function($ionicPopup, $rootScope) {
  return {
    show: function(error) {
      if(error.message){
        error = error.message;
      }
      var scope = $rootScope.$new();
      scope.error = error;
      return $ionicPopup.alert({
        template: '{{error}}',
        title: 'An error occurred',
        subTitle: 'Please try again',
        scope: scope
      });
    }
  };
});