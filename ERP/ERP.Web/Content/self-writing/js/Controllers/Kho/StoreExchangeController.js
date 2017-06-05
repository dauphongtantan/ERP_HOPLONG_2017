
app.controller('StoreExchangeController', function ($rootScope, $scope, $http, config) {
    $rootScope.title = "Chuyển kho";
    $rootScope.dashboard = false;
    $scope.TitleChuyenKho = "Chuyển kho giữ hàng";
    $scope.StoreStype = 1;
    $scope.ChuyenKho = {
        DienGia: null,
        NgayHachToan: null,
        NgayChungTu: null,
        ChiTiet: [],
        TenChungTu: null
    };

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




    $('.datetimepicker').daterangepicker({
        singleDatePicker: true,
        calender_style: "picker_2"
    }, function (start, end, label) {
        $(this).val($(this).val);
    });
    $scope.ValidateGeneral = {
        NgayHachToan: true,
        NgayChungTu: true,
        NgayHachToanLess: true
    };
    $scope.StoreChange = function (value) {
        $scope.StoreStype = value;
        if ($scope.StoreStype == 1) {
            $scope.TitleChuyenKho = "Chuyển kho giữ hàng";
        }
        else if ($scope.StoreStype == 2) {
            $scope.TitleChuyenKho = "Chuyển kho ký gửi";
        }
        else {
            $scope.TitleChuyenKho = "Chuyển kho khác";
        }
    }
    function Init() {

        //$http({
        //    method: 'GET',
        //    url: '/HangHoa/GetAllWithTon'
        //}).then(function (response) {
        //    if (typeof (response.data) == "object") {
        //        $scope.Detail.ListHangHoa = response.data;
        //    }
        //    else {
        //        ErrorSystem();
        //    }
        //}, function (error) {
        //    ConnectFail();
        //});

        $http({
            method: 'GET',
            url: '/Kho/GetAll'
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

    }
    Init();
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: null,
            TEN_HANG: null,
            XUAT_TAI_KHO: null,
            NHAP_TAI_KHO: null,
            DVT: null,
            SOLUONG: null,
        });
    }
    $scope.ShowHangHoa = function (index) {
        if ($("#DataHangHoa" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataHangHoa" + index).css({ "display": "block" });
        } else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    $scope.ShowKhoXuat = function (index) {
        if ($("#DataKhoXuat" + index).css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataKhoXuat" + index).css({ "display": "block" });

        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    $scope.ShowKhoNhap = function (index) {
        if ($("#DataKhoNhap" + index).css("display") == "none") {

            $(".tableselect").css({ "display": "none" });
            $("#DataKhoNhap" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    $scope.SelectHangHoa = function (hindex, index, item, itemHangHoa) {
        item.MA_HANG = itemHangHoa.MA_HANG;
        item.TEN_HANG = itemHangHoa.TEN_HANG;
        $(".tableselect").css({ "display": "none" });

    }
    $scope.SelectKhoXuat = function (index, item, itemKho) {
        item.XUAT_TAI_KHO = itemKho.MA_KHO;
        $(".tableselect").css({ "display": "none" });
    }
    $scope.SelectKhoNhap = function (index, item, itemKho) {
        item.NHAP_TAI_KHO = itemKho.MA_KHO;
        $(".tableselect").css({ "display": "none" });
    }
    function CheckSave() {
        var check = true;
        $scope.ChuyenKho.NgayHachToan = $("#NgayHachToan").val();
        $scope.ChuyenKho.NgayChungTu = $("#NgayChungTu").val();
        if ($scope.ChuyenKho.NgayHachToan == null || $scope.ChuyenKho.NgayHachToan == "") {
            $scope.ValidateGeneral.NgayHachToan = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NgayHachToan = true;
        }
        if ($scope.ChuyenKho.NgayChungTu == null || $scope.ChuyenKho.NgayChungTu == "") {
            $scope.ValidateGeneral.NgayChungTu = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NgayChungTu = true;
        }
        if ($scope.ValidateGeneral.NgayChungTu == true && $scope.ValidateGeneral.NgayHachToan == true && ConvertToDate($scope.ChuyenKho.NgayHachToan) < ConvertToDate($scope.ChuyenKho.NgayChungTu)) {
            $scope.ValidateGeneral.NgayHachToanLess = false;
            check = false;
        }
        else {
            $scope.ValidateGeneral.NgayHachToanLess = true;
        }
        return check;
    }
    $scope.SaveExchange = function () {
        if (CheckSave() == false) {
            return;
        }
        console.log($scope.Detail.ListAdd);
        $http({
            method: 'POST',
            url: '/Kho/SaveChuyenKho',
            data: {
                NGAY_CHUNG_TU: $scope.ChuyenKho.NgayChungTu,
                NGAY_HACH_TOAN: $scope.ChuyenKho.NgayHachToan,
                DIEN_GIAI: $scope.ChuyenKho.DienGiai,
                ChiTiet: $scope.Detail.ListAdd,
                LOAI_NHAP_KHO: $scope.TitleChuyenKho
            }
        }).then(function (response) {
            response.data = jQuery.parseJSON(response.data);
            if (response.data == config.INPUT_ERROR) {
                InputFail();
            }
            else if (response.data == config.FAIL) {
                ErrorSystem();
            }
            else {
                new PNotify({
                    title: 'Thành công',
                    text: 'Chứng từ '+response.data+' đã được tạo',
                    addclass: 'bg-primary'
                });
                $scope.ChuyenKho.NgayHachToan = null;
                $scope.ChuyenKho.NgayChungTu = null;
                $("#NgayHachToan").val("");
                $("#NgayChungTu").val("");
                $scope.ChuyenKho.ChiTiet = [];
                $scope.ChuyenKho.TenChungTu = null;
                $scope.Detail.ListHangHoa = [];
                $scope.Detail.ListTaiKhoan = [];
                $scope.Detail.ListAdd = [];
                $scope.Detail.SearchHang = [];
                $scope.ChuyenKho.DienGiai = null;
                $http({
                    method: 'GET',
                    url: '/HangHoa/GetAllWithTon'
                }).then(function (response) {
                    if (typeof (response.data) == "object") {
                        $scope.Detail.ListHangHoa = response.data;
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });
            }
        }, function (error) {
            ConnectFail();
        });
    }
});