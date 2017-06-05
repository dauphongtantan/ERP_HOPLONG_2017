
app.controller('TimKhachHangCtrl', function ($scope, $http) {
    var salehienthoi = $('#salehienthoi').val();
    var macongty = $('#macongty').val();
    var isadmin = $('#isadmin').val();
    var phongban = $('#maphongban').val();

    $scope.timkiemkhachhang = function (tukhoa) {
 
            var thongtintimkiem = {
                sales: salehienthoi,
                macongty: macongty,
                isadmin: isadmin,
                tukhoa: tukhoa
            }
            $http.post('/api/Api_KH/TimKhachTheoSDT/' + 1, thongtintimkiem)
          .then(function successCallback(response) {
              $scope.filtered = response.data;

          }, function errorCallback(response1) {
              ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
        }



 

});