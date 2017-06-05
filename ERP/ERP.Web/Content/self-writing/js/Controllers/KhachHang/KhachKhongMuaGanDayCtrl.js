app.controller('KhachKhongMuaGanDayCtrl', function ($scope, $http) {
    var salehienthoi = $('#salehienthoi').val();
    var macongty = $('#macongty').val();
    var isadmin = $('#isadmin').val();
    //Lấy dữ liệu
    $scope.GetDataKH_Khong_Mua_Gan_Day = function (page) {
        var thongtintimkiem = {
            ussername: salehienthoi,
            macongty: macongty,
            isadmin: isadmin
        }
        $http.post(window.location.origin + '/api/Api_BaoCaoKhachHang/KH_Khong_Mua_Gan_Day/' + page, thongtintimkiem)
         .then(function (response) {
             if (response.data) {
                 $scope.ListDataKH_Khong_Mua_Gan_Day = response.data;
             }
         }, function (error) {
             console.log(error);
         })
    }
    $scope.GetDataKH_Khong_Mua_Gan_Day(1);

});