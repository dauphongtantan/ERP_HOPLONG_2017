
// Khach hang
app.controller('khachhangCtrl', function (khachhangService, $scope, $http, $location) {
    var salehienthoi = $('#salehienthoi').val();
    var username = $('#username').val();
    var macongty = $('#macongty').val();
    var isadmin = $('#isadmin').val();
    var phongban = $('#maphongban').val();

    //công nợ khách hàng
    $scope.GetDataCongNoKH = function (makhachhang, tuancongno) {
        $scope.tuancongno = tuancongno;
        $http.post(window.location.origin + '/api/Api_KH_CongNo/CongNoTheoNhanVien/' + macongty + '/' + makhachhang + '/' + isadmin + '/' + $scope.tuancongno.TUAN_CONG_NO)
         .then(function (response) {
             if (response.data) {
                 $scope.ListCongNoKH = response.data;
             }
         }, function (error) {
             console.log(error);
         })
        $scope.hienthicongno = true;
    }


    //comment công nợ khách hàng
    $scope.GetDataComment_CongNoKH = function (makhachhang, tuancongno) {
        $scope.tuancongno = tuancongno;
        $http.get(window.location.origin + '/api/Api_Comments_CongNo_KH/GetData_Comments_CongNo/' + makhachhang + '/' + $scope.tuancongno.TUAN_CONG_NO)
         .then(function (response) {
             if (response.data) {
                 $scope.ListCommentCongNo = response.data;
             }
         }, function (error) {
             console.log(error);
         })
    }

    $scope.open_newcomment = function () {
        $scope.add_new_reply = true;
    };

    $scope.Comment = function () {
        var data_add = {
            NGUOI_COMMENTS: salehienthoi,
            NOI_DUNG_COMMENTS: $scope.new_comment,
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            TUAN_CONG_NO : $scope.tuancongno.TUAN_CONG_NO,
        }
        $http.post('/api/Api_Comments_CongNo_KH', data_add).then(function (response) {
            SuccessSystem("Thêm comment thành công");

            $http.get(window.location.origin + '/api/Api_Comments_CongNo_KH/GetData_Comments_CongNo/' + response.data.MA_KHACH_HANG + '/' + response.data.TUAN_CONG_NO)
            .then(function (response) {
                if (response.data) {
                    $scope.ListCommentCongNo = response.data;
                }
            }, function (error) {
                console.log(error);
            })

            $http.post(window.location.origin + '/api/Api_KH_CongNo/CongNoTheoNhanVien/' + macongty + '/' + response.data.MA_KHACH_HANG + '/' + isadmin + '/' + response.data.TUAN_CONG_NO)
         .then(function (response) {
             if (response.data) {
                 $scope.ListCongNoKH = response.data;
             }
         }, function (error) {
             console.log(error);
         })
            $scope.add_new_reply = false;
            $scope.new_comment = '';
        }, function errorCallback(response1) {
            ErrorSystem("Không thêm được comment");
            //alert('Chưa thêm được tài khoản khách hàng');
        });
    };

    //-------------end công nợ KH----------------------

    $scope.load_danhsachtuancongno = function (makh) {
        $http.get('/api/Api_CongNoKH/DanhSachTuanCongNo/' + makh).then(function (response) {
            $scope.list_danhsachtuancongno = response.data;
            $scope.ListCommentCongNo = [];
            $scope.ListCongNoKH = [];
            $scope.hienthicongno = false;
        });
    };


    if (isadmin == "True") {
        $scope.hienchucnang = true;
    }

    $scope.danhsachtrang = [];
    $scope.tranghienthoi = 0;
    var a = [];
    //tìm khách theo thông tin chung chung
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

    //tìm khách theo mã khách
    $scope.Find_Khach_Theo_Ma = function (page, tukhoa) {
        if (tukhoa == "") {
            $scope.phantrangkh(0);
            $scope.danhsachtrang = a;
        } else {
            $scope.danhsachtrang = [];
            var thongtintimkiem = {
                sales: salehienthoi,
                macongty: macongty,
                isadmin: isadmin,
                tukhoa: tukhoa
            }
            $http.post('/api/Api_KH/TimKhachTheoMa/' + page, thongtintimkiem)
          .then(function successCallback(response) {
              $scope.filtered = response.data;

          }, function errorCallback(response1) {
              ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
        }


    };

    //end tìm khách theo mã khách

    //tìm khách theo Email
    $scope.Find_Khach_Theo_Email = function (page, tukhoa) {
        if (tukhoa == "") {
            $scope.phantrangkh(0);
            $scope.danhsachtrang = a;
        } else {
            $scope.danhsachtrang = [];
            var thongtintimkiem = {
                sales: salehienthoi,
                macongty: macongty,
                isadmin: isadmin,
                tukhoa: tukhoa
            }
            $http.post('/api/Api_KH/TimKhachTheoEmail/' + page, thongtintimkiem)
          .then(function successCallback(response) {
              $scope.filtered = response.data;

          }, function errorCallback(response1) {
              ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
        }


    };

    //end tìm khách theo mã hàng



    //tìm khách theo Email
    $scope.Find_Khach_Theo_Ten = function (page, tukhoa) {
        if (tukhoa == "") {
            $scope.phantrangkh(0);
            $scope.danhsachtrang = a;
        } else {
            $scope.danhsachtrang = [];
            var thongtintimkiem = {
                sales: salehienthoi,
                macongty: macongty,
                isadmin: isadmin,
                tukhoa: tukhoa
            }
            $http.post('/api/Api_KH/TimKhachTheoTen/' + page, thongtintimkiem)
          .then(function successCallback(response) {
              $scope.filtered = response.data;

          }, function errorCallback(response1) {
              ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
        }


    };

    //end tìm khách theo mã hàng


    //tìm khách theo SDT
    $scope.Find_Khach_Theo_SDT = function (page, tukhoa) {
        if (tukhoa == "") {
            $scope.phantrangkh(0);
            $scope.danhsachtrang = a;
        } else {
            $scope.danhsachtrang = [];
            var thongtintimkiem = {
                sales: salehienthoi,
                macongty: macongty,
                isadmin: isadmin,
                tukhoa: tukhoa
            }
            $http.post('/api/Api_KH/TimKhachTheoSDT/' + page, thongtintimkiem)
          .then(function successCallback(response) {
              $scope.filtered = response.data;

          }, function errorCallback(response1) {
              ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
        }


    };

    //end tìm khách theo mã hàng






    $scope.TimKiemPhanTrang = function (tukhoa) {
        var thongtintimkiem = {
            sales: salehienthoi,
            macongty: macongty,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http.post('/api/Api_KH/SoTrangTimKiem', thongtintimkiem)
          .then(function successCallback(response) {
              $scope.tongsodong = response.data;
              $scope.tongsotrang = $scope.tongsodong / 15;
              while ($scope.tongsotrang > $scope.tranghienthoi) {
                  $scope.danhsachtrang.push($scope.tranghienthoi);
                  $scope.tranghienthoi++;
              }

          }, function errorCallback(response1) {
              ErrorSystem("Lỗi đường truyền: không lấy được Số Trang tìm kiếm");
              //alert('Chưa thêm được tài khoản khách hàng');
          });
    }

    //----------------------------------------------------------
    var tukhoa = '';

    //load khách hàng phân trang
    $scope.phantrangkh = function (index) {
        var pageNumber = parseInt(index) + 1;
        var datas = {
            macongty: macongty,
            sales: salehienthoi,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http.post('/api/Api_KH/PhantrangKH/' + pageNumber, datas)
            .then(function successCallback(response) {
                if (typeof (response.data) == "object") {
                    $scope.filtered = response.data;

                }
                else {
                    ErrorSystem("Dữ liệu vẫn chưa có trong hệ thống, Bạn vui lòng bổ sung thông tin vào hệ thống");
                }
            }, function errorCallback(response1) {
                ErrorSystem("Lỗi đường truyền, Bạn vui lòng kiểm tra lại kết nối Internet trên máy");
                //alert('Chưa thêm được tài khoản khách hàng');
            });
    }
    //---------------------------------------
    $scope.cancel_locKH = function () {
        tukhoa = '';
        $scope.phantrangkh(0);
        $scope.huyloc = false;
    }


    $scope.phantrangkh($scope.tranghienthoi);
    //Lấy tổng số trang
    //$scope.TongSoDong = function () {

    //    $http.post('/api/Api_KH/TongSoTrang/' + macongty)
    //        .then(function successCallback(response) {
    //            $scope.tongsodong = response.data;
    //            $scope.tongsotrang = $scope.tongsodong / 15;
    //            while ($scope.tongsotrang > $scope.tranghienthoi) {
    //                $scope.danhsachtrang.push($scope.tranghienthoi);
    //                $scope.tranghienthoi++;
    //            }
    //            a = $scope.danhsachtrang;


    //        }, function errorCallback(response1) {
    //            ErrorSystem("Lỗi đường truyền: không lấy được Tổng Số Trang");
    //            //alert('Chưa thêm được tài khoản khách hàng');
    //        });
    //}
    //$scope.TongSoDong();
    //----------------------------------------
    var thamso = {
        sales: salehienthoi,
        macongty: macongty,
        isadmin: isadmin,
        tukhoa: tukhoa
    }

    $http.post('/api/Api_KH/DemTongSoKH_HL', thamso).then(function (response) {
        $scope.tongsokhachhang_HL = response.data;
        pagination2.make(parseInt($scope.tongsokhachhang_HL), 15);
    });

    //Phan trang khach hang
    function pageClick2(pageNumber) {
        $("#page-number-phan_trang_tong_kh").text(pageNumber);
        var datas = {
            macongty: macongty,
            sales: salehienthoi,
            isadmin: isadmin,
            tukhoa: tukhoa
        }
        $http({
            method: 'POST',
            data: datas,
            url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber
        }).then(function successCallback(response) {
            $scope.filtered = response.data;
        });
    }

    var pagination2 = new Pagination({

        container: $("#phan_trang_tong_kh"),
        pageClickCallback: pageClick2,
        maxVisibleElements: 15,
        //showInput: true,
        //inputTitle: "Go to page"
    });

    // End phan trang khach hang





    //Phan trang thong ke mua hang
    function pageClick3(pageNumber) {
        $("#page-number-3").text(pageNumber);
        var makh = $('#MA_KHach_HANG').text();
        $http({
            method: 'POST',
            data: $scope.thong_ke_mua_hang,
            url: window.location.origin + '/api/Api_KH/ThongKeMuaHang/' + makh + '/' + pageNumber
        }).then(function successCallback(response) {
            $scope.thong_ke_mua_hang = response.data;
        });
    }

    var tongso = 500;
    var sohienthi = 10;


    var pagination3 = new Pagination({
        container: $("#pagination-3"),
        pageClickCallback: pageClick3,
        maxVisibleElements: 10,
        showInput: true,
        inputTitle: "Go to page"
    });
    pagination3.make(tongso, sohienthi);
    // End phan trang thong ke mua hang




    //function phantrangkh(pageNumber) {
    //    var salestao = $('#salehienthoi').val();
    //    //var phongban = $('#maphongban').val();
    //    //var isadmin = $('#isadmin').val();

    //    //var datas = {
    //    //    macongty:'HOPLONG',
    //    //    sotrang :pageNumber,
    //    //    ma:salestao,
    //    //    isadmin:isadmin,
    //    //    maphongban: phongban,
    //    //    }
    //    //$http.post("http://27.72.144.148:8003/api/KhachHang/PhantrangkhachHang", datas)
    //    //    .then(function successCallback(response) {
    //    //        $scope.filtered = response.data;
    //    //    });

    //    $http({
    //        method: 'POST',
    //        data: $scope.filtered,
    //        url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber + '/' + salestao
    //    }).then(function successCallback(response) {
    //        $scope.filtered = response.data;
    //    });
    //};
    //$scope.phantrangkh(1);


    function thongkemuahang(pageNumber) {
        var salestao = $('#salehienthoi').val();
        $http({
            method: 'POST',
            data: $scope.filtered,
            url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber + '/' + salestao
        }).then(function successCallback(response) {
            $scope.filtered = response.data;
        });
    };
    //$scope.phantrangkh(1);

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
                if (typeof response.data == "object") {
                    SuccessSystem("Thêm một khách hàng thành công có mã là " + response.data.MA_KHACH_HANG);

                    $scope.Thong_tin_KH = response.data;
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
                            $scope.phantrangkh(0);
                        });

                        var chuyensale_add = {
                            MA_KHACH_HANG: $scope.lastmakh,
                            SALE_HIEN_THOI: salestao,
                        }
                        khachhangService.add_saletao(chuyensale_add).then(function (response) {
                            //$scope.phantrangkh(0);
                            $scope.phantrangkh(0);
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
                } else {
                    ErrorSystem(response.data);
                }
            });
           
        }
    };


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

    $scope.get_lienhe = function (makh) {
        khachhangService.get_lienhekh(makh).then(function (a) {
            $scope.list_lienhe = a;
        });
    };

    $scope.get_taikhoan = function (makh) {
        khachhangService.get_taikhoankh(makh).then(function (b) {
            $scope.list_taikhoankh = b;
        });
    };

    $scope.get_thongkemuahang = function (makh) {
        $http({
            method: 'POST',
            data: $scope.thong_ke_mua_hang,
            url: window.location.origin + '/api/Api_KH/ThongKeMuaHang/' + makh + '/' + 1
        }).then(function successCallback(response) {
            $scope.thong_ke_mua_hang = response.data;
        });
    };

    $scope.get_phanhoi = function (makh) {
        khachhangService.get_phanhoi(makh).then(function (c) {
            $scope.list_phanhoi = c;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.details = function (lienhe) {
        $scope.lienhe = lienhe;
    };

    $scope.edit = function (item) {
        $scope.kh = item;
        var ghichuvalue = $('.' + item.MA_KHACH_HANG + '-1').html();
        CKEDITOR.instances.editghichu.setData(ghichuvalue);
        var ho_so_thanh_toan_value = $('.' + item.MA_KHACH_HANG + '-2').html();
        CKEDITOR.instances.edit_ho_so_thanh_toan.setData(ho_so_thanh_toan_value);
    };

    $scope.EditLienHe = function (lienhe) {
        $scope.editlh = lienhe;
    };

    $scope.save = function (makh, id) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=editghichu]").val(CKEDITOR.instances.editghichu.getData());
        var editghichu = $("[name=editghichu]").val();
        $("textarea[name=edit_ho_so_thanh_toan]").val(CKEDITOR.instances.edit_ho_so_thanh_toan.getData());
        var edit_ho_so_thanh_toan = $("[name=edit_ho_so_thanh_toan]").val();

        var kh_save = {
            MA_KHACH_HANG: makh,
            TEN_CONG_TY: $scope.kh.TEN_CONG_TY,
            VAN_PHONG_GIAO_DICH: $scope.kh.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.kh.DIA_CHI_XUAT_HOA_DON,
            TINH: $scope.kh.TINH,
            QUOC_GIA: $scope.kh.QUOC_GIA,
            MST: $scope.kh.MST,
            HOTLINE: $scope.kh.HOTLINE,
            EMAIL: $scope.kh.EMAIL,
            FAX: $scope.kh.FAX,
            LOGO: name_without_ext,
            TINH_TRANG_HOAT_DONG: $scope.kh.TINH_TRANG_HOAT_DONG,
            WEBSITE: $scope.kh.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.kh.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.kh.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.kh.SO_NO_TOI_DA,
            GHI_CHU: editghichu,
            HO_SO_THANH_TOAN: edit_ho_so_thanh_toan,
            TRUC_THUOC: macongty,
            KHACH_DO_MARKETING_TIM_KIEM: $scope.kh.KHACH_DO_MARKETING_TIM_KIEM,
            THONG_TIN_DA_DAY_DU: $scope.kh.THONG_TIN_DA_DAY_DU,
            KHACH_MUA_SO_LUONG_NHIEU: $scope.kh.KHACH_MUA_SO_LUONG_NHIEU,
            KHACH_MUA_DOANH_SO_CAO: $scope.kh.KHACH_MUA_DOANH_SO_CAO,
            KHACH_DAC_BIET: $scope.kh.KHACH_DAC_BIET,
        }
        khachhangService.save_khachhang(makh, kh_save).then(function (response) {
            //$scope.phantrangkh(0);
            $scope.phantrangkh(0);
            var phanloai_save = {
                ID: id,
                MA_KHACH_HANG: makh,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            var phanloai_add = {
                MA_KHACH_HANG: makh,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            if (id != null) {
                khachhangService.save_phanloaikh(id, phanloai_save).then(function successCallback(response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                    $scope.tranghienthoi = 0;
                    SuccessSystem("Thành công!");
                }, function errorCallback(response) {
                    ErrorSystem("Đã xảy ra lỗi");
                });
            } else if (id == null && $scope.kh.MA_LOAI_KHACH != null) {
                khachhangService.add_phanloaikh(phanloai_add).then(function successCallback(response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                    $scope.tranghienthoi = 0;
                    SuccessSystem("Thành công!");
                }, function errorCallback(response) {
                    ErrorSystem("Đã xảy ra lỗi");
                });

            }

        });
    };

    $scope.savelienhe = function (idlienhe) {
        var data_save = {
            ID_LIEN_HE: idlienhe,
            MA_KHACH_HANG: $scope.editlh.MA_KHACH_HANG,
            NGUOI_LIEN_HE: $scope.editlh.NGUOI_LIEN_HE,
            CHUC_VU: $scope.editlh.CHUC_VU,
            PHONG_BAN: $scope.editlh.PHONG_BAN,
            NGAY_SINH: $scope.editlh.NGAY_SINH,
            GIOI_TINH: $scope.editlh.GIOI_TINH,
            EMAIL_CA_NHAN: $scope.editlh.EMAIL_CA_NHAN,
            EMAIL_CONG_TY: $scope.editlh.EMAIL_CONG_TY,
            SKYPE: $scope.editlh.SKYPE,
            FACEBOOK: $scope.editlh.FACEBOOK,
            GHI_CHU: $scope.editlh.GHI_CHU,
            SDT1: $scope.editlh.SDT1,
            SDT2: $scope.editlh.SDT2,
            TINH_TRANG_LAM_VIEC: $scope.editlh.TINH_TRANG_LAM_VIEC,
        }
        khachhangService.save_lienhe(idlienhe, data_save).then(function (response) {
            //$scope.phantrangkh(1);
            $scope.phantrangkh(0);
            var data_savesalesphutrach = {
                SALES_CU: $scope.editlh.SALES_CU,
                SALES_MOI: $scope.editlh.SALES_MOI,
                ID_LIEN_HE: idlienhe,
                ID: $scope.editlh.ID,
                SALES_PHU_TRACH: $scope.editlh.SALES_PHU_TRACH,
                NGAY_KET_THUC_PHU_TRACH: $scope.editlh.NGAY_KET_THUC_PHU_TRACH,
                TRANG_THAI: $scope.editlh.TRANG_THAI,
            }
            if ($scope.editlh.ID != null) {
                khachhangService.save_salesphutrach($scope.editlh.ID, data_savesalesphutrach).then(function successCallback(response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                    SuccessSystem("Thành công!");
                }, function errorCallback(response) {
                    ErrorSystem("Đã xảy ra lỗi");
                });
            } else {
                $http.post('/api/Api_SalePhuTrach', data_savesalesphutrach).then(function (response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                    SuccessSystem("Thành công!");
                }, function errorCallback(response) {
                    ErrorSystem("Đã xảy ra lỗi");
                });
            }


        });
    };

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
            MA_KHACH_HANG: makh,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
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
            if (typeof response.data == "object") {
                $scope.phantrangkh(0);
                $scope.new_ct_khachhang();
                $scope.get_lienhe(makh);
                SuccessSystem("Bạn đã thêm thành công 1 liên hệ của khách hàng");
                $scope.nguoi_lien_he = '';
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
            } else {
                ErrorSystem(response.data);
            }
        }, function errorCallback(response) {
            ErrorSystem("Đã xảy ra lỗi");
        });
    };

    $scope.addnewtk = function (makh) {
        var data_add = {
            MA_KHACH_HANG: makh,
            SO_TAI_KHOAN: $scope.sotaikhoan,
            TEN_TAI_KHOAN: $scope.ten_tai_khoan,
            TEN_NGAN_HANG: $scope.ten_ngan_hang,
            CHI_NHANH: $scope.chi_nhanh,
            TINH_TP: $scope.tinh_tp,
            GHI_CHU: $scope.ghi_chu_tk,
            LOAI_TAI_KHOAN: $scope.loai_tai_khoan
        }
        khachhangService.add_taikhoan(data_add).then(function successCallback(response) {
            $scope.phantrangkh(0);
            $scope.new_ct_khachhang();
            SuccessSystem("Bạn đã thêm thành công 1 tài khoản của khách hàng");
            $scope.so_tai_khoan = '';
            $scope.ten_tai_khoan = '';
            $scope.ten_ngan_hang = '';
            $scope.chi_nhanh = '';
            $scope.tinh_tp = '';
            $scope.ghi_chu_tk = '';
            $scope.loai_tai_khoan = '';
        }, function errorCallback(response) {
            ErrorSystem("Đã xảy ra lỗi");
        });

    };



    //==========phản hồi============================================================


    $scope.DanhSachNotification = [];
    $scope.danhsachMarketing = [];

    //thêm thông báo
    $scope.AddNotification = function (makh, salephutrach) {
        if (salephutrach != null) {
            $scope.danhsachMarketing.push(salephutrach);
        }

        //lấy danh sách marketing--------------
        $http.get(window.location.origin + '/api/Api_BaiViet_TongHop/GetAllMarketing/' + macongty)
        .then(function (kq) {
            if (kq.data) {
                $scope.danhsachMarketing = kq.data;
                for (i = 0; i < $scope.danhsachMarketing.length; i++) {
                    if ($scope.danhsachMarketing[i].USERNAME != salehienthoi) {
                        var data_Notification = {
                            NGUOI_DUNG: $scope.danhsachMarketing[i].USERNAME,
                            LINK_THONG_BAO: '/Khachhang/details/' + makh,
                            NOI_DUNG_THONG_BAO: salehienthoi + ' đã thêm mới 1 phản hồi của khách hàng ' + makh
                        }
                        $scope.DanhSachNotification.push(data_Notification);
                    }

                }
            }
            else {
                console.log("lỗi");
            }
        }, function (error) {
            console.log(error);
        });
        //--------------------------------------

        $http.post(window.location.origin + '/api/Api_BaiViet_TongHop/AddNotification', $scope.DanhSachNotification)
            .then(function successCallback(response2) {
                SuccessSystem("Đã thông báo đến Marketing và sale phụ trách khách hàng");
                $scope.DanhSachNotification = [];
            }, function errorCallback(response2) {
                ErrorSystem("Đã xảy ra lỗi");
            });
    }
    //end thêm thông báo

    //thêm mới phản hồi
    $scope.addnewphanhoi = function (makh, salephutrach) {
        $("textarea[name=phanhoimoi]").val(CKEDITOR.instances.phanhoimoi.getData());
        var phanhoimoi = $("[name=phanhoimoi]").val();
        var username = $('#salehienthoi').val();
        var data_add = {
            MA_KHACH_HANG: makh,
            NGUOI_PHAN_HOI: username,
            THONG_TIN_PHAN_HOI: phanhoimoi,
        }



        khachhangService.add_phanhoi(data_add).then(function successCallback(response1) {
            $scope.get_phanhoi($scope.khachphanhoi.MA_KHACH_HANG);
            $scope.AddNotification(makh, salephutrach);
            $scope.phantrangkh(0);
        
            $scope.new_ct_khachhang();
            SuccessSystem("Bạn đã thêm thành công 1 phản hồi của khách hàng");

            CKEDITOR.instances.phanhoimoi.setData('');
        }, function errorCallback(response) {

            ErrorSystem("Đã xảy ra lỗi");
        });

    };
    //end thêm mới phản hồi

    //xóa phản hồi
    $scope.XoaPhanHoi = function (khachphanhoi) {
        $scope.khachphanhoi = khachphanhoi;
        var ketqua = confirm('Bạn có chắc muốn xóa không?');
        if (ketqua == true) {
            khachhangService.delete_phanhoi($scope.khachphanhoi.ID).then(function (resposne) {
                $scope.get_phanhoi($scope.khachphanhoi.MA_KHACH_HANG);
            });
        } else {
            $scope.get_phanhoi($scope.khachphanhoi.MA_KHACH_HANG);
        }
    };
    //end xóa phản hồi
    $scope.edit_thongtinphanhoi = function (khachphanhoi) {
        $scope.khachphanhoi = khachphanhoi;
        var phanhoivalue = $('.thongtinphanhoi-' + khachphanhoi.ID).html();
        CKEDITOR.instances.edit_thong_tin_phan_hoi.setData(phanhoivalue);
    }
    //cập nhật phản hồi
    $scope.save_thongtinphanhoi = function (id, makh, salephutrach) {
        $("textarea[name=edit_thong_tin_phan_hoi]").val(CKEDITOR.instances.edit_thong_tin_phan_hoi.getData());
        var edit_thong_tin_phan_hoi = $("[name=edit_thong_tin_phan_hoi]").val();

        var data_save = {
            THONG_TIN_PHAN_HOI: edit_thong_tin_phan_hoi
        }

        $http.put('/api/Api_PhanHoiKhachHang/' + id, data_save).then(function successCallback(response1) {
            SuccessSystem("Sửa phản hồi thành công");
            $scope.AddNotification(makh, salephutrach);

        }, function errorCallback(response1) {
            ErrorSystem("Lỗi khi sửa");
        });
    };
    //end cập nhật phản hồi

    $scope.cancel_thongtinphanhoi = function (khachphanhoi) {
        $scope.khachphanhoi = khachphanhoi;
        $scope.get_phanhoi($scope.khachphanhoi.MA_KHACH_HANG);
    };
    //------------end phản hồi-----------------------------------------





    $scope.dieukhoantt = ['Thanh toán ngay', '5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.tinhtranghoatdong = ['Cầm chừng', 'Bình thường', 'Sắp phá sản', 'Đã phá sản'];
    $scope.tinh_trang = ['Còn công tác', 'Đã luân chuyển', 'Đã nghỉ việc', 'Chuyển công ty khác'];
    $scope.thoi_gian_ap_dung = ['Hiện tại', 'Trước kia', 'Sau này'];

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    var tmpDate = new Date();

    $scope.newField = {};

    $scope.editing = false;

    $scope.editAppKey = function (field) {

        $scope.item = field;

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
        //$scope.phantrangkh(1);
        $scope.phantrangkh(1);
    };

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();

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

    $scope.AddNew1 = function () {
        $scope.arraylienhe.push({
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
        });
    }

    $scope.arraytaikhoan = [{
        ma_khach_hang: '',
        so_tai_khoan: '',
        ten_tai_khoan: '',
        ten_ngan_hang: '',
        chi_nhanh: '',
        tinh_tp: '',
        loai_tai_khoan: '',
    }];

    $scope.AddNew = function () {
        $scope.arraytaikhoan.push({
            ma_khach_hang: '',
            so_tai_khoan: '',
            ten_tai_khoan: '',
            ten_ngan_hang: '',
            chi_nhanh: '',
            tinh_tp: '',
            loai_tai_khoan: '',
        });
    }

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


    //Lọc khách hàng
    $scope.arrayKhachHangFinded = [];
    $scope.arrayKhachHang = [];
    $scope.showtable_khach_hang = false;

    $http.get(window.location.origin + '/api/Api_KH')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayKhachHang = response.data;
                    $scope.arrayKhachHangFinded = $scope.arrayKhachHang.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onKhachHangFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKhachHangFinded = $scope.arrayKhachHang.map(function (item) {
                return item;
            });
        }
        $scope.arrayKhachHangFinded = $scope.arrayKhachHang.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.arraythongtin.TEN_CONG_TY.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoKhachHang = function (staff) {
        $scope.arraythongtin = staff;
        $scope.showtable_khach_hang = false;
    }
    // End Lọc khách hàng

    $scope.chuyensale = function (item) {
        $scope.item = item;
        var data = {
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            SALE_HIEN_THOI: $scope.item.SALES_PHU_TRACH,
            KHO_PHU_TRACH: $scope.item.KHO_PHU_TRACH,
            SALE_ME : $scope.item.SALE_ME,
        }
        var txt;
        var r = confirm("Thay đổi sale phụ trách sẽ làm mất khách hàng của bạn.Bạn có chắc chắn muốn thay đổi không?");
        if (r == true) {
            khachhangService.save_listchuyensale(data).then(function () {
                $scope.phantrangkh(0);
            });
        } else {
            $scope.phantrangkh(0);
        }       
    };


    $scope.new_ct_khachhang = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        khachhangService.chitietkhachhang(url,macongty).then(function (abc) {
            $scope.list_chitietkhachhangnew = abc;
        });
        khachhangService.get_lienhekh(url).then(function (a) {
            $scope.list_lienhe = a;
        });
        khachhangService.get_taikhoankh(url).then(function (b) {
            $scope.list_taikhoankh = b;
        });
        khachhangService.get_phanhoi(url).then(function (c) {
            $scope.list_phanhoi = c;
        });
        $http({
            method: 'POST',
            data: $scope.thong_ke_mua_hang,
            url: window.location.origin + '/api/Api_KH/ThongKeMuaHang/' + url + '/' + 1
        }).then(function successCallback(response) {
            $scope.thong_ke_mua_hang = response.data;
        });
        khachhangService.get_kh_policy(url).then(function (policy) {
            $scope.list_policy = policy;
        });
        $http.get('/api/Api_CongNoKH/DanhSachTuanCongNo/' + url).then(function (response) {
            $scope.list_danhsachtuancongno = response.data;
            $scope.ListCommentCongNo = [];
            $scope.ListCongNoKH = [];
            $scope.hienthicongno = false;
        });
    };
    $scope.new_ct_khachhang();

    $scope.addnew_lienhe_ct = function (makh) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        var data_add = {
            MA_KHACH_HANG: url,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh,
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: $scope.ghi_chu_lh,
            SDT1: $scope.so_dien_thoai1,
            TINH_TRANG_LAM_VIEC: $scope.tinh_trang_lam_viec,
            SDT2: $scope.so_dien_thoai2,
            SALES_PHU_TRACH: $scope.nvkd.USERNAME,
            SALES_MOI: $scope.sales_moi,
            SALES_CU: $scope.sales_cu,
        }
        khachhangService.add_lienhe(data_add).then(function (response) {
            //$scope.phantrangkh(1);
            $scope.$scope.phantrangkh(1);
            $scope.new_ct_khachhang();
        });
    };

    $scope.save_chitiet_kh = function (makh, id) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=editghichu]").val(CKEDITOR.instances.editghichu.getData());
        var editghichu = $("[name=editghichu]").val();

        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        var kh_save = {
            MA_KHACH_HANG: url,
            TEN_CONG_TY: $scope.kh.TEN_CONG_TY,
            VAN_PHONG_GIAO_DICH: $scope.kh.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.kh.DIA_CHI_XUAT_HOA_DON,
            TINH: $scope.kh.TINH,
            QUOC_GIA: $scope.kh.QUOC_GIA,
            MST: $scope.kh.MST,
            HOTLINE: $scope.kh.HOTLINE,
            EMAIL: $scope.kh.EMAIL,
            FAX: $scope.kh.FAX,
            LOGO: name_without_ext,
            TINH_TRANG_HOAT_DONG: $scope.kh.TINH_TRANG_HOAT_DONG,
            WEBSITE: $scope.kh.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.kh.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.kh.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.kh.SO_NO_TOI_DA,
            GHI_CHU: editghichu,
            TRUC_THUOC: macongty
        }
        khachhangService.save_khachhang(url, kh_save).then(function (response) {
            $scope.phantrangkh(0);
            var phanloai_save = {
                ID: id,
                MA_KHACH_HANG: url,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            var phanloai_add = {
                MA_KHACH_HANG: url,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            if (id != null) {
                khachhangService.save_phanloaikh(id, phanloai_save).then(function (response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                });
            } else if (id == null && $scope.kh.MA_LOAI_KHACH != null) {
                khachhangService.add_phanloaikh(phanloai_add).then(function (response) {
                    $scope.phantrangkh(0);
                    $scope.new_ct_khachhang();
                });
            }

        });
    };
    //LẤY POLICY KHÁCH HÀNG
    $scope.get_policy = function (makh) {
        khachhangService.get_kh_policy(makh).then(function (policy) {
            $scope.list_policy = policy;
        });
    };

    $scope.editpolicy = function (field) {

        $scope.item = field;

    }

    $scope.save_policy = function (policy) {
        $scope.policy = policy;
        var data_save = {
            ID: $scope.policy.ID,
            MA_KHACH_HANG: $scope.policy.MA_KHACH_HANG,
            MA_NHOM_HANG: $scope.policy.MA_NHOM_HANG,
            GIA_BAN: $scope.policy.GIA_BAN,
            CK: $scope.policy.CK,
            NGUOI_CAP_NHAT: salehienthoi
        }
        khachhangService.save_kh_policy($scope.policy.ID, data_save).then(function (response) {
            SuccessSystem('Sửa thành công');
            $scope.get_policy($scope.policy.MA_KHACH_HANG);
        }, function errorCallback(response) {
            ErrorSystem('Sửa thất bại');
        });
    };

    $scope.delete_policy = function (policy) {
        $scope.policy = policy;
        $http.delete('/api/Api_KhachHangPolicy/' + $scope.policy.ID).then(function (response) {
            SuccessSystem('Xóa thành công');
            $scope.get_policy($scope.policy.MA_KHACH_HANG);
        }, function errorCallback(response) {
            ErrorSystem('Xóa thất bại');
        });
    };

    $scope.cancelpolicy = function (policy) {
        $scope.policy = policy;
        $scope.get_policy($scope.policy.MA_KHACH_HANG);
    };

    $scope.addnew_policy = function (makh) {
        var data_add = {
            MA_KHACH_HANG: makh,
            MA_NHOM_HANG: $scope.ma_nhom_hang_policy,
            GIA_BAN: $scope.gia_ban_policy,
            CK: $scope.ck_policy,
            MA_NHOM_HANG_CHA: $scope.ma_nhom_hang_cha,
            NGUOI_CAP_NHAT: salehienthoi,
            PURC_PHU_TRACH: $scope.username_purchase,
            MARK_PHU_TRACH: $scope.username_marketing
        }
        khachhangService.add_kh_policy(data_add).then(function () {
            SuccessSystem('Thêm thành công');
            $scope.get_policy(makh);

            $scope.ma_nhom_hang_policy = '';
            $scope.gia_ban_policy = '';
            $scope.ck_policy = '';
            $scope.ma_nhom_hang_cha = '';
            $scope.username_purchase = '';
            $scope.username_marketing = '';

            $scope.showrow = false;
        }, function errorCallback(response) {
            ErrorSystem('Thêm thất bại');
        });
    };

    $scope.showrow = false;
    $scope.hienthidong = function () {
        $scope.showrow = true;
    }

    $scope.themmoidong = false;
    $scope.hienthidongmoi = function () {
        $scope.themmoidong = true;
    }

    //----END POLICY-----------------------------------------



    //Lọc nhóm vật tư hh
    $scope.arrayVTHHFinded = [];
    $scope.arrayVTHH = [];
    $scope.showtable_VTHH = false;


    $http.get(window.location.origin + '/api/Api_NhomVTHHHL')
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
            if (item.MA_NHOM_HANG_CHI_TIET.toLowerCase().indexOf($scope.ma_nhom_hang_policy.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoStaff = function (vthh) {
        $scope.ma_nhom_hang_policy = vthh.MA_NHOM_HANG_CHI_TIET;
        $scope.chung_loai_hang = vthh.CHUNG_LOAI_HANG;
        $scope.ma_nhom_hang_cha = vthh.MA_NHOM_HANG_CHA;
        $scope.showtable_VTHH = false;

    }
    // End Lọc nhóm vật tư hh

    //Lọc nhóm vật tư hh cha
    $scope.arrayVTHH_Father_Finded = [];
    $scope.arrayVTHH_Father = [];
    $scope.showtable_VTHH_Father = false;


    $http.get(window.location.origin + '/api/Api_NhomVTHHHL')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayVTHH_Father = response.data;
                    $scope.arrayVTHH_Father_Finded = $scope.arrayVTHH_Father.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onVTHH_Father_Find = function () {
        if (!$scope.MA_NHOM_HANG_CHI_TIET) {
            $scope.arrayVTHH_Father_Finded = $scope.arrayVTHH_Father.map(function (item) {
                return item;
            });
        }
        $scope.arrayVTHH_Father_Finded = $scope.arrayVTHH_Father.filter(function (item) {
            if (item.MA_NHOM_HANG_CHI_TIET.toLowerCase().indexOf($scope.ma_nhom_hang_policy.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.hienthigiatrimanhomhangcha = function (staff) {
        $scope.ma_nhom_hang_cha = staff.MA_NHOM_HANG_CHI_TIET;
        $scope.chung_loai_hang = staff.CHUNG_LOAI_HANG;
        $scope.showtable_VTHH_Father = false;
    }
    // End Lọc nhóm vật tư hh cha

    //Lọc marketing
    $scope.arrayMarketingFinded = [];
    $scope.arrayMarketing = [];
    $scope.showtable_marketing = false;


    $http.get(window.location.origin + '/api/Api_KhachHangPolicy/GetNvMarketing/' + macongty)
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

    // End Lọc marketing

    //Lọc nhân viên mua hàng
    $scope.arrayPurcFinded = [];
    $scope.arrayPurc = [];
    $scope.showtable_purchase = false;


    $http.get(window.location.origin + '/api/Api_KhachHangPolicy/GetNvMuaHang/' + macongty)
            .then(function (response) {
                if (response.data) {
                    $scope.arrayPurc = response.data;
                    $scope.arrayPurcFinded = $scope.arrayPurc.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onPurchaseFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayPurcFinded = $scope.arrayPurc.map(function (item) {
                return item;
            });
        }
        $scope.arrayPurcFinded = $scope.arrayPurc.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.ho_va_ten_purchase.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoPurchase = function (staff) {
        $scope.username_purchase = staff.USERNAME;
        $scope.ho_va_ten_purchase = staff.HO_VA_TEN;
        $scope.showtable_purchase = false;

    }

    // End Lọc nhân viên mua hàng


    $scope.LocKH = function (page, tukhoa) {
        var thongtin = {
            sales: salehienthoi,
            macongty: macongty,
            isadmin: isadmin,
            tukhoa: tukhoa,
        }
        khachhangService.Loc_KH(page, thongtin).then(function (a) {
            $scope.filtered = a;

        });
    };
    //Lọc danh sách theo điều kiện
    $scope.ShowDataSales = function () {
        if ($("#DataSales").css("display") == "none") {
            $("#DataSales").css({ "display": "block" });
        }
        else {
            $("#DataSales").css({ "display": "none" });
        }
    }

    $scope.SelectDataSales = function (nhanvienkd) {
        $scope.nhanvienkd = nhanvienkd;
        tukhoa = nhanvienkd.USERNAME;
        $scope.LocKH(1, nhanvienkd.USERNAME);
        $scope.TimKiemPhanTrang(nhanvienkd.USERNAME);
        $("#DataSales").css({ "display": "none" });
        $scope.huyloc = true;
    }

    //End Lọc danh sách theo điều kiện



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

    $scope.Xoa_KH = function (makh) {
        $http.delete('/api/Api_KH/DeleteKH/' + makh).then(function (response) {
            SuccessSystem('Xóa thành công');
            reload();
        }, function errorCallback(response) {
            ErrorSystem('Lỗi khi xóa');

        });
    };

    $scope.danhsachcongty = function () {
        $http.post('/api/Api_CCTC_CongTy/DanhsachCongty').then(function (response) {
            $scope.list_congty_copy = response.data;
        });
    };
    $scope.danhsachcongty();



    //Lọc sale chi nhanh
    $scope.array_sale_chi_nhanh_Finded = [];
    $scope.array_sale_chi_nhanh = [];
    $scope.showtable_sale_chi_nhanh = false;


    $scope.get_dsnhanvien_TA = function (macongty) {
        $scope.hovaten_copy = '';
        $http.post('/api/Api_CCTC_CongTy/Get_SALE_CHI_NHANH/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.array_sale_chi_nhanh = response.data;
                $scope.array_sale_chi_nhanh_Finded = $scope.array_sale_chi_nhanh.map(function (item) {
                    return item;
                });
            }
        }, function (error) {
            console.log(error);
        });
    };

    $scope.on_sale_chi_nhanh_Find = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.array_sale_chi_nhanh_Finded = $scope.array_sale_chi_nhanh.map(function (item) {
                return item;
            });
        }
        $scope.array_sale_chi_nhanh_Finded = $scope.array_sale_chi_nhanh.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.hovaten_copy.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoStaff_CHI_NHANH = function (staff) {
        $scope.username_copy = staff.USERNAME;
        $scope.hovaten_copy = staff.HO_VA_TEN;
        $scope.showtable_sale_chi_nhanh = false;
    }
    // End Lọc sale chi nhanh

    $scope.CopyKhachHang = function (makh) {
        var data_add = {
            TRUC_THUOC: $scope.ma_cong_ty_copy,
            SALES_PHU_TRACH: $scope.username_copy,
        }

        $http.post('/api/Api_KH/CopyNewKH/' + makh, data_add).then(function (response) {
            SuccessSystem('Chuyển thành công với mã khách hàng mới là ' + response.data);
        }, function errorCallback(response) {
            ErrorSystem('Lỗi khi chuyển');

        });
    };

    $scope.find_thong_ke = function (mahang, makhach) {
        if (mahang != "") {
            $http.post('/api/Api_KH/TimKiemThongKeMuaHang/' + makhach + '/' + mahang).then(function (response) {
                $scope.thong_ke_mua_hang = response.data;
            });
            $('#pagination_thongke').hide();
        } else if (mahang == "") {
            $scope.get_thongkemuahang(makhach);
            $('#pagination_thongke').show();
        }
    };

    $scope.load_nhanvienkho = function () {
        $http.get('/api/Api_NhanvienKD/GetNhanvienKho').then(function (response) {
            $scope.list_nhanvienkho = response.data;
        });
    }
    $scope.load_nhanvienkho();


    $scope.showkhsearch = function () {
        $scope.find = true;
    }

    $scope.timkiemkhachhang = function (email, sdt, mst) {
        if (email != null) {
            tukhoa = email;
        }
        if (sdt != null) {
            tukhoa = sdt;
        }
        if (mst != null) {
            tukhoa = mst;
        }

        var thongtintimkiem = {
            macongty: macongty,
            tukhoa: tukhoa,

        }
        $http.post('/api/Api_KH/TimKhachTheoSDT/' + 1, thongtintimkiem)
      .then(function successCallback(response) {
          $scope.timkiemkh = response.data;
          if (response.data.length != 0) {
              $scope.thongbao = 'Khách hàng đã có trong hệ thống'
          }
          else {
              $scope.thongbao = 'Khách hàng chưa có trong hệ thống'
          }

      }, function errorCallback(response1) {
          ErrorSystem("Không tìm thấy dữ liệu theo yêu cầu");
          //alert('Chưa thêm được tài khoản khách hàng');
      });
    }

        if (username.substring(0, 4) == "MARK" || isadmin == "True") {
            $scope.kiemtra_username = true;
        }

        $scope.kiemtrakh = function(makh)
        {
            $http.post('/api/Api_ChienDichMKT/KiemTraKH/' + makh).then(function (response) {
                if(response.data.length > 0)
                {
                    $scope.list_chiendichmkt = response.data;
                    $scope.tick_khach_hang = false;
                    $scope.return_confirm = false;
                } else {
                    $http.post('/api/Api_ChienDichMKT/ListChienDich').then(function (a) {
                        $scope.list_chiendichmkt = a.data;
                    });
                    $scope.return_confirm = true;
                    $scope.tick_khach_hang = false;
                }
            });

        }

        $scope.show_addnew_chien_dich_function = function () {
            $scope.show_addnew_chien_dich = true;
        };

        $scope.addnew_chien_dich = function () {
            var data = {
                TEN_LIST: $scope.ten_chien_dich,
            }

            $http.post('/api/Api_ChienDichMKT/PostDM_LIST_CHIEN_DICH_MARKETING', data).then(function (response) {
                SuccessSystem("Thêm chiến dịch thành công");
                $scope.show_addnew_chien_dich = false;
                $http.post('/api/Api_ChienDichMKT/ListChienDich').then(function (response) {
                    $scope.list_chiendichmkt = response.data;
                }, function errorCallback(response1) {
                    ErrorSystem("Thêm chiến dịch thất bại");
                });
            });
        }

        $scope.saveID_chiendich = function(chiendich)
        {
            $scope.chiendich = chiendich;
        }
        $scope.addnew_kh_chien_dich = function () {
            var data_add = {
                ID_CHIEN_DICH: $scope.chiendich,
                MA_KHACH_HANG : $scope.item.MA_KHACH_HANG,
            }

            $http.post('/api/Api_ChienDichMKT/KH_CHIEN_DICH_MKT',data_add).then(function (response) {
                SuccessSystem("Thêm khách hàng vào chiến dịch thành công");
                $scope.tick_khach_hang = false;
                $scope.return_confirm = false;
            }, function errorCallback(response1) {
                ErrorSystem("Không thêm được khách hàng vào chiến dịch");
            });
        }

        $scope.delete_lienhe = function (lienhe) {
            $scope.lienhe = lienhe;

            var result = confirm("Bạn có chắc muốn xóa chứ?");
            if (result) {
                $http.delete('/api/Api_LienHeKhachHang/DeleteKH_LIEN_HE/' + $scope.lienhe.ID_LIEN_HE).then(function (response) {
                    SuccessSystem("Xóa liên hệ thành công");
                    $scope.get_lienhe($scope.lienhe.MA_KHACH_HANG);
                }, function errorCallback(response1) {
                    ErrorSystem("Lỗi không xóa được người liên hệ do hệ thống hoặc người liên hệ này đã có phát sinh giao dịch");
                });
            } else {
                $scope.get_lienhe($scope.lienhe.MA_KHACH_HANG);
            }
        }
   

});