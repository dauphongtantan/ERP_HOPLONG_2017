app.service('XuLyHoiGiaService', function ($http) {
    this.get_xulyhoigia = function (macongty,data) {
        return $http.get('/api/Api_XuLyYeuCauHoiGia/GetMH_XL_YEU_CAU_HOI_GIA/' + macongty,data).then(function (response) {
            return response.data;
        });
    };

    this.load_xulyhoigia = function (idYCHG) {
        return $http.post('/api/Api_LoadXuLyYeuCauHoiGia/Load_XL_HOIGIA/', idYCHG).then(function (response) {
            return response.data;
        });
    };

    this.save_stt = function (id,status) {
        return $http.put('/api/Api_XuLyYeuCauHoiGia/PutMH_YEU_CAU_HOI_GIA/' + id, status);
    };
});