(function () {
    var menuCtrl = function ($state) {
        this.isActive = function (estado) {
			return $state.is(estado);
        }
    }
    angular.module('controlCajaApp').controller('MenuCtrl',menuCtrl);
}());