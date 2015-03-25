angular.module('controlCajaApp', ['ngRoute']);

angular.module('controlCajaApp').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'CajaCtrl',
            controllerAs: 'caja',
            templateUrl: 'total.html'
        })
        .when('/nuevo', {
            controller: 'CajaCtrl',
            controllerAs: 'caja',
            templateUrl: 'nuevo.html'
        })
        .when('/lista', {
            controller: 'CajaCtrl',
            controllerAs: 'caja',
            templateUrl: 'lista.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});