var moduleName = require('../moduleName');
angular.module(moduleName)
  .controller('PetDetailsCtrl', function ($stateParams, $scope, $ionicGesture, $timeout, petService, Spinner) {
    $scope.pet = null;
    $scope.contactVisible = false;
    $scope.hasError = false;
    $scope.isAndroid = ionic.Platform.isAndroid();

    function loadPet(){
      $scope.hasError = false;
      petService.get($stateParams.id).then(function(pet){
        $scope.pet = pet;
      }, function(err){
        $scope.hasError = true;
      });
    }
    $scope.loadPet = loadPet;

    $scope.getName = function(){
      var name = $stateParams.name;
      if(name){
        name = decodeURIComponent(name).replace(/\$s\$/g, '/');
      } else if($scope.pet){
        name = $scope.pet.name;
      } else {
        name = 'Pet Details';
      }
      return name;
    }

    $scope.alert = function(text){
      window.alert(text);
    }

    $scope.mapGender = function(gender){
      return gender === 'M' ? 'Male' : 'Female'
    }

    $scope.mapBreeds = function(breeds, mix){
      mix = mix.toLowerCase() === 'yes';
      breeds = breeds.join(', ');
      if(mix){
        breeds += ' mix';
      }
      return breeds;
    }

    $scope.mapStatus = function(status){
      switch(status){
        case 'A': return 'Adoptable';
        case 'H': return 'On Hold';
        case 'P': return 'Pending Adoption';
        case 'X': return 'Adopted';
        default: return 'Unknown';
      }
    }

    $scope.mapSize = function(size){
      switch(size){
        case 'S': return 'Small';
        case 'M': return 'Medium';
        case 'L': return 'Large';
        case 'XL': return 'Extra Large';
        default: return 'Unknown';
      }
    }

    $scope.mapType = function(type){
      switch(type){
        case 'barnyard': return 'Barn Animal';
        case 'bird': return 'Bird';
        case 'cat': return 'Cat';
        case 'dog': return 'Dog';
        case 'horse': return 'Horse';
        case 'pig': return 'Pig';
        case 'reptile': return 'Reptile';
        case 'smallfurry': return 'Small Animals';
        default: return type;
      }
    }

    $scope.has = function(options, value){
      var exists = options.indexOf(value) >= 0;
      return exists ? 'Yes' : 'No';
    }

    $scope.toggleContact = function(){
      $scope.contactVisible = !$scope.contactVisible;
      console.log('contactVisible:', $scope.contactVisible);
    }

    function getBareTelephone(phone){
      return phone.replace(/[^0-9]/g, '');
    }

    $scope.hasNumbers = function(phone){
      if(!phone) { return false; }
      phone = getBareTelephone(phone);
      return !!phone.length;
    }

    $scope.getTelephoneLink = function(pet){
      if(!pet){ return 'javascript:void(0)' }

      var phone = getBareTelephone(pet.contact.phone);
      if(phone[0] !== '1'){
        phone = '1' + phone;
      }
      phone = '+' + phone;

      return 'tel:' + phone;
    }

    $scope.getEmailLink = function(pet){
      if(!pet){ return 'javascript:void(0)' }
      return 'mailto:' + pet.contact.email + '?Subject=' + encodeURIComponent(pet.name);
    }

    $scope.getFullAddress = function(pet){
      if(!pet){ return ''; }

      var fullAddress = pet.contact.address1.trim();
      if(pet.contact.address2){
        fullAddress += ' ' + pet.contact.address2.trim();
      }
      if(pet.contact.city){
        fullAddress += ' ' + pet.contact.city.trim();
      }
      if(pet.contact.state){
        fullAddress += ', ' + pet.contact.state.trim();
      }
      if(pet.contact.zip){
        fullAddress += ' ' + pet.contact.zip.trim();
      }
      return fullAddress;
    }

    $scope.getAddressLink = function(pet){
      if(!pet){ return 'javascript:void(0)' }

      var baseUrl;

      if(ionic.Platform.isAndroid()){
        baseUrl = 'https://maps.google.com/?q=';
      } else if(ionic.Platform.isIOS()){
        baseUrl = 'https://maps.apple.com/?q=';
      }

      var fullAddress = $scope.getFullAddress(pet);
      var query = fullAddress.replace(/\s/g, '+');

      return baseUrl + query;
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(toState.name === 'app.petDetails' || toState.name === 'app.petDetailsNamed' || toState.name === 'app.randomPetDetails'){
        loadPet();
      }
    });
  });