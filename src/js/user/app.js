'use strict';

// Declare app level module which depends on filters, and services
angular.module('DigiControl', [
	'DigiControl.controllers',
	'DigiControl.filters',
	'DigiControl.services',
	'DigiControl.directives',
	'ui.router',
	'btford.socket-io',
	'rzModule',
	'ionic'
]).config(function ($stateProvider, $urlRouterProvider) {
	// ui router
	$stateProvider.state({
		name: 'home',
		url: '/home',
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	});

	$stateProvider.state({
		name: 'aux',
		url: '/aux/:id',
		templateUrl: 'templates/aux.html',
		controller: 'AuxCtrl',
	});

	$stateProvider.state({
		name: 'engFaders',
		url: '/eng/faders/{id:int}',
		templateUrl: 'templates/eng_faders.html',
		controller: 'EngFaderCtrl',
	})

	$stateProvider.state({
		name: 'eng',
		url: '/eng/select',
		templateUrl: 'templates/eng_select.html',
		controller: 'EngSelectCtrl'
	});



	// default route
	$urlRouterProvider.otherwise('/home');

	// localStorageServiceProvider.setPrefix('DigiControl');
	// localStorageServiceProvider.setStorageCookie(10*365, '/', false); // expire in ten years
})

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});
