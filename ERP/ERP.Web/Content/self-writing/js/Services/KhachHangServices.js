// Khach hang
app.service('khachhangService', function ($http) {

    this.phantrangkh = function (sotrang) {
        return $http.post("/api/Api_KH/PhantrangKH/" + sotrang).then(function (response) {
            return response.data;
        });
    };


    this.get_khachhang = function (page,thongtintimkiem) {
        return $http.post('/api/Api_KH/KH_THEO_SALES/'+page, thongtintimkiem).then(function (response) {
            return response.data;
        });
    };

    this.Loc_KH = function (page,thongtintimkiem) {
        return $http.post('/api/Api_KH/LOC_KH/'+page, thongtintimkiem).then(function (response) {
            return response.data;
        });
    };
    this.get_phanloaikhach = function () {
        return $http.get('/api/Api_LoaiKH').then(function (response) {
            return response.data;
        });
    };
    this.get_lienhekh = function (makh) {
        return $http.post('/api/Api_LienHeKhachHang/' + makh).then(function (response) {
            return response.data;
        });
    };
    this.get_nhanvienkd = function () {
        return $http.get('/api/Api_NhanvienKD').then(function (response) {
            return response.data;
        });
    };
    this.get_phanhoi = function (makh) {
        return $http.get('/api/Api_PhanHoiKhachHang/GetKhachHanghl/' + makh).then(function (response) {
            return response.data;
        });
    };
    this.get_taikhoankh = function (makh) {
        return $http.get('/api/Api_TaiKhoanKH/' + makh).then(function (response) {
            return response.data;
        });
    };

    this.get_loaitk = function () {
        return $http.get('/api/Api_LoaiTaiKhoan').then(function (response) {
            return response.data;
        });
    };

    this.get_danhsachlienhe = function () {
        return $http.get('/api/Api_ListLienHeKH').then(function (response) {
            return response.data;
        });
    };

    //this.get_thongke_muahang = function (makh) {
    //    return $http.post('/api/Api_KH/ThongKeMuaHang/' + makh).then(function (response) {
    //        return response.data;
    //    });
    //};

    this.add_phanloaikh = function (phanloaikh_add) {
        return $http.post('/api/Api_PhanLoaiKH/PostKH_PHAN_LOAI_KHACH', phanloaikh_add);
    };

    this.save_khachhang = function (id, kh_save) {
        return $http.put('/api/Api_KH/' + id, kh_save);
    };
    this.save_phanloaikh = function (id, phanloai_save) {
        return $http.put('/api/Api_PhanLoaiKH/' + id, phanloai_save);
    };

    this.save_lienhe = function (idlienhe, data_save) {
        return $http.put('/api/Api_LienHeKhachHang/' + idlienhe, data_save);
    };

    this.add_lienhe = function (data_add) {
        return $http.post('/api/Api_LienHeKhachHang', data_add);
    };

    this.add_taikhoan = function (data_add) {
        return $http.post('/api/Api_TaiKhoanKH', data_add);
    };

    this.get_lastmakhach = function () {
        return $http.get('/api/Api_KH/GetIdKH').then(function (response) {
            return response.data;
        });
    };

    this.save_salesphutrach = function (idlienhe, data_savesalesphutrach) {
        return $http.put('/api/Api_SalePhuTrach/EditSalePhuTrach/' + idlienhe, data_savesalesphutrach);
    };

    this.add_saletao = function (data_add) {
        return $http.post('/api/Api_ChuyenSale', data_add);
    };

    this.add_phanhoi = function (data_add) {
        return $http.post('/api/Api_PhanHoiKhachHang', data_add);
    };

    this.save_listchuyensale = function (data_save) {
        return $http.post('/api/Api_PhanLoaiKH/XuLyChyenSale', data_save);
    };

    this.chitietkhachhang = function (makh,macongty) {
        return $http.get('/api/Api_KH/GetCT_KH/' + makh + '/' + macongty).then(function (response) {
            return response.data;
        });
    };


    //LẤY POLICY KHÁCH HÀNG
    this.get_kh_policy = function (makh) {
        return $http.get('/api/Api_KhachHangPolicy/' + makh).then(function (response) {
            return response.data;
        });
    };
    this.save_kh_policy = function (id, data_save) {
        return $http.put("/api/Api_KhachHangPolicy/PutKH_POLICY/" + id, data_save);
    };

    this.add_kh_policy = function (data_add) {
        return $http.post("/api/Api_KhachHangPolicy", data_add);
    };
    this.delete_phanhoi = function (id) {
        return $http.delete('/api/Api_PhanHoiKhachHang/' + id);
    }
});
//end khach hang