app.service('chuyensaleService', function ($http) {
    this.get_listchuyensale = function (username) {
        return $http.get('/api/Api_ChuyenSale/KH_CHUYEN_SALES/' + username).then(function (response) {
            return response.data;
        });
    };

    this.save_listchuyensale = function (data_save) {
        return $http.post('/api/Api_ChuyenSale/XuLyChyenSale', data_save);
    };

    this.add_listchuyensale = function (data_add) {
        return $http.post('/api/Api_ChuyenSale',data_add);
    };
});