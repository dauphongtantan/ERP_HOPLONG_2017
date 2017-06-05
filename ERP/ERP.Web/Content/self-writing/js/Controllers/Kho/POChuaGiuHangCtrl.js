
app.controller('POChuaGiuHangCtrl', function ($scope, $http) {

    var macongty = $('#macongty').val();

    //Get Danh sách dự kiến theo sale
    $scope.getListPOChuaGiuHang = function () {

        $http.get('/api/Api_ListPo/GetListPOCanGiuHang/'+ macongty)
            .then(function (response) {
                $scope.DanhSachPOChuaGiu = response.data;
            }, function (error) {
                ErrorSystem("Không lấy được dữ liệu đơn PO cần giữ");
            });
    }
    $scope.getListPOChuaGiuHang();
    //-------------------------------


});
