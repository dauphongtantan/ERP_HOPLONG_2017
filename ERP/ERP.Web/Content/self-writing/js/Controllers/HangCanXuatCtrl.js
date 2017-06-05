app.controller('HangCanXuatCtrl', function ($http, $scope) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    var macongty = $('#macongty').val();
    $scope.load_hangcanxuat = function () {
        return $http.get('/api/Api_HangCanXuat/GetBH_DON_HANG_PO/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_hangcanxuat = response.data;
        });
    };
    $scope.load_hangcanxuat();

    // List hang can xuat
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuat/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuat_kd = response.data;
    });

    //List hang can xuat da giu
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuatDaGiu/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuatdagiu_kd = response.data;
    });

    // List hang can xuat chua giu
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuatChuaGiu/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuatchuagiu_kd = response.data;
    });

    // List hang can xuat da ban
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuatDaBan/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuatdaban_kd = response.data;
    });

    //List hang can xuat da dat hang
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuatDaDatHang/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuatdadathang_kd = response.data;
    });

    // List hang can xuat chua dat hang
    $http.post('/api/Api_HangCanXuatKinhDoanh/ListHangCanXuatChuaDatHang/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.list_hangcanxuatchuadathang_kd = response.data;
    });
});