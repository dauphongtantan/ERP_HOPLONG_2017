app.controller('DonHangDaGiuCtrl', function ($scope, $http) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    var macongty = $('#macongty').val();
    $http.post('/api/Api_DonHangDaGiu/ListDonHangDaGiuChuaBan/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_donhangdagiuchuaban = response.data;
    });

    $http.post('/api/Api_DonHangDaGiu/ListDonHangDaGiu/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_donhangdagiu = response.data;
    });

    $scope.get_thongtinchungPO = function (item) {
        $scope.item = item;
        $http.post('/api/Api_DonHangPO/PrintDonPO/' + $scope.item.MA_SO_PO).then(function (response) {
            $scope.thongtinbaogia = response.data;
            $scope.thongtinchung = $scope.thongtinbaogia.ChungPO;
            $scope.thongtinchitiet = $scope.thongtinbaogia.ChiTietPO;
        });
    };

    $scope.FixThisPO = function () {
        window.location.href = '/KinhDoanh/DonHangPO/Edit/' + $scope.item.MA_SO_PO;
    };
});