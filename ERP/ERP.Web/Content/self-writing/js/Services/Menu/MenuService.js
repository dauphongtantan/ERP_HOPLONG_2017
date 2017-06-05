app.service('menuService', function ($http) {
    this.get_menu = function (username) {
        return $http.get('/api/Api_ListMenu/' + username).then(function (response) {
            return response.data;
        });
    };

    this.save_menu = function (maphongban, username, mamenu, data_save) {
        return $http.put('/api/Api_MENU_USER/' + maphongban + '/' + username + '/' + mamenu, data_save);
    }

    this.get_menucha = function (username, menucha) {
        return $http.get('/api/Api_ListMenu/' + username + '/' + menucha).then(function (response) {
            return response.data;
        });
    }

    this.get_listmenucha = function (username, menucha) {
        return $http.get('/api/Api_ListMenuCha/' + username + '/' + menucha).then(function (response) {
            return response.data;
        });
    }
});