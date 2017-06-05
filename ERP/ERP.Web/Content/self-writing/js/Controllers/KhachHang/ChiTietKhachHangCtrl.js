app.controller('ChiTietKhachHangCtrl', function ($scope, $http) {
    // var salehienthoi = $('#salehienthoi').val();
    //var macongty = $('#macongty').val();
   // var isadmin = $('#isadmin').val();
    //Lấy dữ liệu

    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return

    $scope.GetKhachHang = function (makhachhang) {
        $http.post('/api/Api_ChiTietKhachHang/LayChiTietKH/' + makhachhang)
         .then(function (response) {
             if (response.data) {
                 $scope.ThongTinKhachHang = response.data;
             }
         }, function (error) {
             console.log(error);
         })
    }
    $scope.GetKhachHang(url);




});