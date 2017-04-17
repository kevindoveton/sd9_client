angular.module('DigiControl.controllers').controller('FoldbackSelectCtrl', function($scope, $state, SocketHelper, $ionicPlatform) {

	SocketHelper.RequestConfig();
	SocketHelper.RequestAuxNames();

	$scope.$on('socket:announcements', function (ev, data) {
		$scope.aux = [];
		data = JSON.parse(data);
		for (var i = 1; i <= data.auxOutputs; i++) {
			$scope.aux.push({name: 'Output '+i, id: i});
		}
	});

	$scope.$on('socket:name/aux', function (ev, data) {
		data = JSON.parse(data);

		console.log(data);
		$scope.aux[data['a']-1].name = data['n'];
	});

	$scope.services = [
		{
			name: 'dhcp'
		}
	]

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
