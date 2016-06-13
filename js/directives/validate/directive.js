var moduleName = 'validateDirective';
angular.module(moduleName, [])
  .directive('validate', function(){
    return {
      priority: 0,
      require: '?ngModel',
      restrict: 'A',
      link: {
        pre: validateLink
      },
      scope: {
        'ngModel': '='
      },
      controller: function($scope, $timeout){
        $scope.$watch('ngModel', function(){
          $scope.$checkValidate();
        });
      }
    }
  });

module.exports = moduleName;

function validateLink(scope, element, attrs, ctrl) {
  checkValidity();

  function checkValidity(){
    if(element.length === 0){ return; }

    var isValid;
    if(ctrl){
      isValid = ctrl.$valid;
    } else {
      isValid = element[0].validity.valid;
    }

    var $label = element.parent('label');
    $label.toggleClass('valid', isValid);
    $label.toggleClass('invalid', !isValid);
  }
  scope.$checkValidate = checkValidity;
}
