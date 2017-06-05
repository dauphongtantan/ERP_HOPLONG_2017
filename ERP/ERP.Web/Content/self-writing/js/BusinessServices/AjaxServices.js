

    var block_config = {
        message: $('<img src="/Content/Images/Nganhang/default.svg"/>'),
        css: {
            border: 'none', 
            backgroundColor: 'none',
        }
    };

    function blockUI(ui) {
        if (!ui) {
            $.blockUI({
                message: $('<img src="/Content/Images/Nganhang/default.svg"/>'), css: {
                border: 'none', 
                backgroundColor: 'none',
            }});
        } else {
            ui.block({
                message: $('<img src="/Content/Images/Nganhang/default.svg"/>'), css: {
                border: 'none', 
                backgroundColor: 'none',
            }});
        }
    }

    function unBlockUI(ui) {
        if (!ui) {
            $.unblockUI();
        } else {
            ui.unblock({
                message: $('<img src="/Content/Images/Nganhang/default.svg"/>'), css: {
                border: 'none', 
                backgroundColor: 'none',
            }});
        }
    }

    angular
        .module('myApp')
        .service('ajaxService', ['$http', function ($http) {
            
            this.AjaxPost = function (data, route, successFunction, errorFunction, ui) {
                blockUI(ui);
                setTimeout(function () {
                    $http.post(route, data).then(function (response) {
                        unBlockUI(ui);
                        successFunction(response);
                    }, function (response) {
                        unBlockUI(ui);          
                        if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                        errorFunction(response);
                    });
                }, 0);

            }

            this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction, ui) {
                blockUI(ui);
                setTimeout(function () {
                    $http.post(route, data).then(function (response) {
                        unBlockUI(ui);
                        successFunction(response);
                    }, function (response) {
                        unBlockUI(ui);     
                        errorFunction(response);
                    });
                }, 0);

            }

            this.AjaxGet = function (route, successFunction, errorFunction) {
                blockUI(ui);
                setTimeout(function () {
                    $http({ method: 'GET', url: route }).then(function (response) {
                        unBlockUI(ui);
                        successFunction(response);
                    }, function (response) {
                        unBlockUI(ui);
                        if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                        errorFunction(response);
                    });
                }, 0);

            }

            this.AjaxGetWithData = function (data, route, successFunction, errorFunction, ui) {
                blockUI(ui);
                setTimeout(function () {
                    $http({ method: 'GET', url: route, params: data }).then(function (response) {
                        unBlockUI(ui);
                        successFunction(response);
                    }, function (response) {
                        unBlockUI(ui);
                        if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                        errorFunction(response);
                    });
                }, 0);

            }


            this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction, ui) {            
                setTimeout(function () {
                    $http({ method: 'GET', url: route, params: data }).then(function (response) {                 
                        successFunction(response);
                    }, function (response) {                  ;
                        if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                        errorFunction(response);
                    });
                }, 0);

            }
    }]);
