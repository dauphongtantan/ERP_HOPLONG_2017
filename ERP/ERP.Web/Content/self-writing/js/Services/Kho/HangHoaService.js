app.service('hanghoaService', function ($http) {
    this.find_hanghoa = function (ma_chuan) {
        return $http.post("/api/Api_HanghoaHL/TimKiemHH/" + ma_chuan).then(function (response) {
            return response.data;
        });
    }
    this.get_hanghoa = function (ThamSo) {
        return $http.post("/api/Api_HanghoaHL/GetAllHH",ThamSo).then(function (response) {
            return response.data;
        });
    }




    this.get_nhomhang = function () {
        return $http.get("/api/Api_NhomVTHHHL").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_HanghoaHL/PostHH", data_add);
    };

    this.save = function (data_update) {
        return $http.put("/api/Api_HanghoaHL/PutDM_HANG_HOA", data_update);
    }

    this.delete = function (data_delete) {
        return $http.delete("/api/Api_HanghoaHL/DeleteDM_HANG_HOA", data_delete);
    }
    //this.get_hangtonkho = function (id) {
    //    return $http.get("/api/Api_Checktonkho/" + id).then(function (response) {
    //        return response.data;
    //    });
    //};
    this.get_quantam = function (username) {
        return $http.get("/api/Api_HangDuocQuanTam/" + username).then(function (response) {
            return response.data;
        });
    }
});