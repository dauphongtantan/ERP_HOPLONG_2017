
app.controller('baogiaCtrl', function ($scope, $http, baogiaService,khachhangService,$timeout) {

    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //

    var isadmin = $('#isadmin').val();
    var username = $('#username').val();
    var macongty = $('#macongty').val();
    var saletao = $('#salehienthoi').val();
    $scope.get_nhomhang = function () {
        $http.get("/api/Api_NhomVTHHHL").then(function (response) {
            $scope.danhsachnhomhang = response.data;
        });
    }
    $scope.get_nhomhang();

    var tong_gia_tri_thuc_te_tinh_cm_new = 0;
    var tong_gia_tri_theo_hop_dong_tinh_cm_new = 0;
    var tong_chi_phi_hoa_don_tinh_cm_new = 0;
    var tong_khach_nhan_tinh_cm_new = 0;


    var tong_gia_tri_thuc_te_tinh_cm_edit = 0;
    var tong_gia_tri_theo_hop_dong_tinh_cm_edit = 0;
    var tong_chi_phi_hoa_don_tinh_cm_edit = 0;
    var tong_khach_nhan_tinh_cm_edit = 0;

    $scope.load_baogiatheodukien = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        $scope.list_baogiatheodukien = [];
        baogiaService.load_baogiatheodukien(url,macongty).then(function (bcd) {
            $scope.list_baogiatheodukien = bcd;
            if ($scope.list_baogiatheodukien.length > 0) {
                $('.thongtinchungthemmoi').hide();
                $('.savethongtin').show();
            } else {
                $('.thongtinchungthemmoi').show();
                $('.savethongtin').hide();
            }
        });

    };

    $scope.load_baogiatheodukien();

    $scope.Remove = function (index, item) {

        $scope.item = item;
        $scope.Detail.ListXoa.push({
            ID: $scope.item.ID,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_HANG: $scope.item.MA_HANG,
            MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
            HANG_SP: $scope.item.HANG_SP,
            DVT: $scope.item.DVT,
            SO_LUONG: $scope.item.SO_LUONG,
            DON_GIA: $scope.item.DON_GIA_MOI,
            CHIET_KHAU: $scope.item.CHIET_KHAU,
            GIA_LIST: $scope.item.GIA_LIST,
            DON_GIA_NHAP: $scope.item.DON_GIA_NHAP,
            HE_SO_LOI_NHUAN: $scope.item.HE_SO_LOI_NHUAN,
            DON_GIA_BAO_DI_NET: $scope.item.DON_GIA_BAO_DI_NET,
            CM: $scope.item.CM,
            DON_GIA_MOI: $scope.item.DON_GIA_MOI,
            THUE_TNDN: $scope.item.THUE_TNDN,
            TIEN_THUE_TNDN: $scope.item.TIEN_THUE_TNDN,
            KHACH_NHAN_DUOC: $scope.item.KHACH_NHAN_DUOC,
            THANH_TIEN: $scope.item.THANH_TIEN,
            THANH_TIEN_NET: $scope.item.THANH_TIEN_NET,
            THOI_GIAN_GIAO_HANG: $scope.item.THOI_GIAN_GIAO_HANG,
            GHI_CHU: $scope.item.GHI_CHU,
        });

        $scope.thongtinchitiet.splice(index, 1);
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.thongtinchitiet[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.thongtinchitiet[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }

        $scope.thongtinchung.TONG_TIEN = tong_gia_tri_theo_hop_dong_edit
        $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE = tong_gia_tri_thuc_te_edit;
        $scope.thongtinchung.TONG_CHI_PHI_HOA_DON = tong_chi_phi_hoa_don_edit;
        $scope.thongtinchung.THUC_NHAN_CUA_KHACH = tong_khach_nhan_edit;

        $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH = parseFloat($scope.thongtinchung.TONG_TIEN - $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE);

        $scope.thongtinchung.TIEN_THUE_GTGT = parseFloat($scope.thongtinchung.TONG_TIEN * ($scope.thongtinchung.THUE_SUAT_GTGT / 100));


        $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH = parseFloat($scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE + $scope.thongtinchung.TONG_CHI_PHI_HOA_DON + $scope.thongtinchung.TIEN_THUE_GTGT + $scope.thongtinchung.THUC_NHAN_CUA_KHACH + parseInt($scope.thongtinchung.PHI_VAN_CHUYEN));

        if ($scope.Detail.ListXoa[0].ID != null && $scope.Detail.ListXoa[0].ID != undefined) {
            $http({
                method: 'DELETE',
                data: $scope.Detail.ListXoa,
                url: window.location.origin + '/api/Api_ChiTietBaoGia/XoaCT_BAO_GIA/' + $scope.Detail.ListXoa[0].ID
            }).then(function successCallback(response) {
                alert("Xóa thành công");

                // Cập nhật lại CSDL

                var url = document.location.href;
                url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
                url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
                url = url.substring(url.lastIndexOf("/") + 1, url.length);


                var tong_tien = parseInt($('#tong_tien').text());

                $scope.Bao_Gia = {
                    SO_BAO_GIA: $scope.thongtinchung.SO_BAO_GIA,
                    SALES_BAO_GIA: $scope.thongtinchung.SALES_BAO_GIA,
                    MA_KHACH_HANG: $scope.thongtinchung.MA_KHACH_HANG,
                    NGAY_BAO_GIA: $scope.thongtinchung.NGAY_BAO_GIA,
                    MA_DU_KIEN: $scope.thongtinchung.MA_DU_KIEN,
                    LIEN_HE_KHACH_HANG: $scope.thongtinchung.LIEN_HE_KHACH_HANG,
                    PHUONG_THUC_THANH_TOAN: $scope.thongtinchung.PHUONG_THUC_THANH_TOAN,
                    HAN_THANH_TOAN: $scope.thongtinchung.HAN_THANH_TOAN,
                    HIEU_LUC_BAO_GIA: $scope.thongtinchung.HIEU_LUC_BAO_GIA,
                    DIEU_KHOAN_THANH_TOAN: $scope.thongtinchung.DIEU_KHOAN_THANH_TOAN,
                    PHI_VAN_CHUYEN: $scope.thongtinchung.PHI_VAN_CHUYEN,
                    TONG_TIEN: $scope.thongtinchung.TONG_TIEN,
                    DA_DUYET: $scope.thongtinchung.DA_DUYET,
                    DA_TRUNG: $scope.thongtinchung.DA_TRUNG,
                    DA_HUY: $scope.thongtinchung.DA_HUY,
                    TRUC_THUOC: macongty,
                    THUE_SUAT_GTGT: $scope.thongtinchung.THUE_SUAT_GTGT,
                    TIEN_THUE_GTGT: $scope.thongtinchung.TIEN_THUE_GTGT,
                    TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE,
                    GIA_TRI_THUC_THU_TU_KHACH: $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH,
                    TONG_GIA_TRI_CHENH_LECH: $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH,
                    TONG_CHI_PHI_HOA_DON: $scope.thongtinchung.TONG_CHI_PHI_HOA_DON,
                    THUC_NHAN_CUA_KHACH: $scope.thongtinchung.THUC_NHAN_CUA_KHACH,
                    DANG_CHO_PHAN_HOI: true,
                };

                $scope.arrayChiTietBaoGia = [];

                for (var i = 0; i < $scope.thongtinchitiet.length; i++) {


                    var ChiTietBaoGia = {
                        ID: $scope.thongtinchitiet[i].ID,
                        TEN_HANG: $scope.thongtinchitiet[i].TEN_HANG,
                        MA_HANG: $scope.thongtinchitiet[i].MA_HANG,
                        MA_DIEU_CHINH: $scope.thongtinchitiet[i].MA_DIEU_CHINH,
                        HANG_SP: $scope.thongtinchitiet[i].HANG_SP,
                        DVT: $scope.thongtinchitiet[i].DVT,
                        SO_LUONG: $scope.thongtinchitiet[i].SO_LUONG,
                        DON_GIA: $scope.thongtinchitiet[i].DON_GIA_MOI,
                        CHIET_KHAU: $scope.thongtinchitiet[i].CHIET_KHAU,
                        GIA_LIST: parseFloat($scope.thongtinchitiet[i].GIA_LIST),
                        DON_GIA_NHAP: parseFloat($scope.thongtinchitiet[i].DON_GIA_NHAP),
                        HE_SO_LOI_NHUAN: $scope.thongtinchitiet[i].HE_SO_LOI_NHUAN,
                        DON_GIA_BAO_DI_NET: $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET,
                        CM: $scope.thongtinchitiet[i].CM,
                        DON_GIA_MOI: $scope.thongtinchitiet[i].DON_GIA_MOI,
                        THUE_TNDN: $scope.thongtinchitiet[i].THUE_TNDN,
                        TIEN_THUE_TNDN: $scope.thongtinchitiet[i].TIEN_THUE_TNDN,
                        KHACH_NHAN_DUOC: $scope.thongtinchitiet[i].KHACH_NHAN_DUOC,
                        THANH_TIEN: $scope.thongtinchitiet[i].THANH_TIEN,
                        THANH_TIEN_NET: $scope.thongtinchitiet[i].THANH_TIEN_NET,
                        THOI_GIAN_GIAO_HANG: $scope.thongtinchitiet[i].THOI_GIAN_GIAO_HANG,
                        GHI_CHU: $scope.thongtinchitiet[i].GHI_CHU,
                    }
                    //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
                    $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
                }

                //Lưu vào CSDL

                $http({
                    method: 'PUT',
                    data: $scope.Bao_Gia,
                    url: window.location.origin + '/api/Api_BaoGia/' + $scope.Bao_Gia.SO_BAO_GIA
                }).then(function successCallback(response) {
                    $scope.Bao_Gia = response.data;

                    $scope.Bao_Gia.SO_BAO_GIA;

                    for (var i = 0; i < $scope.arrayChiTietBaoGia.length; i++) {
                        $scope.arrayChiTietBaoGia[i].SO_BAO_GIA = $scope.Bao_Gia.SO_BAO_GIA;
                    }


                    if ($scope.arrayChiTietBaoGia.length > 0) {
                        $http({
                            method: 'POST',
                            data: $scope.arrayChiTietBaoGia,
                            url: window.location.origin + '/api/Api_ChiTietBaoGia/PutBH_CT_BAO_GIA'
                        }).then(function successCallback(response) {
                            SuccessSystem("Hoàn Thành Lưu");
                        }, function errorCallback(response) {
                            ErrorSystem('Không lưu được chi tiết giữ kho');
                        });
                        return;
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
                });

            }, function errorCallback(response) {
                ErrorSystem('Lỗi - Xóa không thành công');
            });
        }
        $scope.Detail.ListXoa.splice(0, 1);
    }

    $scope.RemoveNew = function (index, detail) {
        $scope.Detail.ListNew.splice(index, 1);

        $scope.detail = detail;
        var phi_van_chuyen = parseInt($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseInt($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseInt($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseInt($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseInt($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseInt($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);

        $scope.thue_vat_new = parseInt($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_new = parseInt($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new + parseInt($scope.phivanchuyen));

        tong_gia_tri_thuc_te_tinh_cm_new = $scope.tong_gia_tri_thuc_te_new;
        tong_gia_tri_theo_hop_dong_tinh_cm_new = $scope.tong_gia_tri_theo_hop_dong_new;
        tong_chi_phi_hoa_don_tinh_cm_new = $scope.tong_chi_phi_hoa_don_new;
        tong_khach_nhan_tinh_cm_new = $scope.tong_khach_nhan_new;
    }

    $scope.kiemtra = function (item) {
        $scope.item = item;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;
        var bien_trung_gian = 0;
        if ($scope.item.GIA_LIST != null && $scope.item.GIA_LIST != 0) {
            $scope.item.DON_GIA_BAO_DI_NET = parseInt($scope.item.GIA_LIST) - parseInt((parseInt($scope.item.GIA_LIST) * ($scope.item.CHIET_KHAU / 100)));
        } else {
            $scope.item.DON_GIA_BAO_DI_NET = parseInt($scope.item.DON_GIA_NHAP) + parseInt((parseInt($scope.item.DON_GIA_NHAP) * ($scope.item.HE_SO_LOI_NHUAN / 100)));
        };

        if ($scope.item.CM != null && $scope.item.CM != undefined) {
            $scope.item.DON_GIA_MOI = parseInt(((100 - parseInt($scope.item.THUE_TNDN)) * $scope.item.DON_GIA_BAO_DI_NET) / parseInt(100 - ($scope.item.CM) - parseInt($scope.item.TIEN_THUE_TNDN)));

            bien_trung_gian = parseInt((100 - $scope.item.THUE_TNDN) / $scope.item.THUE_TNDN);

            $scope.item.KHACH_NHAN_DUOC = parseInt($scope.item.DON_GIA_MOI * ($scope.item.CM / 100)) * $scope.item.SO_LUONG;

            $scope.item.TIEN_THUE_TNDN = parseInt($scope.item.KHACH_NHAN_DUOC / (parseInt(bien_trung_gian)));
               
        }

        $scope.item.THANH_TIEN = $scope.item.DON_GIA_MOI * $scope.item.SO_LUONG;
        $scope.item.THANH_TIEN_NET = $scope.item.SO_LUONG * $scope.item.DON_GIA_BAO_DI_NET;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseInt($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseInt($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseInt($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseInt($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
        $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
        $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

        $scope.gia_tri_chenh_lech_edit = parseInt($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

        $scope.thue_vat_edit = parseInt($scope.tong_gia_tri_theo_hop_dong_edit * (thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_edit = parseInt($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);

    };

    $scope.test = function (detail) {
        $scope.detail = detail;
        var phi_van_chuyen = parseInt($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;
        var bien_trung_gian = 0;
        if ($scope.detail.gia_list != null && $scope.detail.gia_list!=0) {
            $scope.detail.gia_bao_di_net = parseInt($scope.detail.gia_list) - parseInt((parseInt($scope.detail.gia_list) * ($scope.detail.chiet_khau / 100)));
        } else  {
            $scope.detail.gia_bao_di_net = parseInt($scope.detail.gia_nhap) + parseInt((parseInt($scope.detail.gia_nhap) * ($scope.detail.he_so_loi_nhuan / 100)));
        };

        if ($scope.detail.hoa_hong != null && $scope.detail.hoa_hong != undefined) {
            $scope.detail.don_gia_ban = parseInt(( (100 - parseInt($scope.detail.thue_tndn)) * $scope.detail.gia_bao_di_net) / parseInt(100 - ($scope.detail.hoa_hong) - parseInt($scope.detail.thue_tndn)));

            bien_trung_gian = parseInt((100 - $scope.detail.thue_tndn) / $scope.detail.thue_tndn);

            $scope.detail.khach_nhan = parseInt($scope.detail.don_gia_ban * ($scope.detail.hoa_hong/100)) * $scope.detail.so_luong;
            
            $scope.detail.tien_thue_tndn = parseInt($scope.detail.khach_nhan / (parseInt(bien_trung_gian)));
        }

        $scope.detail.thanh_tien = $scope.detail.don_gia_ban * $scope.detail.so_luong;
        $scope.detail.thanh_tien_net = $scope.detail.so_luong * $scope.detail.gia_bao_di_net;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseInt($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseInt($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseInt($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseInt($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseInt($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);

        $scope.thue_vat_new = parseInt($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_new = parseInt($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new + parseInt($scope.phivanchuyen));


        tong_gia_tri_thuc_te_tinh_cm_new = $scope.tong_gia_tri_thuc_te_new;
        tong_gia_tri_theo_hop_dong_tinh_cm_new = $scope.tong_gia_tri_theo_hop_dong_new;
        tong_chi_phi_hoa_don_tinh_cm_new = $scope.tong_chi_phi_hoa_don_new;
        tong_khach_nhan_tinh_cm_new = $scope.tong_khach_nhan_new;
    };

    $scope.tinh_cm_khach = function (tien_khach_nhan) {
        var phi_van_chuyen = parseFloat($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;
        var chenhlech = 0;
        var khachnhan = 0;
        var newcm = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            $scope.Detail.ListNew[i].don_gia_ban = $scope.Detail.ListNew[i].gia_bao_di_net;

            $scope.Detail.ListNew[i].thanh_tien = $scope.Detail.ListNew[i].don_gia_ban * $scope.Detail.ListNew[i].so_luong;
            $scope.Detail.ListNew[i].thanh_tien_net = $scope.Detail.ListNew[i].so_luong * $scope.Detail.ListNew[i].gia_bao_di_net;
        };

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
        }

        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;


        chenhlech = parseFloat(parseInt(tien_khach_nhan) - $scope.tong_gia_tri_theo_hop_dong_new);
        khachnhan = parseFloat(chenhlech * 80) / 100;
        newcm = parseFloat((khachnhan * 100) / $scope.tong_gia_tri_thuc_te_new);

        tong_gia_tri_thuc_te_new = 0;
        tong_gia_tri_theo_hop_dong_new = 0;
        tong_chi_phi_hoa_don_new = 0;
        tong_khach_nhan_new = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            $scope.Detail.ListNew[i].hoa_hong = newcm;

            $scope.Detail.ListNew[i].khach_nhan = parseFloat($scope.Detail.ListNew[i].gia_bao_di_net * ($scope.Detail.ListNew[i].hoa_hong / 100)) * $scope.Detail.ListNew[i].so_luong;

            $scope.Detail.ListNew[i].bien_trung_gian = parseFloat(($scope.Detail.ListNew[i].khach_nhan * 100) / 80);
            $scope.Detail.ListNew[i].tien_thue_tndn = parseFloat($scope.Detail.ListNew[i].bien_trung_gian * ($scope.Detail.ListNew[i].thue_tndn / 100));

            $scope.Detail.ListNew[i].don_gia_ban = parseFloat($scope.Detail.ListNew[i].gia_bao_di_net + ($scope.Detail.ListNew[i].khach_nhan/$scope.Detail.ListNew[i].so_luong) + ($scope.Detail.ListNew[i].tien_thue_tndn/$scope.Detail.ListNew[i].so_luong));

            $scope.Detail.ListNew[i].thanh_tien = $scope.Detail.ListNew[i].don_gia_ban * $scope.Detail.ListNew[i].so_luong;
            $scope.Detail.ListNew[i].thanh_tien_net = $scope.Detail.ListNew[i].so_luong * $scope.Detail.ListNew[i].gia_bao_di_net;
        }

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseFloat($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseFloat($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);

        $scope.thue_vat_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_new = parseFloat($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new + parseInt($scope.phivanchuyen));
    };

    $scope.tinh_cm_khach_edit = function (tien_khach_nhan_edit) {

        var chenhlech = 0;
        var khachnhan = 0;
        var newcm = 0;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;

        var phi_van_chuyen = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-phivanchuyen').text()) || 0;;
        var chiphixuly = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-chiphixuly').text()) || 0;;
        var thuesuatgtgt = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-thuesuatgtgt').text()) || 0;;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            $scope.Detail.ListAdd[i].DON_GIA_MOI = $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;

            $scope.Detail.ListAdd[i].THANH_TIEN = $scope.Detail.ListAdd[i].DON_GIA_MOI * $scope.Detail.ListAdd[i].SO_LUONG;
            $scope.Detail.ListAdd[i].THANH_TIEN_NET = $scope.Detail.ListAdd[i].SO_LUONG * $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;
        };

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
        }

        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;


        chenhlech = parseFloat(tien_khach_nhan_edit - $scope.tong_gia_tri_theo_hop_dong_edit);
        khachnhan = parseFloat(chenhlech * 80) / 100;
        newcm = parseFloat((khachnhan * 100) / $scope.tong_gia_tri_thuc_te_edit);

        tong_gia_tri_thuc_te_edit = 0;
        tong_gia_tri_theo_hop_dong_edit = 0;
        tong_chi_phi_hoa_don_edit = 0;
        tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            $scope.Detail.ListAdd[i].CM = newcm;

            $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC = parseFloat($scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET * ($scope.Detail.ListAdd[i].CM / 100)) * $scope.Detail.ListAdd[i].SO_LUONG;

            $scope.Detail.ListAdd[i].BIEN_TRUNG_GIAN = parseFloat(($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC * 100) / 80);
            $scope.Detail.ListAdd[i].TIEN_THUE_TNDN = parseFloat($scope.Detail.ListAdd[i].BIEN_TRUNG_GIAN * ($scope.Detail.ListAdd[i].THUE_TNDN / 100));

            $scope.Detail.ListAdd[i].DON_GIA_MOI = parseFloat($scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET + ($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC/$scope.Detail.ListAdd[i].SO_LUONG) + ($scope.Detail.ListAdd[i].TIEN_THUE_TNDN/$scope.Detail.ListAdd[i].SO_LUONG));

            $scope.Detail.ListAdd[i].THANH_TIEN = $scope.Detail.ListAdd[i].DON_GIA_MOI * $scope.Detail.ListAdd[i].SO_LUONG;
            $scope.Detail.ListAdd[i].THANH_TIEN_NET = $scope.Detail.ListAdd[i].SO_LUONG * $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;
        }

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

        $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thue_suat_gtgt / 100));



        $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);
    };

    $scope.load_dondukien = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        baogiaService.load_dondukien(url).then(function (abc) {
            $scope.list_dondukien = abc;
        });
    };
    $scope.load_dondukien();
    //Mảng chi tiết báo giá
    $scope.Detail = {
        ListAdd: [],
        ListNew: [],
        ListTach: [],
        ListXoa: [],
    }
    $scope.Detail.ListAdd = [{
        SO_BAO_GIA: '',
        MA_HANG: '',
        SO_LUONG: 0,
        DON_GIA_LIST: 0,
        DON_GIA_NHAP: 0,
        DON_GIA: 0,
        HE_SO_LOI_NHUAN: 0,
        CHIET_KHAU: 0,
        THANH_TIEN: 0,
        THANH_TIEN_NET: 0,
        TINH_TRANG_HANG: '',
        THOI_GIAN_GIAO_HANG: '',
        NGAY_GIAO_HANG: '',
        DIA_DIEM_GIAO_HANG: '',
        GHI_CHU: '',
        BIEN_TRUNG_GIAN: 0,
        SO_LUONG_TRONG_KHO: 0,
    }];
    $scope.Detail.ListNew = [{
        MA_CHUAN: '',
        ma_hang: '',
        ten_hang: '',
        so_luong: 0,
        MA_DIEU_CHINH: '',
        dvt: '',
        hang: '',
        gia_list: 0,
        gia_list_VAT : 0,
        gia_nhap: 0,
        gia_nhap_VAT : 0,
        don_gia: 0,
        he_so_loi_nhuan: 0,
        chiet_khau: 0,
        gia_bao_di_net: 0,
        ghi_chu: '',
        thanh_tien: 0,
        thanh_tien_net: 0,
        thoi_gian_giao_hang: '',
        ghi_chu: '',
        hoa_hong: 0,
        bien_trung_gian: 0,
        so_luong_trong_kho: 0,
    }];





    var salehienthoi = $('#salehienthoi').val();
    //khai báo thông tin chung


    //Khai báo đối tượng sửa vào cơ sở dữ liệu-------------------------------------
    $scope.onSave = function () {

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA_MOI) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
                return;
            }

        }

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return

        var tong_tien = parseInt($('#tong_tien').text());

        $scope.Bao_Gia = {
            SO_BAO_GIA: $scope.BangBaoGia[0].SO_BAO_GIA,
            SALES_BAO_GIA: $scope.BangBaoGia[0].SALES_BAO_GIA,
            MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
            NGAY_BAO_GIA: $scope.BangBaoGia[0].NGAY_BAO_GIA,
            MA_DU_KIEN: url,
            LIEN_HE_KHACH_HANG: $scope.BangBaoGia[0].LIEN_HE_KHACH_HANG,
            PHUONG_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
            HAN_THANH_TOAN: $scope.BangBaoGia[0].HAN_THANH_TOAN,
            HIEU_LUC_BAO_GIA: $scope.BangBaoGia[0].HIEU_LUC_BAO_GIA,
            DIEU_KHOAN_THANH_TOAN: $scope.BangBaoGia[0].DIEU_KHOAN_THANH_TOAN,
            PHI_VAN_CHUYEN: $scope.BangBaoGia[0].PHI_VAN_CHUYEN,
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_edit,
            DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
            DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
            DA_HUY: $scope.BangBaoGia[0].DA_HUY,
            TRUC_THUOC: macongty,
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.thue_vat_edit,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_edit,
            DANG_CHO_PHAN_HOI: true,
        };

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietBaoGia = {
                ID: $scope.Detail.ListAdd[i].ID,
                TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
                CM: $scope.Detail.ListAdd[i].CM,
                DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        //Lưu vào CSDL

        $http({
            method: 'PUT',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_BaoGia/' + $scope.Bao_Gia.SO_BAO_GIA
        }).then(function successCallback(response) {
            $scope.Bao_Gia = response.data;

            $scope.Bao_Gia.SO_BAO_GIA;

            for (var i = 0; i < $scope.arrayChiTietBaoGia.length; i++) {
                $scope.arrayChiTietBaoGia[i].SO_BAO_GIA = $scope.Bao_Gia.SO_BAO_GIA;
            }


            if ($scope.arrayChiTietBaoGia.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.arrayChiTietBaoGia,
                    url: window.location.origin + '/api/Api_ChiTietBaoGia/PutBH_CT_BAO_GIA'
                }).then(function successCallback(response) {
                    SuccessSystem("Hoàn Thành Lưu");
                }, function errorCallback(response) {
                    ErrorSystem('Không lưu được chi tiết giữ kho');
                });
                return;
            }

        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    }

    //End Khai báo đối tượng lưu vào cơ sở dữ liệu-----------------------------------

    //Thêm mới vào csdl
    $scope.AddNew = function () {


        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var tongtien = parseInt($('#tongtienbaogia').text());
        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: salehienthoi,
            MA_KHACH_HANG: $scope.list_dondukien[0].MA_KHACH_HANG,
            MA_DU_KIEN: url,
            LIEN_HE_KHACH_HANG: $scope.list_dondukien[0].ID_LIEN_HE,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: $scope.phivanchuyen,
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: macongty,
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
        };

        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        //Lưu vào CSDL
        $http.post("/api/Api_BaoGia/PostBH_BAO_GIA", $scope.BANGBAOGIA)
            .then(function successCallback(response) {
                $scope.BANGBAOGIA = response.data;
                if (!$scope.BANGBAOGIA) {
                    ErrorSystem("Không lưu được thông tin chung của báo giá");
                    return;
                }
                $scope.BANGBAOGIA.SO_BAO_GIA;

                for (var i = 0; i < $scope.arrayBaoGiaChiTiet.length; i++) {
                    $scope.arrayBaoGiaChiTiet[i].SO_BAO_GIA = $scope.BANGBAOGIA.SO_BAO_GIA;
                }


                if ($scope.arrayBaoGiaChiTiet.length > 0) {
                    $http.post("/api/ApiChiTietBaoGia/PostKH_LIEN_HE", $scope.arrayBaoGiaChiTiet)
                        .then(function successCallback(response) {
                            SuccessSystem("Lưu thành công!");
                            location.reload();
                        }, function errorCallback(response) {
                            ErrorSystem("Không lưu được chi tiết của báo giá");
                        });
                    return;
                }

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem("Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục");
            });
    }
    //End thêm mới

    //Button hủy
    $scope.onHuy = function () {
        window.location.href = window.location.origin + '/GiuHang/Giu_Hang_HL';
    }
    //End button hủy

    $scope.xemchitietbaogia = function (sobaogia) {
        window.location.href = window.location.origin + '/KinhDoanh/BaoGia/GetBaoGia/' + sobaogia;
    }



    $scope.CreateNewQuotation = function () {
        $('.thongtinchungthemmoi').show();
        $('.savethongtin').hide();
    };


    $scope.Split = function () {



        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListTach.length; i++) {


            var ChiTietBaoGia = {
                ID: $scope.Detail.ListAdd[i].ID,
                TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
                CM: $scope.Detail.ListAdd[i].CM,
                DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.arrayChiTietBaoGia,
            url: window.location.origin + '/api/Api_ChiTietBaoGia/TachBaoGia/' + $scope.BangBaoGia[0].SO_BAO_GIA,
        }).then(function successCallback(response) {
            SuccessSystem('Tách thành công báo giá mới' + response.data);

        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.Copy = function () {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return

        var tong_tien = parseInt($('#tong_tien').text());


        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {

            var ChiTietBaoGia = {
                TEN_HANG: $scope.thongtinchitiet[i].TEN_HANG,
                MA_HANG: $scope.thongtinchitiet[i].MA_HANG,
                MA_DIEU_CHINH: $scope.thongtinchitiet[i].MA_DIEU_CHINH,
                HANG_SP: $scope.thongtinchitiet[i].HANG_SP,
                DVT: $scope.thongtinchitiet[i].DVT,
                SO_LUONG: $scope.thongtinchitiet[i].SO_LUONG,
                DON_GIA: $scope.thongtinchitiet[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.thongtinchitiet[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.thongtinchitiet[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.thongtinchitiet[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.thongtinchitiet[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET,
                CM: $scope.thongtinchitiet[i].CM,
                DON_GIA_MOI: $scope.thongtinchitiet[i].DON_GIA_MOI,
                THUE_TNDN: $scope.thongtinchitiet[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.thongtinchitiet[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.thongtinchitiet[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.thongtinchitiet[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.thongtinchitiet[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.thongtinchitiet[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.thongtinchitiet[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        $scope.TongHop = {
            SALES_BAO_GIA: username,
            MA_KHACH_HANG: $scope.thongtinchung.MA_KHACH_HANG,
            NGAY_BAO_GIA: $scope.thongtinchung.NGAY_BAO_GIA,
            MA_DU_KIEN: $scope.thongtinchung.MA_DU_KIEN,
            LIEN_HE_KHACH_HANG: $scope.thongtinchung.LIEN_HE_KHACH_HANG,
            PHUONG_THUC_THANH_TOAN: $scope.thongtinchung.PHUONG_THUC_THANH_TOAN,
            HAN_THANH_TOAN: $scope.thongtinchung.HAN_THANH_TOAN,
            HIEU_LUC_BAO_GIA: $scope.thongtinchung.HIEU_LUC_BAO_GIA,
            DIEU_KHOAN_THANH_TOAN: $scope.thongtinchung.DIEU_KHOAN_THANH_TOAN,
            PHI_VAN_CHUYEN: $scope.thongtinchung.PHI_VAN_CHUYEN,
            TONG_TIEN: $scope.thongtinchung.TONG_TIEN,
            TRUC_THUOC: macongty,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY : false,
            THUE_SUAT_GTGT: $scope.thongtinchung.THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.thongtinchung.TIEN_THUE_GTGT,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH,
            TONG_GIA_TRI_CHENH_LECH: $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH,
            TONG_CHI_PHI_HOA_DON: $scope.thongtinchung.TONG_CHI_PHI_HOA_DON,
            THUC_NHAN_CUA_KHACH: $scope.thongtinchung.THUC_NHAN_CUA_KHACH,
            DANG_CHO_PHAN_HOI: true,
            Chitiet: $scope.arrayChiTietBaoGia
        }



        //Lưu vào CSDL
        baogiaService.copynewbg($scope.TongHop).then(function successCallback(response) {
            SuccessSystem('Bạn đã sao chép thành công một báo giá mới là ' + response.data);
            $(function () {
                setTimeout(function () {
                    window.location.href = "/KinhDoanh/BaoGia/GetBaoGia/" + response.data;

                }, 2000);
            });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không tạo mới được báo giá, Bạn vui lòng liên hệ với admin để khắc phục ');
        });

    };

    $scope.GopBaoGia = function () {
        $http.post('/api/Api_BaoGia/GopBaoGia/' + $scope.baogia1 + '/' + $scope.baogia2).then(function (response) {
            SuccessSystem('Gộp 2 báo giá thành báo giá ' + response.data + 'thành công');
        }, function errorCallback(response) {
            ErrorSystem('Gộp báo giá không thành công');
        });
    };

    $scope.CreatePO = function () {

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA_MOI) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
                return;
            }

        }

        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_edit);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THANH_TIEN_HANG: $scope.Detail.ListAdd[i].THANH_TIEN,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.BangBaoGia[0].NGUOI_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_edit,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_edit,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_edit),
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TRUC_THUOC: macongty,
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: salehienthoi,
            SO_BAO_GIA: $scope.baogia.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };
        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data)
            $scope.PhuongAnKD = {
                MA_SO_PO: response.data,
                PHIEU_BAO_GIA: $scope.BangBaoGia[0].SO_BAO_GIA,
                MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
                NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                CHI_PHI_KHAC: $scope.BangBaoGia[0].PHI_VAN_CHUYEN,
                TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
                TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_edit,
                GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
                CHI_PHI_HOA_DON: 20,
                TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
                THUE_VAT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
                TIEN_THUE_VAT: $scope.thue_vat_edit,
                TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
                LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_edit,
                THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                HINH_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
                HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                CONG_NO: $scope.BangBaoGia[0].DIEU_KHOAN_THANH_TOAN,
                TRUC_THUOC: macongty,
                NHAN_VIEN_QUAN_LY: username,
            }

            $http({
                method: 'POST',
                data: $scope.PhuongAnKD,
                url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 PAKD có mã là ' + response.data.MA_SO_PAKD);

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không lưu được PAKD, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được đơn PO, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

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
             console.log(error);
         });

    //hàm tìm kiếm
    $scope.onKHFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                return item;
            });
        }
        $scope.arrayKHFinded = $scope.arrayKH.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.arrayKhachHang.ten_cong_ty.toLowerCase()) >= 0) {
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
        $scope.arrayKhachHang.VAN_PHONG_GIAO_DICH = p_dt.VAN_PHONG_GIAO_DICH;
        $scope.arrayKhachHang.DIA_CHI_XUAT_HOA_DON = p_dt.DIA_CHI_XUAT_HOA_DON;
        $scope.showtable_ma_khach_hang = false;
    }




    //Show thông tin người giữ----------------------------------------------------------------------------------------------------
    $scope.arraySaleGiu = {
        username: '',
        ho_va_ten: '',
    };

    //mảng nguoi giu
    $scope.arrayNGFinded = [];
    $scope.arrayNG = [];
    $scope.showtable_sale_giu = false;

    //get data nguoi giu
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayNG = response.data;
                 $scope.arrayNGFinded = $scope.arrayNG.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         });

    //hàm tìm kiếm
    $scope.onSaleGiuFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNGFinded = $scope.arrayNG.map(function (item) {
                return item;
            });
        }
        $scope.arrayNGFinded = $scope.arrayNG.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.arraySaleGiu.username.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoNG = function (p_dt) {
        $scope.arraySaleGiu.username = p_dt.USERNAME;
        $scope.arraySaleGiu.ho_va_ten = p_dt.HO_VA_TEN;
        $scope.showtable_sale_giu = false;
    }
    //End Show thông tin người giữ----------------------------------------------------------------------------------------------------------------------



    $scope.run_lienhe = function () {
        //Show thông tin lien he---------------------------------------------------------------------------------------------------------------
        $scope.arrayLienHe = {
            id_lien_he: '',
            nguoi_lien_he: '',
        };

        //mảng nguoi giu
        $scope.arrayLienHeFinded = [];
        $scope.arrayLH = [];
        $scope.showtable_LienHe = false;

        var makh = $scope.arrayKhachHang.ma_khach_hang;
        //get data nguoi giu
        $http.get(window.location.origin + '/api/Api_BaoGia/GetLienHeKhach/' + makh)
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayLH = response.data;
                     $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });

        //hàm tìm kiếm
        $scope.onLienHeFind = function () {
            if (!$scope.NGUOI_LIEN_HE) {
                $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
                    return item;
                });
            }
            $scope.arrayLienHeFinded = $scope.arrayLH.filter(function (item) {
                if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.arrayLienHe.nguoi_lien_he.toLowerCase()) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
        $scope.showInfoLienHe = function (p_dt) {
            $scope.arrayLienHe.id_lien_he = p_dt.ID_LIEN_HE;
            $scope.arrayLienHe.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
            $scope.showtable_LienHe = false;
        }
        //End Show thông tin lien he--------------------------------------------------------------------------------------------

    };



    //Tìm Kiếm Thông Tin hàng Hóa thêm mới
    $scope.FindProduct = function (machuan) {

        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/' + machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoa = response.data;

        });
    }


    //button add check
    $scope.check = function (mahang, tenhang, dvt, xuatxu, hang, dongia, ton_hl) {
        if (ton_hl != 0) {
            $scope.Detail.ListNew.push({
                ma_hang: mahang,
                ten_hang: tenhang,
                so_luong: 0,
                ma_dieu_chinh: '',
                dvt: dvt,
                hang: hang,
                gia_list: dongia,
                gia_nhap: 0,
                don_gia: 0,
                gia_bao_di_net: dongia,
                he_so_loi_nhuan: 0,
                chiet_khau: 0,
                thanh_tien: 0,
                thanh_tien_net: 0,
                thoi_gian_giao_hang: 'Có sẵn',
                ghi_chu: '',
                hoa_hong: 0,
            });
        } else {
            $scope.Detail.ListNew.push({
                ma_hang: mahang,
                ten_hang: tenhang,
                so_luong: 0,
                ma_dieu_chinh: '',
                dvt: dvt,
                hang: hang,
                gia_list: dongia,
                gia_nhap: 0,
                don_gia: 0,
                he_so_loi_nhuan: 0,
                chiet_khau: 0,
                gia_bao_di_net: dongia,
                thanh_tien: 0,
                thanh_tien_net: 0,
                thoi_gian_giao_hang: '',
                ghi_chu: '',
                hoa_hong: 0,
            });
        }

    }

    $scope.FindProduct = function (machuan) {

        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/' + machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoa = response.data;

        });
    }



    $scope.thembaogia = function (baogia) {
        $scope.baogia = baogia;
        $('.thongtinchungthemmoi').hide();
        $('.savethongtin').show();

        baogiaService.get_phieubaogia($scope.baogia.SO_BAO_GIA).then(function (a) {
            $scope.BangBaoGia = a;
        });

        baogiaService.get_ct_phieubaogia($scope.baogia.SO_BAO_GIA).then(function (b) {
            $scope.Detail.ListAdd = b;

            if ($scope.Detail.ListAdd[0].CM != 0) {
                $scope.editCM = true;
            } else {
                $scope.editCM = false;
            }

            var phi_van_chuyen = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-phivanchuyen').text()) || 0;;
            var chiphixuly = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-chiphixuly').text()) || 0;;
            var thuesuatgtgt = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-thuesuatgtgt').text()) || 0;;
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
    //End Tìm Kiếm Thông Tin hàng Hóa them


    //Tìm Kiếm Thông Tin hàng Hóa lưu
    $scope.TimKiem = function (machuan) {

        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/' + machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoaluu = response.data;

        });
    }


    //button add check
    $scope.newsave = function (mahang, tenhang, dvt, xuatxu, hang, dongia, tonhl) {
        if (tonhl != 0) {
            $scope.Detail.ListAdd.push({
                MA_HANG: mahang,
                TEN_HANG: tenhang,
                HANG_SP: hang,
                MA_DIEU_CHINH: '',
                DVT: dvt,
                SO_LUONG: 0,
                GIA_LIST: dongia,
                DON_GIA_NHAP: 0,
                DON_GIA_BAO_DI_NET: dongia,
                DON_GIA: 0,
                HE_SO_LOI_NHUAN: 0,
                CHIET_KHAU: 0,
                THANH_TIEN: 0,
                THANH_TIEN_NET: 0,
                THOI_GIAN_GIAO_HANG: 'Có sẵn',
                GHI_CHU: '',
                CM: 0,
            });
        } else {
            $scope.Detail.ListAdd.push({
                MA_HANG: mahang,
                TEN_HANG: tenhang,
                HANG_SP: hang,
                MA_DIEU_CHINH: '',
                DVT: dvt,
                SO_LUONG: 0,
                GIA_LIST: dongia,
                DON_GIA_NHAP: 0,
                DON_GIA: 0,
                DON_GIA_BAO_DI_NET: dongia,
                HE_SO_LOI_NHUAN: 0,
                CHIET_KHAU: 0,
                THANH_TIEN: 0,
                THANH_TIEN_NET: 0,
                THOI_GIAN_GIAO_HANG: '',
                GHI_CHU: '',
                CM: 0,
            });
        }

    }
    // End hang hoa luu

    //Click chọn hàng hóa để tách
    $scope.tachbaogia = function (item) {
        $scope.item = item;
        $scope.Detail.ListTach.push({
            ID: $scope.item.ID,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_HANG: $scope.item.MA_HANG,
            MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
            HANG_SP: $scope.item.HANG_SP,
            DVT: $scope.item.DVT,
            SO_LUONG: $scope.item.SO_LUONG,
            DON_GIA: $scope.item.DON_GIA_MOI,
            CHIET_KHAU: $scope.item.CHIET_KHAU,
            GIA_LIST: parseFloat($scope.item.GIA_LIST),
            DON_GIA_NHAP: parseFloat($scope.item.DON_GIA_NHAP),
            HE_SO_LOI_NHUAN: $scope.item.HE_SO_LOI_NHUAN,
            DON_GIA_BAO_DI_NET: $scope.item.DON_GIA_BAO_DI_NET,
            CM: $scope.item.CM,
            DON_GIA_MOI: $scope.item.DON_GIA_MOI,
            THUE_TNDN: $scope.item.THUE_TNDN,
            TIEN_THUE_TNDN: $scope.item.TIEN_THUE_TNDN,
            KHACH_NHAN_DUOC: $scope.item.KHACH_NHAN_DUOC,
            THANH_TIEN: $scope.item.THANH_TIEN,
            THANH_TIEN_NET: $scope.item.THANH_TIEN_NET,
            THOI_GIAN_GIAO_HANG: $scope.item.THOI_GIAN_GIAO_HANG,
            GHI_CHU: $scope.item.GHI_CHU,
        });
    };
    //End chọn hàng hóa tách

    //Lọc hàng hóa----------------------------------------------------------------------------------------------------


    //mảng khách hàng
    $scope.arrayHHFinded = [];
    $scope.arrayHH = [];
    $scope.showtable_hanghoa = false;

    //get data khách hàng

    var inputChangedPromise;
    //hàm tìm kiếm
    $scope.onHHFind = function (mh) {
        $http.get(window.location.origin + '/api/Api_HanghoaHL/GetAllHHBaoGia/' + mh + '/' + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayHH = response.data;
                 $scope.arrayHHFinded = $scope.arrayHH.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         })
    }


    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.inputstaff = function (kh, index, detail) {
        $scope.showtable_hanghoa = true;
        if (kh.tonHL > 0) {
            detail.ma_hang = kh.MA_HANG;
            detail.ma_chuan = kh.MA_CHUAN;
            detail.ten_hang = kh.TEN_HANG;
            detail.so_luong = 0;
            detail.ma_dieu_chinh = kh.MA_CHUAN;
            detail.dvt = kh.DVT;
            detail.hang = kh.MA_NHOM_HANG;
            detail.gia_list = kh.GIA_LIST;
            detail.gia_nhap = 0;
            detail.don_gia = 0;
            detail.he_so_loi_nhuan = 0;
            detail.chiet_khau = 0;
            detail.gia_bao_di_net = kh.GIA_LIST;
            detail.thanh_tien = 0;
            detail.thanh_tien_net = 0;
            detail.thoi_gian_giao_hang = 'Có sẵn';
            detail.ghi_chu = '';
            detail.hoa_hong = 0;
            so_luong_trong_kho = 0;
        } else {
            detail.ma_hang = kh.MA_HANG;
            detail.ma_chuan = kh.MA_CHUAN;
            detail.ten_hang = kh.TEN_HANG;
            detail.so_luong = 0;
            detail.ma_dieu_chinh = kh.MA_CHUAN;
            detail.dvt = kh.DVT;
            detail.hang = kh.MA_NHOM_HANG;
            detail.gia_list = kh.GIA_LIST;
            detail.gia_nhap = 0;
            detail.don_gia = 0;
            detail.he_so_loi_nhuan = 0;
            detail.chiet_khau = 0;
            detail.gia_bao_di_net = kh.GIA_LIST;
            detail.thanh_tien = 0;
            detail.thanh_tien_net = 0;
            detail.thoi_gian_giao_hang = '';
            detail.ghi_chu = '';
            detail.hoa_hong = 0;
            so_luong_trong_kho = 0;
        }
        var valueArr = $scope.Detail.ListNew.map(function (item) { return item.ma_hang });
        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item) != idx
        });
        if (isDuplicate == true) {
            var x = confirm("Mã này đã có trong báo giá,bạn có chắc là vẫn muốn thêm mã mới không?");
            if (x)
            {
                
            }else{
                $scope.Detail.ListNew.splice(index, 1);
            }                
        }                   
        detail.showtable_hanghoa = false;
    }
    //End lọc hàng hóa----------------------------------------------------------------------------------------------------------------------


    //Lọc hàng hóa----------------------------------------------------------------------------------------------------


    //mảng khách hàng
    $scope.arrayHHEditFinded = [];
    $scope.arrayHHEdit = [];
    $scope.showtable_hanghoa_edit = false;

    //get data khách hàng

    var inputChangedPromise;



    //hàm tìm kiếm
    $scope.onHHEditFind = function (mh) {
        $http.get(window.location.origin + '/api/Api_HanghoaHL/GetAllHHBaoGia/' + mh + '/' + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayHHEdit = response.data;
                 $scope.arrayHHEditFinded = $scope.arrayHHEdit.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         })
    }


    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.inputstaff_edit = function (kh, index, item) {

        if (kh.SO_LUONG > 0) {
            item.MA_HANG = kh.MA_HANG;
            item.MA_CHUAN = kh.MA_CHUAN;
            item.TEN_HANG = kh.TEN_HANG;
            item.SO_LUONG = 0;
            item.MA_DIEU_CHINH = kh.MA_CHUAN;
            item.DVT = kh.DVT;
            item.HANG_SP = kh.MA_NHOM_HANG;
            item.GIA_LIST = kh.GIA_LIST;
            item.DON_GIA_NHAP = 0;
            item.DON_GIA = 0;
            item.HE_SO_LOI_NHUAN = 0;
            item.CHIET_KHAU = 0;
            item.DON_GIA_BAO_DI_NET = kh.GIA_LIST;
            item.THANH_TIEN = 0;
            item.THANH_TIEN_NET = 0;
            item.THOI_GIAN_GIAO_HANG = 'Có sẵn';
            item.GHI_CHU = '';
            item.CM = 0;
            item.SO_LUONG_TRONG_KHO = kh.SO_LUONG;
        } else {
            item.MA_HANG = kh.MA_HANG;
            item.MA_CHUAN = kh.MA_CHUAN;
            item.TEN_HANG = kh.TEN_HANG;
            item.SO_LUONG = 0;
            item.MA_DIEU_CHINH = kh.MA_CHUAN;
            item.DVT = kh.DVT;
            item.HANG_SP = kh.MA_NHOM_HANG;
            item.GIA_LIST = kh.GIA_LIST;
            item.DON_GIA_NHAP = 0;
            item.DON_GIA = 0;
            item.HE_SO_LOI_NHUAN = 0;
            item.CHIET_KHAU = 0;
            item.DON_GIA_BAO_DI_NET = kh.GIA_LIST;
            item.THANH_TIEN = 0;
            item.THANH_TIEN_NET = 0;
            item.THOI_GIAN_GIAO_HANG = '';
            item.GHI_CHU = '';
            item.CM = 0;
            item.SO_LUONG_TRONG_KHO = kh.SO_LUONG;
        }

        var valueArr = $scope.thongtinchitiet.map(function (item) { return item.MA_HANG });
        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item) != idx
        });
        if (isDuplicate == true) {
            var x = confirm("Mã này đã có trong báo giá,bạn có chắc là vẫn muốn thêm mã mới không?");
            if (x) {

            } else {
                $scope.thongtinchitiet.splice(index, 1);
            }
        }

        item.showtable_hanghoa_edit = false;
    };

    //End lọc hàng hóa----------------------------------------------------------------------------------------------------------------------


    $scope.addnewproduct = function () {
        $scope.Detail.ListNew.push({
            ma_hang: '',
            ten_hang: '',
            so_luong: 0,
            ma_dieu_chinh: '',
            dvt: '',
            hang: '',
            gia_list: 0,
            gia_nhap: 0,
            don_gia: 0,
            he_so_loi_nhuan: 0,
            chiet_khau: 0,
            gia_bao_di_net: 0,
            thanh_tien: 0,
            thanh_tien_net: 0,
            thoi_gian_giao_hang: '',
            ghi_chu: '',
            hoa_hong: 0,
        });
    };

    $scope.NewEditProduct = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: '',
            TEN_HANG: '',
            HANG_SP: '',
            MA_DIEU_CHINH: '',
            DVT: '',
            SO_LUONG: 0,
            GIA_LIST: 0,
            DON_GIA_NHAP: 0,
            DON_GIA: 0,
            DON_GIA_BAO_DI_NET: 0,
            HE_SO_LOI_NHUAN: 0,
            CHIET_KHAU: 0,
            THANH_TIEN: 0,
            THANH_TIEN_NET: 0,
            THOI_GIAN_GIAO_HANG: '',
            GHI_CHU: '',
            CM: 0,
        });
        $scope.thongtinchitiet.push({
            MA_HANG: '',
            TEN_HANG: '',
            HANG_SP: '',
            MA_DIEU_CHINH: '',
            DVT: '',
            SO_LUONG: 0,
            GIA_LIST: 0,
            DON_GIA_NHAP: 0,
            DON_GIA: 0,
            DON_GIA_BAO_DI_NET: 0,
            HE_SO_LOI_NHUAN: 0,
            CHIET_KHAU: 0,
            THANH_TIEN: 0,
            THANH_TIEN_NET: 0,
            THOI_GIAN_GIAO_HANG: '',
            GHI_CHU: '',
            CM: 0,
        });
    };

    $scope.phuongthuctt = ["Thanh toán 100% trước khi nhận hàng", "Thanh toán 100% sau khi giao hàng", "30% trả trước,70% sau khi giao hàng", "40% trả trước,60% sau khi giao hàng", "50% trả trước,50% sau khi giao hàng", "Thanh toán ngay", "Chuyển khoản", "Tiền mặt"];
    $scope.cachtinhthanhtien = ['Giá nhập', 'Giá list'];
    $scope.dieukhoantt = ['3-5 ngày','7 ngày','10 ngày','15 ngày','30 ngày','Thanh toán ngày 5 hàng tháng','Thanh toán ngày 10 hàng tháng','Thanh toán ngày 20 hàng tháng','Thanh toán ngày 25 hàng tháng','Thanh toán ngày 30 hàng tháng','Thanh toán cuối tháng sau tháng giao hàng','Thanh toán sau 2 tháng giao hàng'];
    $scope.ck_vat = [0, 5, 10];

    $scope.phuongthucttnew = ["Thanh toán 100% sau khi giao hàng", "30% trả trước,70% sau khi giao hàng", "40% trả trước,60% sau khi giao hàng", "50% trả trước,50% sau khi giao hàng", "Thanh toán ngay","Chuyển khoản","Tiền mặt"];
    $scope.cachtinhthanhtiennew = ['Giá nhập', 'Giá list'];
    $scope.dieukhoanttnew = ['3-5 ngày', '7 ngày', '10 ngày', '15 ngày', '30 ngày', 'Thanh toán ngày 5 hàng tháng', 'Thanh toán ngày 10 hàng tháng', 'Thanh toán ngày 20 hàng tháng', 'Thanh toán ngày 25 hàng tháng', 'Thanh toán ngày 30 hàng tháng', 'Thanh toán cuối tháng sau tháng giao hàng', 'Thanh toán sau 2 tháng giao hàng'];
    $scope.ck_vat_new = [0, 5, 10];
    $scope.hoadonchungtu = ['Hóa đơn đỏ(VAT)', 'Hóa đơn thường', 'Không hóa đơn']

    var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    function dochangchuc(so, daydu) {
        var chuoi = "";
        chuc = Math.floor(so / 10);
        donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + mangso[chuc] + " mươi";
            if (donvi == 1) {
                chuoi += " mốt";
            }
        } else if (chuc == 1) {
            chuoi = " mười";
            if (donvi == 1) {
                chuoi += " một";
            }
        } else if (daydu && donvi > 0) {
            chuoi = " lẻ";
        }
        if (donvi == 5 && chuc >= 1) {
            chuoi += " lăm";
        } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            chuoi += " " + mangso[donvi];
        }
        return chuoi;
    }
    function docblock(so, daydu) {
        var chuoi = "";
        tram = Math.floor(so / 100);
        so = so % 100;
        if (daydu || tram > 0) {
            chuoi = " " + mangso[tram] + " trăm";
            chuoi += dochangchuc(so, true);
        } else {
            chuoi = dochangchuc(so, false);
        }
        return chuoi;
    }
    function dochangtrieu(so, daydu) {
        var chuoi = "";
        trieu = Math.floor(so / 1000000);
        so = so % 1000000;
        if (trieu > 0) {
            chuoi = docblock(trieu, daydu) + " triệu";
            daydu = true;
        }
        nghin = Math.floor(so / 1000);
        so = so % 1000;
        if (nghin > 0) {
            chuoi += docblock(nghin, daydu) + " nghìn";
            daydu = true;
        }
        if (so > 0) {
            chuoi += docblock(so, daydu);
        }
        return chuoi;
    }
    function docso(so) {
        if (so == 0) return mangso[0];
        var chuoi = "", hauto = "";
        do {
            ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);
        return chuoi;
    }

    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);

    $scope.arrayLHFinded = [];
    $scope.arrayLH = [];
    $scope.showtable_id_lien_he = false;

    $scope.lienhekh = function (url) {
        //get data liên hệ
        $http.post(window.location.origin + '/api/Api_LienHeKhachHang/' + url)
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
    $scope.lienhekh(url)


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
        $scope.id_lien_he = p_dt.ID_LIEN_HE;
        $scope.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
        $scope.email_ca_nhan = p_dt.EMAIL_CA_NHAN;
        $scope.sdt1 = p_dt.SDT1;
        $scope.email_cong_ty = p_dt.EMAIL_CONG_TY;
        $scope.showtable_id_lien_he = false;
    }
    $scope.idlienhe = true;
    function checkall() {
        var check = true;

        //for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
        //    if ($scope.Detail.ListNew[i].ma_hang == null || $scope.Detail.ListNew[i].ma_hang == "") {
        //        ErrorSystem("Thiếu mã hàng tại dòng " + (i + 1))
        //    }
        //    if ($scope.Detail.ListNew[i].so_luong == null || $scope.Detail.ListNew[i].so_luong == "" || $scope.Detail.ListNew[i].so_luong == 0) {
        //        ErrorSystem("Thiếu số lượng tại dòng " + (i + 1))
        //    }
        //    if ($scope.Detail.ListNew[i].dvt == null || $scope.Detail.ListNew[i].dvt == "") {
        //        ErrorSystem("Thiếu đơn vị tính tại dòng " + (i + 1))
        //    }
        //    if ($scope.Detail.ListNew[i].thoi_gian_giao_hang == null || $scope.Detail.ListNew[i].thoi_gian_giao_hang == "") {
        //        ErrorSystem("Thiếu thời gian giao hàng tại dòng " + (i + 1))
        //    }
        //}

        //for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
        //    if (typeof $scope.Detail.ListNew[i].so_luong != 'undefined' && $scope.Detail.ListNew[i].so_luong != null && $scope.Detail.ListNew[i].so_luong != 0 && $scope.Detail.ListNew[i].thoi_gian_giao_hang != "" && $scope.Detail.ListNew[i].thoi_gian_giao_hang != null
        //        && $scope.Detail.ListNew[i].dvt != null && $scope.Detail.ListNew[i].dvt != "") {

        //    }
        //}
        return check;
    }
    $scope.CreateNewFromKH = function (form) {

        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var username = $('#username').val();
        var tongtien = parseInt($('#tongtienbaogia').text());


        $scope.arrayBaoGiaChiTiet = [];
        //if (checkall() == false) {
        //    return;
        //}

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                GHI_CHU: $scope.Detail.ListNew[i].GHI_CHU,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: username,
            MA_KHACH_HANG: url,
            LIEN_HE_KHACH_HANG: $scope.id_lien_he,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: parseInt($scope.phivanchuyen),
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: macongty,
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
            ChiTietCuaBaoGia: $scope.arrayBaoGiaChiTiet,
        };

        $scope.submitted = true;
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            console.log('invalid');
            return;
        } else {
            //Lưu vào CSDL
            $http.post("/api/Api_BaoGia/BaoGiaTuKhach", $scope.BANGBAOGIA)
                .then(function successCallback(response) {
                    $scope.BANGBAOGIA = response.data;
                    SuccessSystem("Tạo thành công báo giá số " + $scope.BANGBAOGIA.SO_BAO_GIA);
                    $scope.createnewPOvalue = true;
                    if (macongty.substring(0, 2) == "TA") {
                        $(function () {
                            setTimeout(function () {
                                window.location.href = "/KinhDoanh/BaoGia/GetBaoGia_TA/" + $scope.BANGBAOGIA.SO_BAO_GIA;

                            }, 2000);
                        });
                    } else {
                        $(function () {
                            setTimeout(function () {
                                window.location.href = "/KinhDoanh/BaoGia/GetBaoGia/" + $scope.BANGBAOGIA.SO_BAO_GIA;

                            }, 2000);
                        });
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    ErrorSystem("Sự cố hệ thống, Không lưu được phiếu báo giá, Bạn vui lòng liên hệ với admin để khắc phục");
                });
        }


    };

    $scope.movetoPrint = function () {
        window.location.href = window.location.origin + '/KinhDoanh/BaoGia/GetBaoGia/' + $scope.BANGBAOGIA.SO_BAO_GIA;;
    };

    $scope.CreateNewPOFromKH = function () {
        var username = $('#username').val();
        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_new);
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                DVT: $scope.Detail.ListNew[i].dvt,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].thanh_tien,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: url,
            TEN_LIEN_HE: $scope.nguoi_lien_he,
            HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_new,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_new,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_new),
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            PHI_VC : parseInt($scope.phivanchuyen),
            TRUC_THUOC: macongty,
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: username,
            SO_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };

        //Lưu vào CSDL



        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data);

            // phuong an kinh doanh
            $scope.PhuongAnKD = {
                MA_SO_PO: response.data,
                PHIEU_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
                MA_KHACH_HANG: url,
                NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                CHI_PHI_KHAC: $scope.phivanchuyen,
                TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
                TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_new,
                GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
                CHI_PHI_HOA_DON: 20,
                TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
                THUE_VAT: $scope.thue_suat_gtgt,
                TIEN_THUE_VAT: $scope.thue_vat_new,
                TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
                LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_new,
                THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
                HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                CONG_NO: $scope.dieu_khoan_thanh_toan,
                TRUC_THUOC: macongty,
                NHAN_VIEN_QUAN_LY: username,
            }

            $http({
                method: 'POST',
                data: $scope.PhuongAnKD,
                url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 PAKD có mã là ' + response.data.MA_SO_PAKD);
            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không thêm được PAKD, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
            // phuong an kinh doanh

        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.new_ct_khachhang = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        $http.get('/api/Api_KH/GetCT_KH/' + url + '/' + macongty).then(function (response) {
            $scope.list_chitietkhachhangnew = response.data;
        });
    };
    $scope.new_ct_khachhang();


    $scope.CreateNewBaoGiaFromBaoGia = function (form) {

        var username = $('#username').val();




        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                GHI_CHU : $scope.Detail.ListNew[i].GHI_CHU,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: username,
            MA_KHACH_HANG: $scope.ma_khach_hang,
            LIEN_HE_KHACH_HANG: $scope.id_lien_he,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: $scope.phivanchuyen,
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: macongty,
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
            ChiTietCuaBaoGia: $scope.arrayBaoGiaChiTiet
        };

        $scope.submitted = true;
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            console.log('invalid');
            return;
        } else {
            $http.post("/api/Api_BaoGia/BaoGiaTuKhach", $scope.BANGBAOGIA)
            .then(function successCallback(response) {
                $scope.BANGBAOGIA = response.data;

                SuccessSystem("Tạo thành công phiếu báo giá số " + $scope.BANGBAOGIA.SO_BAO_GIA);
                $scope.createnewPOvalue = true;
                if(macongty.substring(0,2) == "TA")
                {
                    $(function () {
                        setTimeout(function () {
                            window.location.href = "/KinhDoanh/BaoGia/GetBaoGia_TA/" + $scope.BANGBAOGIA.SO_BAO_GIA;

                        }, 2000);
                    });
                } else {
                    $(function () {
                        setTimeout(function () {
                            window.location.href = "/KinhDoanh/BaoGia/GetBaoGia/" + $scope.BANGBAOGIA.SO_BAO_GIA;

                        }, 2000);
                    });
                }

            }, function errorCallback(response) {
            console.log(response);
            ErrorSystem("Sự cố hệ thống, Không tạo được báo giá, Bạn vui lòng liên hệ với admin để khắc phục");
            });
        }



    }

    $scope.CreatePONewFromBaoGia = function () {
        var username = $('#username').val();
        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_new);
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                DVT: $scope.Detail.ListNew[i].dvt,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].thanh_tien,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.ma_khach_hang,
            TEN_LIEN_HE: $scope.nguoi_lien_he,
            HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_new,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_new,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_new),
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TRUC_THUOC: macongty,
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: username,
            SO_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };

        //Lưu vào CSDL



        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data);
            $scope.PhuongAnKD = {
                MA_SO_PO: response.data,
                PHIEU_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
                MA_KHACH_HANG: $scope.ma_khach_hang,
                NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                CHI_PHI_KHAC: $scope.phivanchuyen,
                TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
                TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_new,
                GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
                CHI_PHI_HOA_DON: 20,
                TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
                THUE_VAT: $scope.thue_suat_gtgt,
                TIEN_THUE_VAT: $scope.thue_vat_new,
                TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
                LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_new,
                THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
                HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                CONG_NO: $scope.dieu_khoan_thanh_toan,
                TRUC_THUOC: macongty,
                NHAN_VIEN_QUAN_LY: username,
            }

            $http({
                method: 'POST',
                data: $scope.PhuongAnKD,
                url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data.MA_SO_PAKD);

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không thêm được phương án kinh doanh');
            });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không thêm được đơn PO');
        });
    };

    $scope.getdataBaoGia = function (sobaogia) {
        $http.post(window.location.origin + '/api/Api_BaoGia/PrintBaoGia/' + sobaogia)
         .then(function (response) {
             if (response.data) {
                 $scope.thongtinbaogia = response.data;
                 $scope.thongtinchung = $scope.thongtinbaogia.BG;
                 $scope.thongtinchitiet = $scope.thongtinbaogia.CTBG;                
             }

         }, function (error) {
             console.log(error);
         })
    }
    $scope.getdataBaoGia(url);

    $scope.tinhtien = function (item) {
        $scope.item = item;
        $scope.item = item;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        if ($scope.item.GIA_LIST != null && $scope.item.GIA_LIST != 0) {
            $scope.item.DON_GIA_BAO_DI_NET =parseInt($scope.item.GIA_LIST) - parseInt((parseInt($scope.item.GIA_LIST) * ($scope.item.CHIET_KHAU / 100)));
        } else {
            $scope.item.DON_GIA_BAO_DI_NET = parseInt($scope.item.DON_GIA_NHAP) + parseInt((parseInt($scope.item.DON_GIA_NHAP) * ($scope.item.HE_SO_LOI_NHUAN / 100)));
        };

        if ($scope.item.CM != null && $scope.item.CM != undefined) {
            $scope.item.DON_GIA_MOI = parseInt(((100 - parseInt($scope.item.THUE_TNDN)) * $scope.item.DON_GIA_BAO_DI_NET) / parseInt(100 - ($scope.item.CM) - parseInt($scope.item.TIEN_THUE_TNDN)));

            bien_trung_gian = parseInt((100 - $scope.item.THUE_TNDN) / $scope.item.THUE_TNDN);

            $scope.item.KHACH_NHAN_DUOC = parseInt($scope.item.DON_GIA_MOI * ($scope.item.CM / 100)) * $scope.item.SO_LUONG;

            $scope.item.TIEN_THUE_TNDN = parseInt($scope.item.KHACH_NHAN_DUOC / (parseInt(bien_trung_gian)));

        }

        $scope.item.THANH_TIEN = $scope.item.DON_GIA_MOI * $scope.item.SO_LUONG;
        $scope.item.THANH_TIEN_NET = $scope.item.SO_LUONG * $scope.item.DON_GIA_BAO_DI_NET;

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            tong_gia_tri_thuc_te_edit = parseInt($scope.thongtinchitiet[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseInt($scope.thongtinchitiet[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseInt($scope.thongtinchitiet[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseInt($scope.thongtinchitiet[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.thongtinchung.TONG_TIEN = tong_gia_tri_theo_hop_dong_edit;
        $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE = tong_gia_tri_thuc_te_edit;
        $scope.thongtinchung.TONG_CHI_PHI_HOA_DON = tong_chi_phi_hoa_don_edit;
        $scope.thongtinchung.THUC_NHAN_CUA_KHACH = tong_khach_nhan_edit;

        $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH = parseInt($scope.thongtinchung.TONG_TIEN - $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE);

        $scope.thongtinchung.TIEN_THUE_GTGT = parseInt($scope.thongtinchung.TONG_TIEN * ($scope.thongtinchung.THUE_SUAT_GTGT / 100));


        $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH = parseInt($scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE + $scope.thongtinchung.TONG_CHI_PHI_HOA_DON + $scope.thongtinchung.TIEN_THUE_GTGT + $scope.thongtinchung.THUC_NHAN_CUA_KHACH + parseInt($scope.thongtinchung.PHI_VAN_CHUYEN));
    };
    

    $scope.suathongtinchung = function () {
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;
        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.thongtinchitiet[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.thongtinchitiet[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.thongtinchung.TONG_TIEN = tong_gia_tri_theo_hop_dong_edit
        $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE = tong_gia_tri_thuc_te_edit;
        $scope.thongtinchung.TONG_CHI_PHI_HOA_DON = tong_chi_phi_hoa_don_edit;
        $scope.thongtinchung.THUC_NHAN_CUA_KHACH = tong_khach_nhan_edit;

        $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH = parseFloat($scope.thongtinchung.TONG_TIEN - $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE);

        $scope.thongtinchung.TIEN_THUE_GTGT = parseFloat($scope.thongtinchung.TONG_TIEN * ($scope.thongtinchung.THUE_SUAT_GTGT / 100));


        $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH = parseFloat($scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE + $scope.thongtinchung.TONG_CHI_PHI_HOA_DON + $scope.thongtinchung.TIEN_THUE_GTGT + $scope.thongtinchung.THUC_NHAN_CUA_KHACH + parseInt($scope.thongtinchung.PHI_VAN_CHUYEN));
    };

    $scope.SaveBaoGia = function () {
        $scope.Bao_Gia = {
            SO_BAO_GIA: url,
            SALES_BAO_GIA: $scope.thongtinchung.SALES_BAO_GIA,
            MA_KHACH_HANG: $scope.thongtinchung.MA_KHACH_HANG,
            NGAY_BAO_GIA: $scope.thongtinchung.NGAY_BAO_GIA,
            MA_DU_KIEN:  $scope.thongtinchung.MA_DU_KIEN,
            LIEN_HE_KHACH_HANG: $scope.thongtinchung.LIEN_HE_KHACH_HANG,
            PHUONG_THUC_THANH_TOAN: $scope.thongtinchung.PHUONG_THUC_THANH_TOAN,
            HAN_THANH_TOAN: $scope.thongtinchung.HAN_THANH_TOAN,
            HIEU_LUC_BAO_GIA: $scope.thongtinchung.HIEU_LUC_BAO_GIA,
            DIEU_KHOAN_THANH_TOAN: $scope.thongtinchung.DIEU_KHOAN_THANH_TOAN,
            PHI_VAN_CHUYEN: $scope.thongtinchung.PHI_VAN_CHUYEN,
            TONG_TIEN:  $scope.thongtinchung.TONG_TIEN,
            DA_DUYET: $scope.thongtinchung.DA_DUYET,
            DA_TRUNG: $scope.thongtinchung.DA_TRUNG,
            DA_HUY: $scope.thongtinchung.DA_HUY,
            TRUC_THUOC: macongty,
            THUE_SUAT_GTGT: $scope.thongtinchung.THUE_SUAT_GTGT,
            TIEN_THUE_GTGT:  $scope.thongtinchung.TIEN_THUE_GTGT,
            TONG_GIA_TRI_DON_HANG_THUC_TE:  $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE,
            GIA_TRI_THUC_THU_TU_KHACH:  $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH,
            TONG_GIA_TRI_CHENH_LECH:  $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH,
            TONG_CHI_PHI_HOA_DON:  $scope.thongtinchung.TONG_CHI_PHI_HOA_DON,
            THUC_NHAN_CUA_KHACH:  $scope.thongtinchung.THUC_NHAN_CUA_KHACH,
            DANG_CHO_PHAN_HOI: true,
        };

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {


            var ChiTietBaoGia = {
                ID: $scope.thongtinchitiet[i].ID,
                TEN_HANG: $scope.thongtinchitiet[i].TEN_HANG,
                MA_HANG: $scope.thongtinchitiet[i].MA_HANG,
                MA_DIEU_CHINH: $scope.thongtinchitiet[i].MA_DIEU_CHINH,
                HANG_SP: $scope.thongtinchitiet[i].HANG_SP,
                DVT: $scope.thongtinchitiet[i].DVT,
                SO_LUONG: $scope.thongtinchitiet[i].SO_LUONG,
                DON_GIA: $scope.thongtinchitiet[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.thongtinchitiet[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.thongtinchitiet[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.thongtinchitiet[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.thongtinchitiet[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET,
                CM: $scope.thongtinchitiet[i].CM,
                DON_GIA_MOI: $scope.thongtinchitiet[i].DON_GIA_MOI,
                THUE_TNDN: $scope.thongtinchitiet[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.thongtinchitiet[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.thongtinchitiet[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.thongtinchitiet[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.thongtinchitiet[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.thongtinchitiet[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.thongtinchitiet[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        //Lưu vào CSDL

        $http({
            method: 'PUT',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_BaoGia/' + $scope.Bao_Gia.SO_BAO_GIA
        }).then(function successCallback(response) {
            $scope.Bao_Gia = response.data;

            $scope.Bao_Gia.SO_BAO_GIA;

            for (var i = 0; i < $scope.arrayChiTietBaoGia.length; i++) {
                $scope.arrayChiTietBaoGia[i].SO_BAO_GIA = $scope.Bao_Gia.SO_BAO_GIA;
            }


            if ($scope.arrayChiTietBaoGia.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.arrayChiTietBaoGia,
                    url: window.location.origin + '/api/Api_ChiTietBaoGia/PutBH_CT_BAO_GIA'
                }).then(function successCallback(response) {
                    SuccessSystem("Hoàn Thành Lưu");
                    if (macongty.substring(0, 2) == "TA")
                    {
                        $(function () {
                            setTimeout(function () {
                                window.location.href = "/KinhDoanh/BaoGia/GetBaoGia_TA/" + $scope.Bao_Gia.SO_BAO_GIA;

                            }, 2000);
                        });
                    } else {
                        $(function () {
                            setTimeout(function () {
                                window.location.href = "/KinhDoanh/BaoGia/GetBaoGia/" + $scope.Bao_Gia.SO_BAO_GIA;

                            }, 2000);
                        });
                    }
                }, function errorCallback(response) {
                    ErrorSystem('Không lưu được chi tiết giữ kho');
                });
                return;
            }

        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.TinhTongTienHoaDon = function (tien_khach_nhan_edit) {

        var chenhlech = 0;
        var khachnhan = 0;
        var newcm = 0;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;

       
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            $scope.thongtinchitiet[i].DON_GIA_MOI = $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET;

            $scope.thongtinchitiet[i].THANH_TIEN = $scope.thongtinchitiet[i].DON_GIA_MOI * $scope.thongtinchitiet[i].SO_LUONG;
            $scope.thongtinchitiet[i].THANH_TIEN_NET = $scope.thongtinchitiet[i].SO_LUONG * $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET;
        };

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
        }

        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;


        chenhlech = parseFloat(tien_khach_nhan_edit - $scope.tong_gia_tri_theo_hop_dong_edit);
        khachnhan = parseFloat(chenhlech * 80) / 100;
        newcm = parseFloat((khachnhan * 100) / $scope.tong_gia_tri_thuc_te_edit);

        tong_gia_tri_thuc_te_edit = 0;
        tong_gia_tri_theo_hop_dong_edit = 0;
        tong_chi_phi_hoa_don_edit = 0;
        tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            $scope.thongtinchitiet[i].CM = newcm;

            $scope.thongtinchitiet[i].KHACH_NHAN_DUOC = parseFloat($scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET * ($scope.thongtinchitiet[i].CM / 100)) * $scope.thongtinchitiet[i].SO_LUONG;

            $scope.thongtinchitiet[i].BIEN_TRUNG_GIAN = parseFloat(($scope.thongtinchitiet[i].KHACH_NHAN_DUOC * 100) / 80);
            $scope.thongtinchitiet[i].TIEN_THUE_TNDN = parseFloat($scope.thongtinchitiet[i].BIEN_TRUNG_GIAN * ($scope.thongtinchitiet[i].THUE_TNDN / 100));

            $scope.thongtinchitiet[i].DON_GIA_MOI = parseFloat($scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET + ($scope.thongtinchitiet[i].KHACH_NHAN_DUOC/$scope.thongtinchitiet[i].SO_LUONG) + ($scope.thongtinchitiet[i].TIEN_THUE_TNDN/$scope.thongtinchitiet[i].SO_LUONG));

            $scope.thongtinchitiet[i].THANH_TIEN = $scope.thongtinchitiet[i].DON_GIA_MOI * $scope.thongtinchitiet[i].SO_LUONG;
            $scope.thongtinchitiet[i].THANH_TIEN_NET = $scope.thongtinchitiet[i].SO_LUONG * $scope.thongtinchitiet[i].DON_GIA_BAO_DI_NET;
        }

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.thongtinchitiet[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.thongtinchitiet[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.thongtinchitiet[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE = tong_gia_tri_thuc_te_edit;
        $scope.thongtinchung.TONG_TIEN = tong_gia_tri_theo_hop_dong_edit;
        $scope.thongtinchung.TONG_CHI_PHI_HOA_DON = tong_chi_phi_hoa_don_edit;
        $scope.thongtinchung.THUC_NHAN_CUA_KHACH = tong_khach_nhan_edit;

        $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH = parseFloat($scope.thongtinchung.TONG_TIEN - $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE);

        $scope.thongtinchung.TIEN_THUE_GTGT = parseFloat($scope.thongtinchung.TONG_TIEN * ($scope.thongtinchung.THUE_SUAT_GTGT / 100));



        $scope.thongtinchung.TONG_GIA_TRI_THU_CUA_KHACH = parseFloat($scope.thongtinchung.TONG_TIEN + $scope.thongtinchung.TONG_CHI_PHI_HOA_DON + $scope.thongtinchung.TIEN_THUE_GTGT + $scope.thongtinchung.THUC_NHAN_CUA_KHACH + $scope.thongtinchung.PHI_VAN_CHUYEN);
    };

    $scope.TaoDonPOMoi = function (form) {

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.thongtinchitiet.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.thongtinchitiet[i].MA_HANG,
                MA_DIEU_CHINH: $scope.thongtinchitiet[i].MA_DIEU_CHINH,
                DVT: $scope.thongtinchitiet[i].DVT,
                SO_LUONG: $scope.thongtinchitiet[i].SO_LUONG,
                DON_GIA: $scope.thongtinchitiet[i].DON_GIA_MOI,
                THANH_TIEN_HANG: $scope.thongtinchitiet[i].THANH_TIEN,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.thongtinchung.MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung.NGUOI_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung.PHUONG_THUC_THANH_TOAN,
            TONG_TIEN_THANH_TOAN: $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH,
            TONG_TIEN_HANG: $scope.thongtinchung.TONG_TIEN,
            TONG_TIEN_THUE_GTGT: $scope.thongtinchung.TIEN_THUE_GTGT,
            SO_TIEN_VIET_BANG_CHU: docso($scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH),
            THUE_SUAT_GTGT: $scope.thongtinchung.THUE_SUAT_GTGT,
            PHI_VC: $scope.thongtinchung.PHI_VAN_CHUYEN,
            TRUC_THUOC:macongty,
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: username,
            SO_BAO_GIA: url,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };

        $scope.submitted = true;
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            console.log('invalid');
            return;
        } else {
            $http({
                method: 'POST',
                data: $scope.Bao_Gia,
                url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data)
                $scope.PhuongAnKD = {
                    MA_SO_PO: response.data,
                    PHIEU_BAO_GIA: url,
                    MA_KHACH_HANG: $scope.thongtinchung.MA_KHACH_HANG,
                    NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                    TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                    CHI_PHI_KHAC: $scope.thongtinchung.PHI_VAN_CHUYEN,
                    TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.thongtinchung.TONG_GIA_TRI_DON_HANG_THUC_TE,
                    TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.thongtinchung.TONG_TIEN,
                    GIA_TRI_CHENH_LECH: $scope.thongtinchung.TONG_GIA_TRI_CHENH_LECH,
                    CHI_PHI_HOA_DON: 20,
                    TIEN_CHI_PHI_HOA_DON: $scope.thongtinchung.TONG_CHI_PHI_HOA_DON,
                    THUE_VAT: $scope.thongtinchung.THUE_SUAT_GTGT,
                    TIEN_THUE_VAT: $scope.thongtinchung.TIEN_THUE_GTGT,
                    TONG_GIA_TRI_THU_CUA_KHACH: $scope.thongtinchung.GIA_TRI_THUC_THU_TU_KHACH,
                    LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                    CHIET_KHAU_CHO_KHACH: $scope.thongtinchung.THUC_NHAN_CUA_KHACH,
                    THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                    THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                    HINH_THUC_THANH_TOAN: $scope.thongtinchung.PHUONG_THUC_THANH_TOAN,
                    HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                    CONG_NO: $scope.thongtinchung.DIEU_KHOAN_THANH_TOAN,
                    TRUC_THUOC: macongty,
                    NHAN_VIEN_QUAN_LY: username,
                }

                $http({
                    method: 'POST',
                    data: $scope.PhuongAnKD,
                    url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
                }).then(function successCallback(response) {
                    SuccessSystem('Bạn đã tạo thành công 1 PAKD có mã là ' + response.data.MA_SO_PAKD);
                    $(function () {
                        setTimeout(function () {
                            window.location.href = "/KinhDoanh/DonHangPO/DonPOHome";

                        }, 2000);
                    });
                }, function errorCallback(response) {
                    console.log(response);
                    ErrorSystem('Sự cố hệ thống, Không lưu được PAKD, Bạn vui lòng liên hệ với admin để khắc phục ');
                });
            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không lưu được đơn PO, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
        }
        //Lưu vào CSDL
       


        var so_tien_viet_bang_chu = docso($scope.thongtinchung.TONG_TIEN);

    };


    $scope.interval = function (sotrang) {
        var datas = {
            macongty: macongty,
            username: username,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        window.setInterval(function () {
            // List bao gia kinh doanh
            $http.post('/api/Api_BaoGia/ListBaoGia/' + sotrang,datas).then(function (response) {
                $scope.ds_baogia_kinhdoanh = response.data;
            });
        }, 5000);
    };
    


    //window.setInterval(function (sotrang) {
    //    // List bao gia kinh doanh
    //    $http.post('/api/Api_BaoGia/ListBaoGia/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh = response.data;
    //    });

    //    // List bao gia kinh doanh da huy
    //    $http.post('/api/Api_BaoGia/ListBaoGiaDaHuy/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh_dahuy = response.data;
    //    });

    //    // List bao gia kinh doanh that bai
    //    $http.post('/api/Api_BaoGia/ListBaoGiaThatBai/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh_thatbai = response.data;
    //    });

    //    // List bao gia kinh doanh dang cho phan hoi
    //    $http.post('/api/Api_BaoGia/ListBaoGiaDangChoPhanHoi/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh_dangchophanhoi = response.data;
    //    });

    //    // List bao gia kinh doanh da len PO
    //    $http.post('/api/Api_BaoGia/ListBaoGiaDaLenPO/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh_dalenPO = response.data;
    //    });

    //    // List bao gia kinh doanh thanh cong
    //    $http.post('/api/Api_BaoGia/ListBaoGiaThanhCong/' + isadmin + '/' + username).then(function (response) {
    //        $scope.ds_baogia_kinhdoanh_thanhcong = response.data;
    //    });
    //}, 5000);
    var tukhoa = '';

    var thamso = {
        username: username,
        macongty: macongty,
        isadmin: isadmin,
        tukhoa: tukhoa
    }

    // List bao gia kinh doanh
    $scope.load_listbaogia = function (index) {
        var pageNumber = parseInt(index);
        var datas = {
            macongty: macongty,
            username: username,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http.post('/api/Api_BaoGia/ListBaoGia/' + pageNumber, datas).then(function (response) {
            $scope.ds_baogia_kinhdoanh = response.data;
        });
    };
    $scope.load_listbaogia(1)

    // Phan trang list bao gia
    $http.post('/api/Api_BaoGia/DemTongSoBaoGia', thamso).then(function (response) {
        $scope.tongsobaogia = response.data;
        pagination2.make(parseInt($scope.tongsobaogia), 15);
    });


    function pageClick2(pageNumber) {
        $("#page-number-phan_trang_tong_kh").text(pageNumber);
        var datas = {
            macongty: macongty,
            username: username,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http({
            method: 'POST',
            data: datas,
            url: window.location.origin + '/api/Api_BaoGia/ListBaoGia/' + pageNumber
        }).then(function successCallback(response) {
            $scope.ds_baogia_kinhdoanh = response.data;
        });
        $scope.interval(pageNumber)
    }

    var pagination2 = new Pagination({

        container: $("#phan_trang_tong_list_bao_gia"),
        pageClickCallback: pageClick2,
        maxVisibleElements: 15,
        //showInput: true,
        //inputTitle: "Go to page"
    });

    //End phan trang list bao gia







    // List bao gia kinh doanh da huy
    $http.post('/api/Api_BaoGia/ListBaoGiaDaHuy/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dahuy = response.data;
    });

    // List bao gia kinh doanh that bai
    $http.post('/api/Api_BaoGia/ListBaoGiaThatBai/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.ds_baogia_kinhdoanh_thatbai = response.data;
    });

    // List bao gia kinh doanh dang cho phan hoi
    $http.post('/api/Api_BaoGia/ListBaoGiaDangChoPhanHoi/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dangchophanhoi = response.data;
    });

    // List bao gia kinh doanh da len PO
    $http.post('/api/Api_BaoGia/ListBaoGiaDaLenPO/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dalenPO = response.data;
    });

    //// List bao gia kinh doanh thanh cong
    //$http.post('/api/Api_BaoGia/ListBaoGiaThanhCong/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
    //    $scope.ds_baogia_kinhdoanh_thanhcong = response.data;
    //});


    // Chon khach hang bao gia moi

    $scope.arrayNewKH_BaoGiaFinded = [];
    $scope.arrayKH_BaoGia = [];
    $scope.showtable_KH_BaoGia = false;

    $http.post(window.location.origin + '/api/Api_BaoGia/KhachHangTheoSale/' + username + '/' + isadmin + '/' + macongty)
     .then(function (response) {
         if (response.data) {
             $scope.arrayKH_BaoGia = response.data;
             $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.map(function (item) {
                 return item;
             });
         }
     }, function (error) {
         console.log(error);
     });
    //hàm tìm kiếm
    $scope.onKH_BaoGiaFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.map(function (item) {
                return item;
            });
        }
        $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.ten_cong_ty.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoKH_BaoGia = function (p_dt) {
        $scope.ten_cong_ty = p_dt.TEN_CONG_TY;
        $scope.ma_khach_hang = p_dt.MA_KHACH_HANG;
        $scope.van_phong_giao_dich = p_dt.VAN_PHONG_GIAO_DICH;
        $scope.dia_chi_xuat_hoa_don = p_dt.DIA_CHI_XUAT_HOA_DON;
        $scope.hotline = p_dt.HOTLINE;
        $scope.showtable_KH_BaoGia = false;
        $scope.lienhekh(p_dt.MA_KHACH_HANG)
    }
    $scope.index = 0;
    $scope.getindex = function (index) {
        $scope.index = index;
    };

    $scope.CreateNewProductFromKH = function () {
        var data_add = {
            MA_CHUAN: $scope.new_ma_chuan,
            TEN_HANG: $scope.new_ten_hang,
            XUAT_XU: $scope.new_xuat_xu,
            DON_VI_TINH: $scope.new_dvt,
            MA_NHOM_HANG: $scope.new_nhom_hang,
            TK_HACH_TOAN_KHO: 1561,
            TK_DOANH_THU: 51111,
            TK_CHI_PHI: 632,
            MA_DO_SALE_TAO : true
        }
        $http.post('/api/Api_HanghoaHL/PostHH', data_add).then(function (response) {
            SuccessSystem("Thêm hàng hóa thành công")
            $scope.Detail.ListNew[$scope.index].ma_hang = response.data;
            $scope.Detail.ListNew[$scope.index].ma_chuan = $scope.new_ma_chuan;
            $scope.Detail.ListNew[$scope.index].ma_dieu_chinh = $scope.new_ma_chuan;
            $scope.Detail.ListNew[$scope.index].ten_hang = $scope.new_ten_hang;
            $scope.Detail.ListNew[$scope.index].hang = $scope.new_nhom_hang;
            $scope.Detail.ListNew[$scope.index].dvt = $scope.new_dvt;
            $scope.new_ma_chuan='';
            $scope.new_ten_hang='';
            $scope.new_xuat_xu='';
            $scope.new_dvt='';
            $scope.new_nhom_hang = '';
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Không thêm được hàng hóa');
        });
    };

    $scope.CreateNewProductFromEditBaoGia = function () {
        var data_add = {
            MA_CHUAN: $scope.new_ma_chuan,
            TEN_HANG: $scope.new_ten_hang,
            XUAT_XU: $scope.new_xuat_xu,
            DON_VI_TINH: $scope.new_dvt,
            MA_NHOM_HANG: $scope.new_nhom_hang,
            TK_HACH_TOAN: 1561,
            TK_DOANH_THU: 51111,
            TK_CHI_PHI: 632,
            MA_DO_SALE_TAO: true
        }
        $http.post('/api/Api_HanghoaHL/PostHH', data_add).then(function (response) {
            SuccessSystem("Thêm hàng hóa thành công")
            $scope.thongtinchitiet[$scope.index].MA_HANG = response.data;
            $scope.thongtinchitiet[$scope.index].MA_CHUAN = $scope.new_ma_chuan;
            $scope.thongtinchitiet[$scope.index].MA_DIEU_CHINH = $scope.new_ma_chuan;
            $scope.thongtinchitiet[$scope.index].TEN_HANG = $scope.new_ten_hang;
            $scope.thongtinchitiet[$scope.index].HANG_SP = $scope.new_nhom_hang;
            $scope.thongtinchitiet[$scope.index].DVT = $scope.new_dvt;
            $scope.new_ma_chuan = '';
            $scope.new_ten_hang = '';
            $scope.new_xuat_xu = '';
            $scope.new_dvt = '';
            $scope.new_nhom_hang = '';
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Không thêm được hàng hóa');
        });
    };

    function LamTron(number) {
        var so = number;
        var phantram = Math.ceil(so / 100);
        var ketqua = phantram * 100;

        return ketqua;
    }


    // Them khach hang

    //Lọc khách hàng theo tên
    $scope.ShowDataCustomer = function () {
        if ($("#DataCustomer").css("display") == "none") {
            $("#DataCustomer").css({ "display": "block" });
        }
        else {
            $("#DataCustomer").css({ "display": "block" });
        }
    }
    //End Lọc khách hàng theo tên

    $scope.load_khachhang = function (tukhoa) {

        $scope.danhsachtrang = [];
        var thongtintimkiem = {
            sales: salehienthoi,
            macongty: macongty,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http.post(window.location.origin + '/api/Api_KH/KH_THEO_TUNG_SALES/', thongtintimkiem)
       .then(function (response) {
           if (typeof (response.data) == "object") {
               $scope.ListKHTheoSale = response.data;
           }
           else {
               ErrorSystem();
           }
       }, function (error) {
           console.log(error);
       });


    };
    // them kh
    $scope.createnew = function (form) {
        var salestao = $('#salehienthoi').val();
        var logo = $('#imgInp').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];

        // If form is invalid, return and let AngularJS show validation errors.


        $("textarea[name=themghichu]").val(CKEDITOR.instances.themghichu.getData());
        var themghichu = $("[name=themghichu]").val();
        $("textarea[name=ho_so_thanh_toan]").val(CKEDITOR.instances.ho_so_thanh_toan.getData());
        var ho_so_thanh_toan = $("[name=ho_so_thanh_toan]").val();

        $scope.Thong_tin_KH = {
            LOGO: name_without_ext,
            TEN_CONG_TY: $scope.arraythongtin.ten_cong_ty,
            VAN_PHONG_GIAO_DICH: $scope.arraythongtin.van_phong_giao_dich,
            DIA_CHI_XUAT_HOA_DON: $scope.arraythongtin.dia_chi_xuat_hoa_don,
            MST: $scope.arraythongtin.ma_so_thue,
            WEBSITE: $scope.arraythongtin.website,
            HOTLINE: $scope.arraythongtin.hotline,
            FAX: $scope.arraythongtin.fax,
            DIEU_KHOAN_THANH_TOAN: $scope.arraythongtin.dieu_khoan_thanh_toan,
            SO_NGAY_DUOC_NO: $scope.arraythongtin.so_ngay_duoc_no,
            SO_NO_TOI_DA: parseInt($scope.arraythongtin.so_no_toi_da),
            EMAIL: $scope.arraythongtin.email,
            GHI_CHU: themghichu,
            HO_SO_THANH_TOAN: ho_so_thanh_toan,
            TINH: $scope.arraythongtin.tinh,
            TINH_TRANG_HOAT_DONG: $scope.arraythongtin.tinh_trang_hoat_dong,
            QUOC_GIA: $scope.arraythongtin.quoc_gia,
            TRUC_THUOC: macongty,
            SALES_TAO: salestao,
            KHACH_DO_MARKETING_TIM_KIEM: $scope.arraythongtin.khach_do_marketing_tim_kiem,
            THONG_TIN_DA_DAY_DU: $scope.arraythongtin.thong_tin_da_day_du,
            KHACH_MUA_SO_LUONG_NHIEU: $scope.arraythongtin.khach_mua_so_luong_nhieu,
            KHACH_MUA_DOANH_SO_CAO: $scope.arraythongtin.khach_mua_doanh_so_cao,
            KHACH_DAC_BIET: $scope.arraythongtin.khach_dac_biet,
        }


        $scope.Tai_khoan_KH = [];
        for (var i = 0; i < $scope.arraytaikhoan.length; i++) {
            var tai_khoan = {
                MA_KHACH_HANG: '',
                SO_TAI_KHOAN: $scope.arraytaikhoan[i].so_tai_khoan,
                TEN_TAI_KHOAN: $scope.arraytaikhoan[i].ten_tai_khoan,
                TEN_NGAN_HANG: $scope.arraytaikhoan[i].ten_ngan_hang,
                CHI_NHANH: $scope.arraytaikhoan[i].chi_nhanh,
                TINH_TP: $scope.arraytaikhoan[i].tinh_tp,
                LOAI_TAI_KHOAN: $scope.arraytaikhoan[i].loai_tai_khoan,
            }
            $scope.Tai_khoan_KH.push(tai_khoan);
        }


        $scope.Lien_he_TK = [];
        for (var i = 0; i < $scope.arraylienhe.length; i++) {
            var lien_he = {
                MA_KHACH_HANG: '',
                NGUOI_LIEN_HE: $scope.arraylienhe[i].nguoi_lien_he,
                CHUC_VU: $scope.arraylienhe[i].chuc_vu,
                PHONG_BAN: $scope.arraylienhe[i].phong_ban,
                NGAY_SINH: $scope.arraylienhe[i].ngay_sinh,
                GIOI_TINH: $scope.arraylienhe[i].gioi_tinh,
                EMAIL_CA_NHAN: $scope.arraylienhe[i].email_ca_nhan,
                EMAIL_CONG_TY: $scope.arraylienhe[i].email_cong_ty,
                SKYPE: $scope.arraylienhe[i].skype,
                FACEBOOK: $scope.arraylienhe[i].facebook,
                SDT1: $scope.arraylienhe[i].so_dien_thoai1,
                SDT2: $scope.arraylienhe[i].so_dien_thoai2,
                SALES_PHU_TRACH: $scope.arraylienhe[i].sales_phu_trach,
                SALES_MOI: $scope.arraylienhe[i].sales_moi,
                SALES_CU: $scope.arraylienhe[i].sales_cu,
                SALE_HIEN_THOI: $scope.arraylienhe[i].sales_phu_trach,
                TINH_TRANG_LAM_VIEC: $scope.arraylienhe[i].tinh_trang_lam_viec,
            }
            $scope.Lien_he_TK.push(lien_he);
        }
        $scope.submitted = true;
        //tHÊM KHÁCH MỚI VÀO csdl    
        if (form.$invalid) {
            console.log('invalid');
            return;
        } else {
            $http({
                method: 'POST',
                data: $scope.Thong_tin_KH,
                url: window.location.origin + '/api/Api_KH/ThemMoiKH'
            }).then(function successCallback(response) {
                $scope.Thong_tin_KH = response.data;

                $http.post(window.location.origin + '/api/Api_BaoGia/KhachHangTheoSale/' + username + '/' + isadmin + '/' + macongty)
                 .then(function (response) {
                     if (response.data) {
                         $scope.arrayKH_BaoGia = response.data;
                         $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.map(function (item) {
                             return item;
                         });
                     }
                 }, function (error) {
                     console.log(error);
                 });
                if (typeof (response.data) == "object") {
                    SuccessSystem("Tạo thành công khách hàng có mã là " + $scope.Thong_tin_KH.MA_KHACH_HANG);
                    $scope.ma_khach_hang = $scope.Thong_tin_KH.MA_KHACH_HANG;
                    $scope.ten_cong_ty = $scope.Thong_tin_KH.TEN_CONG_TY;
                }
                else {
                    ErrorSystem($scope.Thong_tin_KH);
                }

                $scope.arraythongtin.ten_cong_ty = null;
                $scope.arraythongtin.van_phong_giao_dich = null;
                $scope.arraythongtin.dia_chi_xuat_hoa_don = null;
                $scope.arraythongtin.ma_so_thue = null;
                $scope.arraythongtin.website = null;
                $scope.arraythongtin.hotline = null;
                $scope.arraythongtin.fax = null;
                $scope.arraythongtin.dieu_khoan_thanh_toan = '';
                $scope.arraythongtin.so_ngay_duoc_no = null;
                $scope.arraythongtin.so_no_toi_da = null;
                $scope.arraythongtin.email = null;
                CKEDITOR.instances.themghichu.setData('');
                CKEDITOR.instances.ho_so_thanh_toan.setData('');

                $scope.arraythongtin.tinh = null;
                $scope.arraythongtin.tinh_trang_hoat_dong = '';
                $scope.arraythongtin.quoc_gia = null;

                $scope.arraythongtin.khach_do_marketing_tim_kiem = false;
                $scope.arraythongtin.thong_tin_da_day_du = false;
                $scope.arraythongtin.khach_mua_so_luong_nhieu = false;
                $scope.arraythongtin.khach_mua_doanh_so_cao = false;
                $scope.arraythongtin.khach_dac_biet = false;

                $http({
                    method: 'GET',
                    data: $scope.lastmakh,
                    url: window.location.origin + '/api/Api_KH/GetIdKH'
                }).then(function successCallback(response) {
                    $scope.lastmakh = response.data;
                    var phanloaikh_add = {
                        MA_KHACH_HANG: $scope.lastmakh,
                        MA_LOAI_KHACH: $scope.arraythongtin.ma_loai_khach,
                        NHOM_NGANH: $scope.arraythongtin.nhom_nganh
                    }
                    khachhangService.add_phanloaikh(phanloaikh_add).then(function (response) {
                        //$scope.phantrangkh(1);
                        $scope.arraythongtin.ma_loai_khach = '';
                        $scope.arraythongtin.nhom_nganh = '';
                    });

                    var chuyensale_add = {
                        MA_KHACH_HANG: $scope.lastmakh,
                        SALE_HIEN_THOI: salestao,
                    }
                    khachhangService.add_saletao(chuyensale_add).then(function (response) {
                    });

                    //if (!$scope.Thong_tin_KH) {
                    //    ErrorSystem('Thông tin chung Khách hàng lỗi');
                    //    return;
                    //}

                    for (var i = 0; i < $scope.Tai_khoan_KH.length; i++) {
                        $scope.Tai_khoan_KH[i].MA_KHACH_HANG = $scope.lastmakh;
                    }

                    for (var i = 0; i < $scope.Lien_he_TK.length; i++) {
                        $scope.Lien_he_TK[i].MA_KHACH_HANG = $scope.lastmakh;
                    }

                    if ($scope.Lien_he_TK.length > 0) {
                        $http({
                            method: 'POST',
                            data: $scope.Lien_he_TK,
                            url: window.location.origin + '/api/Api_ArrayLienHeKH'
                        }).then(function successCallback(zzz) {

                            SuccessSystem(zzz.data);
                            $http.get(window.location.origin + '/api/Api_BaoGia/GetLienHeKhach/' + $scope.lastmakh)
                             .then(function (response) {
                                 if (response.data) {
                                     $scope.arrayLH = response.data;
                                     $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
                                         return item;
                                     });
                                 }
                             }, function (error) {
                                 console.log(error);
                             });
                        }, function errorCallback(zzz) {
                            ErrorSystem("Chưa thêm được liên hệ khách hàng");
                            //alert('Chưa thêm được liên hệ khách hàng');
                        });

                    }

                    if ($scope.Tai_khoan_KH.length > 0) {
                        $http({
                            method: 'POST',
                            data: $scope.Tai_khoan_KH,
                            url: window.location.origin + '/api/Api_TaiKhoanKH/' + $scope.lastmakh
                        }).then(function successCallback(response1) {
                        }, function errorCallback(response1) {
                            ErrorSystem("Chưa thêm được tài khoản khách hàng");
                            //alert('Chưa thêm được tài khoản khách hàng');
                        });
                    }
                });

            });

        }
    };

    $scope.refresh = function () {
        $http.get(window.location.origin + '/api/Api_BaoGia/GetLienHeKhach/' + $scope.ma_khach_hang)
 .then(function (response) {
     if (response.data) {
         $scope.arrayLH = response.data;
         $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
             return item;
         });
     }
 }, function (error) {
     console.log(error);
 });
    };

    //them lien he kh
    $scope.addnew = function (makh) {

        $("textarea[name=ghichu]").val(CKEDITOR.instances.ghichu.getData());
        var danhmuc = $("[name=ghichu]").val();

        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        var data_add = {
            MA_KHACH_HANG: url,
            NGUOI_LIEN_HE: $scope.ten_cua_nguoi_lien_he_moi,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh,
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: danhmuc,
            SDT1: $scope.so_dien_thoai1,
            TINH_TRANG_LAM_VIEC: $scope.tinh_trang_lam_viec,
            SDT2: $scope.so_dien_thoai2,
            SALES_PHU_TRACH: $scope.nvkd.USERNAME,
            SALES_MOI: $scope.sales_moi,
            SALES_CU: $scope.sales_cu,
        }
        khachhangService.add_lienhe(data_add).then(function successCallback(response) {
            if (typeof response.data == "object")
            {
                SuccessSystem("Bạn đã thêm thành công 1 liên hệ của khách hàng");
                $scope.ten_cua_nguoi_lien_he_moi = '';
                $scope.chuc_vu = '';
                $scope.phong_ban = '';
                $scope.ngay_sinh = null;
                $scope.gioi_tinh = '';
                $scope.email_ca_nhan = '';
                $scope.email_cong_ty = '';
                $scope.skype = '';
                $scope.facebook = '';
                CKEDITOR.instances.ghichu.setData('');
                $scope.so_dien_thoai1 = '';
                $scope.tinh_trang_lam_viec = '';
                $scope.so_dien_thoai2 = '';
                $scope.sales_moi = '';
                $scope.sales_cu = '';

                $scope.id_lien_he = response.data.ID_LIEN_HE;
                $scope.nguoi_lien_he = response.data.NGUOI_LIEN_HE;
            } else {
                ErrorSystem(response.data);
            }

            console.log(response.data)
        }, function errorCallback(response) {
            ErrorSystem("Đã xảy ra lỗi");
        });
    };

    //Lọc nhân viên
    $scope.arrayNVFinded = [];
    $scope.arrayStaffs = [];
    $scope.showtable_ho_va_ten = false;

    $http.get(window.location.origin + '/api/Api_NhanvienKD')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayStaffs = response.data;
                    $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onNhanVienFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                return item;
            });
        }
        $scope.arrayNVFinded = $scope.arrayStaffs.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.nvkd.HO_VA_TEN.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoSaleKD = function (staff, item) {
        $scope.nvkd = staff;
        $scope.nvkd.HO_VA_TEN = staff.HO_VA_TEN;
        $scope.nvkd.USERNAME = staff.USERNAME;
        item.showtable_ho_va_ten = false;
    }
    // End Lọc nhân viên


    $scope.load_phanloaikhach = function () {
        khachhangService.get_phanloaikhach().then(function (b) {
            $scope.list_phanloai = b;
        });
    };
    $scope.load_phanloaikhach();

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();

    $scope.load_loaitaikhoan = function () {
        khachhangService.get_loaitk().then(function (h) {
            $scope.list_loaitaikhoan = h;
        });
    };
    $scope.load_loaitaikhoan();


    $scope.arraythongtin = {
        ma_khach_hang: '',
        ten_cong_ty: '',
        van_phong_giao_dich: '',
        dia_chi_xuat_hoa_don: '',
        ma_so_thue: '',
        website: '',
        hotline: '',
        fax: '',
        dieu_khoan_thanh_toan: '',
        so_ngay_duoc_no: '',
        so_no_toi_da: '',
        email: '',
        ghi_chu: '',
        tinh: '',
        tinh_trang_hoat_dong: '',
        quoc_gia: '',
        truc_thuoc: macongty,
        khach_do_marketing_tim_kiem: '',
        thong_tin_da_day_du: '',
        khach_mua_so_luong_nhieu: '',
        khach_mua_doanh_so_cao: '',
        khach_dac_biet: '',
    };


    $scope.arraylienhe = [{
        ma_khach_hang: '',
        nguoi_lien_he: '',
        chuc_vu: '',
        gioi_tinh: '',
        phong_ban: '',
        ngay_sinh: '',
        so_dien_thoai1: '',
        so_dien_thoai2: '',
        email_ca_nhan: '',
        email_cong_ty: '',
        skype: '',
        facebook: '',
        sales_phu_trach: '',
        sales_cu: '',
        sales_moi: '',
        tinh_trang_lam_viec: '',
    }];

    $scope.arraytaikhoan = [{
        ma_khach_hang: '',
        so_tai_khoan: '',
        ten_tai_khoan: '',
        ten_ngan_hang: '',
        chi_nhanh: '',
        tinh_tp: '',
        loai_tai_khoan: '',
    }];


    $scope.tinhtranghoatdong = ['Cầm chừng', 'Bình thường', 'Sắp phá sản', 'Đã phá sản'];
    $scope.tinh_trang = ['Còn công tác', 'Đã luân chuyển', 'Đã nghỉ việc', 'Chuyển công ty khác'];
    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

});

//app.directive('format', ['$filter', function ($filter) {
//    return {
//        require: '?ngModel',
//        link: function (scope, elem, attrs, ctrl) {
//            if (!ctrl) return;


//            ctrl.$formatters.unshift(function (a) {
//                return $filter(attrs.format)(ctrl.$modelValue)
//            });


//            ctrl.$parsers.unshift(function (viewValue) {
//                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
//                elem.val($filter(attrs.format)(plainNumber));
//                return plainNumber;
//            });
//        }
//    };
//}]);

