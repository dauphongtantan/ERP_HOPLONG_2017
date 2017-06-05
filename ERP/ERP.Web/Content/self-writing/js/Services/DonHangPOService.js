app.service('DonHangPOService', function ($http) {
    this.get_danhsachPO = function (isadmin,username,macongty) {
        return $http.get("/api/Api_DonHangPO/GetBH_DON_HANG_PO/" + isadmin + '/' + username + '/' + macongty).then(function (response) {
            return response.data;
        });
    };

    this.get_thongtinchungPO = function (masoPO) {
        return $http.get("/api/Api_DonHangPO/GetThongtinChung/" + masoPO).then(function (response) {
            return response.data;
        });
    };

    this.get_thongtinchitietPO = function (masoPO) {
        return $http.post("/api/Api_ChiTiet_DonHangPO/ThongtinChitiet/" + masoPO).then(function (response) {
            return response.data;
        });
    };

    this.save_thongtinchungPO = function (masoPO,data_save) {
        return $http.put('/api/Api_DonHangPO/PutBH_DON_HANG_PO/' + masoPO, data_save);
    };

    this.delete_thongtinchungPO = function (masoPO) {
        return $http.delete('/api/Api_DonHangPO/DeleteBH_DON_HANG_PO/' + masoPO);
    };
});