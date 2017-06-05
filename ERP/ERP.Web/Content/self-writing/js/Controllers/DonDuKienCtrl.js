
app.controller('DonDuKienCtrl', function ($scope, $http) {

    var salehienthoi = $('#salehienthoi').val();
    var phongban = $('#maphongban').val();
    var isadmin = $('#isadmin').val();
    var macongty = $('#macongty').val();
    //Get Danh sách dự kiến theo sale
    $scope.getDanhSachDuKien = function () {
        var datas = {
            macongty: macongty,
            ma: salehienthoi,
            isadmin: isadmin,
            maphongban: phongban,
        }

        $http.post('http://27.72.144.148:8003/api/DonHangDuKien/GetDonDuKienTheoSale', datas)
            .then(function (response) {
                $scope.danhsachdukien = response.data;
            }, function (error) {
                ErrorSystem("Không lấy được dữ liệu khách hàng")
            });
    }
    $scope.getDanhSachDuKien();
    //-------------------------------







    //Show thông tin khách hàng---------------------------------------------------------------------------------------------------------------
    $scope.arrayKhachHang = {
        ma_khach_hang: '',
        ten_cong_ty: ''
    };

    //mảng khách hàng
    $scope.arrayKHFinded = [];
    $scope.arrayKH = [];
    $scope.showtable_ma_khach_hang = false;

    //get data khách hàng
    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi + '/' + isadmin + '/' + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayKH = response.data;
                 $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             SuccessSystem("Lỗi hệ thống: "+error);
         });

    //hàm tìm kiếm
    $scope.onKhachHangFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                return item;
            });
        }
        $scope.arrayKHFinded = $scope.arrayKH.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.arrayKhachHang.ma_khach_hang.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoKH = function (p_dt) {
        $scope.arrayKhachHang.ma_khach_hang = p_dt.MA_KHACH_HANG;
        $scope.arrayKhachHang.ten_cong_ty = p_dt.TEN_CONG_TY;
        $scope.showtable_ma_khach_hang = false;
    }
    //End Show thông tin khách hàng--------------------------------------------------------------------------------------------






    //Show thông tin liên hệ---------------------------------------------------------------------------------------------------------------
    $scope.arrayLienHe = {
        id_lien_he: '',
        nguoi_lien_he: '',
        sdt1: '',
        email_ca_nhan: '',
        email_cong_ty:''
    };

    //mảng khách hàng
    $scope.arrayLHFinded = [];
    $scope.arrayLH = [];
    $scope.showtable_Id_Lien_He = false;

    $scope.GetLHKH = function(ma_khach)
    {
        //get data liên hệ
        $http.get(window.location.origin + '/api/Api_LienHeKhachHang/' + ma_khach)
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayLH = response.data;
                     $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });
    }

    

    //hàm tìm kiếm
    $scope.onLienHeFind = function () {
        if (!$scope.NGUOI_LIEN_HE) {
            $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                return item;
            });
        }
        $scope.arrayLHFinded = $scope.arrayLH.filter(function (item) {
            if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.arrayLienHe.nguoi_lien_he.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoLH = function (p_dt) {
        $scope.arrayLienHe.id_lien_he = p_dt.ID_LIEN_HE;
        $scope.arrayLienHe.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
        $scope.arrayLienHe.sdt1 = p_dt.SDT1;
        $scope.arrayLienHe.email_ca_nhan = p_dt.EMAIL_CA_NHAN;
        $scope.arrayLienHe.email_cong_ty = p_dt.EMAIL_CONG_TY;
        $scope.showtable_Id_Lien_He = false;
    }
    //End Show thông tin LIÊN HỆ--------------------------------------------------------------------------------------------



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

    $scope.save_inline = function (item) {
        $scope.item = item;

        var data_save = {
            MA_DU_KIEN : $scope.item.MA_DU_KIEN,
            THANH_CONG: $scope.item.THANH_CONG,
            THAT_BAI: $scope.item.THAT_BAI,
            LY_DO_THAT_BAI: $scope.item.LY_DO_THAT_BAI,
        }
        $http.put("/api/Api_BaoGia_DonHangDuKien/PutBH_DON_HANG_DU_KIEN/" + $scope.item.MA_DU_KIEN, data_save).then(function (response) {
            SuccessSystem('Sửa thành công');
            $scope.getDanhSachDuKien();
        });
    };

    $scope.cancel = function (index) {
        //if ($scope.editing !== false) {
        //    $scope.appkeys[$scope.editing] = $scope.newField;
        //    $scope.editing = false;
        //}
        $scope.getDanhSachDuKien();
    };

});