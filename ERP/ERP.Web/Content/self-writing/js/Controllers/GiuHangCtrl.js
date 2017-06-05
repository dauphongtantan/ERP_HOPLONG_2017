
app.controller('GiuHangHopLongCtrl', function ($scope, $http) {

    $scope.KhachHang = {
        KhachHang: [],
        DoiTuong: [],
    };
    $scope.GeneralInfo = {
        KhachHang: null,
        TenDoiTuong: null,
        ngay_giu: null,
        NhanVienBanHang: null,
        Username: null

    };
    $scope.Detail = {
        ListAdd: [],
        ListGiuHang: []
    }
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_CHUAN: null,
            MA_HANG: null,
            SL_GIU: null,
            NGAY_XUAT: null,
            GIU_PO: false,
            GHI_CHU: null
            
        });
    }
    function ResetAfterSave() {
        
        $scope.GeneralInfo.KhachHang = null,
        $scope.GeneralInfo.ngay_giu = null,
       $scope.GeneralInfo.TenDoiTuong = null,
        $scope.Detail.ListGiuHang = [],
        $scope.Detail.ListAdd = []

    }

    var macongty = $("#macongty").val();

    //=====Get data giữ hàng=================
    $scope.GetDataGiuHang= function()
    {
        $http.get(window.location.origin + '/api/Api_KhoGiuHang/GetAllListDataGiuKho/' + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.ListDataGiuKho = response.data;
             }
         }, function (error) {
             console.log(error);
         });
    }
    $scope.GetDataGiuHang();
    //----------------------------------------

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

        //Lấy dữ liệu nhân viên hợp long
        $http.get("http://27.72.144.148:8003/api/NhanVien/GetAllNhanVien/HOPLONG")
            .then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.NhanVien = response.data;
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        //-------------------------------
    }
    Init();
    
    //Khách hàng
    $scope.ShowKhachHang = function () {
        if ($("#KhachHang").css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#KhachHang").css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }
    $scope.SelectKhachHang = function (item) {
        $scope.GeneralInfo.KhachHang = item.MA_KHACH_HANG;
        $scope.GeneralInfo.TenDoiTuong = item.TEN_CONG_TY;
        $(".tableselect").css({ "display": "none" });
    }
   // hàng hóa
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

    //nhân viên
    $scope.ShowDataNhanVien = function () {
        if ($("#DataNhanVien").css("display") == "none") {
            $(".tableselect").css({ "display": "none" });
            $("#DataNhanVien").css({ "display": "block" });
        }
        else {
            $(".tableselect").css({ "display": "none" });
        }
    }

    $scope.SelectDataNhanVien = function (item) {
        $scope.GeneralInfo.NhanVienBanHang = item.HO_VA_TEN;
        $scope.GeneralInfo.Username = item.USERNAME;
        $(".tableselect").css({ "display": "none" });
    }
    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveGiuHang = function () {
        
        

        //for (i = 0; i < $scope.Detail.ListAdd.length; i++)
        //{
        //    $scope.Detail.ListGiuHang.push({
        //        SALES_GIU: $scope.GeneralInfo.Username,
        //        MA_KHACH_HANG :  $scope.GeneralInfo.KhachHang,
        //        NGAY_GIU: $scope.GeneralInfo.ngay_giu.format('DD/MM/YYYY'),
        //        TRUC_THUOC: b,
        //        MA_HANG  : $scope.Detail.ListAdd[i].MA_HANG,
        //        SL_GIU : $scope.Detail.ListAdd[i].SL_GIU,
        //        NGAY_XUAT : $scope.Detail.ListAdd[i].NGAY_XUAT.format('DD/MM/YYYY'),
        //        GIU_PO : $scope.Detail.ListAdd[i].GIU_PO,
        //        GHI_CHU : $scope.Detail.ListAdd[i].GHI_CHU
        //    })
        //}
        var data = {
            SALES_GIU: $scope.GeneralInfo.Username,
            MA_KHACH_HANG :  $scope.GeneralInfo.KhachHang,
            NGAY_GIU: $scope.GeneralInfo.ngay_giu.format('DD/MM/YYYY'),
            TRUC_THUOC: b,
            MA_HANG  : $scope.Detail.ListAdd[i].MA_HANG,
            SL_GIU : $scope.Detail.ListAdd[i].SL_GIU,
            NGAY_XUAT : $scope.Detail.ListAdd[i].NGAY_XUAT.format('DD/MM/YYYY'),
            GIU_PO : $scope.Detail.ListAdd[i].GIU_PO,
            GHI_CHU : $scope.Detail.ListAdd[i].GHI_CHU
            
        }

        $http.post("/api/Api_KHO_GIU_HANG/PostKHO_GIU_HANG", data).then(function (response) {
            //console.log(response);
            $scope.datareturn = response.data;
            //response.data = jQuery.parseJSON(response.data);
            if (response.data == null) {
                InputFail();
            }
            else {
                ResetAfterSave();
                new PNotify({
                    title: 'Thành công',
                    addclass: 'bg-primary'
                });
                $scope.GetDataGiuHang();
            }
        }, function (error) {
            ConnectFail();
        });
    }
});

