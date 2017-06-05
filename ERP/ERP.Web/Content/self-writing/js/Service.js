
var macongty = $('#macongty').val();

app.service('giamdocService', function ($http) {
    this.get_giamdoc = function (username) {
        return $http.get("/api/Api_ChiTietNhanVien/" + username).then(function (response) {
            return response.data;
        });
    }
});





app.service('NhomvthhService', function ($http) {
    this.get_hangsp = function () {
        return $http.get("/api/Api_NhomVTHHHL").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_NhomVTHHHL/", data_add);
    };

    this.save = function (hangsp, data_update) {
        return $http.put("/api/Api_NhomVTHHHL/" + hangsp, data_update);
    }

    this.delete = function (hangsp, data_delete) {
        return $http.delete("/api/Api_NhomVTHHHL/" + hangsp, data_delete);
    }

});


app.service('khoService', function ($http) {
    this.get_kho = function (macongty) {
        return $http.get("/api/Api_KhoHL/" + macongty).then(function (response) {
            return response.data;
        });
    };
    this.add = function (data_add) {
        return $http.post("/api/Api_KhoHL", data_add);
    };

    this.save = function (makho, data_update) {
        return $http.put("/api/Api_KhoHL/" + makho, data_update);
    };

    this.delete = function (makho, data_delete) {
        return $http.delete("/api/Api_KhoHL/" + makho, data_delete);
    };
});

app.service('userService', function ($http) {
    this.get_user = function (macongty) {
        return $http.get("/api/Api_NguoidungHL/" + macongty).then(function (response) {
            return response.data;
        });
    };
    this.add = function (data_add) {
        return $http.post("/api/Api_NguoidungHL", data_add);
    };
    this.add_nhanvien = function (nhanvien_add) {
        return $http.post("/api/Api_NhanvienHL", nhanvien_add);
    };

    this.save = function (username, data_update) {
        return $http.put("/api/Api_NguoidungHL/" + username, data_update);
    };

    this.save_nhanvien = function (username, nhanvien_update) {
        return $http.put("/api/Api_NhanvienHL/" + username, nhanvien_update);
    };
});

app.service('nhanvienService', function ($http) {
    this.get_nhanvien = function (username) {
        return $http.get("/api/Api_ChiTietNhanVien/" + username).then(function (response) {
            return response.data;
        });
    };
});

app.service('phongbanService', function ($http) {
    this.get_phongban = function (macongty) {
        return $http.get("/api/Api_PhongbanHL/" + macongty).then(function (response) {
            return response.data;
        });
    };
    this.save = function (maphongban, data_update) {
        return $http.put("/api/Api_PhongbanHL/" + maphongban, data_update);
    };

    this.delete = function (maphongban, data_delete) {
        return $http.delete("/api/Api_PhongbanHL/" + maphongban, data_delete);
    };
});

app.service('nhanvienphongbanService', function ($http) {
    this.get_nhanvien = function (maphongban) {
        return $http.get("/api/Api_NhanvienphongbanHL/" + maphongban).then(function (response) {
            return response.data;
        });
    };
});

app.service('taikhoanService', function ($http) {
    this.get_taikhoan = function () {
        return $http.get("/api/Api_TaiKhoanHachToan").then(function (response) {
            return response.data;
        });
    };
    this.add = function (data_add) {
        return $http.post("/api/Api_TaiKhoanHachToan", data_add);
    };

    this.save = function (sotk, data_update) {
        return $http.put("/api/Api_TaiKhoanHachToan/" + sotk, data_update);
    }

    this.delete = function (sotk, data_delete) {
        return $http.delete("/api/Api_TaiKhoanHachToan/" + sotk, data_delete);
    }
});

app.service('danhmucService', function ($http) {
    this.get_danhmuc = function () {
        return $http.get("/api/Api_Categories").then(function (response) {
            return response.data;
        });
    };
    this.add_danhmuc = function (data_add) {
        return $http.post("/api/Api_Post", data_add);
    };

    this.add_postcategories = function (postcate) {
        return $http.post("/api/Api_POST_CATEGORIES", postcate);
    };

    this.get_post = function (madanhmuc) {
        return $http.get("/api/Api_POST_CATEGORIES/" + madanhmuc).then(function (response) {
            return response.data;
        });
    };
});



