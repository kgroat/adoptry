var moduleName = require('./moduleName');
var Bluebird = require('bluebird');
var Promise = Bluebird.Promise;

function $qBluebird(resolver) {
  return new Promise(resolver);
}

Promise.config({
	cancellation: true
});

$qBluebird.prototype = Promise.prototype;

angular.extend($qBluebird, Promise);

//Make bluebird API compatible with angular's subset of Q
//Adapted from: https://gist.github.com/petkaantonov/8363789 and https://github.com/petkaantonov/bluebird-q

$qBluebird.defer = function() {
  var deferred = {};
  deferred.promise = $qBluebird(function(resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  deferred.promise.progressCallbacks = [];
  deferred.notify = function(progressValue) {
    deferred.promise.progressCallbacks.forEach(function(cb){ typeof cb === 'function' && cb(progressValue) });
  };
  return deferred;
};

$qBluebird.reject = $qBluebird.rejected;
$qBluebird.when = $qBluebird.cast;

var originalAll = $qBluebird.all;
$qBluebird.all = function(promises) {

  if (typeof promises === 'object' && !Array.isArray(promises)) {
    return $qBluebird.props(promises);
  } else {
    return originalAll(promises);
  }

};

var originalThen = $qBluebird.prototype.then;
$qBluebird.prototype.then = function(fulfilledHandler, rejectedHandler, progressHandler) {
  if (this.progressCallbacks) {
    this.progressCallbacks.push(progressHandler);
  }
  return originalThen.call(this, fulfilledHandler, rejectedHandler, progressHandler);
};

var originalFinally = $qBluebird.prototype.finally;
$qBluebird.prototype.finally = function(finallyHandler, progressHandler) {
  if (this.progressCallbacks) {
    this.progressCallbacks.push(progressHandler);
  }
  return originalFinally.call(this, finallyHandler);
};

// You should override this, see the readme
$qBluebird.onPossiblyUnhandledRejection(function(err) {
  console.warn('Unhandled rejection:', err);
});

var ngModule = angular
  .module(moduleName)
  .constant('Bluebird', $qBluebird)
  .run(function($rootScope, Bluebird) {
    Bluebird.setScheduler(function(cb){ 
			$rootScope.$evalAsync(cb)
		});
  });