(function () {
    var menuCtrl = function ($location) {
        this.isActive = function (ruta) {
            return ruta === $location.path();
        }
    }
    angular.module('controlCajaApp').controller('MenuCtrl',menuCtrl);
}());