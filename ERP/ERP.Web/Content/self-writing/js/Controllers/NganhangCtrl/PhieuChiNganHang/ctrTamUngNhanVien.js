
app.controller('ctrTamUngNhanVien', ctrTamUngNhanVien);
ctrTamUngNhanVien.$inject = ['$rootScope', '$scope', "$location", '$http', '$uibModal'];
var macongty = $('#macongty').val();
function ctrTamUngNhanVien($rootScope, $scope, $location, $http, $uibModal) {
    $scope.title = 'ctrTamUngNhanVien';

    $scope.ui = {
        activeTabThue: false,
        hideTabThue: false
    }


    function ErrorSystem() {
        new PNotify({
            title: 'Thất bại',
            text: 'Lỗi hệ thống, Xin vui lòng thử lại sau',
            addclass: 'bg-danger'
        });
    }
    function ConnectFail() {
        new PNotify({
            title: 'Thông báo',
            text: 'Không thể kết nối được server. Vui lòng kiểm tra đường truyền mạng và thử lại',
            addclass: 'bg-danger'
        });
    }
    function InputFail() {
        new PNotify({
            title: 'Thất bại',
            text: 'Dữ liệu nhập vào sai. Kiểm tra lại các trường dữ liệu kho và chi tiết số lượng kho hàng của hàng hóa',
            addclass: 'bg-warning'
        });
    }
    function Success() {
        new PNotify({
            title: 'Thành công',
            text: 'Xử lý dữ liệu thành công.',
            addclass: 'bg-primary'
        });
    }
    function Norecord() {

        new PNotify({
            title: 'Thông tin',
            text: 'Không có dữ liệu phù hợp được tìm thây',
            addclass: 'alert alert-styled-left',
            type: 'info'
        });
    }
    function ConvertToDate(input) {
        var date = input.split("/");
        return date[2] * 365 + date[1] * 12 + date[0];
    }
    $('body').click(function (event) {
        if ($(event.target).is('.tableselect') == false && $(event.target).is('.showtableselect') == false) {
            $(".tableselect").css({ "display": "none" });
        }
    });


    $scope.GiaTriThamChieu = [];
    $scope.GiaTriChungTu = {
        Search: null,
        Date: null
    };
    $scope.Detail = {
        ListHangHoa: [],
        ListTaiKhoan: [],
        ListAdd: []

    }
    $scope.Validate = {
        FromDateThamChieu: true,
        ToDateThamChieu: true,
        ToDateThamChieuLess: true,
        LoaiChungTu: true,
        GiaTriChungTu: true

    };
    $scope.ThamChieu = {
        From: null,
        To: null,
        ListResult: [],
        ListSelect: [],
        TraHang: null
    };

    $rootScope.PageSetting = {
        PageCount: 0,
        NumberPerPage: 10,
        CurrentPage: 1
    }
    $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
    $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);

    //Danh sách các tài khoản ngân hàng(DM_TK_NGAN_HANG_NOI_BO)
    $scope.listTknh = [];
    // Danh sách các đối tượng (DM_DOI_TUONG)
    $scope.arrayDT = [];
    $scope.listDoiTuong = [];
    $scope.showtable_ma_doi_tuong = false;
    // Danh sách các tài khoản nhận (NCC_TK_NGAN_HANG)
    $scope.listNccTknh = [];
    // Danh sách các nhà cung cấp
    $scope.listNCC = [];
    // Danh sách nhân viên(NCC_TK_NGAN_HANG)
    $scope.listStaff = [];
    $scope.arrayNVFinded = [];
    $scope.showtable_ho_va_ten = false;

    $scope.dinh_khoan_tu_dong = null;
    $scope.info = {
        noi_dung_thanh_toan: '',
        dien_giai_noi_dung_thanh_toan: '',
        ngay_hach_toan: '',
        ngay_chung_tu: '',
        so_chung_tu: '',
        so_tai_khoan: null,
        ten_ngan_hang: '',
        ma_doi_tuong: null,
        ten_doi_tuong: '',
        ncc_so_tai_khoan: null,
        ncc_ten_ngan_hang: '',
        nhan_vien_thu: '',
        ma_nhan_vien_thu: '',
        tongtien: 0
    }
    // Reset value
    function ResetAfterSave() {
        $scope.GiaTriThamChieu = [];
        $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
        $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);
        $scope.GiaTriChungTu.Search = null,
        $scope.GiaTriChungTu.Date = null;
        $scope.info.ngay_hach_toan = null;
        $scope.info.ngay_chung_tu = null;
        $scope.info.so_chung_tu = null;
        $scope.info.so_tai_khoan = null;
        $scope.info.ma_doi_tuong = null;
        $scope.info.ten_ngan_hang = null;
        $scope.info.ten_doi_tuong = null;
        $scope.info.ncc_ten_ngan_hang = null;
        $scope.info.dia_chi = null;
        $scope.info.ncc_so_tai_khoan = null;
        $scope.info.so_tk_nop = null;
        $scope.info.ten_ngan_hang = null;
        $scope.ncc_ten_ngan_hang = null;
        $scope.info.nhan_vien_thu = null;
        $scope.info.ma_nhan_vien_thu = null;
        $scope.noi_dung_thanh_toan = null;
        $scope.info.dien_giai_noi_dung_thanh_toan = null;

        $scope.listHachToan = [];
        $scope.Validate.ToDateThamChieu = true;
        $scope.Validate.ToDateThamChieuLess = true;
        $scope.Validate.LoaiChungTu = true;
        $scope.Validate.GiaTriChungTu = true;
        $scope.ThamChieu.From = null;
        $scope.ThamChieu.To = null;
        $scope.ThamChieu.ListResult = [];
        $scope.ThamChieu.ListSelect = [];
        tongtien: 0

    }
    // Danh sách các nội dung thanh toán
    $scope.noi_dung_thanh_toan = 'Tạm Ứng Nhân Viên';
    $scope.info.dien_giai_noi_dung_thanh_toan = $scope.noi_dung_thanh_toan;
     
    // Mảng các chứng từ tham chiếu
    $scope.arrayCTTC = [];

    // Danh sách hạch toán
    $scope.listHachToan = [];
   
    // Mỗi item hạch toán có 1 item thuế
            
    $scope.itemHachToanSelect = 0;

    $scope.arrayBlank = [{},{},{},{},{},{}];
        
    $(function () {

        $('#ngay_hach_toan').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
        $('#ngay_chung_tu').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
    });
    $scope.test_ = function () {
        var abc = $('#ngay_chung_tu').val();
        console.log(abc);
    };

    // Lấy list tài khoản ngân hàng
    $http.get(window.location.origin + '/api/Api_LoaiTKnganhangnoibo')
    .then(function (response) {
        if (response.data) {
            $scope.listTknh = response.data;
        }
    }, function (error) {
        console.log(error);
    });

    // Chọn tài khoản ngân hàng
    $scope.selectTaiKhoanNganHang = function (tknh) {
        $scope.info.so_tai_khoan = tknh.SO_TAI_KHOAN;
        $scope.info.ten_ngan_hang = tknh.TEN_NGAN_HANG;
    };

    // List đối tượng
    $scope.onDoiTuongFind = function () {
        $http.post(window.location.origin + '/api/Api_XuatNhapKho/GetAllDoiTuong/' + $scope.info.ma_doi_tuong + '/' + macongty)
         .then(function (response) {
             console.log(response);
             if (response.data) {
                 $scope.arrayDT = response.data;
                 $scope.listDoiTuong = $scope.arrayDT.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         });
    }


    // Chọn đối tượng
    $scope.selectDoiTuong = function (doi_tuong) {
        $scope.info.ma_doi_tuong = doi_tuong.MA_DOI_TUONG;
        $scope.info.ma_cong_ty = doi_tuong.MA_CONG_TY;
        $scope.info.ten_doi_tuong = doi_tuong.TEN_DOI_TUONG;
        $scope.showtable_ma_doi_tuong = false;
    };

    // Lấy list NCC
    $http.get(window.location.origin + '/api/Api_LoaiTKnganhangnoibo')
        .then(function (response) {
            if (response.data) {
                $scope.listNccTknh = response.data;
            }
        }, function (error) {
            console.log(error);
        });
   
    // chọn TK 
    $scope.selectNccTaiKhoanNganHang = function (doi_tuong) {
        $scope.info.ncc_so_tai_khoan = doi_tuong.SO_TAI_KHOAN;
        $scope.info.ncc_ten_ngan_hang = doi_tuong.TEN_NGAN_HANG;
    };

    /**
   * get nhan viên
   */
    $http.get(window.location.origin + '/api/Api_NhanvienHL/GetListNhanvien')
            .then(function (response) {
                if (response.data) {
                    $scope.listStaff = response.data;
                    $scope.arrayNVFinded = $scope.listStaff.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });
    // Chọn NV
    $scope.selectNhanVienThu = function (p_staff) {
        $scope.info.nhan_vien_thu = p_staff.HO_VA_TEN;
        $scope.info.ma_nhan_vien_thu = p_staff.USERNAME;
        $scope.showtable_ho_va_ten = false;
    };

    //lọc nhân viên
    /**
    *loc dữ liệu khi input nhân viên thay đổi
    */
    $scope.onNhanVienFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNVFinded = $scope.listStaff.map(function (item) {
                return item;
            });
        }
        $scope.arrayNVFinded = $scope.listStaff.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.info.nhan_vien_thu.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // Lấy list TK hạch toán

    $http.get(window.location.origin + '/api/Api_TaiKhoanHachToan')
       .then(function (response) {
           if (response.data) {
               $scope.listDmTaiKhoanHachToan = response.data;
           }
       }, function (error) {
           console.log(error);
       });
    // Chọn TK hạch toán
    $scope.selectTkNo = function (tk_no) {
        $scope.listHachToan[$scope.itemHachToanSelect].TK_NO = tk_no.SO_TK;
    };


    //
    $scope.onChangeNoiDungThanhToan = function () {
        console.log('aaaa');
        var noi_dung_thanh_toan = this.noi_dung_thanh_toan;
        var hideTabThue = noi_dung_thanh_toan === "Chi khác" ? false : true;
        $scope.ui = {
            hideTabThue: hideTabThue,
            activeTabThue: false
        };
    };

    $scope.activeTab = function (tab) {
        console.log(tab);
        switch (tab) {
            case "Thuế":
                $scope.ui.activeTabThue = true;
                break;
            case "Hạch toán":
                $scope.ui.activeTabThue = false;
                break;
        }
    };


    $scope.addHachToan = function () {
        var dk = $scope.dinh_khoan_tu_dong;

        $scope.listHachToan.push({
            DIEN_GIAI: 'Tạm Ứng Nhân Viên',
            TK_NO: dk ? dk.TK_NO : 1412,
            TK_CO: dk ? dk.TK_CO : 1121,
            SO_TIEN: 0,
            QUY_DOI: 0,
            LOAI_TIEN: 'VND', // loại tiền
            TY_GIA: ''
        });

        $scope.itemHachToanSelect = $scope.listHachToan.length - 1;
        $scope.arrayBlank.shift();
    };

    $scope.onSelectItemHachToan = function (index) {
        $scope.itemHachToanSelect = index;
    };

    $scope.selectTkNo = function (tk_no) {
        $scope.listHachToan[$scope.itemHachToanSelect].TK_NO = tk_no.SO_TK;
    };


    $scope.selectTkCo = function (tk_co) {
        $scope.listHachToan[$scope.itemHachToanSelect].TK_CO = tk_co.SO_TK;
    };


    $scope.selectTkThue = function (tk_thue) {
        $scope.listThue[$scope.itemHachToanSelect].TK_THUE_GTGT = tk_thue.SO_TK;
    };

    $scope.selectNcc = function (ncc) {
        $scope.listThue[$scope.itemHachToanSelect].MA_NHA_CUNG_CAP = ncc.MA_NHA_CUNG_CAP;
    };

    function errorAlert(message) {
        ErrorSystem(message);
    }


    $scope.save = function () {
     
            var info = $scope.info;
            var listHachToan = $scope.listHachToan;
            var listThue = $scope.listThue;
            var listChungTu = $scope.arrayCTTC;

            if (!info.so_tai_khoan) {
                ErrorSystem('Thiếu thông tin Tài Khoản Chi');
                return;
            }



            if (!info.ma_doi_tuong) {
                ErrorSystem('Thiếu thông tin Đối Tượng');
                return;
            }

            if (!info.ncc_so_tai_khoan) {
                return callback('Thiếu thông tin Tài Khoản Nhận');
            }

            if (!info.nhan_vien_thu) {
                ErrorSystem('Thiếu thông tin Nhân Viên');
                return;
            }

          
            var ngaychungtu = $('#ngay_chung_tu').val();
            var ngayhachtoan = $('#ngay_hach_toan').val();
            if (!ngayhachtoan) {
                ErrorSystem('Thiếu thông tin Ngày Hạch Toán');
                return;
            }

            if (!ngaychungtu) {
                ErrorSystem('Thiếu thông tin Ngày Chứng Từ');
                return;
            }
            if (ngayhachtoan < ngaychungtu) {
                ErrorSystem('Ngày Hạch Toán phải lớn hơn hoặc bằng Ngày Chứng Từ');
                return;
            }


            var tongtien = 0;
            if (listHachToan.length === 0) {
                ErrorSystem('Thiếu thông tin danh sách hạch toán');
                return;
            }

            var tongtien = 0;
            for (var i = 0; i < listHachToan.length; i++) {
                var hachtoan = listHachToan[i];


                if (!hachtoan.LOAI_TIEN) {
                    ErrorSystem('Thiếu thông tin hạch toán Loại Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!hachtoan.TK_NO) {
                    ErrorSystem('Thiếu thông tin hạch toán Tài Khoản Nợ - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!hachtoan.TK_CO) {
                    ErrorSystem('Thiếu thông tin hạch toán Tài Khoản Có - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!hachtoan.SO_TIEN) {
                    ErrorSystem('Thiếu thông tin hạch toán Số Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (hachtoan.LOAI_TIEN == 'VND') {
                    hachtoan.TY_GIA = 1;
                }

                if (!hachtoan.TY_GIA) {
                    ErrorSystem('Thiếu thông tin hạch toán Tỷ Giá - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!hachtoan.DIEN_GIAI) {
                    ErrorSystem('Thiếu thông tin hạch toán Diễn Giải - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                hachtoan.QUY_DOI = hachtoan.SO_TIEN * hachtoan.TY_GIA;
                tongtien += hachtoan.QUY_DOI;

            }
            $scope.info.tongtien = tongtien;


            var a = $('#username').val();
            var b = $('#macongty').val();
             $http({
                method: 'POST',
                url: '/api/Api_NH_UNC/PostNH_UNC',
                data: {
                    SO_CHUNG_TU: $scope.info.so_chung_tu,
                    NGAY_CHUNG_TU: ngaychungtu,
                    NGAY_HACH_TOAN: ngayhachtoan,
                    TAI_KHOAN_CHI: $scope.info.so_tai_khoan,
                    MA_DOI_TUONG: $scope.info.ma_doi_tuong,
                    NOI_DUNG_THANH_TOAN: 'Tạm Ứng Nhân Viên',
                    DIEN_GIAI_NOI_DUNG_THANH_TOAN: $scope.info.dien_giai_noi_dung_thanh_toan,
                    TAI_KHOAN_NHAN: $scope.info.ncc_so_tai_khoan,
                    NHAN_VIEN_CHUYEN_KHOAN: $scope.info.ma_nhan_vien_thu,
                    ChiTietHachToan: $scope.listHachToan,
                    ThamChieu: $scope.ThamChieu.ListSelect,
                    NHAN_VIEN_THU: $scope.info.ma_nhan_vien_thu,
                    TONG_TIEN: $scope.info.tongtien,
                    NGUOI_LAP_BIEU: a,
                    TRUC_THUOC: b,



            }
        }).then(function (response) {
            $scope.data1 = response.data;
            if (!$scope.data1) {
                ErrorSystem();
            }


            else {
                ResetAfterSave();
                new PNotify({
                    title: 'Thành công',
                    text: 'Chứng từ ' + $scope.data1 + ' đã được tạo',
                    addclass: 'bg-primary'
                });
            }
        }, function (error) {
            ConnectFail();
        });
    }


    $scope.checklydo = function () {
        var value = $('#lydothu').val();
        $('#diengiai').val(value);
    };
    //Hiển thị ô giá trị chứng từ
    $scope.ShowDataGiaTriChungTu = function () {
        if ($scope.LoaiChungTu == 2 && $("#DataGiaTriChungTu").css("display") == "none") {
            $("#DataGiaTriChungTu").css({ "display": "block" });
        }
        else {
            $("#DataGiaTriChungTu").css({ "display": "none" });
        }
    }
    //End 



    //Chọn giá trị chứng từ
    $scope.SelectDataGiaTriChungTu = function (item) {
        $scope.GiaTriChungTu.Data = item;
        $scope.GiaTriChungTu.Search = item.tendoituong;
        $("#DataGiaTriChungTu").css({ "display": "none" });
    }
    //end


    //Thay đổi loại chứng từ
    $scope.ChangeLoaiChungTu = function () {

        if ($scope.LoaiChungTu == 1) {
            $("#Select_DataGiaTriChungTu").css({ "display": "block" });
            $("#Input_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_MaChungTu").css({ "display": "none" });
            $("#DataGiaTriChungTu").css({ "display": "none" });
            $http({
                method: 'GET',
                url: '/api/Api_Loaichungtu'
            }).then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.GiaTriThamChieu = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.GiaTriThamChieu.push({
                            "value": response.data[i].MA_LOAI_CHUNG_TU,
                            "show": response.data[i].TEN_LOAI_CHUNG_TU
                        });
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        }
        else if ($scope.LoaiChungTu == 2) {
            $("#Select_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_DataGiaTriChungTu").css({ "display": "block" });
            $("#Input_MaChungTu").css({ "display": "none" });
            $("#DataGiaTriChungTu").css({ "display": "block" });
            $scope.DoiTuongFind = function () {
                $http.post(window.location.origin + '/api/Api_XuatNhapKho/GetAllDoiTuong/' + $scope.GiaTriChungTu.Search + '/' + macongty)
                 .then(function (response) {
                     if (typeof (response.data) == "object") {
                         var data = response.data.DoiTuong;
                         var colength = 5;
                         var madoituong = "", tendoituong = "";
                         var max = 0;
                         var maxlength = response.data.Length;
                         for (var i = 0; i < response.data.length; i++) {
                             madoituong = response.data[i].MA_DOI_TUONG;
                             tendoituong = response.data[i].TEN_DOI_TUONG;
                             $scope.GiaTriThamChieu.push({
                                 value: response.data[i].MA_DOI_TUONG,
                                 show: "",
                                 madoituong: madoituong,
                                 tendoituong: tendoituong,
                             });
                         }
                     }
                     else {
                         ErrorSystem();
                     }
                 }, function (error) {
                     console.log(error);
                 });
            }


        }
        else if ($scope.LoaiChungTu == 3) {
            $("#Select_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_MaChungTu").css({ "display": "block" });
            $("#DataGiaTriChungTu").css({ "display": "none" });

        }
    };
    //End

    $scope.SearchThamChieu = function () {
        if (CheckSearchThamChieu() == false) {
            return;
        }
        if ($scope.LoaiChungTu == 1) {
            var data = {
                GiaTriChungTu: $scope.GiaTriLoaiChungTu,
                FromTime: $scope.ThamChieu.From,
                ToTime: $scope.ThamChieu.To


            }

            $http.post('/api/Api_XuatNhapKho/SearchByTypeWithDate/' + macongty, data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });



            //$http({
            //    method: 'POST',
            //    url: '/api/Api_XuatNhapKho/SearchByType/' + GiaTriChungTu + '/' + FromTime + '/' + ToTime,
            //    data: { FromTime: $scope.ThamChieu.From, ToTime: $scope.ThamChieu.To, GiaTriChungTu: $scope.GiaTriLoaiChungTu }
            //}).then(function (response) {
            //    console.log(response);
            //    if (typeof (response.data) == "object") {
            //        $scope.ThamChieu.ListResult = response.data;
            //        if ($scope.ThamChieu.ListResult.length == 0) {
            //            Norecord();
            //        }
            //    }
            //    else {
            //        ErrorSystem();
            //    }
            //}, function (error) {
            //    ConnectFail();
            //});
        }
        else if ($scope.LoaiChungTu == 2) {
            var data = {
                GiaTriChungTu: $scope.GiaTriChungTu.Data.madoituong,
                FromTime: $scope.ThamChieu.From,
                ToTime: $scope.ThamChieu.To

            }

            $http.post('/api/Api_XuatNhapKho/SearchByDoiTuongWithDate/' + macongty, data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
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
        else {
            var mact = $scope.MaChungTu.Search;
            $http.get('/api/Api_XuatNhapKho/GetbyMa/' + mact + '/' + macongty)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
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
    };
    function CheckSearchThamChieu() {
        $scope.ThamChieu.From = $("#ThamChieuFrom").val();
        $scope.ThamChieu.To = $("#ThamChieuTo").val();
        var check = true;
        if ($scope.LoaiChungTu == null) {
            $scope.Validate.LoaiChungTu = false;
            check = false;
        }
        else {
            $scope.Validate.LoaiChungTu = true;
        }
        if (($scope.LoaiChungTu == 2 && $scope.GiaTriChungTu.Data == null) || ($scope.LoaiChungTu == 1 && $scope.GiaTriLoaiChungTu == null) || ($scope.LoaiChungTu == 3 && $scope.MaChungTu.Search == null)) {
            $scope.Validate.GiaTriChungTu = false;
            check = false;
        }
        else {
            $scope.Validate.GiaTriChungTu = true;
        }
        if ($scope.ThamChieu.From != "" && $scope.ThamChieu.To != "" && ConvertToDate($scope.ThamChieu.From) > ConvertToDate($scope.ThamChieu.To)) {
            $scope.Validate.ToDateThamChieuLess = false;
            check = false;
        }
        else {
            $scope.Validate.ToDateThamChieuLess = true;
        }
        return check;
    };
    $scope.SelectThamChieu = function (item, index) {
        if (item.Action == true) {
            item.Action = false;
        }
        else {
            item.Action = true;

        }
    };
    $scope.RemoveThamChieu = function (index) {
        $scope.ThamChieu.ListSelect.splice(index, 1);
        if ($scope.LoadHangTra == true) {
            ResetAfterSave();
        }
    }

    $scope.RemoveRow = function (index) {
        $scope.listHachToan.splice(index, 1);
        $scope.listThue.splice(index, 1);
        ResetAfterSave();
    }
    $scope.SetThamChieu = function () {
        var length = $scope.ThamChieu.ListResult.length;
        //$scope.ThamChieu.ListSelect = [];
        var check = false;
        for (var i = 0; i < length; i++) {
            if ($scope.ThamChieu.ListResult[i].Action == true) {
                check = false;
                for (var j = 0; j < $scope.ThamChieu.ListSelect.length; j++) {
                    if ($scope.ThamChieu.ListSelect[j].SO_CHUNG_TU == $scope.ThamChieu.ListResult[i].SO_CHUNG_TU) {
                        check = true;
                        break;
                    }
                }
                if (!check) {

                    $scope.ThamChieu.ListSelect.push(angular.copy($scope.ThamChieu.ListResult[i]));
                }
            }
        }
        $("#modal_theme_primary").modal("toggle");
        ResetThamChieu();
    };
    function ResetThamChieu() {
        $("#ThamChieuFrom").val("");
        $("#ThamChieuTo").val("");
        $scope.ThamChieu.ListResult = [];
    };

    //Định dạng số tiền

}