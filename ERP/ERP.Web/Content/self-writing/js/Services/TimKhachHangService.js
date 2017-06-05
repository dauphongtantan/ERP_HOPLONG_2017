app.service('TimKhachHangService', function ($http) {
    this.find_khachhang = function (sdt) {
        return $http.get("/api/TimKiemKhachHang/GetKH/" + sdt).then(function (response) {
            return response.data;
        });
    }
   
});