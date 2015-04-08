angular.module('controlCajaApp', ['ui.router', 'ngCookies', 'ngResource', 'abFiltros', 'abDirectivas']);

angular.module('controlCajaApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('total', {
            url: '/',
            controller: 'CajaCtrl as caja',
            templateUrl: 'static/controlcaja/total.html'
        })
        .state('nuevo', {
            url: '/nuevo',
        
            controller: 'CajaCtrl as caja',
            templateUrl: 'static/controlcaja/nuevo.html'
        })
        .state('lista', {
            url: '/lista',
            controller: 'CajaCtrl as caja',
            templateUrl: 'static/controlcaja/lista.html'
        })
        .state('movimiento', {
            url: '/movimiento/:_id',
            controller: 'MovimientoCtrl as vm',
            templateUrl: 'static/movimiento/movimiento.html'
        })
        .state('registro', {
            url: '/registro',
            controller: 'RegistroCtrl as registro',
            templateUrl: 'static/registro/registro.html'
        }).state('dashboard', { // Nuevo estado para el dashboard
            url: '/dashboard', 
            controller: 'DashboardCtrl as vm',
            templateUrl: 'static/dashboard/dashboard.html'
        });

});