app.controller('KhoXuatController', function ($scope, $http) {
    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();
    var macongty = $('#macongty').val();
    function init() {
        //Get List Hàng cần đặt
        $scope.lisHangCanDat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetHangCanDat/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.lisHangCanDat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List Bán hàng
        $scope.ListBanHang = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetListBanHang/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHang = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        ////Get List Xuất hàng
        //$scope.ListXuatHang = [];
        //$http.post(window.location.origin + '/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username+ '/' + macongty)
        //.then(function (response) {
        //    if (response.data) {
        //        $scope.ListXuatHang = response.data;
        //    }
        //}, function (error) {
        //    console.log(error);
        //});
        //Get List bán hàng chưa xuất
        $scope.ListBanHangChuaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_CHUA_XUAT/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangChuaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List bán hàng đã xuất
        $scope.ListBanHangDaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_DA_XUAT/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangDaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng cần xuất
        $scope.GetDataHangCanXuat = function()
        {
            var username = $('#username').val();
            $scope.ListHangCanXuat = [];
            $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CAN_XUAT/' + IsAdmin + '/' + Username + '/' + macongty)
            .then(function (response) {
                if (response.data) {
                    $scope.ListHangCanXuat = response.data;
                }
            }, function (error) {
                console.log(error);
            });
        }
        $scope.GetDataHangCanXuat();
        //Get List hàng giữ
        var username = $('#username').val();
        $scope.ListHangGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng chưa giữ
        var username = $('#username').val();
        $scope.ListHangChuaGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CHUA_GIU/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangChuaGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ chưa bán
        var username = $('#username').val();
        $scope.ListHangGiuChuaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_CHUA_BAN/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuChuaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ đã bán
        var username = $('#username').val();
        $scope.ListHangGiuDaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_DA_BAN/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuDaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ quá ngày giao hàng
        var username = $('#username').val();
        $scope.ListHangGiuQuaNgayGiao = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_QUA_NGAY_GIAO/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuQuaNgayGiao = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ sắp đến ngày xuất
        var username = $('#username').val();
        $scope.ListHangGiuSapDenNgayXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_SAP_DEN_NGAY_XUAT/' + IsAdmin + '/' + Username + '/' + macongty)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuSapDenNgayXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
    }
    init();

    $scope.DanLink = function (item) {
        window.location = '/KinhDoanh/DonHangPO/Details/' + item;
    }
    $scope.DanLinkXuatKho = function (item) {
        window.location = '/Inventory/KhoXuat/DetailXuatKho/' + item;
    }

    $scope.chuyenmakho = function (makho) {
        $scope.MA_KHO_TON = makho;
        //console.log($scope.MA_KHO_TON);
    };


    $scope.GiuHang = function (id,mahang,dvt,soluong) {
        //$scope.MA_KHO_TON = makhotang2;
        var dl = {
            MA_HANG :mahang,
            MA_KHO_CON :$scope.MA_KHO_TON,
            NHAP_TAI_KHO:'IVHOPLONG05',
            DVT : dvt,
            SO_LUONG :soluong
        }
        $scope.ListChiTiet = [];
        $scope.ListChiTiet.push(dl);
        console.log($scope.MA_KHO_TON, mahang, dvt, soluong);
        var data = {
            NGUOI_LAP_PHIEU: Username,
            TRUC_THUOC: macongty,
            DIEN_GIAI:'Chuyển kho giữ hàng',
            ChiTiet:  $scope.ListChiTiet
        }
        console.log(data);
        $http.post(window.location.origin + '/api/Api_ChuyenKho/ChuyenKhoGiuHang/'+id,data)
        .then(function (response) {
            if (response.data) {
                $scope.GetDataHangCanXuat();
                SuccessSystem(response.data);

            }
        }, function (error) {
            console.log(error);
           ErrorSystem(error);
        });
    };

    $scope.candathang = function (id) {
        $http.post(window.location.origin + '/api/Api_KhoXuat/CanDatHang/' + id)
        .then(function (response) {
            if (response.data) {
                $scope.GetDataHangCanXuat();
                SuccessSystem(response.data);

            }
        }, function (error) {
            console.log(error);
            ErrorSystem(error);
        });
    };

    $scope.AddToKhoDat = function(item)
    {
        $scope.item = item;

        var data = {
            ID_CT_PO: $scope.item.ID_DON_CHI_TIET,
            MA_HANG: $scope.item.MA_HANG,
            SL_DAT: $scope.item.SO_LUONG - $scope.item.SL_DA_GIU,
            NGAY_XUAT: $scope.item.NGAY_GIAO_HANG,
            NGUOI_GIU: $scope.item.NHAN_VIEN_QUAN_LY,
        }
        $http.post('/api/Api_HangCanDat/ThemHangCanDat', data).then(function (response) {
            $scope.GetDataHangCanXuat();
        });
    }

    // truyền về list xuất hàng
    $scope.GeneralInfo = {
        NgayChungTu: null,
        NgayHachToan: null,
        KhachHang: null,
        DienGiai: null,
        KemTheo: null,
        ChiTiet: null,
        TenDoiTuong: null,
        MST: null,
        Email: null,
        SDT: null,
        Fax: null,
        NhanVienBanHang: null,
        DiaChi: null,
        TuKhoa: null,
        Ngay: null,
        

    };
   
    $scope.Detail = {
        ListAdd: []
    }



 
    $scope.SearchPhieuXuatKho = function (tukhoa, ngay) {
        if (ngay == false) {
            ngay = null;
        }
       
        if (tukhoa == null && ngay != null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay.format('DD/MM/YYYY')
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa != null && ngay == null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay,
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa != null && ngay != null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay.format('DD/MM/YYYY')
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa == null && ngay == null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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

    
    $scope.SelectList = function (item) {
        $(".tableselect").css({ "display": "none" });

        $http({
            method: 'GET',
            url: '/api/Api_NhapKho/GetDetailKHO_NHAP_KHO/' + item.SO_CHUNG_TU + '/' + macongty
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListAdd = response.data.ctxuatkho;
                $scope.GeneralInfo.KhachHang = response.data.xuatkho.KHACH_HANG,
                $scope.GeneralInfo.TenDoiTuong = response.data.xuatkho.TEN_CONG_TY,
                $scope.GeneralInfo.NgayHachToan = response.data.xuatkho.NGAY_HACH_TOAN,
                $scope.GeneralInfo.NgayChungTu = response.data.xuatkho.NGAY_CHUNG_TU,
                $scope.GeneralInfo.DiaChi = response.data.xuatkho.DIA_CHI_XUAT_HOA_DON,
                $scope.GeneralInfo.MST = response.data.xuatkho.MST,
                $scope.GeneralInfo.Email = response.data.xuatkho.EMAIL,
                $scope.GeneralInfo.SDT = response.data.xuatkho.HOTLINE,
                $scope.GeneralInfo.Fax = response.data.xuatkho.FAX,
                $scope.GeneralInfo.DienGiai = response.data.xuatkho.LY_DO_XUAT,
                $scope.GeneralInfo.NhanVienBanHang = response.data.xuatkho.HO_VA_TEN
                $scope.LoadHangTra = true;

            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });


    }

    function GetDSXuatHang() {
        var data = {
            tukhoa: null,
            ngay: null,

        }
        $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
    GetDSXuatHang();


    //Giữ hàng
    $scope.MANG_KHO = [];
    $scope.chuyenmakho01 = function (tontang1, item) {
        if (tontang1 == true) {
            $scope.MANG_KHO.push({
                MA_KHO: 'IVHOPLONG01',
                TON_TANG_2: item.TON_TANG_2,
                TON_TANG_3: 0,
                TON_TANG_4: 0,
            })
        }

    };
    $scope.chuyenmakho02 = function (tontang2,item) {
        if (tontang2 == true) {
            $scope.MANG_KHO.push({
                MA_KHO: 'IVHOPLONG02',
                TON_TANG_2: 0,
                TON_TANG_3: item.TON_TANG_3,
                TON_TANG_4:0,
            })
        }

    };
    $scope.chuyenmakho03 = function (tontang3,item) {
        if (tontang3 == true) {
            $scope.MANG_KHO.push({
                MA_KHO: 'IVHOPLONG03',
                TON_TANG_2: 0,
                TON_TANG_3: 0,
                TON_TANG_4: item.TON_TANG_4,
            })
        }

    };
    


    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.GiuHang = function (item) {
        var soluongtong = 0;
        $scope.item = item;
        for (i = 0; i < $scope.MANG_KHO.length; i++)
        {
            soluongtong = $scope.MANG_KHO[i].TON_TANG_2 + $scope.MANG_KHO[i].TON_TANG_3 + $scope.MANG_KHO[i].TON_TANG_4 + soluongtong;
        }
        $scope.soluongtong = soluongtong;
        if (($scope.item.SO_LUONG-$scope.item.SL_DA_GIU) < $scope.soluongtong) {
            var soluong = $scope.item.SO_LUONG - $scope.item.SL_DA_GIU;
        } else {
            var soluong = $scope.soluongtong;
        }
        var data = {
            SALES_GIU: $scope.item.NHAN_VIEN_QUAN_LY,
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            TRUC_THUOC: b,
            MA_HANG: $scope.item.MA_HANG,
            SL_GIU: soluong,
            SL_GIU_GOC : $scope.item.SO_LUONG,
            GIU_PO: true,
            ID_CT_PO: $scope.item.ID_DON_CHI_TIET,
            MA_SO_PO: $scope.item.MA_SO_PO,
            TonKho: $scope.MANG_KHO,
            SL_DA_GIU: $scope.item.SL_DA_GIU
        }

        $http.post("/api/Api_KHO_GIU_HANG/PostKHO_GIU_HANG1", data).then(function (response) {
            //console.log(response);
            $scope.datareturn = response.data;
            //response.data = jQuery.parseJSON(response.data);
            if (response.data == null) {
                InputFail();
            }
            else {
                new PNotify({
                    title: 'Thành công',
                    addclass: 'bg-primary'
                });
                $scope.GetDataHangCanXuat();
            }
        }, function (error) {
            ConnectFail();
        });
    }



});

app.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd/MM/yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})