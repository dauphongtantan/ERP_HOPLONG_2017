app.controller('HeSoGiaBanCtrl', function ($http, $scope,$filter) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();



    $scope.arrayVTHHFinded = [];
    $scope.arrayVTHH = [];
    $scope.showtable_VTHH = false;

    $http.post(window.location.origin + '/api/Api_HeSoGiaBan/NhomVTHH/' + isadmin + '/' + username)
            .then(function (response) {
                if (response.data) {
                    $scope.arrayVTHH = response.data;
                    $scope.arrayVTHHFinded = $scope.arrayVTHH.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onVTHHFind = function () {
        if (!$scope.MA_NHOM_HANG_CHI_TIET) {
            $scope.arrayVTHHFinded = $scope.arrayVTHH.map(function (item) {
                return item;
            });
        }
        $scope.arrayVTHHFinded = $scope.arrayVTHH.filter(function (item) {
            if (item.MA_NHOM_HANG_CHI_TIET.toLowerCase().indexOf($scope.ma_nhom_hang_chi_tiet.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }


    $scope.showInfoVTHH = function (staff) {
        $scope.ma_nhom_hang_chi_tiet = staff.MA_NHOM_HANG_CHI_TIET;
        item.showtable_VTHH = false;
    }
    // End Lọc nhân viên
    
    $scope.AddNew = function () {

        var date = $('#date').text()

        var data = {
            TUAN: date,
            MA_NHOM_HANG: $scope.ma_nhom_hang_chi_tiet,
            DONG_SERI: $scope.dong_seri,
            LOAI_KHACH_LE: $scope.loai_khach_le,
            LOAI_KHACH_MUA_NHIEU: $scope.loai_khach_mua_nhieu,
            KHACH_DAI_LY: $scope.khach_dai_ly,
            KHACH_KHONG_LAY_VAT: $scope.khach_khong_lay_vat,
            SL_MUA_HON_30: $scope.sl_mua_tren_30,
            SL_MUA_HON_100: $scope.sl_mua_tren_100,
            SL_MUA_HON_200: $scope.sl_mua_tren_200,
            GHI_CHU : $scope.ghi_chu,
        }
        $http.post('/api/Api_HeSoGiaBan/ThemHeSo', data).then(function (response) {
            SuccessSystem("Thêm hệ số thành công cho nhóm hàng " + response.data.MA_NHOM_HANG);
            $scope.dong_seri = '';
            $scope.loai_khach_le= '';
            $scope.loai_khach_mua_nhieu= '';
            $scope.khach_dai_ly= '';
            $scope.khach_khong_lay_vat= '';
            $scope.sl_mua_tren_30= '';
            $scope.sl_mua_tren_100= '';
            $scope.sl_mua_tren_200= '';
            $scope.ghi_chu = '';
        });
    };

    $scope.date = new Date();

    var myDate = new Date();
    var myWeek = $filter('date')(myDate, 'ww');
    var currentYear = (new Date()).getFullYear();
    
    $scope.load_hesogiaban = function () {
        var myDate = new Date();
        var tuan = $filter('date')(myDate, 'ww');
        var nam = (new Date()).getFullYear();

        $scope.tuan = tuan;
        $scope.nam = nam;

        $http.post('/api/Api_HeSoGiaBan/ListHeSoGiaBan').then(function (response) {
            $scope.ds_hesogiaban = response.data;
        });
    };
    $scope.load_hesogiaban();
});

app.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd/MM/yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})