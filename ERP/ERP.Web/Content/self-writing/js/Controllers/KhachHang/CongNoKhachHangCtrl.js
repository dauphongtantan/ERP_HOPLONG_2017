app.controller('CongNoKhachHangCtrl', function ($scope, $http) {
    var salehienthoi = $('#salehienthoi').val();
    var macongty = $('#macongty').val();
    var isadmin = $('#isadmin').val();
    //Lấy dữ liệu
    $scope.GetDataCongNoKH = function (tuancongno) {
        $http.post(window.location.origin + '/api/Api_KH_CongNo/CongNoTheoNhanVien/' + macongty + '/' + salehienthoi + '/' + isadmin + '/' + tuancongno)
         .then(function (response) {
             if (response.data) {
                 $scope.ListCongNoKH = response.data;
             }
         }, function (error) {
             console.log(error);
         })
    }

});