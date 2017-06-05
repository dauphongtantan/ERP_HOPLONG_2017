app.service('PhieuBaoGiaService', function ($http) {
    this.get_phieubaogia = function (so_bao_gia,macongty) {
        return $http.get('/api/Api_PhieuBaoGia/GetThongTinChung/' + so_bao_gia + '/' + macongty).then(function (response) {
            return response.data;
        });
    };
    this.get_ct_phieubaogia = function (so_bao_gia) {
        return $http.get('/api/Api_PhieuBaoGia/GetThongTinChiTiet/' + so_bao_gia).then(function (response) {
            return response.data;
        });
    };

});