app.controller('DSPhieuChuyenKhoController', function ($rootScope, $scope, $http, config) {
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
    $scope.DSChuyenKho = {
        From: null,
        To: null,
        ListResult: [],
    };
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

    $scope.SearchPhieuChuyenKho = function (tn, dn) {
        
        var data = {
            tungay: tn.format('DD/MM/YYYY'),
            denngay: dn.format('DD/MM/YYYY')
        }
        $http.post('/api/Api_ChuyenKho/GetKHO_CHUYEN_KHO/' + macongty, data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.DSChuyenKho.ListResult = response.data;
                    if ($scope.DSChuyenKho.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        
    };
    //$scope.SearchPhieuNhapKho();
    
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


    $scope.transfer = function (transfer) {
        $scope.item = transfer;
        $http.get('/api/Api_ChuyenKho/GetCTPhieuChuyenKho/' + $scope.item.SO_CHUNG_TU + '/' + macongty)
            .then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.Detail.ListAdd = response.data;
                    if ($scope.Detail.ListAdd.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });

        
        
    };

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
    $scope.RemoveRow = function (index) {
        $scope.Detail.ListAdd.splice(index, 1);

    }
   
    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveExchange = function () {
        
        $http({
            method: 'PUT',
            url: '/api/Api_ChuyenKho/PutKHO_CHUYEN_KHO',
            data: {
                NGAY_CHUNG_TU: $scope.item.NGAY_CHUNG_TU,
                NGAY_HACH_TOAN: $scope.item.NGAY_HACH_TOAN,
                SO_CHUNG_TU: $scope.item.SO_CHUNG_TU,
                DIEN_GIAI: $scope.item.DIEN_GIAI,
                ChiTiet: $scope.Detail.ListAdd,
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
                    text: 'Chứng từ ' + $scope.datareturn + ' đã được sửa',
                    addclass: 'bg-primary'
                });
            }
        }, function (error) {
            ConnectFail();
        });

    }


    function GetDSChuyenKho() {
        var data = {
            tungay: null,
            denngay: null,
        }
        $http.post('/api/Api_ChuyenKho/GetKHO_CHUYEN_KHO/' + macongty, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.DSChuyenKho.ListResult = response.data;
                        if ($scope.DSChuyenKho.ListResult.length == 0) {
                            Norecord();
                        }
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });
    };
    GetDSChuyenKho();

});