app.service('userdetailService', function ($http) {
    this.get_details = function (username) {
        return $http.get('/api/Api_ChiTietNhanVien/' + username).then(function (response) {
            return response.data;
        });
    };

    this.save_pw = function (username, oldpw, data_save) {
        return $http.put('/api/DoiMatKhau/' + username + '/' + oldpw, data_save);
    };

    this.get_user = function () {
        return $http.get("/api/Api_NguoidungHL").then(function (response) {
            return response.data;
        });
    };

    this.edit_image = function (username, data_add) {
        return $http.put("/api/Api_SuaAnhCaNhan/" + username, data_add);
    };
});

app.service('bangchamcongService', function ($http) {
    this.get_chamcong = function (username) {
        return $http.get('/api/Api_BangChamCong/' + username).then(function (response) {
            return response.data;
        });
    };
});

app.service('bangluongService', function ($http) {
    this.get_bangluong = function (username) {
        return $http.get('/api/Api_BangLuong/' + username).then(function (response) {
            return response.data;
        });
    };
});

app.service('addmenuService', function ($http) {
    this.add_menu = function (data_add) {
        return $http.post('/api/Api_Menu', data_add);
    }

    this.get_menu = function () {
        return $http.get('/api/Api_Menu').then(function (response) {
            return response.data;
        });
    };

    this.save_menu = function (mamenu, datasave) {
        return $http.put('/api/Api_Menu/' + mamenu, datasave);
    };

    this.delete_menu = function (mamenu, data_delete) {
        return $http.delete('/api/Api_Menu/' + mamenu, data_delete);
    };
});

app.service('tonghopnvService', function ($http) {
    this.get_tonghop = function (macongty) {
        return $http.get('/api/Api_TongHopNhanVien/GetNhanVien/' + macongty).then(function (response) {
            return response.data;
        });
    };
});

app.service('dsnghiepvuService', function ($http) {
    this.get_dsnghiepvu = function (id_menu) {
        return $http.get('/api/Api_Chitietnghiepvu/' + id_menu).then(function (response) {
            return response.data;
        });
    }
    this.save_nv = function (id, data_update) {
        return $http.put("/api/Api_Chitietnghiepvu/" + id, data_update);
    };
});

app.service('danhsachnghiepvuService', function ($http) {
    this.get_nv = function () {
        return $http.get('/api/Api_Nghiepvu/GetDS_NghiepVu/' + macongty).then(function (response) {
            return response.data;
        });
    }
    this.save_nv = function (id, data_update) {
        return $http.put("/api/Api_Nghiepvu/" + id, data_update);
    };
});

app.service('chitietbaivietService', function ($http) {
    this.get_chitietbaiviet = function (mabaiviet) {
        return $http.get('/api/Api_ThongTinBaiViet/' + mabaiviet).then(function (response) {
            return response.data;
        });
    };

    this.save = function (mabaiviet, data_update) {
        return $http.put('/api/Api_ChiTietBaiViet/' + mabaiviet, data_update);
    };
});

app.service('phanquyenService', function ($http) {
    this.get_dsphanquyen = function () {
        return $http.get('/api/Api_PhanQuyenMenu').then(function (response) {
            return response.data;
        });
    };

    this.get_trangthai = function (username, mamenu) {
        return $http.get('/api/Api_TrangThaiMenu/' + username + '/' + mamenu).then(function (response) {
            return response.data;
        });
    };

    this.check_trangthai = function (username, mamenu) {
        return $http.get('/api/Api_CheckMenu/' + username + '/' + mamenu).then(function (response) {
            return response.data;
        });
    }

    this.save_trangthai = function (username, mamenu, data_save) {
        return $http.put('/api/Api_MENU_USER/' + username + '/' + mamenu, data_save);
    }

    this.add_trangthai = function (data_addnew) {
        return $http.post('/api/Api_MENU_USER', data_addnew);
    }
});

app.service('lichsuService', function ($http) {
    this.get_lichsu = function (username) {
        return $http.get('/api/Api_LichSuDangNhap/' + username).then(function (response) {
            return response.data;
        });
    };
});


