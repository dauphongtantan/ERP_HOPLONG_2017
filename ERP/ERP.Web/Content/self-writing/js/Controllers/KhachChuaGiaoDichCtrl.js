app.controller('KhachChuaGiaoDichCtrl', function (KhachChuaGiaoDichService, $scope) {
    var sales = $('#username').val();
    var macongty = $('#macongty').val();
    $scope.datakhachchuagiaodich = function (username) {
        KhachChuaGiaoDichService.get_dskhachchuagiaodich(username,macongty).then(function (a) {
            $scope.listkhachchuagiaodich = a;
        });
    };
    $scope.datakhachchuagiaodich(sales);
});
