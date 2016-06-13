var moduleName = require('./moduleName');
angular.module(moduleName)
.factory('Spinner', function($ionicLoading, Bluebird, $rootScope) {
  function show(extraText, onCancel){
    var scope = undefined;
    var template = '<ion-spinner></ion-spinner>';
    if(extraText){
      template += '<p>' + extraText + '</p>';
    }
    if(typeof onCancel === 'function'){
      scope = $rootScope.$new();
      scope.cancel = onCancel;
      template += '<div><button class="button button-dark" ng-click="cancel()">Cancel</button></div>'
    }
    $ionicLoading.show({
      template: template,
      scope: scope
    });
  }
  function hide() {
    $ionicLoading.hide();
  }
  function fromPromise(promise, extraText){
    show(extraText);
    return promise.then(function(resolved){
      return resolved;
    }, function(rejected){
      return Bluebird.reject(rejected);
    }).finally(function(){
      hide();
    });
  }
  function fromCancellable(cancellable, extraText){
    show(extraText, cancellable.cancel.bind(cancellable));
    return cancellable.then(function(resolved){
      return resolved;
    }, function(rejected){
      return Bluebird.reject(rejected);
    }).finally(function(){
      hide();
    });
  }
  return {
    show: show,
    hide: hide,
    fromPromise: fromPromise,
    fromCancellable: fromCancellable
  };
});