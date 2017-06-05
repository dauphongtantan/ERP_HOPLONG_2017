
app.controller('StoreInsertController', function ($rootScope, $scope, $http, config) {
    var macongty = $('#macongty').val();

    $rootScope.PageSetting = {
        PageCount: 0,
        NumberPerPage: 10,
        CurrentPage: 1
    }
    $rootScope.title = "Nhập kho";
    $rootScope.dashboard = false;
    $scope.StoreType = 1;
    $scope.LoadHangTra = false;
    $scope.LoaiChungTu = null;
    $scope.GiaTriThamChieu = [];
    $scope.Searching = false;
    $scope.DonHangTra = [];
    $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
    $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);
    $scope.DonHangnumPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
    $scope.DonHangcurrentPage = angular.copy($rootScope.PageSetting.CurrentPage);
    $scope.GiaTriChungTu = {
        Search: null,
        Date: null
    };
    $scope.GeneralInfo = {
        NgayChungTu: null,
        NgayHachToan: null,
        SoChungTu: null,
        DienGia: null,
        KemTheo: null,
        ChiTiet: null,
        TenDoiTuong: null

    };
    $scope.ChangeType = function () {
        if ($scope.StoreType != 2) {
            ResetAfterSave();
            $scope.LoadHangTra = false;
        }
    }
    $scope.ValidateGeneral = {
        NguoiGiaoHang: true,
        NgayHachToan: true,
        NgayChungTu: true,
        NgayHachToanLess: true
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
    $scope.ChungTu = {
        ListThamChieu: []
    }
    $scope.NguoiGiaoHang = {
        List: [],
        NguoiGiaoHang: null,
        Search: null,
        Ten: null
    };
    $('.datetimepicker').daterangepicker({
        singleDatePicker: true,
        calender_style: "picker_2"
    }, function (start, end, label) {
        $(this).val($(this).val);
    });
    $scope.SearchDonHangTra = {
        KhachHang: null,
        NgayBatDau: null,
        NgayKetThuc: null,
        ListResult: [],
        DonHangSelect: null
    };

    $scope.ValidateSearchDonHangTra = {
        NgayKetThucLess: true
    };
    function ResetValue() {
        $scope.StoreType = 1;
        $scope.LoaiChungTu = null;
        $scope.GiaTriThamChieu = [];
        $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
        $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);
        $scope.GiaTriChungTu.Search = null,
        $scope.GiaTriChungTu.Date = null;
        $scope.GeneralInfo.NgayChungTu = null;
        $scope.GeneralInfo.NgayHachToan = null;
        $scope.GeneralInfo.SoChungTu = null;
        $scope.GeneralInfo.DienGiai = null;
        $scope.GeneralInfo.KemTheo = null;
        $scope.GeneralInfo.ChiTiet = null;
        $scope.Detail.ListHangHoa = [];
        $scope.Detail.ListTaiKhoan = [];
        $scope.Detail.ListAdd = [];
        $scope.Detail.SearchHang = [];
        $scope.Detail.ListKho = [];
        $scope.ValidateGeneral.NguoiGiaoHang = true;
        $scope.ValidateGeneral.NgayHachToan = true;
        $scope.ValidateGeneral.NgayChungTu = true;
        $scope.ValidateGeneral.NgayHachToanLess = true;
        $scope.Validate.FromDateThamChieu = true;
        $scope.Validate.ToDateThamChieu = true;
        $scope.Validate.ToDateThamChieuLess = true;
        $scope.Validate.LoaiChungTu = true;
        $scope.Validate.GiaTriChungTu = true;
        $scope.ThamChieu.From = null;
        $scope.ThamChieu.To = null;
        $scope.ThamChieu.ListResult = [];
        $scope.ThamChieu.ListSelect = [];
        $scope.ChungTu.ListThamChieu = [];
        $scope.NguoiGiaoHang.List = [];
        $scope.NguoiGiaoHang.NguoiGiaoHang = null;
        $scope.NguoiGiaoHang.Search = null;
        $scope.NguoiGiaoHang.Ten = null;
    }
    function ResetValueThamChieu() {

    }
    function ResetAfterSave() {
        $scope.GiaTriThamChieu = [];
        $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
        $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);
        $scope.GiaTriChungTu.Search = null,
        $scope.GiaTriChungTu.Date = null;
        $scope.GeneralInfo.NgayChungTu = null;
        $scope.GeneralInfo.NgayHachToan = null;
        $scope.GeneralInfo.SoChungTu = null;
        $scope.GeneralInfo.DienGia = null;
        $scope.GeneralInfo.KemTheo = null;
        $scope.GeneralInfo.ChiTiet = null
        $scope.Detail.ListAdd = [];
        $scope.Detail.SearchHang = [];
        $scope.ValidateGeneral.NguoiGiaoHang = true;
        $scope.ValidateGeneral.NgayHachToan = true;
        $scope.ValidateGeneral.NgayChungTu = true;
        $scope.ValidateGeneral.NgayHachToanLess = true;
        $scope.Validate.FromDateThamChieu = true;
        $scope.Validate.ToDateThamChieu = true;
        $scope.Validate.ToDateThamChieuLess = true;
        $scope.Validate.LoaiChungTu = true;
        $scope.Validate.GiaTriChungTu = true;
        $scope.ThamChieu.From = null;
        $scope.ThamChieu.To = null;
        $scope.ThamChieu.ListResult = [];
        $scope.ThamChieu.ListSelect = [];
        $scope.ChungTu.ListThamChieu = [];
        $scope.NguoiGiaoHang.NguoiGiaoHang = null;
        $scope.NguoiGiaoHang.Search = null;
        $scope.NguoiGiaoHang.Ten = null;

    }


    $scope.KhachHang = {
        KhachHang: [],
        DoiTuong: [],
    };
    $scope.Detail = {
        ListHangHoa: [],
        ListTaiKhoan: [],
        ListAdd: [],
        SearchHang: [],
        ListKho: []
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
  

    function Init() {

        $scope.SearchKH = function (mkh) {
            $http.post(window.location.origin + '/api/Search_KH/Search/' + mkh)
             .then(function (response) {
                 if (typeof (response.data) == "object") {
                     $scope.KhachHang.KhachHang = response.data;
                 }
                 else {
                     ErrorSystem();
                 }
             }, function (error) {
                 console.log(error);
             });
        }

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
        $http({
            method: 'GET',
            url: '/api/Api_NhanvienHL/GetListNhanvien'
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.NguoiGiaoHang.List = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });


        $http({
            method: 'GET',
            url: '/api/Api_XuatNhapKho/GetCTTra'
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.DonHangTra = response.data;
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
    
    $scope.ShowDataNguoiGiaoHang = function () {
        if ($("#DataNguoiGiaoHang").css("display") == "none") {
            $("#DataNguoiGiaoHang").css({ "display": "block" });
        }
        else {
            $("#DataNguoiGiaoHang").css({ "display": "block" });
        }
    }
    $scope.SelectDataGiaTriChungTu = function (item) {
        $scope.GiaTriChungTu.Data = item;
        $scope.GiaTriChungTu.Search = item.tendoituong;
        $("#DataGiaTriChungTu").css({ "display": "none" });
    }
    $scope.SelectDataNguoiGiaoHang = function (item) {
        $scope.NguoiGiaoHang.NguoiGiaoHang = item;
        $scope.NguoiGiaoHang.Search = item.USERNAME;
        $scope.NguoiGiaoHang.Ten = item.HO_VA_TEN;
        $("#DataNguoiGiaoHang").css({ "display": "none" });
    }
    $("#SlectNguoiGiaoHang").focusout(function () {
        $("#DataGiaTriChungTu").css({ "display": "none" });
    });
   
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: null,
            MA_CHUAN: null,
            TEN_HANG: null,
            MA_KHO: null,
            TK_KHO: null,
            DON_GIA: null,
            SO_LUONG: null,
            DVT: null,
            TK_NO: null,
            TK_CO: null,
        });
    }
    $scope.ShowHangHoa = function (index) {
        if ($("#DataHangHoa" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataHangHoa" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    $scope.SelectHangHoa = function (index, item, hanghoa) {
        item.MA_CHUAN = hanghoa.MA_CHUAN;
        item.MA_HANG = hanghoa.MA_HANG;
        item.TEN_HANG = hanghoa.TEN_HANG;
        item.TK_KHO = hanghoa.TK_KHO;
        item.TK_NO = hanghoa.TK_CHI_PHI;
        item.TK_CO = hanghoa.TK_DOANH_THU;
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
    //Khách hàng
    $scope.ShowKhachHang = function () {
        if ($("#KhachHang").css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#KhachHang").css({ "display": "block" });
        }
        else {
            $("#KhachHang").css({ "display": "block" });
        }
    }
    $scope.SelectKhachHang = function (item) {
        $scope.GeneralInfo.DoiTuong = item.MA_KHACH_HANG;
        $scope.GeneralInfo.TenDoiTuong = item.TEN_CONG_TY;
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
        item.MA_KHO = kho.MA_KHO;
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
        if ($scope.NguoiGiaoHang.NguoiGiaoHang == null) {
            $scope.ValidateGeneral.NguoiGiaoHang = false;
            check = false;
        } else {
            $scope.ValidateGeneral.NguoiGiaoHang = true;
            $scope.GeneralInfo.NguoiGiaoHang = $scope.NguoiGiaoHang.NguoiGiaoHang.USERNAME;
        }
        if ($scope.GeneralInfo.NgayChungTu == null || $scope.GeneralInfo.NgayChungTu == "") {
            $scope.ValidateGeneral.NgayChungTu = false;
            check = false;
        } else {
            $scope.ValidateGeneral.NgayChungTu = true;
        }
        if ($scope.GeneralInfo.NgayHachToan == null || $scope.GeneralInfo.NgayHachToan == "") {
            $scope.ValidateGeneral.NgayHachToan = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NgayHachToan = true;
        }
        if ($scope.GeneralInfo.NguoiGiaoHang == null) {
            $scope.ValidateGeneral.NguoiGiaoHang = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NguoiGiaoHang = true;
        }
        if (ConvertToDate($scope.GeneralInfo.NgayHachToan) < ConvertToDate($scope.GeneralInfo.NgayChungTu)) {
            $scope.ValidateGeneral.NgayHachToanLess = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NgayHachToanLess = true;
        }
        return check;
    }
    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveNhapKho = function () {
        if (CheckAll() == false) {
            return;
        }
        var loainhapkho = "";
        if ($scope.StoreType == 1) {
            loainhapkho = "Hàng nhập kho";
        } else if ($scope.StoreType == 2) {
            loainhapkho = "Hàng trả lại";
        }
        else {
            loainhapkho = "Khác";
        }
        $http({
            method: 'POST',
            url: '/api/Api_NhapKho/PostKHO_NHAP_KHO',
            data: {
                SO_CHUNG_TU: $scope.GeneralInfo.SoChungTu,
                NGAY_CHUNG_TU: $scope.GeneralInfo.NgayChungTu,
                NGAY_HACH_TOAN: $scope.GeneralInfo.NgayHachToan,
                DIEN_GIAI: $scope.GeneralInfo.DienGiai,
                ChiTiet: $scope.Detail.ListAdd,
                ThamChieu: $scope.ThamChieu.ListSelect,
                NGUOI_GIAO_HANG: $scope.NguoiGiaoHang.Search,
                MA_DOI_TUONG: $scope.GeneralInfo.DoiTuong,
                DIEN_GIAI: $scope.GeneralInfo.DienGiai,
                LOAI_NHAP_KHO: loainhapkho,
                NGUOI_LAP_PHIEU: a,
                TRUC_THUOC: b,
            }
        }).then(function (response) {
            $scope.datareturn = response.data;
            //response.data = jQuery.parseJSON(response.data);
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
                    text: 'Chứng từ ' + $scope.datareturn + ' đã được tạo',
                    addclass: 'bg-primary'
                });
            }
        }, function (error) {
            ConnectFail();
        });
    }
    function CheckSearchDonHangTra() {
        var check = true;
        $scope.SearchDonHangTra.NgayBatDau = $("#SearchDonHangTra_NgayBatDau").val();
        $scope.SearchDonHangTra.NgayKetThuc = $("#SearchDonHangTra_NgayKetThuc").val();
        if ($scope.SearchDonHangTra.NgayBatDau != null && $scope.SearchDonHangTra.NgayBatDau != "" && $scope.SearchDonHangTra.NgayKetThuc != null && $scope.SearchDonHangTra.NgayKetThuc != "" && ConvertToDate($scope.SearchDonHangTra.NgayBatDau) > ConvertToDate($scope.SearchDonHangTra.NgayKetThuc)) {
            $scope.ValidateSearchDonHangTra.NgayKetThucLess = false;
            check = false;
        }
        else {
            $scope.ValidateSearchDonHangTra.NgayKetThucLess = true;
        }
        return check;
    }
    $scope.SearchDonHangTraSubmit = function () {
        if (CheckSearchDonHangTra() == false) {
            return;
        }

        var data = {
            makh: $scope.SearchDonHangTra.KhachHang,
            tungay: $scope.SearchDonHangTra.NgayBatDau,
            denngay: $scope.SearchDonHangTra.NgayKetThuc

        }
        $http.post('/api/Api_XuatNhapKho/GetCTTraByKhach', data)
         .then(function (response) {
             console.log(response);
             if (typeof (response.data) == "object") {
                 $scope.SearchDonHangTra.ListResult = response.data;
                 if ($scope.SearchDonHangTra.ListResult.length == 0) {
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
    $scope.SelectSearchDonHang = function (item, index) {
        $scope.SearchDonHangTra.DonHangSelect = angular.copy(item);
        $(".SelectSearchDonHang").css({ "background-color": "white" });
        $("#SelectSearchDonHang" + index).css({ "background-color": "rgba(0, 255, 220, 0.31)" });
    }
    $scope.SetSearchDonHangTra = function () {
        $scope.ThamChieu.ListSelect = [];
        $scope.ThamChieu.ListSelect.push($scope.SearchDonHangTra.DonHangSelect);
        $http({
            method: 'GET',
            url: '/api/Api_NhapKho/GetDetailKHO_NHAP_KHO/' + $scope.SearchDonHangTra.DonHangSelect.SO_CHUNG_TU + '/' + macongty
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListAdd = response.data.ctxuatkho;
                $scope.GeneralInfo.DoiTuong = response.data.xuatkho.KHACH_HANG,
                $scope.GeneralInfo.TenDoiTuong = response.data.xuatkho.TEN_KHACH_HANG,
                $scope.GeneralInfo.DienGiai = response.data.xuatkho.LY_DO_XUAT,
                $scope.GeneralInfo.KemTheo = response.data.xuatkho.KEM_THEO
                $scope.LoadHangTra = true;
                $("#SearchDonHangTra").modal("toggle");
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });
    }
    $scope.SelectDonTraHang = function (item) {
        $scope.ThamChieu.ListSelect = [];
        $scope.ThamChieu.ListSelect.push({ SO_CHUNG_TU: item.SO_CHUNG_TU });
        $scope.ThamChieu.TraHang = item.SO_CHUNG_TU;
        $(".tableselect").css({ "display": "none"});
        $http({
            method: 'GET',
            url: '/api/Api_NhapKho/GetDetailKHO_NHAP_KHO/' + item.SO_CHUNG_TU + '/' + macongty
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListAdd = response.data.ctxuatkho;
                $scope.GeneralInfo.DoiTuong = response.data.xuatkho.KHACH_HANG,
                $scope.GeneralInfo.TenDoiTuong = response.data.xuatkho.TEN_KHACH_HANG,
                $scope.GeneralInfo.DienGiai = response.data.xuatkho.LY_DO_XUAT,
                $scope.GeneralInfo.KemTheo = response.data.xuatkho.KEM_THEO
                $scope.LoadHangTra = true;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });
        
    }
    $scope.ShowDonHangTra = function () {
        if ($("#DonTraHang").css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DonTraHang").css({ "display": "block" });
        }
        else {

            $(".tableselect").css({ "display": "none" });
        }
    }


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





});