angular.module('DigiControl.controllers').controller('HomeCtrl', function($scope, $state, SocketHelper, $ionicPlatform, $interval) {

	$scope.ippattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
	$scope.portpattern = /\d{1,4}/;

	$scope.ip = '192.168.1.201';
	$scope.port = '8000';

	$scope.services = [];

	$scope.connect = function(host) {
		if (host == undefined) {
			if ($scope.ip !== undefined && $scope.port !== undefined) {
				SocketHelper.Connect($scope.ip, $scope.port);
				$state.go('app.fbselect');
			}
		}
		else {
			SocketHelper.Connect(host.hostname, host.port);
			$state.go('app.fbselect');
		}
	}

	$interval(function() {
		var zeroconf = cordova.plugins.zeroconf;
		zeroconf.watch('_digicontrol._udp.', 'local.', function(result) {
			var found = false;
			for (var i = 0; i < $scope.services.length; i++) {
				if ($scope.services[i].hostname == result.service.hostname) {
					found = true;
					break;
				}
			}
			if (!found) {
				$scope.services.push(result.service)
			}
		}, function(e) {
			console.log('failed', e);
		});
	}, 1000);

});
