app.service('KhachChuaGiaoDichService', function ($http) {
    this.get_dskhachchuagiaodich = function (username,macongty) {
        return $http.get("/api/Api_DSKhachGiaoDich/GetKHChuaPhatSinh/" + username + '/' + macongty).then(function (response) {
            return response.data;
        });
    }
});
