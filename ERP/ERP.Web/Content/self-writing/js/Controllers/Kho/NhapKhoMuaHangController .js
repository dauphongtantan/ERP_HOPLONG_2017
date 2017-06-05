
app.controller('NhapKhoMHController', function ($rootScope, $scope, $http, config) {
    var macongty = $('#macongty').val();

    $rootScope.PageSetting = {
        PageCount: 0,
        NumberPerPage: 10,
        CurrentPage: 1
    }
    $rootScope.title = "Nhập kho";
    $rootScope.dashboard = false;
    $scope.StoreType = 'Nhập kho mua hàng';
    
    $scope.LoaiChungTu = null;
    $scope.GiaTriThamChieu = [];
    $scope.GiaTriChungTu = {
        Search: null,
        Date: null
    };
    $scope.GeneralInfo = {
        NgayChungTu: null,
        NgayHachToan: null,
        SoChungTu: null,
        DienGiai: null,
        NhanVienMuaHang: null,
        TenNhanVien: null,
       
    };
    $scope.GeneralInfo.DienGiai = $scope.StoreType;
    $scope.ThamChieu = {
        ListResult: [],
        ListSelect: [],
        TraHang: null
    };
    $scope.ChungTu = {
        ListThamChieu: []
    }
    
    $('.datetimepicker').daterangepicker({
        singleDatePicker: true,
        calender_style: "picker_2"
    }, function (start, end, label) {
        $(this).val($(this).val);
    });
    
   
    function ResetValue() {
        $scope.LoaiChungTu = null;
        $scope.GiaTriThamChieu = [];
        $scope.GiaTriChungTu.Search = null,
        $scope.GiaTriChungTu.Date = null;
        $scope.GeneralInfo.NgayChungTu = null;
        $scope.GeneralInfo.NgayHachToan = null;
        $scope.GeneralInfo.SoChungTu = null;
        $scope.GeneralInfo.DienGiai = null;
        $scope.GeneralInfo.TenNhanVien = null;
        $scope.GeneralInfo.NhanVienMuaHang = null;
        $scope.Detail.ListHangHoa = [];
        $scope.Detail.ListTaiKhoan = [];
        $scope.Detail.ListAdd = [];
        $scope.Detail.SearchHang = [];
        $scope.Detail.ListKho = [];
        $scope.ThamChieu.From = null;
        $scope.ThamChieu.To = null;
        $scope.ThamChieu.ListResult = [];
        $scope.ThamChieu.ListSelect = [];
        $scope.ChungTu.ListThamChieu = [];
    }
    function ResetValueThamChieu() {

    }
    function ResetAfterSave() {
        $scope.GeneralInfo.DienGiai = 'Nhập kho mua hàng';
        $scope.GiaTriThamChieu = [];
        $scope.GiaTriChungTu.Search = null,
        $scope.GiaTriChungTu.Date = null;
        $scope.GeneralInfo.NgayChungTu = null;
        $scope.GeneralInfo.NgayHachToan = null;
        $("#GeneralInfo_NgayHachToan").val();
        $("#GeneralInfo_NgayChungTu").val();
        $scope.GeneralInfo.SoChungTu = null;
        $scope.GeneralInfo.DienGiai = null;
        $scope.GeneralInfo.TenNhanVien = null;
        $scope.GeneralInfo.NhanVienMuaHang = [];
        $scope.Detail.ListAdd = [];
        $scope.Detail.SearchHang = [];
        $scope.ThamChieu.From = null;
        $scope.ThamChieu.To = null;
        $scope.ThamChieu.ListResult = [];
        $scope.ThamChieu.ListSelect = [];
        $scope.ThamChieu.DonBanHang = null
    }


    $scope.Detail = {
        ListHangHoa: [],
        ListTaiKhoan: [],
        ListAdd: [],
        SearchHang: [],
        ListKho: [],
        ListDN:[]
    }


    $scope.SelectDonDeNghiNhapKho = function (item) {
        $scope.item = item;
        //$scope.ThamChieu.ListSelect = [];
        //$scope.ThamChieu.ListSelect.push({ SO_CHUNG_TU: item.MA_SO_BH });
        $(".tableselect").css({ "display": "none" });

        $http({
            method: 'GET',
            url: '/api/Api_MH_DE_NGHI_NHAP_KHO/GetDetailMH_DeNghiNhapKho/' + item.MA_SO_DN,
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListAdd = response.data.ctmhdenghinhapkho;
                $scope.GeneralInfo.NhanVienMuaHang = response.data.mhdenghinhapkho.NGUOI_DN,
                $scope.GeneralInfo.TenNhanVien = response.data.mhdenghinhapkho.HO_VA_TEN,
                $scope.GeneralInfo.DienGiai = response.data.mhdenghinhapkho.DIEN_GIAI

            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });


    }


    //Lấy dữ liệu hàng hóa
    $scope.SearchHH = function (mh) {
        $http.get(window.location.origin + '/api/Api_XuatNhapKho/GetAllHH/' + macongty + '/' + 'NHAPKHO/' + mh)
         .then(function (response) {
             if (typeof (response.data) == "object") {
                 $scope.Detail.ListHangHoa = response.data;
             }
             else {
                 ErrorSystem();
             }
         }, function (error) {
             console.log(error);
         });
    }

    //Lấy dữ liệu khách hàng hợp long
    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();

    
    function Init() {

        $http({
            method: 'GET',
            url: '/api/Api_KhoHL/' + macongty
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListKho = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });

        $http({
            method: 'GET',
            url: '/api/Api_TaiKhoanHachToan'
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListTaiKhoan = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });


    }
    Init();

    function init() {
        //Lấy dữ liệu nhân viên hợp long
        $http.get("/api/Api_NhanvienHL/GetListNhanvien")
            .then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.NhanVienMuaHang = response.data;
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        //-------------------------------
        $http({
            method: 'GET',
            url: '/api/Api_MH_DE_NGHI_NHAP_KHO/GetAllMH_DeNghiNhapKho'
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.DeNghiMH = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });

       

       
    }

    init();
    //Thay đổi loại chứng từ
    
  
    $scope.SelectDataGiaTriChungTu = function (item) {
        $scope.GiaTriChungTu.Data = item;
        $scope.GiaTriChungTu.Search = item.tendoituong;
        $("#DataGiaTriChungTu").css({ "display": "none" });
    }
   
   
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_CHUAN: null,
            TEN_HANG: null,
            MA_KHO: null,
            TK_HACH_TOAN_KHO: null,
            DON_GIA: null,
            SL: null,
            DVT: null,
            TK_NO: null,
            TK_CO: null,
            DON_GIA_VON: null
        });
    }
    $scope.ShowHangHoa = function (index) {
        if ($("#DataHangHoa" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataHangHoa" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "block" });
        }
    }
    $scope.SelectHangHoa = function (index, item, hanghoa) {
        item.MA_CHUAN = hanghoa.MA_CHUAN;
        item.MA_HANG = hanghoa.MA_HANG;
        item.TEN_HANG = hanghoa.TEN_HANG;
        item.MA_KHO_CON = hanghoa.TEN_KHO;
        item.TK_HACH_TOAN_KHO = hanghoa.TK_KHO;
        item.TK_NO = hanghoa.TK_CHI_PHI;
        item.TK_CO = hanghoa.TK_DOANH_THU;
        item.DVT = hanghoa.DVT;
        //$scope.Detail.ListAdd[index].SearchHang = $scope.Detail.ListHangHoa[childIndex].MA_HANG;
        //$scope.Detail.ListAdd[index].KhoList = $scope.Detail.ListHangHoa[childIndex].KHO;
        $(".tableselect").css({ "display": "none" });
    };
    //Chọn tài khoản
    $scope.ShowTaiKhoanCo = function (index) {
        if ($("#DataTaiKhoanCo" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataTaiKhoanCo" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    };
    $scope.SelectTK_CO = function (index, item, tkco) {
        item.TK_CO = tkco.SO_TK;
        $(".tableselect").css({ "display": "none" });
    };
    $scope.ShowTaiKhoanNo = function (index) {
        if ($("#DataTaiKhoanNo" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataTaiKhoanNo" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    };
    $scope.SelectTK_NO = function (index, item, tkno) {
        item.TK_NO = tkno.SO_TK;
        $("#DataTaiKhoanNo" + index).css({ "display": "none" });
    };

    $scope.ShowTaiKhoanKho = function (index) {
        if ($("#DataTaiKhoanKho" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataTaiKhoanKho" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    };
    $scope.SelectTK_KHO = function (index, item, tkkho) {
        item.TK_KHO = tkkho.SO_TK;
        $(".tableselect").css({ "display": "none" });
    };
   


    $scope.ShowDataNhanVienMuaHang = function () {
        if ($("#DataNhanVienMuaHang").css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataNhanVienMuaHang").css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "block" });
        }
    }

    $scope.SelectDataNhanVien = function (item) {
        $scope.GeneralInfo.TenNhanVien = item.HO_VA_TEN;
        $scope.GeneralInfo.NhanVienMuaHang = item.USERNAME;
        $(".tableselect").css({ "display": "none" });
    }
    //Kho hàng
    $scope.ShowKho = function (index) {
        if ($("#DataKho" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataKho" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    };
    $scope.SelectKho = function (index, item, kho) {
        item.MA_KHO_CON = kho.MA_KHO;
        item.TEN_KHO = kho.TEN_KHO;
        $(".tableselect").css({ "display": "none" });
    };



    $(function () {

        $('#GeneralInfo_NgayHachToan').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
        $('#GeneralInfo_NgayChungTu').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
    });
    $scope.test_ = function () {
        var abc = $('#ngay_chung_tu').val();
        console.log(abc);
    };
    //Lưu nhập kho
    function CheckAll() {
        var check = true;
        $scope.GeneralInfo.NgayChungTu = $("#GeneralInfo_NgayChungTu").val();
        $scope.GeneralInfo.NgayHachToan = $("#GeneralInfo_NgayHachToan").val();
      
        return check;
    }
    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveNhapKho = function () {
        if (CheckAll() == false) {
            return;
        }
        var data = {
            SO_CHUNG_TU: $scope.GeneralInfo.SoChungTu,
            NGAY_CHUNG_TU: $scope.GeneralInfo.NgayChungTu,
            NGAY_HACH_TOAN: $scope.GeneralInfo.NgayHachToan,
            ChiTiet: $scope.Detail.ListAdd,
            ThamChieu: $scope.ThamChieu.ListSelect,
            LOAI_NHAP_KHO: 'Nhập kho mua hàng',
            KHACH_HANG: $scope.GeneralInfo.KhachHang,
            NHAN_VIEN_MUA_HANG: $scope.GeneralInfo.NhanVienMuaHang,
            NGUOi_LAP_PHIEU: a,
            TRUC_THUOC: b,
            MA_SO_DN: $scope.item.MA_SO_DN
        }

        $http.post("/api/Api_NhapKhoMH/PostKHO_NHAP_KHOMH", data).then(function (response) {
            //console.log(response);
            $scope.datareturn = response.data;
            init();
            if (response.data == config.INPUT_ERROR) {
                InputFail();
                
            }
            else if (response.data == config.FAIL) {
                ErrorSystem();
            }
            else {
                ResetAfterSave();
                new PNotify({
                    title: 'Thành công',
                    text: $scope.datareturn,
                    addclass: 'bg-primary'
                });
            }
            
        }, function (error) {
            ConnectFail();
        });
    }


    $scope.SearchNgayHangVe = function (ngay) {
        
        if (ngay == null) {
            var data = {
                ngay: ngay,
                username: Username,
                isadmin: IsAdmin
            }
           
            $http.post('/api/Api_MH_DE_NGHI_NHAP_KHO/GetListHangSapVe/' + macongty, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListSapVe = response.data;
                        if ($scope.ListSapVe.length == 0) {
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
        if (ngay != null) {
            var data = {
                ngay: ngay.format('DD/MM/YYYY'),
                username: Username,
                isadmin: IsAdmin
            }
            $http.post('/api/Api_MH_DE_NGHI_NHAP_KHO/GetListHangSapVe/' + macongty, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListSapVe = response.data;
                        if ($scope.ListSapVe.length == 0) {
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
    

    
    
    // Tham Chiếu...........................................
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
        $scope.Detail.ListAdd.splice(index, 1);

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





});