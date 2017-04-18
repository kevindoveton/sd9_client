angular.module('DigiControl.controllers').controller('HomeCtrl', function($scope, $state, SocketHelper, $ionicPlatform) {

	$scope.ippattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
	$scope.portpattern = /\d{1,4}/;

	$scope.ip = '192.168.1.201';
	$scope.port = '8000';

	$scope.connect = function() {
		if ($scope.ip !== undefined && $scope.port !== undefined) {
			SocketHelper.Connect($scope.ip, $scope.port);
			$state.go('app.fbselect');
		}
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
