app.controller('DanhSachPheDuyetCtrl', function ($http, $scope) {
    var macongty = $('#macongty').val();

    $http.post('/api/Api_DangKyPheDuyetPO/DanhsachpheduyetPO/' + macongty).then(function (response) {
        $scope.list_dspheduyet = response.data;
    });
    $scope.hienthidong = function () {
        $scope.showrow = true;
    }
    //Lọc marketing
    $scope.arrayMarketingFinded = [];
    $scope.arrayMarketing = [];
    $scope.showtable_marketing = false;


    $http.post(window.location.origin + '/api/Api_DangKyPheDuyetPO/Danhsachduocpheduyet/' + macongty)
            .then(function (response) {
                if (response.data) {
                    $scope.arrayMarketing = response.data;
                    $scope.arrayMarketingFinded = $scope.arrayMarketing.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onMarketingFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayMarketingFinded = $scope.arrayMarketing.map(function (item) {
                return item;
            });
        }
        $scope.arrayMarketingFinded = $scope.arrayMarketing.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.ho_va_ten_marketing.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoMarketing = function (staff) {
        $scope.username_marketing = staff.USERNAME;
        $scope.ho_va_ten_marketing = staff.HO_VA_TEN;
        $scope.showtable_marketing = false;

    }

    $scope.AddNew_PheDuyet = function () {
        var data_add = {
            MA_PHE_DUYET: 'PO',
            NGUOI_PHE_DUYET: $scope.username_marketing,
            TRUC_THUOC: macongty,
            GHI_CHU: $scope.ghi_chu_phe_duyet,
        }
        $http.post('/api/Api_DangKyPheDuyetPO/PostXL_DANG_KY_PHE_DUYET', data_add).then(function (response) {
            $http.post('/api/Api_DangKyPheDuyetPO/DanhsachpheduyetPO/' + macongty).then(function (response) {
                $scope.list_dspheduyet = response.data;
                $scope.ho_va_ten_marketing = '';
                $scope.showrow = false;
            }, function errorCallback(response) {
                ErrorSystem('Thêm thất bại');
            });
        });
    };

    // End Lọc marketing
});