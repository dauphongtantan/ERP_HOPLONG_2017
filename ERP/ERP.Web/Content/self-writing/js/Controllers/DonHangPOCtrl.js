app.controller("DonHangPOCtrl", function ($http, $scope, DonHangPOService) {
    $scope.Detail = {
        ListAdd: [],
        ListNew: [],
        ListLocDuLieu: [],
        ListBH: [],
        ListNhatKy: [],
    }
    $scope.Detail.ListAdd = [{

    }];



    $scope.Detail.ListNew = [{
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
        bien_trung_gian: 0,
        so_luong_trong_kho: 0,
        tien_thanh_toan: 0,
        tien_thue_gtgt: 0,
    }];

    $scope.Detail.ListLocDuLieu = [{
        da_duyet: false,
        dang_duyet: false,
        da_giu: false,
    }];
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    var macongty = $('#macongty').val();

    $scope.load_danhsachPO = function () {
        DonHangPOService.get_danhsachPO(isadmin, username,macongty).then(function (a) {
            $scope.list_donhangPO = a;
        });
    };

    $scope.trangthai = function (item) {
        $scope.item = item;
        var locdulieu = {
            username: username,
            isadmin: isadmin,
            da_giu: $scope.item.da_giu,
            da_duyet: $scope.item.da_duyet,
            dang_duyet: $scope.item.dang_duyet,
        }
        $http.post('/api/Api_DonHangPO/LocDuLieuPO/' + macongty, locdulieu).then(function (response) {
            $scope.list_donhangPO = response.data;
        });
    };

    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //

    $scope.load_danhsachPO();

    $scope.load_thongtinchungPO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        DonHangPOService.get_thongtinchungPO(url).then(function (abc) {
            $scope.thongtinchung = abc;
            if ($scope.thongtinchung[0].DA_DUYET == true && $scope.thongtinchung[0].DA_HUY == false) {
                $scope.daduyetphieu = true;
            }
            DonHangPOService.get_thongtinchitietPO(url).then(function (b) {
                $scope.Detail.ListAdd = b;

                var tong_tien_hang = 0;
                var tong_tien_thue_GTGT = 0;
                var tong_tien_thanh_toan = 0;

                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                    $scope.Detail.ListAdd[i].SO_LUONG = $scope.Detail.ListAdd[i].SO_LUONG - $scope.Detail.ListAdd[i].SL_BAN
                    tong_tien_hang = parseInt($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
                    tong_tien_thue_GTGT = parseInt($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
                    tong_tien_thanh_toan = parseInt($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
                }
                $scope.tong_tien_hang = tong_tien_hang;
                $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
                $scope.tong_tien_thanh_toan = tong_tien_thanh_toan + $scope.thongtinchung[0].PHI_VC;
                $scope.so_tien_viet_bang_chu = docso(parseInt($scope.tong_tien_thanh_toan));
            });
        });

        if (isadmin == 'True') {
            $scope.check_admin = true;
        } else {
            $scope.check_admin = false;
        }
    };

    $scope.load_thongtinchungPO();

    $scope.kiemtra = function (item) {
        $scope.item = item;

        var tong_tien_hang = 0;
        var tong_tien_thue_GTGT = 0;
        var tong_tien_thanh_toan = 0;

        $scope.item.THANH_TIEN_HANG = parseInt($scope.item.DON_GIA * $scope.item.SO_LUONG);
        $scope.item.TIEN_THUE_GTGT = parseInt($scope.item.THANH_TIEN_HANG * ($scope.item.THUE_GTGT / 100));
        $scope.item.TIEN_THANH_TOAN = $scope.item.THANH_TIEN_HANG + $scope.item.TIEN_THUE_GTGT;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_tien_hang = parseInt($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
            tong_tien_thue_GTGT = parseInt($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
            tong_tien_thanh_toan = parseInt($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
        }
        $scope.tong_tien_hang = tong_tien_hang;
        $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
        $scope.tong_tien_thanh_toan = tong_tien_thanh_toan;
        $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thanh_toan);
    };


    var salehienthoi = $('#username').val();

    $scope.savePO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //

        var ngaygiaohang = $('#ngay_giao_hang').val();
        var ngaylenpo = $('#ngay_len_po').val();


        var data_save = {
            MA_SO_PO: url,
            NGAY_LEN_PO: ngaylenpo,
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung[0].TEN_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung[0].HINH_THUC_THANH_TOAN,
            TONG_TIEN_HANG: $scope.tong_tien_hang,
            TONG_TIEN_THUE_GTGT: $scope.tong_tien_thue_GTGT,
            TONG_TIEN_THANH_TOAN: $scope.tong_tien_thanh_toan,
            SO_TIEN_VIET_BANG_CHU: $scope.so_tien_viet_bang_chu,
            NGAY_GIAO_HANG: ngaygiaohang,
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
            DA_HUY: $scope.thongtinchung[0].DA_HUY,
            LY_DO_HUY: $scope.thongtinchung[0].LY_DO_HUY,
            CAN_XUAT_NGAY: $scope.thongtinchung[0].CAN_XUAT_NGAY,
            CAN_LAY_HOA_DON: $scope.thongtinchung[0].CAN_LAY_HOA_DON,
        }

        $scope.arrayChiTietPO = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietPO = {
                ID: $scope.Detail.ListAdd[i].ID,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
                THANH_TIEN_HANG: $scope.Detail.ListAdd[i].THANH_TIEN_HANG,
                DVT: $scope.Detail.ListAdd[i].DVT,
                DIEN_GIAI_THUE: $scope.Detail.ListAdd[i].DIEN_GIAI_THUE,
                THUE_GTGT: $scope.Detail.ListAdd[i].THUE_GTGT,
                TIEN_THUE_GTGT: $scope.Detail.ListAdd[i].TIEN_THUE_GTGT,
                TIEN_THANH_TOAN: $scope.Detail.ListAdd[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListAdd[i].TK_NO,
                TK_CO: $scope.Detail.ListAdd[i].TK_CO,
                TK_THUE: $scope.Detail.ListAdd[i].TK_THUE,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietPO.push(ChiTietPO);
        }

        DonHangPOService.save_thongtinchungPO(url, data_save).then(function successCallback(response) {
            SuccessSystem('Lưu thông tin chung thành công');

            for (var i = 0; i < $scope.arrayChiTietPO.length; i++) {
                $scope.arrayChiTietPO[i].MA_SO_PO = url;
            }


            if ($scope.arrayChiTietPO.length > 0) {
                $http({
                    method: 'PUT',
                    data: $scope.arrayChiTietPO,
                    url: window.location.origin + '/api/Api_ChiTiet_DonHangPO/PutBH_CT_DON_HANG_PO'
                }).then(function successCallback(response) {
                    SuccessSystem("Hoàn Thành Lưu");
                }, function errorCallback(response) {
                    ErrorSystem('Không lưu được chi tiết giữ kho');
                });
                return;
            }

        }, function errorCallback(response) {
            ErrorSystem(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.deletePO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //

        DonHangPOService.delete_thongtinchungPO(url).then(function (response) {
            SuccessSystem('Bạn đã xóa thành công');
            window.location.href = "/DonHangPO/Index";
        });
    };

    $scope.Save_DuyetDonPO = function () {
        var username = $('#username').val();
        var data_duyet = {
            MA_SO_PO: url,
            DA_HUY: $scope.da_huy,
            DONG_Y: $scope.dong_y,
            DA_DUYET: true,
            NGUOI_DUYET: username,
            LY_DO_HUY: $scope.ly_do_huy,
            DANG_DUYET: false,
        }
        $http.put('/api/Api_DonHangPO/Duyet_don_hangPO/' + url, data_duyet).then(function (response) {
            SuccessSystem('Duyệt thành công đơn hàng PO có mã là ' + response.data)
            $(function () {
                setTimeout(function () {
                    window.location.href = "/Marketing/KyDuyetPO/KyDuyetPOHome";

                }, 2000);
            });
        }, function errorCallback(response) {
            ErrorSystem('Sự cố hệ thống,vui lòng liên hệ với admin hoặc người hỗ trợ');
        });
    };

    $scope.CreateBH = function (item, index, checkPO) {
        $scope.item = item;
        if (checkPO == true) {
            $scope.Detail.ListBH.push({
                ID: $scope.item.ID,
                MA_SO_PO: $scope.item.MA_SO_PO,
                MA_HANG: $scope.item.MA_HANG,
                MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
                TK_NO: '131',
                TK_CO: '51111',
                DVT: $scope.item.DVT,
                SO_LUONG: $scope.item.SO_LUONG,
                DON_GIA: $scope.item.DON_GIA,
                THANH_TIEN_HANG: $scope.item.THANH_TIEN_HANG,
                DIEN_GIAI_THUE: 'Thuế GTGT đầu ra',
                THUE_GTGT: $scope.item.THUE_GTGT,
                TIEN_THUE_GTGT: $scope.item.TIEN_THUE_GTGT,
                TK_THUE: '33311',
                TIEN_THANH_TOAN: $scope.item.TIEN_THANH_TOAN,
                DA_BAN: false,
            })
            $scope.Detail.ListNhatKy.push({
                ID: $scope.item.ID,
                MA_HANG: $scope.item.MA_HANG,
                TIEN_THANH_TOAN: $scope.item.TIEN_THANH_TOAN,
                TK_CO: 51111,
                TK_NO: 131,
                TK_THUE: 33311,
                TIEN_THUE_GTGT: $scope.item.TIEN_THUE_GTGT,
                DIEN_GIAI_THUE: 'Thuế GTGT đầu ra',
            });
        } else {
            for (i = 0; i < $scope.Detail.ListBH.length; i++) {
                if ($scope.Detail.ListBH[i].ID == $scope.item.ID) {
                    $scope.Detail.ListBH.splice(i, 1);
                }
            }
            for (i = 0; i < $scope.Detail.ListNhatKy.length; i++) {
                if ($scope.Detail.ListNhatKy[i].ID == $scope.item.ID) {
                    $scope.Detail.ListNhatKy.splice(i, 1);
                }
            }
        }
        console.log($scope.Detail.ListBH);
    };

    $scope.AddNew_PhieuBanHang = function () {

        var username = $('#username').val();
        var ngaygiaohang = $('#ngay_giao_hang').val();
        $scope.arrayChiTietPO = [];

        for (var i = 0; i < $scope.Detail.ListBH.length; i++) {
            var ChiTietPO = {
                ID: $scope.Detail.ListBH[i].ID,
                MA_SO_PO: $scope.Detail.ListBH[i].MA_SO_PO,
                MA_HANG: $scope.Detail.ListBH[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListBH[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListBH[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListBH[i].DON_GIA,
                THANH_TIEN_HANG: $scope.Detail.ListBH[i].THANH_TIEN_HANG,
                DVT: $scope.Detail.ListBH[i].DVT,
                DIEN_GIAI_THUE: $scope.Detail.ListBH[i].DIEN_GIAI_THUE,
                THUE_GTGT: $scope.Detail.ListBH[i].THUE_GTGT,
                TIEN_THUE_GTGT: $scope.Detail.ListBH[i].TIEN_THUE_GTGT,
                TIEN_THANH_TOAN: $scope.Detail.ListBH[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListBH[i].TK_NO,
                TK_CO: $scope.Detail.ListBH[i].TK_CO,
                TK_THUE: $scope.Detail.ListBH[i].TK_THUE,
                DA_BAN: $scope.Detail.ListBH[i].DA_BAN,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietPO.push(ChiTietPO);
        }

        var tong_tien_hang = 0;
        var tong_tien_thue_GTGT = 0;
        var tong_tien_thanh_toan = 0;


        for (var i = 0; i < $scope.Detail.ListBH.length; i++) {
            tong_tien_hang = parseInt($scope.Detail.ListBH[i].THANH_TIEN_HANG + tong_tien_hang);
            tong_tien_thue_GTGT = parseInt($scope.Detail.ListBH[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
            tong_tien_thanh_toan = parseInt($scope.Detail.ListBH[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
        }


        $scope.ThongTinBanHang = {
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung[0].TEN_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung[0].HINH_THUC_THANH_TOAN,
            TONG_TIEN_HANG: tong_tien_hang,
            TONG_TIEN_THUE_GTGT: tong_tien_thue_GTGT,
            TONG_TIEN_THANH_TOAN: tong_tien_thanh_toan,
            SO_TIEN_VIET_BANG_CHU: docso(tong_tien_thanh_toan),
            NGAY_GIAO_HANG: ngaygiaohang,
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
            DA_XUAT_KHO: false,
            DA_LAP_HOA_DON: false,
            TRUC_THUOC: macongty,
            NHAN_VIEN_QUAN_LY: username,
            MA_SO_PO: url,
            ChiTietPO: $scope.arrayChiTietPO,
        };

        if ($scope.Detail.ListBH.length > 0)
        {
            $http({
                method: 'POST',
                data: $scope.ThongTinBanHang,
                url: window.location.origin + '/api/Api_BanHang/PostThemPhieuBanHang'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 đơn bán hàng có mã là ' + response.data);

                $(function () {
                    setTimeout(function () {
                        window.location.href = "/KinhDoanh/DonHangPO/DonPOHome";

                    }, 2000);
                });

                $scope.arrayChiTietBH = [];

                for (var i = 0; i < $scope.Detail.ListNhatKy.length; i++) {
                    var ChiTietBH = {
                        ID: $scope.Detail.ListNhatKy[i].ID,
                        MA_HANG: $scope.Detail.ListNhatKy[i].MA_HANG,
                        TIEN_THANH_TOAN: $scope.Detail.ListNhatKy[i].TIEN_THANH_TOAN,
                        TK_NO: $scope.Detail.ListNhatKy[i].TK_NO,
                        TK_CO: $scope.Detail.ListNhatKy[i].TK_CO,
                        TK_THUE: $scope.Detail.ListNhatKy[i].TK_THUE,
                        TIEN_THUE_GTGT: $scope.Detail.ListNhatKy[i].TIEN_THUE_GTGT,
                        DIEN_GIAI_THUE: $scope.Detail.ListNhatKy[i].DIEN_GIAI_THUE,
                    }
                    //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
                    $scope.arrayChiTietBH.push(ChiTietBH);
                }

                $scope.SoNhatKy = {
                    MA_SO_BH: response.data,
                    MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
                    TRUC_THUOC: macongty,
                    DIEN_GIAI_CHUNG: 'Bán hàng',
                    ChiTietBH: $scope.arrayChiTietBH,
                }

                $http({
                    method: 'POST',
                    data: $scope.SoNhatKy,
                    url: window.location.origin + '/api/Api_SoNhatKyChung/PostKT_SO_NHAT_KY_CHUNG'
                }).then(function successCallback(response) {
                    SuccessSystem("Lên sổ nhật ký chung thành công");
                }, function errorCallback(response) {
                    ErrorSystem('Lên sổ nhật ký chung thất bại');
                });
                return;

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
        }       
    };

    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi + '/' + isadmin + '/' + macongty)

         .then(function (response) {
             $scope.list_khachhang = response.data;
         }, function (error) {
             ErrorSystem(error);
         });

    //get data nguoi giu
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             $scope.list_nhanvienql = response.data;
         }, function (error) {
             ErrorSystem(error);
         });

    $http.post('/api/Api_DonHangPO/ListPO_Duyet/' + username + '/' + isadmin + '/' + macongty).then(function (response) {
        $scope.list_POcanduyet = response.data;
    });

    $scope.ChangeStatus = function (masoPO) {
        var data_change = {
            DANG_DUYET: true,
            DA_DUYET: false,
            DA_HUY: false,
        }
        $http.put('/api/Api_DonHangPO/TrangThaiPO/' + masoPO, data_change).then(function (response) {
            return response.data;
        });
    }

    $scope.hinhthuctt = ["Chuyển khoản", "Tiền mặt", "Trả tiền sau khi nhận hàng"];

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

    var tukhoa = '';

    var thamso = {
        username: username,
        macongty: macongty,
        isadmin: isadmin,
        tukhoa: tukhoa
    }

    // Phan trang list don hang PO
    $http.post('/api/Api_DonHangPO/DemTongSoDonPO', thamso).then(function (response) {
        $scope.tongsodonPO = response.data;
        pagination2.make(parseInt($scope.tongsodonPO), 15);
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
            url: window.location.origin + '/api/Api_DonHangPO/ListPO/' + pageNumber
        }).then(function successCallback(response) {
            $scope.list_PO = response.data;
        });
        $scope.interval(pageNumber)
    }

    var pagination2 = new Pagination({

        container: $("#phan_trang_tong_list_don_hang_PO"),
        pageClickCallback: pageClick2,
        maxVisibleElements: 15,
        //showInput: true,
        //inputTitle: "Go to page"
    });

    //End phan trang list don hang PO

    $scope.interval = function (pageNumber) {
        var datas = {
            macongty: macongty,
            username: username,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        window.setInterval(function () {
            // List bao gia kinh doanh
            $http.post('/api/Api_DonHangPO/ListPO/' + pageNumber, datas).then(function (response) {
                $scope.list_PO = response.data;
            });
        }, 5000);
    };

    //window.setInterval(function () {
    //    // List PO
    //    $http.post('/api/Api_DonHangPO/ListPO/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO = response.data;
    //    });

    //    // List PO da duyet
    //    $http.post('/api/Api_DonHangPO/ListPO_DaDuyet/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DaDuyet = response.data;
    //    });

    //    // List PO da huy
    //    $http.post('/api/Api_DonHangPO/ListPO_DaHuy/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DaHuy = response.data;
    //    });

    //    // List PO dang cho duyet
    //    $http.post('/api/Api_DonHangPO/ListPO_DangChoDuyet/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DangChoDuyet = response.data;
    //    });

    //    // List PO dang  duyet
    //    $http.post('/api/Api_DonHangPO/ListPO_DangDuyet/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DangDuyet = response.data;
    //    });

    //    // List PO da len don ban hang
    //    $http.post('/api/Api_DonHangPO/ListPO_DaLenDonBanHang/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DaLenDonBanHang = response.data;
    //    });

    //    // List PO can ban ngay
    //    $http.post('/api/Api_DonHangPO/ListPO_CanBanNgay/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_CanBanNgay = response.data;
    //    });

    //    // List PO dang xuat do
    //    $http.post('/api/Api_DonHangPO/ListPO_DangXuatDo/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_DangXuatDo = response.data;
    //    });

    //    // List PO chua len don ban
    //    $http.post('/api/Api_DonHangPO/ListPO_ChuaLenDonBan/' + isadmin + '/' + username).then(function (response) {
    //        $scope.list_PO_ChuaLenDonBan = response.data;
    //    });
    //}, 5000);


    $scope.readyfunction = function (index) {

        var pageNumber = parseInt(index);
        var datas = {
            macongty: macongty,
            username: username,
            isadmin: isadmin,
            tukhoa: tukhoa
        }

        // List PO
        $http.post('/api/Api_DonHangPO/ListPO/' + pageNumber, datas).then(function (response) {
            $scope.list_PO = response.data;
        });


        // List PO da duyet
        $http.post('/api/Api_DonHangPO/ListPO_DaDuyet/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DaDuyet = response.data;
        });

        // List PO da huy
        $http.post('/api/Api_DonHangPO/ListPO_DaHuy/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DaHuy = response.data;
        });

        // List PO dang cho duyet
        $http.post('/api/Api_DonHangPO/ListPO_DangChoDuyet/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DangChoDuyet = response.data;
        });

        // List PO dang  duyet
        $http.post('/api/Api_DonHangPO/ListPO_DangDuyet/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DangDuyet = response.data;
        });

        // List PO da len don ban hang
        $http.post('/api/Api_DonHangPO/ListPO_DaLenDonBanHang/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DaLenDonBanHang = response.data;
        });

        // List PO can ban ngay
        $http.post('/api/Api_DonHangPO/ListPO_CanBanNgay/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_CanBanNgay = response.data;
        });

        // List PO dang xuat do
        $http.post('/api/Api_DonHangPO/ListPO_DangXuatDo/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DangXuatDo = response.data;
        });

        // List PO chua len don ban
        $http.post('/api/Api_DonHangPO/ListPO_ChuaLenDonBan/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_ChuaLenDonBan = response.data;
        });

        // List PO da giu day du
        $http.post('/api/Api_DonHangPO/ListPO_DaGiuDayDu/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DaGiuDayDu = response.data;
        });

        // List PO dang giu do
        $http.post('/api/Api_DonHangPO/ListPO_DangGiuDo/' + isadmin + '/' + username + '/' + macongty).then(function (response) {
            $scope.list_PO_DangGiuDo = response.data;
        });
    };
    $scope.readyfunction(1);


    $scope.redirect = function (masoPO) {
        window.location.href = "/KinhDoanh/DonHangPO/Edit/" + masoPO;
    };

    $scope.RedirectDuyetPO = function (masoPO) {
        window.location.href = "/Marketing/KyDuyetPO/DetailDuyetPO/" + masoPO;

        var data_change = {
            DANG_DUYET: true,
            DA_DUYET: false,
            DA_HUY: false,
        }
        $http.put('/api/Api_DonHangPO/TrangThaiPO/' + masoPO, data_change).then(function (response) {
            return response.data;
        });
    }

    $scope.POChuaGiuDu = function (masoPO) {
        window.location.href = "/KinhDoanh/DonHangPO/ChiTietPOChuaGiuDU/" + masoPO;
    };

    $scope.xemchitietPO = function (masoPO) {
        window.location.href = "/KinhDoanh/DonHangPO/GetPrintPO/" + masoPO;
    }

    $scope.chitietPOMarketing = function (masoPO) {
        window.location.href = "/Marketing/KyDuyetPO/ChiTietPO/" + masoPO;
    }

    $scope.BackToList = function () {
        window.location.href = "/KinhDoanh/DonHangPO/DonPOHome";
    };

    $scope.BackToEdit = function () {
        window.location.href = "/KinhDoanh/DonHangPO/Edit/" + url;
    };
    // Chon khach hang PO moi

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
        $scope.fax = p_dt.FAX;
        $scope.showtable_KH_BaoGia = false;
        $scope.lienhekh(p_dt.MA_KHACH_HANG);
        $scope.nguoi_lien_he = '';
    }

    // Lien he
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

    //mảng hang hoa
    $scope.arrayHHFinded = [];
    $scope.arrayHH = [];
    $scope.showtable_hanghoa = false;

    //get data hang hoa

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
        if (kh.SO_LUONG > 0) {
            detail.ma_hang = kh.MA_HANG;
            detail.ma_chuan = kh.MA_CHUAN;
            detail.ten_hang = kh.TEN_HANG;
            detail.so_luong = 0;
            detail.ma_dieu_chinh = kh.MA_CHUAN;
            detail.dvt = kh.DVT;
            detail.xuat_xu = kh.XUAT_XU;
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
            detail.xuat_xu = kh.XUAT_XU;
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
        detail.showtable_hanghoa = false;
    }
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
            tien_thue_gtgt: 0,
            tien_thanh_toan: 0,
        });
    };

    $scope.test = function (detail) {
        $scope.detail = detail;
        var tongtien = 0;
        var thuegtgt = 0;
        var tienthanhtoan = 0;


        $scope.detail.thanh_tien = parseInt($scope.detail.so_luong * parseInt($scope.detail.gia_list));
        $scope.detail.tien_thue_gtgt = parseInt($scope.detail.thanh_tien * 0.1);
        $scope.detail.tien_thanh_toan = $scope.detail.thanh_tien + $scope.detail.tien_thue_gtgt;
        for (i = 0; i < $scope.Detail.ListNew.length; i++) {
            tongtien = parseInt(tongtien + $scope.Detail.ListNew[i].thanh_tien);
            thuegtgt = parseInt(thuegtgt + $scope.Detail.ListNew[i].tien_thue_gtgt);
            tienthanhtoan = parseInt(tienthanhtoan + $scope.Detail.ListNew[i].tien_thanh_toan);
        }
        $scope.tongtien = tongtien;
        $scope.thuegtgt = thuegtgt;
        $scope.tongtienthanhtoan = tienthanhtoan;
        $scope.sotienvietbangchu = docso($scope.tongtienthanhtoan);
    };


    $scope.TaoPOMoi = function (form) {

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
                DON_GIA: $scope.Detail.ListNew[i].gia_list,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].thanh_tien,
                THUE_GTGT: 10,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.ma_khach_hang,
            TEN_LIEN_HE: $scope.nguoi_lien_he,
            HINH_THUC_THANH_TOAN: $scope.hinh_thuc_thanh_toan,
            TONG_TIEN_THANH_TOAN: $scope.tongtienthanhtoan,
            TONG_TIEN_HANG: $scope.tongtien,
            TONG_TIEN_THUE_GTGT: $scope.thuegtgt,
            SO_TIEN_VIET_BANG_CHU: $scope.sotienvietbangchu,
            TRUC_THUOC: macongty,
            NHAN_VIEN_QUAN_LY: username,
            NGAY_GIAO_HANG_KD: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
            THUE_SUAT_GTGT: 10,
        };

        //Lưu vào CSDL
        $scope.submitted = true;
        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            console.log('invalid');
            return;
        } else {
            $http({
                method: 'POST',
                data: $scope.Bao_Gia,
                url: window.location.origin + '/api/Api_DonHangPO/ThemPOTuKinhDoanh'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data);
                $(function () {
                    setTimeout(function () {
                        window.location.href = "/KinhDoanh/DonHangPO/DonPOHome";

                    }, 2000);
                });
            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không tạo được đơn PO, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
        }


    };
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

app.directive("datepicker", function () {
    return {
        restrict: "A",
        scope: false,
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (date) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(date);
                });
            };
            var options = {
                onSelect: function (dateText) {
                    console.log(dateText);
                    updateModel(dateText);
                }
            };
            elem.datetimepicker({ format: 'DD/MM/YYYY' }).on('dp.change', function (data) {
                console.log('xxxxxxxxxxxxxxxx');
                console.log(data.date);
                updateModel(data.date);
            });
        }
    }
});

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);