
var app = angular.module('myApp1', []);
app.controller('RegisterCtrl', RegisterCtrl)
RegisterCtrl.$inject = ['$scope', '$http'];
function RegisterCtrl($scope, $http) {
    $scope.add = function () {

        var data_add = {
            USERNAME: $scope.phone,
            HO_VA_TEN: $scope.fullname,
            EMAIL: $scope.email,
            PASSWORD: $scope.password

        }
        $http.post("/api/Api_Register", data_add).then(function (response){
        });
    }
}
