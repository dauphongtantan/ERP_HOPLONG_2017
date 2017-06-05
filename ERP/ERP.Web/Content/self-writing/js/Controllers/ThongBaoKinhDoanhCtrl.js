app.controller('ThongBaoKinhDoanhCtrl', function ($scope, $http) {
    var username = $("#username").val();
    var macongty = $("#macongty").val();
    window.setInterval(function () {
        //get data khách hàng
        $http.get(window.location.origin + '/api/Api_BaiViet_TongHop/GetThongBaoKinhDoanh/' + username)
             .then(function (response) {
                 if (response.data) {
                     $scope.ListThongBao = response.data;

                 }
             }, function (error) {
                 ErrorSystem(error);
             });
        $scope.so_thong_bao();
    },5000);
    
    //get số thông báo
    $scope.so_thong_bao = function () {
        $http.get(window.location.origin + '/api/Api_BaiViet_TongHop/GetSoThongBaoKinhDoanh/' + username)
        .then(function (response) {
            if (response.data) {
                $scope.sothongbao = response.data;

            }
        }, function (error) {
            ErrorSystem(error);
        });
    }
    



    $scope.ReadNotification = function (id) {
        $http.put(window.location.origin + '/api/Api_BaiViet_TongHop/ReadNotification/' + id)
        .then(function (response) {
            
        }, function (error) {
            ErrorSystem(error);
        });

    }
    //$scope.DanhSachNotification1 = [];
    //$scope.danhsachm = [];

    //$scope.dsmarketing = function (makh) {
    //    $http.get(window.location.origin + '/api/Api_BaiViet_TongHop/GetAllMarketing/' + macongty)
    //    .then(function (response) {
    //        if (response.data) {
    //            $scope.danhsachm = response.data;
    //            for (i = 0; i < $scope.danhsachm.length; i++){
    //                var data_Notification = {
    //                    NGUOI_DUNG: $scope.danhsachm[i].USERNAME,
    //                    LINK_THONG_BAO: '/Khachhang/details/' + makh,
    //                    NOI_DUNG_THONG_BAO: username + ' đã thêm mới 1 phản hồi của khách hàng ' + makh
    //                }
    //                $scope.DanhSachNotification1.push(data_Notification);
    //            }
    //            console.log($scope.DanhSachNotification1);
    //        }
    //        else {
    //            console.log("lỗi");
    //        }
    //    }, function (error) {
    //        console.log(error);
    //    });
    //}
    //$scope.dsmarketing("KH0001");

  
});