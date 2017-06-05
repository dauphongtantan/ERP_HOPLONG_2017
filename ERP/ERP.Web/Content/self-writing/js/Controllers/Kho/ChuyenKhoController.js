
app.controller('StoreExchangeController', function ($rootScope, $scope, $http, config) {

    var macongty = $('#macongty').val();

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
    $scope.Detail = {
        ListHangHoa: [],
        ListTaiKhoan: [],
        ListAdd: [],
        SearchHang: [],
        ListKho: []
    }
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
    function ResetAfterSave() {
       
        $("#NgayHachToan").val("");
        $("#NgayChungTu").val("");
        $scope.ChuyenKho.ChiTiet = [];
        $scope.ChuyenKho.TenChungTu = null;
        $scope.Detail.ListHangHoa = [];
        $scope.Detail.ListTaiKhoan = [];
        $scope.Detail.ListAdd = [];
        $scope.Detail.SearchHang = [];
        $scope.ChuyenKho.DienGiai = null;
    }
    function Init() {
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

    }
    Init();
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_CHUAN: null,
            TEN_HANG: null,
            MA_KHO_CON: null,
            NHAP_TAI_KHO: null,
            DVT: null,
            SOLUONG: null,
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
        item.TEN_KHO = hanghoa.TEN_KHO;
        item.MA_KHO_CON = hanghoa.MA_KHO_CON;
        item.DVT = hanghoa.DVT
        
        //$scope.Detail.ListAdd[index].SearchHang = $scope.Detail.ListHangHoa[childIndex].MA_HANG;
        //$scope.Detail.ListAdd[index].KhoList = $scope.Detail.ListHangHoa[childIndex].KHO;
        $(".tableselect").css({ "display": "none" });
    };
    
    $scope.ShowKhoNhap = function (index) {
        if ($("#DataKhoNhap" + index).css("display") == "none") {

            $(".tableselect").css({ "display": "none" });
            $("#DataKhoNhap" + index).css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    
   
    $scope.SelectKhoNhap = function (index, item, itemKho) {
        item.TEN_KHO_NHAP = itemKho.TEN_KHO;
        item.NHAP_TAI_KHO = itemKho.MA_KHO;
        $(".tableselect").css({ "display": "none" });
    }


    $(function () {

        $('#NgayHachToan').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
        $('#NgayChungTu').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            sideBySide: true
        });
    });
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
    $scope.RemoveRow = function (index) {
        $scope.Detail.ListAdd.splice(index, 1);

    }
    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveExchange = function () {
        if (CheckSave() == false) {
            return;
        }
        console.log($scope.Detail.ListAdd);
        $http({
            method: 'POST',
            url: '/api/Api_ChuyenKho/PostKHO_CHUYEN_KHO',
            data: {
                NGAY_CHUNG_TU: $scope.ChuyenKho.NgayChungTu,
                NGAY_HACH_TOAN: $scope.ChuyenKho.NgayHachToan,
                DIEN_GIAI: $scope.ChuyenKho.DienGiai,
                ChiTiet: $scope.Detail.ListAdd,
                LOAI_NHAP_KHO: $scope.TitleChuyenKho,
                NGUOI_LAP_PHIEU: a,
                TRUC_THUOC: b
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
});