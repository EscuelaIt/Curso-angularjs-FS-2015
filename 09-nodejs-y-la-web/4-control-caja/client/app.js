// tenemos que cambiar la dependencia hacia el nuevo módulo
angular.module('controlCajaApp', ['ui.router']);

// las rutas ahora se maneja con el concepto de estado
angular.module('controlCajaApp').config(function ($stateProvider,$locationProvider) {
	$stateProvider
        .state('total', {
			url: '/',
            controller: 'CajaCtrl as caja',
            templateUrl: 'total.html'
        })
        .state('nuevo', {
			url: '/nuevo',
			controller: 'CajaCtrl as caja',
            templateUrl: 'nuevo.html'
        })
        .state('lista', {
        	url: '/lista',    
			controller: 'CajaCtrl as caja',
            templateUrl: 'lista.html'
        }).state('not-found', {
        	url: '*path',    
            controller: 'CajaCtrl as caja',
            templateUrl: 'total.html'
        });
});