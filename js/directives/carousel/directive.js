var moduleName = 'carouselDirective';
angular.module(moduleName, [])
  .directive('carousel', function(){
    return {
      restrict: 'E',
      scope: {
        photos: '=',
        tmpThumbs: '=thumbnails'
      },
      templateUrl: 'directives/carousel/template.html',
      controller: carouselCtrl
    }
  });

module.exports = moduleName;

function carouselCtrl($scope, $ionicGesture, $timeout) {
  $scope.chosenImage = 0;
  $scope.dragPosition = 0;
  $scope.dragging = false;
  $scope.swipeDone = true;
  $scope.thumbnails = $scope.tmpThumbs || $scope.photos;

  $scope.$watch('tmpThumbs', function(){
    $scope.thumbnails = $scope.tmpThumbs || $scope.photos;
  });

  $scope.setPhoto = function(i){
    $scope.chosenImage = i;
  }

  $scope.nextImage = function(){
    if($scope.swipeDone){
      return;
    }
    $scope.swipeDone = true;
    $scope.chosenImage = Math.min($scope.chosenImage + 1, $scope.photos.length - 1);
  }

  $scope.previousImage = function(){
    if($scope.swipeDone){
      return;
    }
    $scope.swipeDone = true;
    $scope.chosenImage = Math.max($scope.chosenImage - 1, 0);
  }

  $scope.dragImage = function(event){
    $scope.dragging = true;
    $scope.swipeDone = false;
    var delta = event.gesture.deltaX;
    if(delta > 0 && $scope.chosenImage === 0){
      $scope.dragPosition = 0;
    } else if(delta < 0 && $scope.chosenImage === $scope.photos.length - 1){
      $scope.dragPosition = 0;
    } else {
      $scope.dragPosition = delta;
    }
  }

  $scope.dropImage = function(event){
    $scope.dragging = false;
    if($scope.dragPosition < window.innerWidth * -0.5){
      $scope.nextImage();
    } else if($scope.dragPosition > window.innerWidth * 0.5){
      $scope.previousImage();
    }
    $timeout(function(){
      $scope.dragPosition = 0;
    }, 100);
  }
}