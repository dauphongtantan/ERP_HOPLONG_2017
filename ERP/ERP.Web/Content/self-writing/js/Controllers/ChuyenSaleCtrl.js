app.controller('chuyensaleCtrl', function (chuyensaleService, khachhangService, $scope,$http) {
    $scope.load_listchuyensale = function () {
        var username = $('#username').val();
        chuyensaleService.get_listchuyensale(username).then(function (a) {
            $scope.list_chuyensale = a;
        });
        $scope.check = function () {
            return true;
        };
        
    };
    $scope.load_listchuyensale();

    $scope.save = function (entry) {
        $scope.entry = entry;
        var data_save = {
            ID : $scope.entry.ID,
            MA_KHACH_HANG: $scope.entry.MA_KHACH_HANG,
            SALE_HIEN_THOI: $scope.entry.SALE_HIEN_THOI,
            KHO_PHU_TRACH: $scope.entry.KHO_PHU_TRACH,
            SALE_CU: $scope.entry.SALE_CU,
            SALE_CU_2: $scope.entry.SALE_CU_2,
            SALE_ME : $scope.entry.SALE_ME
        }
        chuyensaleService.save_listchuyensale(data_save).then(function () {
            $scope.load_listchuyensale();
        });
    };


    //$scope.add = function (entry) {
    //    $scope.entry = entry;
    //    var data_add = {
    //        ID: $scope.entry.ID,
    //        MA_KHACH_HANG: $scope.entry.MA_KHACH_HANG,
    //        SALE_HIEN_THOI: $scope.entry.SALE_HIEN_THOI,
    //        SALE_SAP_CHUYEN: $scope.entry.SALE_SAP_CHUYEN,
    //        SALE_CU: $scope.entry.SALE_CU,
    //        SALE_CU_2: $scope.entry.SALE_CU_2,
    //    }
    //    chuyensaleService.add_listchuyensale(data_add).then(function () {
    //        $scope.load_listchuyensale();
    //    });
    //};
    var tmpDate = new Date();

    $scope.newField = {};

    $scope.editing = false;

    $scope.editAppKey = function (field) {
        
        $scope.entry = field;
        if ($scope.entry.SALE_HIEN_THOI != null || $scope.entry.SALE_SAP_CHUYEN != null || $scope.entry.SALE_CU != null || $scope.entry.SALE_CU_2 != null) {
            $scope.check1 = 'editMode';
        } else {
            $scope.check2 = 'editMode';
        }
    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {
            $scope.appkeys[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }
        
    };

    $scope.cancel = function (index) {
        //if ($scope.editing !== false) {
        //    $scope.appkeys[$scope.editing] = $scope.newField;
        //    $scope.editing = false;
        //}
        $scope.load_listchuyensale();
    };

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();

    $scope.load_nhanvienkho = function () {
        $http.get('/api/Api_NhanvienKD/GetNhanvienKho').then(function (response) {
            $scope.list_nhanvienkho = response.data;
        });
    }
    $scope.load_nhanvienkho();
});