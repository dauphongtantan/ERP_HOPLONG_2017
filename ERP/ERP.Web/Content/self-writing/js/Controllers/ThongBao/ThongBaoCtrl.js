
app.controller('ThongBaoCtrl', function ($scope, $http) {
    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();
    var MaPhongBan = $('#maphongban').val();
    function init() {
        //Get List thông báo mark
        $scope.listThongBaoMark;
        $http.get(window.location.origin + '/api/HT_ThongBaoNV/GetThongBaoMark/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.listThongBaoMark = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List thông báo phòng ban
        $scope.ListThongBaoPB = [];
        $http.get(window.location.origin + '/api/HT_ThongBaoNV/GetThongBaoPhongBan/' + MaPhongBan)
        .then(function (response) {
            if (response.data) {
                $scope.ListThongBaoPB = response.data;
            }
        }, function (error) {
            console.log(error);
        });
      
        //Get List thông báo nhân viên
        $scope.ListThongBaoNV = [];
        $http.get(window.location.origin + '/api/HT_ThongBaoNV/GetThongBaoNV/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListThongBaoNV = response.data;
            }
        }, function (error) {
            console.log(error);
        });
    }
    init();
})