app.service('nhomnghiepvuService', function ($http) {
    this.get_nhomnghiepvu = function () {
        return $http.get('/api/Api_NhomNghiepVu').then(function (response) {
            return response.data;
        });
    };

    this.save_nhomnghiepvu = function (tennhom, data_save) {
        return $http.put('/api/Api_NhomNghiepVu/' + tennhom, data_save);
    }

    this.add_nhomnghiepvu = function (data_addnew) {
        return $http.post('/api/Api_NhomNghiepVu', data_addnew);
    }

    this.delete_nhomnghiepvu = function (tennhom, data_delete) {
        return $http.delete('/api/Api_NhomNghiepVu/' + tennhom, data_delete);
    }

    this.get_details = function (manhomnghiepvu) {
        return $http.get('/api/NghiepVuDetails/' + manhomnghiepvu).then(function (response) {
            return response.data;
        });
    };
    this.get_mota = function (manhomnghiepvu) {
        return $http.get('/api/MoTaDetails/' + manhomnghiepvu).then(function (response) {
            return response.data;
        });
    };

    this.get_trangthai = function (username) {
        return $http.get('/api/Api_CheckNghiepVu/' + username).then(function (response) {
            return response.data;
        });
    };

    this.insert = function (nhomnghiepvu, username) {
        return $http.post('/api/NghiepVuDetails/' + nhomnghiepvu + '/' + username);
    };
});


app.service('chitietnghiepvuService', function ($http) {
    this.get_chitietnghiepvu = function () {
        return $http.get('/api/CN_CHI_TIET_NGHIEP_VU').then(function (response) {
            return response.data;
        });
    };

    this.get_trangthai = function (nhomnghiepvu, mamota) {
        return $http.get('/api/Api_CheckChiTiet/' + nhomnghiepvu + '/' + mamota).then(function (response) {
            return response.data;
        });
    };
    this.delete_chitietnhomnghiepvu = function (nhomnghiepvu, mamota) {
        return $http.delete('/api/Api_ChiTietNhomNghiepVu/' + nhomnghiepvu + '/' + mamota);
    }

    this.add_chitietnhomnghiepvu = function (data_add) {
        return $http.post('/api/Api_ChiTietNhomNghiepVu', data_add);
    };
});

//dang ky phe duyet
app.service('DangkypheduyetService', function ($http) {
    this.get_dangkypheduyet = function () {
        return $http.get("/api/Api_Dangkypheduyet").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Dangkypheduyet", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Dangkypheduyet/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Dangkypheduyet/" + id, data_delete);
    }

});


// Định khoản tự động
app.service('DinhkhoantudongService', function ($http) {
    this.get_dinhkhoantudong = function () {
        return $http.get("/api/Api_Dinhkhoantudong").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Dinhkhoantudong", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Dinhkhoantudong/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Dinhkhoantudong/" + id, data_delete);
    }

});

// Loại chứng từ
app.service('LoaichungtuService', function ($http) {
    this.get_loaichungtu = function () {
        return $http.get("/api/Api_Loaichungtu").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Loaichungtu", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Loaichungtu/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Loaichungtu/" + id, data_delete);
    }

});
// Loại đối tượng
app.service('LoaidoituongService', function ($http) {
    this.get_loaidoituong = function () {
        return $http.get("/api/Api_Loaidoituong").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Loaidoituong", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Loaidoituong/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Loaidoituong/" + id, data_delete);
    }

});
// Loại tài khoản ngân hàng
app.service('LoaitknganhangService', function ($http) {
    this.get_loaitknganhang = function () {
        return $http.get("/api/Api_Loaitaikhoannganhang").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Loaitaikhoannganhang", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Loaitaikhoannganhang/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Loaitaikhoannganhang/" + id, data_delete);
    }

});
// Loại tài khoản ngân hàng nội bộ
app.service('LoaitknganhangnoiboService', function ($http) {
    this.get_loaitknganhangnoibo = function () {
        return $http.get("/api/Api_LoaiTKnganhangnoibo").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_LoaiTKnganhangnoibo", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_LoaiTKnganhangnoibo/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_LoaiTKnganhangnoibo/" + id, data_delete);
    }

});

