app.controller('DoanhSoCtrl', function ($http, $scope) {
    $scope.newdate = new Date();
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    var macongty = $('#macongty').val();
    var thang = 0;
    var nam = 0;
    $(document).ready(function () {
        var newdate = $('#newdate').text();
        thang = newdate.substring(3, 5);
        nam = newdate.substring(6, 10);

        $http.post('/api/Api_DoanhSo/DoanhSoThang/' + thang + '/' + nam + '/' + username).then(function (response) {
            $scope.list_doanhso = response.data;
        });

        $http.post('/api/Api_DoanhSo/TongHopDoanhSo/' + thang + '/' + nam + '/' + macongty + '/' + isadmin).then(function (response) {
            $scope.list_tonghopdoanhso = response.data;
            $scope.thanghientai = thang;
            $scope.namhientai = nam;
        });
    });

    
});