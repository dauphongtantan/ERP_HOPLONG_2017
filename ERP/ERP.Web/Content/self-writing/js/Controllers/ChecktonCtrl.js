app.controller('ChecktonCtrl', function (ChecktonService, $scope) {
    $scope.datatonkho = function (sotrang) {
        ChecktonService.get_dataton(sotrang).then(function (a) {
            $scope.listtonkho = a;
        });
    };
    $scope.datatonkho(1);
});
