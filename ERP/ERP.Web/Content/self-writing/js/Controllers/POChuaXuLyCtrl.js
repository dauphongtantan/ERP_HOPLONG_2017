app.controller('POChuaXuLyCtrl', function ($http, $scope, POChuaXuLyService) {
    var salehienthoi = $('#username').val();
    var macongty = $('#macongty').val();
    $scope.load_listPOchuaxuly = function () {
        POChuaXuLyService.get_list_pochuaxuly(salehienthoi,macongty).then(function (a) {
            $scope.list_pochuaxuly = a;
        });
    };
    $scope.load_listPOchuaxuly();
});