// Mẫu số hóa đơn
app.service('MausohoadonService', function ($http) {
    this.get_mausohoadon = function () {
        return $http.get("/api/Api_Mausohoadon").then(function (response) {
            return response.data;
        });
    }
    this.add = function (data_add) {
        return $http.post("/api/Api_Mausohoadon", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Mausohoadon/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Mausohoadon/" + id, data_delete);
    }
});

// Đơn hàng dự kiến
app.service('DonhangdukienService', function ($http) {
    this.get_donhangdukien = function (username) {
        return $http.post("/api/Api_Donhangdukien/LocDonDuKien/" + username + '/' + macongty).then(function (response) {
            return response.data;
        });
    }
    this.get_khachhang = function () {
        return $http.get("/api/Api_KH").then(function (response) {
            return response.data;
        });
    }

    this.add = function (data_add) {
        return $http.post("/api/Api_Donhangdukien/PostBH_DON_HANG_DU_KIEN", data_add);
    };

    this.save = function (id, data_update) {
        return $http.put("/api/Api_Donhangdukien/" + id, data_update);
    }

    this.delete = function (id, data_delete) {
        return $http.delete("/api/Api_Donhangdukien/" + id, data_delete);
    }
});



app.service('themnghiepvuService', function ($http) {
    this.get_user = function () {
        return $http.get("/api/Api_NguoidungHL").then(function (response) {
            return response.data;
        });
    };
    this.get_trangthai = function (nhomnghiepvu, username) {
        return $http.get('/api/Api_NhomNguoiDungNghiepVu/' + nhomnghiepvu + '/' + username).then(function (response) {
            return response.data;
        });
    };
    this.delete_nghiepvunguoidung = function (nhomnghiepvu, username) {
        return $http.delete('/api/Api_NhomNguoiDungNghiepVu/' + nhomnghiepvu + '/' + username);
    }

    this.add_nghiepvunguoidung = function (data_add) {
        return $http.post('/api/Api_NhomNguoiDungNghiepVu', data_add);
    };
});


app.service('congtyService', function ($http) {
    this.get_congty = function () {
        return $http.get('/api/Api_CCTC_CongTy').then(function (response) {
            return response.data;
        });
    };
    this.add_congty = function (data_add) {
        return $http.post('/api/Api_CCTC_CongTy', data_add);
    };

    this.save_congty = function (macongty, data_save) {
        return $http.put('/api/Api_CCTC_CongTy/' + macongty, data_save);
    };
    this.delete_congty = function (macongty, data_delete) {
        return $http.delete('/api/Api_CCTC_CongTy/' + macongty, data_delete);
    };
});

app.service('mohinhcongtyService', function ($http) {
    this.get_mohinhcongty = function () {
        return $http.get('/api/Api_MoHinhCongTy').then(function (response) {
            return response.data;
        });
    };
    this.add_mohinhcongty = function (data_add) {
        return $http.post('/api/Api_MoHinhCongTy', data_add);
    };

    this.save_mohinhcongty = function (mamohinh, data_save) {
        return $http.put('/api/Api_MoHinhCongTy/' + mamohinh, data_save);
    };
    this.delete_mohinhcongty = function (mamohinh, data_delete) {
        return $http.delete('/api/Api_MoHinhCongTy/' + mamohinh, data_delete);
    };
});

app.service('dichvuService', function ($http) {
    this.get_dichvu = function () {
        return $http.get('/api/Api_DichVu').then(function (response) {
            return response.data;
        });
    };
    this.add_dichvu = function (data_add) {
        return $http.post('/api/Api_DichVu', data_add);
    };

    this.save_dichvu = function (madichvu, data_save) {
        return $http.put('/api/Api_DichVu/' + madichvu, data_save);
    };
    this.delete_dichvu = function (madichvu, data_delete) {
        return $http.delete('/api/Api_DichVu/' + madichvu, data_delete);
    };
});

app.service('hangduocquantamService', function ($http) {
    this.get_hangduocquantam = function () {
        return $http.get('/api/Api_HangDuocQuanTam').then(function (response) {
            return response.data;
        });
    };

});

app.service('thamchieuchungtuService', function ($http) {
    this.get_thamchieu = function () {
        return $http.get('/api/Api_ThamChieuChungTu').then(function (response) {
            return response.data;
        });
    };

    this.get_chungtu = function () {
        return $http.get('/api/Api_ChungTu').then(function (response) {
            return response.data;
        });
    };
    this.add_thamchieu = function (data_add) {
        return $http.post('/api/Api_ThamChieuChungTu', data_add);
    };

    this.save_thamchieu = function (id, data_save) {
        return $http.put('/api/Api_ThamChieuChungTu/' + id, data_save);
    };
    this.delete_thamchieu = function (id, data_delete) {
        return $http.delete('/api/Api_ThamChieuChungTu/' + id, data_delete);
    };
});

app.service('salephutrachService', function ($http) {
    this.get_salephutrach = function () {
        return $http.get('/api/Api_SalePhuTrach').then(function (response) {
            return response.data;
        });
    };

    this.get_nhanvienphutrach = function () {
        return $http.get('/api/NhanVienPhuTrach').then(function (response) {
            return response.data;
        });
    };
    this.get_idlienhe = function () {
        return $http.get('/api/Api_LienHe').then(function (response) {
            return response.data;
        });
    };
    this.add_salephutrach = function (data_add) {
        return $http.post('/api/Api_SalePhuTrach', data_add);
    };

    this.save_salephutrach = function (id, data_save) {
        return $http.put('/api/Api_SalePhuTrach/' + id, data_save);
    };
    this.delete_salephutrach = function (id, data_delete) {
        return $http.delete('/api/Api_SalePhuTrach/' + id, data_delete);
    };
});

app.service('purphutrachService', function ($http) {
    this.get_purphutrach = function () {
        return $http.get('/api/Api_PurPhuTrach').then(function (response) {
            return response.data;
        });
    };

    this.get_nhanvienpurphutrach = function () {
        return $http.get('/api/NhanVienPurPhuTrach').then(function (response) {
            return response.data;
        });
    };
    this.get_idlienhe = function () {
        return $http.get('/api/Api_NCC_LienHe').then(function (response) {
            return response.data;
        });
    };
    this.add_purphutrach = function (data_add) {
        return $http.post('/api/Api_PurPhuTrach', data_add);
    };

    this.save_purphutrach = function (id, data_save) {
        return $http.put('/api/Api_PurPhuTrach/' + id, data_save);
    };
    this.delete_purphutrach = function (id, data_delete) {
        return $http.delete('/api/Api_PurPhuTrach/' + id, data_delete);
    };
});

app.service('productdetailsService', function ($http) {
    this.get_productdetails = function (mahang) {
        return $http.get('/api/Api_ProductsKH/' + mahang).then(function (response) {
            return response.data;
        });
    };
});






// Nha cung cap
app.service('nhacungcapService', function ($http) {
    //this.get_nhacungcap = function () {
    //    return $http.get('/api/Api_NhaCungCap').then(function (response) {
    //        return response.data;
    //    });
    //};
    this.get_phanloaincc = function () {
        return $http.get('/api/Api_LoaiNCC').then(function (response) {
            return response.data;
        });
    };
    this.get_lienhenhacungcap = function (mancc) {
        return $http.get('/api/Api_LienHeNhaCungCap/' + mancc).then(function (response) {
            return response.data;
        });
    };
    this.get_nhanvienmua = function (maphongban,macongty) {
        return $http.get('/api/Api_NhanvienMua/' + maphongban + macongty).then(function (response) {
            return response.data;
        });
    };
    this.get_loaihangcungcap = function (mancc) {
        return $http.get('/api/Api_GetLoaiHangCungCap/' + mancc).then(function (response) {
            return response.data;
        });
    };
    this.get_taikhoanncc = function (mancc) {
        return $http.get('/api/Api_TaiKhoanNCC/' + mancc).then(function (response) {
            return response.data;
        });
    };

    this.get_loaitk = function () {
        return $http.get('/api/Api_LoaiTaiKhoan').then(function (response) {
            return response.data;
        });
    };

    this.get_nhomvthh = function () {
        return $http.get('/api/Api_NhomVTHHHL').then(function (response) {
            return response.data;
        });
    };

    this.add_phanloaikh = function (phanloaikh_add) {
        return $http.post('/api/Api_PhanLoaiKH', phanloaikh_add);
    };


    this.save_lienhencc = function (idlienhe, data_save) {
        return $http.put('/api/Api_LienHeNhaCungCap/' + idlienhe, data_save);
    };

    

    
});
// end nha cung cap
