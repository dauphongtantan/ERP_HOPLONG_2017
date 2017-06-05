app.service('TonCacNoiService', function ($http) {
    this.get_dataton = function (machuan) {
        return $http.get("/api/Api_TonKhoHL/GetHH_TON_KHO/" + machuan+"/1").then(function (response) {
            return response.data;
        });
    }
});
