'use strict';

/* Controllers */
angular.module('DigiControl.controllers', []).controller('AppCtrl', function ($scope, $rootScope, SocketHelper, $state) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if (toState.name !== 'home') {
			if (!SocketHelper.Connected) {
				$state.go('home');
				console.log('State Change Initiated by AppCtrl')
			}
		}
	})



});
