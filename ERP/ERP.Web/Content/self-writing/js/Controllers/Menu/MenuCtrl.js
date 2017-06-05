app.controller('menuCtrl', function (menuService, $scope) {
    var maphongban = $('#maphongban').val();
    var username = $('#username').val();
    $scope.load_menu = function () {
        var username = $('#username').val();
        menuService.get_menu(username).then(function successCallback(response1) {
            $scope.danhsachmenu = response1;
        }, function errorCallback(response1) {
            ErrorSystem("Đã xảy ra lỗi");
        });
    };
    $scope.load_menu();

    $scope.edit = function (menucha) {
        var username = $('#username').val();
        menuService.get_menucha(username, menucha).then(function (a) {
            $scope.danhsachmenucha = a;
        });
    };
    $scope.edit("TRANG_CA_NHAN");
    $scope.push = function (zzz) {
        var username = $('#username').val();
        menuService.get_listmenucha(username, zzz).then(function (z) {
            $scope.listmenu = z;
        });
    };

    

    $scope.get = function (tendangnhap) {
        var username = $('#username').val();
        if (tendangnhap == username) {
            return ('hienthi');
        } else {
            return ('bienmat');
        }
    };

    $scope.check = function (trangthai) {
        if (trangthai == true) {
            return ('hienthi');
        } else {
            return ('bienmat');
        }
    };

    $scope.click = function (abc, item) {
        var maphongban = $('#maphongban').val();
        var username = $('#username').val();
        $scope.item = item;
        var a = $scope.item.TRANG_THAI;
        var data_save = {
            MA_PHONG_BAN: maphongban,
            USERNAME: username,
            TRANG_THAI: a,
            MA_MENU: abc
        }
        menuService.save_menu(maphongban, username, abc, data_save).then(function (response) {
            $scope.load_menu();
        });
    }
});