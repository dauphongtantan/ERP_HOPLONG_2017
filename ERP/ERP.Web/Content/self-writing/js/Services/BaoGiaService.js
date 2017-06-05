app.service('baogiaService', function ($http) {
    this.load_dondukien = function (madk) {
        return $http.get('/api/Api_BaoGia_DonHangDuKien/BH_DON_HANG_DU_KIEN/' + madk).then(function (response) {
            return response.data;
        });
    };
    this.load_baogiatheodukien = function (madk,macongty) {
        return $http.get('/api/Api_BaoGia/BaoGiaTheoDuKien/' + madk + '/' + macongty).then(function (response) {
            return response.data;
        });
    };

    this.get_phieubaogia = function (so_bao_gia) {
        return $http.get('/api/Api_DuyetBaoGia/GetDuyet_Bao_Gia/' + so_bao_gia).then(function (response) {
            return response.data;
        });
    };

    this.get_ct_phieubaogia = function (so_bao_gia) {
        return $http.get('/api/Api_PhieuBaoGia/GetThongTinChiTiet/' + so_bao_gia).then(function (response) {
            return response.data;
        });
    };

    this.copynewbg = function (thongtinchung) {
        return $http.post('/api/Api_ChiTietBaoGia/CopyNewBaoGia', thongtinchung);
    };
});