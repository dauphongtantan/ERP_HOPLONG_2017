//Nha cung cap
app.controller('nhacungcapCtrl', function (nhacungcapService, $scope, $http, $location) {
    var nv = $('#nv').val();
    var macongty = $('#macongty').val();
    var isadmin = $('#isadmin').val();
    var maphongban = $('#maphongban').val();
    $scope.ListSelect = [];
    
    $scope.ListAdd = [];
    
    $(function () {

        $('#ngaysinh').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
    });

    $scope.createnew = function () {
        var ngay_sinh = $("#arrayngaysinh").val();
        $("textarea[name=addghichu]").val(CKEDITOR.instances.addghichu.getData());
        var addghichu = $("[name=addghichu]").val();
        $("textarea[name=danh_gia]").val(CKEDITOR.instances.danh_gia.getData());
        var danh_gia = $("[name=danh_gia]").val();
        var logo = $('#imgInp').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
        $scope.Thong_tin_NCC = {
            MA_NHA_CUNG_CAP: $scope.arraythongtin.ma_nha_cung_cap,
            TEN_NHA_CUNG_CAP: $scope.arraythongtin.ten_nha_cung_cap,
            VAN_PHONG_GIAO_DICH: $scope.arraythongtin.van_phong_giao_dich,
            DIA_CHI_XUAT_HOA_DON: $scope.arraythongtin.dia_chi_xuat_hoa_don,
            MA_SO_THUE: $scope.arraythongtin.ma_so_thue,
            WEBSITE: $scope.arraythongtin.website,
            SDT: $scope.arraythongtin.sdt,
            LOGO: name_without_ext,
            FAX: $scope.arraythongtin.fax,
            DIEU_KHOAN_THANH_TOAN: $scope.arraythongtin.dieu_khoan_thanh_toan,
            SO_NGAY_DUOC_NO: $scope.arraythongtin.so_ngay_duoc_no,
            SO_NO_TOI_DA: $scope.arraythongtin.so_no_toi_da,
            EMAIL: $scope.arraythongtin.email,
            GHI_CHU: addghichu,
            DANH_GIA: danh_gia,
            PHAN_LOAI_NCC: $scope.arraythongtin.ma_loai_ncc,
            TRUC_THUOC: macongty,
        }

        $scope.Tai_khoan_NCC = [];
        for (var i = 0; i < $scope.arraytaikhoan.length; i++) {
            var tai_khoan = {
                MA_NHA_CUNG_CAP: '',
                SO_TAI_KHOAN: $scope.arraytaikhoan[i].so_tai_khoan,
                TEN_TAI_KHOAN: $scope.arraytaikhoan[i].ten_tai_khoan,
                TEN_NGAN_HANG: $scope.arraytaikhoan[i].ten_ngan_hang,
                CHI_NHANH: $scope.arraytaikhoan[i].chi_nhanh,
                TINH_TP: $scope.arraytaikhoan[i].tinh_tp,
                LOAI_TAI_KHOAN: $scope.arraytaikhoan[i].loai_tai_khoan,
            }
            $scope.Tai_khoan_NCC.push(tai_khoan);
        }

        $scope.ma_nhom_hang = [{
            ma_nha_cung_cap: '',
            ma_nhom_hang: '',
        }];

        $scope.Loai_HANG_CUNG_CAP = [];
        for (var i = 0; i < $scope.ListSelect.length; i++) {
            var loai_hang = {
                MA_NHA_CUNG_CAP: '',
                MA_NHOM_HANG: $scope.ListSelect[i].MA_NHOM_HANG_CHI_TIET,
            }
            $scope.Loai_HANG_CUNG_CAP.push(loai_hang);
        }


        $scope.Lien_he_TK = [];
        for (var i = 0; i < $scope.arraylienhe.length; i++) {
            if ($scope.arraylienhe[i].ngay_sinh != "") {
                var ngaysinh = $scope.arraylienhe[i].ngay_sinh.format('DD/MM/YYYY')
            } else {
                var ngaysinh = $scope.arraylienhe[i].ngay_sinh;
            }
            var lien_he = {
                MA_NHA_CUNG_CAP: '',
                NGUOI_LIEN_HE: $scope.arraylienhe[i].nguoi_lien_he,
                CHUC_VU: $scope.arraylienhe[i].chuc_vu,
                PHONG_BAN: $scope.arraylienhe[i].phong_ban,
                NGAY_SINH: ngaysinh,
                GIOI_TINH: $scope.arraylienhe[i].gioi_tinh,
                EMAIL_CA_NHAN: $scope.arraylienhe[i].email_ca_nhan,
                EMAIL_CONG_TY: $scope.arraylienhe[i].email_cong_ty,
                SKYPE: $scope.arraylienhe[i].skype,
                FACEBOOK: $scope.arraylienhe[i].facebook,
                SO_DIEN_THOAI_1: $scope.arraylienhe[i].so_dien_thoai1,
                SO_DIEN_THOAI_2: $scope.arraylienhe[i].so_dien_thoai2,
                PUR_PHU_TRACH: $scope.arraylienhe[i].pur_phu_trach,
            }
            $scope.Lien_he_TK.push(lien_he);
        }



        $http({
            method: 'POST',
            data: $scope.Thong_tin_NCC,
            url: window.location.origin + '/api/Api_NhaCungCap'
        }).then(function successCallback(response) {
            SuccessSystem('Thêm thông tin chung nhà cung cấp thành công');
            $scope.Thong_tin_NCC = response.data;


            if (!$scope.Thong_tin_NCC) {
                ErrorSystem('Tạo nhà cung cấp lỗi');
                return;
            }

            for (var i = 0; i < $scope.Loai_HANG_CUNG_CAP.length; i++) {
                $scope.Loai_HANG_CUNG_CAP[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            for (var i = 0; i < $scope.Tai_khoan_NCC.length; i++) {
                $scope.Tai_khoan_NCC[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            for (var i = 0; i < $scope.Lien_he_TK.length; i++) {
                $scope.Lien_he_TK[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            if ($scope.Lien_he_TK.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Lien_he_TK,
                    url: window.location.origin + '/api/Api_ArrayLienHeNCC'
                }).then(function successCallback(zzz) {
                    SuccessSystem('Thêm liên hệ nhà cung cấp thành công');
                }, function errorCallback(zzz) {
                    ErrorSystem("Chưa thêm được liên hệ nhà cung cấp");
                });

            }

            if ($scope.Loai_HANG_CUNG_CAP.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Loai_HANG_CUNG_CAP,
                    url: window.location.origin + '/api/Api_LoaiHangCungCap/' + $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP
                }).then(function successCallback(response1) {
                    SuccessSystem('Thêm loại hàng cung cấp thành công');
                }, function errorCallback(response1) {
                    ErrorSystem('Tạo loại hàng cung cấp lỗi');
                });

            }


            if ($scope.Tai_khoan_NCC.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Tai_khoan_NCC,
                    url: window.location.origin + '/api/Api_TaiKhoanNCC/' + $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP
                }).then(function successCallback(response1) {
                    SuccessSystem('Thêm tài khoản nhà cung cấp thành công');
                }, function errorCallback(response1) {
                    ErrorSystem('Tạo tài khoản nhà cung cấp lỗi');
                });

            }
        });
    };

    function loadncc() {
        var data = {
            manv: nv,
            macongty: macongty,
            isadmin: isadmin,
            tukhoa: null,


        }
        $http.post('/api/Api_NhaCungCap/GetNCCTheoTuKhoa', data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.list_nhacungcap = response.data;
                    if ($scope.list_nhacungcap.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
    }
    loadncc();
    
    $scope.Loc_NCC = function (tukhoa) {
        var data = {
            manv: nv,
            macongty: macongty,
            isadmin: isadmin,
            tukhoa: tukhoa,
            
            
        }
        $http.post('/api/Api_NhaCungCap/GetNCCTheoTuKhoa', data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.list_nhacungcap = response.data;
                    if ($scope.list_nhacungcap.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });

    }

    $scope.get_loai_hang_cung_capncc = function (mancc) {
        $http({
            method: 'GET',
            url: '/api/Api_GetLoaiHangCungCap/' + mancc
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.list_loai_hang_cung_cap = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });

    };
    

    $scope.load_phanloaincc = function () {
        nhacungcapService.get_phanloaincc().then(function (b) {
            $scope.list_phanloai = b;
        });
    };
    $scope.load_phanloaincc();

    $scope.load_nhanvienmua = function () {
        nhacungcapService.get_nhanvienmua(maphongban,macongty).then(function (c) {
            $scope.list_nhanvienmua = c;
        });
    };
    $scope.load_nhanvienmua();

    $scope.load_loaitaikhoan = function () {
        nhacungcapService.get_loaitk().then(function (h) {
            $scope.list_loaitaikhoan = h;
        });
    };
    $scope.load_loaitaikhoan();

    $scope.load_nhomvthh = function () {
        nhacungcapService.get_nhomvthh().then(function (k) {
            $scope.list_nhomvthh = k;
        });
    };
    $scope.load_nhomvthh();

    $scope.get_lienhencc = function (mancc) {
        $http({
            method: 'GET',
            url: '/api/Api_LienHeNhaCungCap/GetNCC_LIEN_HE/' + mancc
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.list_lienhencc = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });
        
    };

    $scope.get_taikhoanncc = function (mancc) {
        nhacungcapService.get_taikhoanncc(mancc).then(function (taikhoanncc) {
            $scope.list_taikhoanncc = taikhoanncc;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.edit = function (item) {
        $scope.ncc = item;
        var ghichuvalue = $('.' + item.MA_NHA_CUNG_CAP + '-1').html();
        CKEDITOR.instances.editghichu.setData(ghichuvalue);
        var ho_so_thanh_toan_value = $('.' + item.MA_NHA_CUNG_CAP + '-2').html();
        CKEDITOR.instances.editdanh_gia.setData(ho_so_thanh_toan_value);
    };

    $scope.details = function (lienhe) {
        $scope.lienhe = lienhe;
    };

    $scope.EditLienHe = function (lienhe) {
        $scope.editlh = lienhe;
        var ghichulienhevalue = $('.' + lienhe.MA_NHA_CUNG_CAP).html();
        CKEDITOR.instances.aditghichulienhe.setData(ghichulienhevalue);
    };

    $scope.save = function (mancc) {
        $("textarea[name=editghichu]").val(CKEDITOR.instances.editghichu.getData());
        var editghichu = $("[name=editghichu]").val();
        $("textarea[name=editdanh_gia]").val(CKEDITOR.instances.editdanh_gia.getData());
        var editdanh_gia = $("[name=editdanh_gia]").val();
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
        $scope.kh_save = {
            MA_NHA_CUNG_CAP: mancc,
            TEN_NHA_CUNG_CAP: $scope.ncc.TEN_NHA_CUNG_CAP,
            VAN_PHONG_GIAO_DICH: $scope.ncc.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.ncc.DIA_CHI_XUAT_HOA_DON,
            PHAN_LOAI_NCC: $scope.ncc.MA_LOAI_NCC,
            MST: $scope.ncc.MST,
            SDT: $scope.ncc.SDT,
            EMAIL: $scope.ncc.EMAIL,
            FAX: $scope.ncc.FAX,
            LOGO: name_without_ext,
            WEBSITE: $scope.ncc.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.ncc.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.ncc.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.ncc.SO_NO_TOI_DA,
            GHI_CHU: editghichu,
            DANH_GIA: editdanh_gia,
        }
     
            $http({
                method: 'PUT',
                data: $scope.kh_save, mancc,
                url: window.location.origin + '/api/Api_NhaCungCap/' + mancc
            }).then(function successCallback(response1) {
                SuccessSystem('Sửa nhà cung cấp thành công');
                loadncc();
            }, function errorCallback(response1) {
                ErrorSystem('Sửa nhà cung cấp lỗi');
            });

            
        
    };
    
    $(function () {

        $('#ngaysinh').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
        
    });
    $scope.savelienhencc = function () {
        var ngay_sinh = $("#ngaysinh").val();
        $("textarea[name=aditghichulienhe]").val(CKEDITOR.instances.aditghichulienhe.getData());
        var aditghichulienhe = $("[name=aditghichulienhe]").val();
        var data_save = {
            ID_LIEN_HE: $scope.editlh.ID_LIEN_HE,
            MA_NHA_CUNG_CAP: $scope.editlh.MA_NHA_CUNG_CAP,
            NGUOI_LIEN_HE: $scope.editlh.NGUOI_LIEN_HE,
            CHUC_VU: $scope.editlh.CHUC_VU,
            PHONG_BAN: $scope.editlh.PHONG_BAN,
            NGAY_SINH: ngay_sinh,
            GIOI_TINH: $scope.editlh.GIOI_TINH,
            EMAIL_CA_NHAN: $scope.editlh.EMAIL_CA_NHAN,
            EMAIL_CONG_TY: $scope.editlh.EMAIL_CONG_TY,
            SKYPE: $scope.editlh.SKYPE,
            FACEBOOK: $scope.editlh.FACEBOOK,
            GHI_CHU: aditghichulienhe,
            SO_DIEN_THOAI_1: $scope.editlh.SO_DIEN_THOAI_1,
            SO_DIEN_THOAI_2: $scope.editlh.SO_DIEN_THOAI_2,
        }
        $http({
            method: 'PUT',
            data: data_save,
            url: window.location.origin + '/api/Api_LienHeNhaCungCap/PuttNCC_LIEN_HE/'
        }).then(function successCallback(response1) {
            SuccessSystem('Sửa liên hệ nhà cung cấp thành công');
            loadncc();
        }, function errorCallback(response1) {
            ErrorSystem('Sửa liên hệ nhà cung cấp lỗi');
        });
    };

    $scope.addnew = function (mancc) {
        $("textarea[name=addghichulienhe]").val(CKEDITOR.instances.addghichulienhe.getData());
        var addghichu = $("[name=addghichulienhe]").val();
        var data_add = {
            MA_NHA_CUNG_CAP: mancc,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh.format('DD/MM/YYYY'),
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: addghichu,
            SO_DIEN_THOAI_1: $scope.so_dien_thoai1,
            SO_DIEN_THOAI_2: $scope.so_dien_thoai2,
            PUR_PHU_TRACH: $scope.pur_phu_trach,
        }
        $http({
            method: 'POST',
            data: data_add,
                url: window.location.origin + '/api/Api_LienHeNhaCungCap/'
        }).then(function successCallback(response1) {
            SuccessSystem('Thêm mới liên hệ nhà cung cấp thành công');
            loadncc();
        }, function errorCallback(response1) {
            ErrorSystem('Thêm mới liên hệ nhà cung cấp lỗi');
        });
    };

    $scope.addnewtk = function (mancc) {
        $("textarea[name=addghichutaikhoan]").val(CKEDITOR.instances.addghichutaikhoan.getData());
        var addghichutaikhoan = $("[name=addghichutaikhoan]").val();
        var data_add = {
            MA_NHA_CUNG_CAP: mancc,
            SO_TAI_KHOAN: $scope.so_tai_khoan,
            TEN_TAI_KHOAN: $scope.ten_tai_khoan,
            TEN_NGAN_HANG: $scope.ten_ngan_hang,
            CHI_NHANH: $scope.chi_nhanh,
            TINH_TP: $scope.tinh_tp,
            GHI_CHU: addghichutaikhoan,
            LOAI_TAI_KHOAN: $scope.loai_tai_khoan
        }
        $http({
            method: 'POST',
            data: data_add,
            url: window.location.origin + '/api/Api_TaiKhoanNCC/'
        }).then(function successCallback(response1) {
            SuccessSystem('Thêm mới tài khoản nhà cung cấp thành công');
            loadncc();
        }, function errorCallback(response1) {
            ErrorSystem('Thêm mới tài khoản nhà cung cấp lỗi');
        });
    };

    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];

    $scope.ListSelect = [];



    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    $scope.arraythongtin = {
        ma_nha_cung_cap: '',
        ten_nha_cung_cap: '',
        van_phong_giao_dich: '',
        dia_chi_xuat_hoa_don: '',
        ma_so_thue: '',
        website: '',
        sdt: '',
        fax: '',
        dieu_khoan_thanh_toan: '',
        so_ngay_duoc_no: '',
        so_no_toi_da: '',
        email: '',
        ghi_chu: '',
        danh_gia: '',
        phan_loai_ncc: '',
    };


    $scope.arraylienhe = [{
        ma_nha_cung_cap: '',
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
        pur_phu_trach: '',
    }];

    $scope.arraytaikhoan = [{
        ma_nha_cung_cap: '',
        so_tai_khoan: '',
        ten_tai_khoan: '',
        ten_ngan_hang: '',
        chi_nhanh: '',
        tinh_tp: '',
        loai_tai_khoan: '',
    }];

    $scope.AddNew = function () {
        $scope.arraytaikhoan.push({
            ma_nha_cung_cap: '',
            so_tai_khoan: '',
            ten_tai_khoan: '',
            ten_ngan_hang: '',
            chi_nhanh: '',
            tinh_tp: '',
            loai_tai_khoan: '',
        });
    }

    $scope.AddNew1 = function () {
        $scope.arraylienhe.push({
            nguoi_lien_he: '',
            chuc_vu: '',
            phong_ban: '',
            ngay_sinh: '',
            gioi_tinh: '',
            so_dien_thoai1: '',
            so_dien_thoai2: '',
            email_ca_nhan: '',
            skype: '',
            facebook: '',
            pur_phu_trach: '',
        });
    }

    $scope.SelectList = function (vthh, index, checkbox) {
        $scope.vthh = vthh;
        //if (vthh.Action == true) {
        //    vthh.Action = false;
        //}
        //else {
        //    vthh.Action = true;

        //}
        //var check = false;
        //$scope.vthh = vthh;
        //if (!check) {
        //    $scope.ListSelect.push({
        //        MA_NHOM_HANG_CHI_TIET: $scope.vthh.MA_NHOM_HANG_CHI_TIET
        //    });
        //    console.log($scope.ListSelect);
        //}
        if (checkbox == true) {
               $scope.ListSelect.push({
                   MA_NHOM_HANG_CHI_TIET: $scope.vthh.MA_NHOM_HANG_CHI_TIET
               });
        } else {
            for(i=0;i<$scope.ListSelect.length;i++)
            {
                if($scope.ListSelect[i].MA_NHOM_HANG_CHI_TIET == $scope.vthh.MA_NHOM_HANG_CHI_TIET)
                {
                    $scope.ListSelect.splice(i, 1);
                }
            }
        }
    };
    $scope.RemoveList = function (index) {
        $scope.ListSelect.splice(index, 1);
        
    }


    
});
//end nha cung cap
