angular.module('DigiControl.controllers').controller('HomeCtrl', function($scope, $state, SocketHelper, $ionicPlatform) {

	$scope.connect = function() {
		console.log($scope.ip)
		// SocketHelper.Connect('localhost', 8000);
		// $state.go('fbselect');
	}

	$scope.search = function() {
		console.log('search')
		var zeroconf = cordova.plugins.zeroconf;
		console.log(zeroconf);
		zeroconf.watch('_digicontrol._udp._local.', function(result) {
			console.log(result.service);
			$scope.services.push(result.service)
		}, function(e) {
			console.log('failed', e);
		});
	}

});
