
app.controller('PhieuBaoGiaCtrl', function (PhieuBaoGiaService, $scope, $http) {
    //Mảng chi tiết báo giá

    var macongty = $('#macongty').val();

    $scope.Detail = {
        ListAdd: []
    }
    $scope.Detail.ListAdd = [{
        SO_BAO_GIA: '',
        MA_HANG: '',
        SO_LUONG: 0,
        DON_GIA: 0,
        CHIET_KHAU: 0,
        CACH_TINH_THANH_TIEN: '',
        THANH_TIEN: 0,
        CK_VAT: 0,
        TIEN_VAT: 0,
        TINH_TRANG_HANG: '',
        THOI_GIAN_GIAO_HANG: '',
        NGAY_GIAO_HANG: '',
        DIA_DIEM_GIAO_HANG: '',
        GHI_CHU: '',
    }];

    $scope.BangBaoGia = {
        so_bao_gia: '',
        ngay_bao_gia: '',
        ma_du_kien: '',
        ma_khach_hang: '',
        lien_he_khach_hang: '',
        phuong_thuc_thanh_toan: '',
        han_thanh_toan: '',
        hieu_luc_bao_gia: '',
        dieu_khoan_thanh_toan: '',
        phi_van_chuyen: '',
        tong_tien: '',
        da_duyet: false,
        nguoi_duyet: '',
        da_trung: false,
        da_huy: false,
        ly_do_huy: '',
        sales_bao_gia: '',
        truc_thuoc: '',
    };


    $scope.load_duyetbaogia = function () {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return

        PhieuBaoGiaService.get_phieubaogia(url,macongty).then(function (a) {
            $scope.list_duyetbaogia = a;



            PhieuBaoGiaService.get_ct_phieubaogia(url).then(function (b) {
                $scope.Detail.ListAdd = b;
                var tong_thanh_tien = 0;
                var tong_tien_VAT = 0;
                var tong_tien_chua_van_chuyen = 0;
                var tong_tien_da_tinh_van_chuyen = 0;
                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                    tong_thanh_tien = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_thanh_tien);
                }
                $scope.tong_thanh_tien = tong_thanh_tien;
                $scope.tong_tien_VAT = parseFloat($scope.tong_thanh_tien / 10);
                var phi_van_chuyen = parseInt($('#phivanchuyen').text());

                tong_tien_da_tinh_van_chuyen = parseFloat($scope.tong_thanh_tien + phi_van_chuyen + $scope.tong_tien_VAT);
                $scope.BangBaoGia.tong_tien = tong_tien_da_tinh_van_chuyen;
            });
        });
    };
    $scope.load_duyetbaogia();
;


});
