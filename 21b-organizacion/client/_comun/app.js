angular.module('controlCajaApp', ['ui.router','ngCookies', 'ngResource', 'abFiltros','abDirectivas']);

angular.module('controlCajaApp').config(function ($stateProvider,$locationProvider) {
	$stateProvider
        .state('total', {
			url: '/',
            controller: 'CajaCtrl as caja',
            templateUrl: 'controlcaja/total.html'
        })
        .state('nuevo', {
			url: '/nuevo',
			controller: 'CajaCtrl as caja',
            templateUrl: 'controlcaja/nuevo.html'
        })
        .state('lista', {
        	url: '/lista',    
			controller: 'CajaCtrl as caja',
            templateUrl: 'controlcaja/lista.html'
        })
		.state('movimiento', {
        	url: '/movimiento/:id',    
			controller: 'MovimientoCtrl as vm',
            templateUrl: 'movimiento/movimiento.html'
        })
        .state('registro', {
        	url: '/registro',    
			controller: 'RegistroCtrl as registro',
            templateUrl: 'registro/registro.html'
        })
        .state('not-found', {
        	url: '*path',    
            templateUrl: '_comun/not-found.html'
        });
});