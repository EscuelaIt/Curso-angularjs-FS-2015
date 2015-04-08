(function() {
    "use strict";

    angular
        .module("controlCajaApp")
        .controller("DashboardCtrl", function (socketFactory) {
            var vm = this;
            socketFactory.connect();
            socketFactory.on('total_updated', function (msgIn) {
				vm.total = msgIn[0];
            });
        });
    
}());