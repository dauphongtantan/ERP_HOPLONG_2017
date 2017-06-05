app.controller('DSPhieuNhapKhoController', function ($rootScope, $scope, $http, config) {

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

    $scope.DSNhapKho = {
        From: null,
        To: null,
        ListResult: [],
    };
    $scope.ValidateSearchDonHangTra = {
        NgayKetThucLess: true
    };
    $scope.phieunhapkho = ['Hàng nhập kho', 'Hàng trả lại', 'Khác'];

    $scope.GiaTriThamChieu = [];
    $scope.LoaiChungTu = null;

    $scope.GiaTriChungTu = {
        Search: null,
        Date: null
    };
    $scope.ThamChieu = {
        From: null,
        To: null,
        ListResult: [],
        ListSelect: [],
        TraHang: null
    };

    $scope.ValidateGeneral = {
        NhanVienBanHang: true,
        NgayHachToan: true,
        NgayChungTu: true,
        NgayHachToanLess: true,
    }
    $scope.Validate = {
        FromDateThamChieu: true,
        ToDateThamChieu: true,
        ToDateThamChieuLess: true,
        LoaiChungTu: true,
        GiaTriChungTu: true

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
    $scope.Detail.ListAdd.push({
            MaHang: null,
            TenHang: null,
            TKKho: null,
            DonGia: null,
            SoLuong: null,
            DVT: null,
            TKNo: null,
            TKCo: null,
            DonGiaVon: null
        });

    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: null,
            MA_CHUAN: null,
            TEN_HANG: null,
            MA_KHO_CON: null,
            TK_KHO: null,
            DON_GIA: null,
            SO_LUONG: null,
            DVT: null,
            TK_NO: null,
            TK_CO: null,
            DON_GIA_VON: null
        });
    }

    $scope.SearchPhieuNhapKho = function (tn, dn) {
        if (tn != null && dn != null)
        {
            if (tn == "" && dn == "")
            {
                tn = "";
                dn = "";
            }
            else
            {
                tn = tn.format('DD/MM/YYYY');
                dn = dn.format('DD/MM/YYYY');
            }
            
        }
        else {
            tn = "";
            dn = "";
        }
        var data = {
            tungay: tn,
            denngay: dn
        }
        $http.post('/api/Api_XuatNhapKho/GetAllDSPhieuNhapKho/' +1 + '/' + macongty, data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.DSNhapKho.ListResult = response.data;
                    if ($scope.DSNhapKho.ListResult.length == 0) {
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
        $http.get('/api/Api_KHO_CT_NHAP_KHO/GetCTPhieuNhapKho/' + $scope.item.SO_CHUNG_TU + '/' + macongty)
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

        $http.get('/api/Api_ThamChieuChungTu/GetThamChieuChungTu/' + $scope.item.SO_CHUNG_TU)
            .then(function (response) {
                $scope.listct = response.data;
                $scope.ThamChieu.ListSelect = [];
                for (i = 0; i < $scope.listct.length; i++) {
                    
                    $scope.ThamChieu.ListSelect.push({
                        SO_CHUNG_TU: $scope.listct[i].SO_CHUNG_TU_THAM_CHIEU,
                    })
                }
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    
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
        item.MA_KHO_CON = hanghoa.TEN_KHO;
        item.TK_HACH_TOAN_KHO = hanghoa.TK_KHO;
        item.TK_NO = hanghoa.TK_CHI_PHI;
        item.TK_CO = hanghoa.TK_DOANH_THU;
        //$scope.Detail.ListAdd[index].SearchHang = $scope.Detail.ListHangHoa[childIndex].MA_HANG;
        //$scope.Detail.ListAdd[index].KhoList = $scope.Detail.ListHangHoa[childIndex].KHO;
        $(".tableselect").css({ "display": "none" });
    };

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
        $(".tableselect").css({ "display": "none" });
    };

    // reset all
    
    //

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
            $http({
                method: 'GET',
                url: '/api/Api_XuatNhapKho/GetAllDoiTuong'
            }).then(function (response) {
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
                ConnectFail();
            });
        }
        else if ($scope.LoaiChungTu == 3) {
            $("#Select_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_MaChungTu").css({ "display": "block" });
            $("#DataGiaTriChungTu").css({ "display": "none" });
            //$http({
            //    method: 'POST',
            //    url: '/api/Api_XuatNhapKho/SearchAllMa/A/A'
            //}).then(function (response) {
            //    if (typeof (response.data) == "object") {
            //        $scope.GiaTriThamChieu = [];
            //        for (var i = 0; i < response.data.length; i++) {
            //            $scope.GiaTriThamChieu.push({
            //                "value": response.data[i].SO_CHUNG_TU,
            //                "show": response.data[i].SO_CHUNG_TU
            //            });
            //        }
            //    }
            //    else {
            //        ErrorSystem();
            //    }
            //}, function (error) {
            //    ConnectFail();
            //});
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




    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveNhapKho = function () {
        
        var loainhapkho = "";
        if ($scope.item.LOAI_NHAP_KHO == 'Hàng nhập kho') {
            loainhapkho = "Hàng nhập kho";
        } else if ($scope.item.LOAI_NHAP_KHO == 'Hàng trả lại') {
            loainhapkho = "Hàng trả lại";
        }
        else {
            loainhapkho = "Khác";
        }
        $http({
            method: 'PUT',
            url: '/api/Api_NhapKho/PutKHO_NHAP_KHO',
            data: {
                SO_CHUNG_TU: $scope.item.SO_CHUNG_TU,
                NGAY_CHUNG_TU: $scope.item.NGAY_CHUNG_TU,
                NGAY_HACH_TOAN: $scope.item.NGAY_HACH_TOAN,
                ChiTiet: $scope.Detail.ListAdd,
                ThamChieu: $scope.ThamChieu.ListSelect,
                NGUOI_GIAO_HANG: $scope.item.NguoiGiaoHang,
                MA_DOI_TUONG: $scope.item.MA_DOI_TUONG,
                DIEN_GIAI: $scope.item.DIEN_GIAI,
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
               
                new PNotify({
                    title: 'Thành công',
                    text: 'Chứng từ ' + $scope.datareturn + ' đã được sửa',
                    addclass: 'bg-primary'
                });
            }
            Loadtranglucdau();
        }, function (error) {
            ConnectFail();
        });

    }

    
    //Phan trang DS Phiếu XK
    function pageClick2(pageNumber) {
        if ($scope.DSNhapKho.From != null && $scope.DSNhapKho.To != null) {
            if ($scope.DSNhapKho.From == "" && $scope.DSNhapKho.To == "") {
                $scope.DSNhapKho.From = "";
                $scope.DSNhapKho.To = "";
            }
            else {
                $scope.DSNhapKho.From = $scope.DSNhapKho.From.format('DD/MM/YYYY');
                $scope.DSNhapKho.To = $scope.DSNhapKho.To.format('DD/MM/YYYY');
            }

        }
        else {
            $scope.DSNhapKho.From = "";
            $scope.DSNhapKho.To = "";
        }
        $("#page-number-2").text(pageNumber);
            var data = {
                tungay: $scope.DSNhapKho.From,
                denngay: $scope.DSNhapKho.To
            }
        $http.post('/api/Api_XuatNhapKho/GetAllDSPhieuNhapKho/' + pageNumber + '/' + macongty, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.DSNhapKho.ListResult = response.data;
                        if ($scope.DSNhapKho.ListResult.length == 0) {
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
    var itemsCount = 2000;
    var itemsOnPage = 10;


    var pagination2 = new Pagination({
        container: $("#pagination-2"),
        pageClickCallback: pageClick2,
        maxVisibleElements: 16,
        showInput: true,
        inputTitle: "Go to page"
    });
    pagination2.make(itemsCount, itemsOnPage);
    //End phan trang DS Phiếu XK


    function Loadtranglucdau() {
        var data = {
            tungay: "",
            denngay: "",
        }
        $http.post('/api/Api_XuatNhapKho/GetAllDSPhieuNhapKho/' + 1 + '/' + macongty, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.DSNhapKho.ListResult = response.data;
                        if ($scope.DSNhapKho.ListResult.length == 0) {
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
    Loadtranglucdau();

});