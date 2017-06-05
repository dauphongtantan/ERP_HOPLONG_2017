
app.controller('DuyetBaoGiaCtrl', function (DuyetBaoGiaService, baogiaService, $scope, $http) {
    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return

    //Mảng chi tiết báo giá
    $scope.duyetbaogia = function () {
        baogiaService.get_phieubaogia(url).then(function (a) {
            $scope.BangBaoGia = a;
        });

        baogiaService.get_ct_phieubaogia(url).then(function (b) {
            $scope.Detail.ListAdd = b;

            if ($scope.Detail.ListAdd[0].CM != 0) {
                $scope.editCM = true;
            } else {
                $scope.editCM = false;
            }

            var tong_gia_tri_thuc_te_edit = 0;
            var tong_gia_tri_theo_hop_dong_edit = 0;
            var tong_chi_phi_hoa_don_edit = 0;
            var tong_khach_nhan_edit = 0;

            for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
                tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
                tong_chi_phi_hoa_don_edit = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
                tong_khach_nhan_edit = parseFloat($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
            }
            $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
            $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
            $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
            $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

            $scope.gia_tri_chenh_lech_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

            $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thuesuatgtgt / 100));


            $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);
        });
    };


    //Khai báo đối tượng lưu vào cơ sở dữ liệu-------------------------------------
    $scope.onSave = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var username = $('#username').val();
        var data_save = {
            SO_BAO_GIA : url,
            DA_DUYET : $scope.da_duyet,
            DA_HUY: $scope.da_huy,
            LY_DO_HUY: $scope.ly_do_huy,
            NGUOI_DUYET: username,
        }
        DuyetBaoGiaService.save_duyetbaogia(url, data_save).then(function (response) {
            $scope.load_duyetbaogia();
        });
    }

    //End Khai báo đối tượng lưu vào cơ sở dữ liệu-----------------------------------



    //Button hủy
    $scope.onHuy = function () {
        window.location.href = window.location.origin + '/GiuHang/Giu_Hang_HL';
    }
    //End button hủy


});
function uncheck() {
    var a = uncheck.arguments, z0 = 0;
    for (; z0 < a.length; z0++) {
        document.getElementById(a[z0]) ? document.getElementById(a[z0]).checked = false : null;
    }
}