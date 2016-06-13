var moduleName = require('../moduleName');
angular.module(moduleName)
  .controller('PetListCtrl', function ($scope, petService) {
    $scope.hasError = false;
    $scope.pets = [];
    $scope.offset = 0;

    function getData(pet){
      var gender = (pet.sex === 'M' ? 'Male' : 'Female');
      var breeds = pet.breeds.join(' / ');
      var mix = (pet.mix === 'yes' ? 'Mix' : '');
      return pet.age + ' ' + gender + ' ' + breeds + ' ' + mix;
    }
    $scope.getData = getData;

    var isLoading = false;

    function loadMore(){
      if(isLoading) { return; }
      isLoading = true;
      $scope.hasError = false;
      petService.getList($scope.offset).then(function(data){
        $scope.pets.push.apply($scope.pets, data.pets);
        $scope.offset = data.offset
        $scope.$broadcast('scroll.infiniteScrollComplete');
        isLoading = false;
      }, function(err){
        $scope.hasError = true;
        isLoading = false;
      });
    }
    $scope.loadMore = loadMore;

    function setActionOpen(newVal){
      $scope.actionOpen = newVal;
    }
    $scope.setActionOpen = setActionOpen;
    
    $scope.actionRedirect = function(location){
      if($scope.actionOpen){
        window.location = location;
      }
    };

    $scope.mapStatus = function(status){
      switch(status){
        case 'A': return 'Adoptable';
        case 'H': return 'On Hold';
        case 'P': return 'Pending Adoption';
        case 'X': return 'Adopted';
        default: return 'Unknown';
      }
    }

    $scope.getUrl = function(pet){
      if(!pet){ return '#' }
      return '#/app/pet/'+pet.id+'/'+encodeURIComponent(pet.name.replace(/\//g, '$s$'));
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(fromState.name === 'app.petListFilter'){
        $scope.pets = [];
        $scope.offset = 0;
      }
      if(toState.name === 'app.petList' && $scope.pets.length === 0){
        loadMore();
      }
    });
  });