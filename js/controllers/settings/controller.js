var moduleName = require('../moduleName');

var updateKey = 'lastUpdate';

angular.module(moduleName)
  .controller('SettingsCtrl', function ($scope, $state, $ionicPopup, config, storage) {

    $scope.checking = false;
    $scope.updating = false;
    $scope.updateSuccess = false;
    $scope.checkingError = '';
    $scope.updatingError = '';
    $scope.hasUpdate = null;
    $scope.version = config.version;

    var deploy = new Ionic.Deploy();
    deploy.setChannel(config.deployChannel);

    var updateDelay = config.updateDelay;

    var lastUpdate = storage.get(updateKey);
    if(lastUpdate){
      lastUpdate = parseInt(lastUpdate);
      $scope.lastUpdate = new Date(lastUpdate * 1000).toLocaleString();
    } else {
      lastUpdate = 0;
      $scope.lastUpdate = 'Never';
    }
  
    // Update app code with new release from Ionic Deploy
    $scope.doUpdate = function() {
      if($scope.updating) { return; }
      $scope.updating = true;
      deploy.update().then(function(res) {
        $scope.updating = false;
        var now = new Date();
        $scope.lastUpdate = now.toLocaleString();
        lastUpdate = parseInt(now.valueOf() / 1000);
        storage.set(updateKey, lastUpdate);
        $scope.updateSuccess = true;
      }, function(err) {
        $scope.updating = false;
        $scope.updatingError = err.toString();
      });
    };

    // Check Ionic Deploy for new code
    $scope.checkForUpdates = function() {
      if($scope.checking) { return; }
      $scope.checking = true;
      deploy.check().then(function(hasUpdate) {
        $scope.checking = false;
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        $scope.checking = false;
        $scope.checkingError = err.toString();
      });
    }

    $scope.clearData = function(){
      confirmClearData().then(function(shouldClear){
        if(shouldClear){
          clearDataAndReset()
        }
      });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      var currentTime = parseInt(Date.now() / 1000);
      if(currentTime - lastUpdate > updateDelay){
        $scope.checkForUpdates();
      }
    });

    function confirmClearData(){
      return $ionicPopup.show({
        title: 'Clear Data?',
        template: 'Are you sure you want to clear your data?  This will require you to re-select your search filters.',
        buttons: [
          {
            text: 'Cancel',
            type: 'button-default',
            onTap: function(e) {
              return false;
            }
          },
          {
            text: 'Clear Data',
            type: 'button-assertive',
            onTap: function(e) {
              return true;
            }
          }
        ]
      });
    }

    function clearDataAndReset(){
      storage.clear();
      $state.go('default');
      return $ionicPopup.show({
        title: 'Data Cleared',
        template: 'Your data has been cleared.',
        buttons: [
          {
            text: 'OK',
            type: 'button-default'
          }
        ]
      });
    }
  });