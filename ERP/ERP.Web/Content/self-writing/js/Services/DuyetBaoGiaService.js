app.service('DuyetBaoGiaService', function ($http) {
    this.get_duyetbaogia = function (so_bao_gia) {
        return $http.get('/api/Api_DuyetBaoGia/GetDuyet_Bao_Gia/' + so_bao_gia).then(function (response) {
            return response.data;
        });
    };
    this.get_ct_duyetbaogia = function (so_bao_gia,macongty) {
        return $http.post('/api/Api_ChiTietBaoGia/CT_BAO_GIA/' + so_bao_gia + '/' + macongty).then(function (response) {
            return response.data;
        });
    };

    this.save_duyetbaogia = function (so_bao_gia,data_save) {
        return $http.put('/api/Api_DuyetBaoGia/' + so_bao_gia,data_save);
    };
});