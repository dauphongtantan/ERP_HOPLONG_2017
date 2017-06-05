



app.controller('giamdocCtrl', function (giamdocService, $scope) {
    $scope.push = function (username) {
        giamdocService.get_giamdoc(username).then(function (a) {
            $scope.listgiamdoc = a;
        });
    };
    
});

app.controller('NhomvthhCtrl', function (NhomvthhService, $scope) {
    $scope.loadHangSP = function () {
        NhomvthhService.get_hangsp().then(function (a) {
            $scope.danhsachsp = a;
        });
    };
    $scope.loadHangSP();
    $scope.add = function () {
        var data_add = {
            MA_NHOM_HANG_CHI_TIET: $scope.manhomhangchitiet,
            CHUNG_LOAI_HANG: $scope.chungloaihang,
            MA_NHOM_HANG_CHA: $scope.manhomhangcha,
            GHI_CHU: $scope.ghichu

        }
        NhomvthhService.add(data_add).then(function (response) {
            $scope.loadHangSP();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (hangsp) {
        var data_update = {
            MA_NHOM_HANG_CHI_TIET: $scope.item.MA_NHOM_HANG_CHI_TIET,
            CHUNG_LOAI_HANG: $scope.item.CHUNG_LOAI_HANG,
            MA_NHOM_HANG_CHA: $scope.item.MA_NHOM_HANG_CHA,
            GHI_CHU: $scope.item.GHI_CHU

        }
        NhomvthhService.save(hangsp, data_update).then(function (response) {
            $scope.loadHangHoa();
        });
    }

    $scope.delete = function (hangsp) {
        var data_delete = {
            MA_NHOM_HANG_CHI_TIET: hangsp
        }
        NhomvthhService.delete(hangsp, data_delete).then(function (response) {
            $scope.loadHangSP();
        });
    };

    $scope.whatclass = function (somevalue) {
        if (somevalue != null) {
            return "text-center"
        }
    };
});

app.controller('khoCtrl', function (khoService, $scope) {
    $scope.loadKho = function () {
        khoService.get_kho(macongty).then(function (a) {
            $scope.danhsachkho = a;
        });
    };
    $scope.loadKho();

    $scope.add = function () {
        var data_add = {
            MA_KHO: $scope.ma_kho,
            TEN_KHO: $scope.ten_kho,
            DIA_CHI_KHO: $scope.dia_chi,
            MA_KHO_CHA: $scope.ma_kho_cha,
            TRUC_THUOC: macongty,
            GHI_CHU: $scope.ghi_chu,
        }
        khoService.add(data_add).then(function (response) {
            $scope.loadKho();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
    }

    $scope.save = function (makho) {
        var data_update = {
            MA_KHO: $scope.item.MA_KHO,
            TEN_KHO: $scope.item.TEN_KHO,
            DIA_CHI_KHO: $scope.item.DIA_CHI_KHO,
            MA_KHO_CHA: $scope.item.MA_KHO_CHA,
            TRUC_THUOC: macongty,
            GHI_CHU: $scope.item.GHI_CHU,
        }
        khoService.save(makho, data_update).then(function (response) {
            $scope.loadKho();
        });
    }

    $scope.delete = function (makho) {
        var data_delete = {
            MA_KHO: makho
        }
        khoService.delete(makho, data_delete).then(function (response) {
            $scope.loadKho();
        });
    };
});

app.controller('userCtrl', function (userService, $scope) {
    $scope.loadUser = function () {
        userService.get_user(macongty).then(function (a) {
            $scope.danhsachuser = a;
        });
    };


    $scope.loadUser();



    $scope.add = function () {
        $("textarea[name=thanhtich]").val(CKEDITOR.instances.thanhtich.getData());
        var thanhtich = $("[name=thanhtich]").val();
        $("textarea[name=linh_vuc_cong_tac]").val(CKEDITOR.instances.linh_vuc_cong_tac.getData());
        var linh_vuc_cong_tac = $("[name=linh_vuc_cong_tac]").val();
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_add = {
            USERNAME: $scope.username,
            PASSWORD: $scope.password,
            HO_VA_TEN: $scope.hovaten,
            SDT: $scope.sdt,
            EMAIL: $scope.email,
            AVATAR: name_without_ext,
            IS_ADMIN: $scope.admin,
            ALLOWED: $scope.allowed,
            MA_CONG_TY: macongty,
        }
        userService.add(data_add).then(function (response) {
            $scope.loadUser();
            var nhanvien_add = {
                USERNAME: $scope.username,
                GIOI_TINH: $scope.gioitinh,
                NGAY_SINH: $scope.ngaysinh,
                QUE_QUAN: $scope.quequan,
                THANH_TICH_CONG_TAC: thanhtich,
                TRINH_DO_HOC_VAN: $scope.trinhdohocvan,
                LINH_VUC_CONG_TAC: linh_vuc_cong_tac,
                MA_PHONG_BAN: $scope.maphongban
            }
            userService.add_nhanvien(nhanvien_add).then(function (response) {
                $scope.loadUser();
            });
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
    }

    $scope.transfer = function (nv) {
        $scope.nv = nv;
    }

    $scope.update_nv = function (nv) {
        $scope.nv = nv;
        var thanhtichvalue = $('.' + nv.USERNAME + '-1').html();
        CKEDITOR.instances.editthanhtich.setData(thanhtichvalue);
        var linhvuccongtacvalue = $('.' + nv.USERNAME + '-2').html();
        CKEDITOR.instances.editlinh_vuc_cong_tac.setData(linhvuccongtacvalue);
    }

    $scope.save = function (username) {
        $("textarea[name=editthanhtich]").val(CKEDITOR.instances.editthanhtich.getData());
        var editthanhtich = $("[name=editthanhtich]").val();
        $("textarea[name=editlinh_vuc_cong_tac]").val(CKEDITOR.instances.editlinh_vuc_cong_tac.getData());
        var editlinh_vuc_cong_tac = $("[name=editlinh_vuc_cong_tac]").val();
        var a = $('#imgEdit').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_update = {
            ID: username,
            USERNAME: $scope.nv.USERNAME,
            PASSWORD: $scope.nv.PASSWORD,
            HO_VA_TEN: $scope.nv.HO_VA_TEN,
            SDT: $scope.nv.SDT,
            AVATAR: name_without_ext,
            EMAIL: $scope.nv.EMAIL,
            IS_ADMIN: $scope.nv.IS_ADMIN,
            ALLOWED: $scope.nv.ALLOWED,
            MA_CONG_TY: macongty,
        }
        userService.save(username, data_update).then(function (response) {
            $scope.loadUser();
            var nhanvien_update = {
                USERNAME: $scope.nv.USERNAME,
                GIOI_TINH: $scope.nv.GIOI_TINH,
                NGAY_SINH: $scope.nv.NGAY_SINH,
                QUE_QUAN: $scope.nv.QUE_QUAN,
                THANH_TICH_CONG_TAC: editthanhtich,
                LINH_VUC_CONG_TAC: editlinh_vuc_cong_tac,
                TRINH_DO_HOC_VAN: $scope.nv.TRINH_DO_HOC_VAN,
                MA_PHONG_BAN: $scope.nv.MA_PHONG_BAN
            }
            userService.save_nhanvien(username, nhanvien_update).then(function (response) {
                $scope.loadUser();
            });
        });
    };
});

app.controller('nhanvienCtrl', function (nhanvienService, $scope) {
    $scope.get_nhanvien = function (username) {
        nhanvienService.get_nhanvien(username).then(function (d) {
            $scope.nhanvien = d;
        });
    };
});

app.controller('phongbanCtrl', function (phongbanService, $scope) {
    $scope.loadPhongban = function () {
        phongbanService.get_phongban(macongty).then(function (a) {
            $scope.danhsachphongban = a;
        });
    };

    $scope.loadPhongban();


    $scope.pass = function (nhanvien) {
        $scope.nhanvien = nhanvien;
    }


    $scope.edit = function (item) {
        $scope.item = item;
    }


    $scope.save = function (maphongban) {
        var data_update = {
            MA_PHONG_BAN: maphongban,
            TEN_PHONG_BAN: $scope.item.TEN_PHONG_BAN,
            SDT: $scope.item.SDT,
            MA_CONG_TY: macongty,
            GHI_CHU: $scope.item.GHI_CHU,
        }
        phongbanService.save(maphongban, data_update).then(function (response) {
            $scope.loadPhongban();
        });
    };

    $scope.delete = function (maphongban) {
        var data_delete = {
            MA_PHONG_BAN: maphongban,
        }
        phongbanService.delete(maphongban).then(function (response) {
            $scope.loadPhongban();
        });
    };
});

app.controller('nhanvienphongbanCtrl', function (nhanvienphongbanService, $scope) {
    $scope.get_listnhanvien = function (maphongban) {
        nhanvienphongbanService.get_nhanvien(maphongban).then(function (d) {
            $scope.listnhanvien = d;
        });
    };
});

app.controller('taikhoanCtrl', function (taikhoanService, $scope) {
    $scope.loadTaikhoan = function () {
        taikhoanService.get_taikhoan().then(function (a) {
            $scope.danhsachtk = a;
        });
    };

    $scope.loadTaikhoan();

    $scope.whatclass = function (somevalue) {
        if (somevalue != null) {
            return "text-center"
        }
    };

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            SO_TK: $scope.stk,
            TEN_TK: $scope.tentaikhoan,
            TINH_CHAT: $scope.tinhchat,
            TEN_TA: $scope.tentienganh,
            TK_CAP_CHA: $scope.tk_capcha,
            DIEN_GIAI: $scope.diengiai,
        }
        taikhoanService.add(data_add).then(function (response) {
            $scope.loadTaikhoan();
        });
    };

    $scope.save = function (sotk) {
        var data_update = {
            SO_TK: sotk,
            TEN_TK: $scope.item.TEN_TK,
            TINH_CHAT: $scope.item.TINH_CHAT,
            TEN_TA: $scope.item.TEN_TA,
            TK_CAP_CHA: $scope.item.TK_CAP_CHA,
            DIEN_GIAI: $scope.item.DIEN_GIAI,
        }
        taikhoanService.save(sotk, data_update).then(function (response) {
            $scope.loadTaikhoan();
        });
    };

    $scope.delete = function (sotk) {
        var data_delete = {
            SO_TK: sotk
        }

        taikhoanService.delete(sotk).then(function (response) {
            $scope.loadTaikhoan();
        });
    };
});

app.controller('danhmucCtrl', function (danhmucService, $scope) {
    $scope.loadDanhMuc = function () {
        danhmucService.get_danhmuc().then(function (a) {
            $scope.danhsachdanhmuc = a;
        });
    };

    $scope.transfer = function (madanhmuc) {
        danhmucService.get_post(madanhmuc).then(function (z) {
            $scope.listpost = z;
        });
    };
    $scope.transfer1 = function (madanhmuc) {
        danhmucService.get_post(madanhmuc).then(function (z) {
            $scope.listpostkd = z;
        });
    };
    $scope.transfer1('11');
    $scope.transfer('01');
    $scope.loadDanhMuc();
    $scope.checked_fruits = [];

    $scope.save = function () {
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        $("textarea[name=noidung]").val(CKEDITOR.instances.noidung.getData());
        var danhmuc = $("[name=noidung]").val();
        var username = $('#username').val();
        var data_add = {
            TIEU_DE_BAI_VIET: $scope.tieude,
            NOI_DUNG_BAI_VIET: danhmuc,
            ANH_BAI_VIET: name_without_ext,
            NGUOI_DANG_BAI: username,
        }
        danhmucService.add_danhmuc(data_add).then(function (response) {


            var postcate = {
                tieu_de_bai_viet: $scope.tieude,
                ma_danh_muc: $scope.checked_fruits[0]
            }
            danhmucService.add_postcategories(postcate).then(function (response) {
                $scope.loadDanhMuc();
                reload();

            });
        });
    };
});


app.controller('imgCtrl', function ($scope) {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function read_editURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#edit_img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });
    $("#imgEdit").change(function () {
        read_editURL(this);
    });
});



app.controller('userdetailCtrl', function (userdetailService, $scope) {
    $scope.load_userdetails = function () {
        var username = $('#username').val();
        userdetailService.get_details(username).then(function (a) {
            $scope.list_details = a;
        });
    };
    $scope.load_nguoidungdetails = function (id) {

        userdetailService.get_details(id).then(function (a) {
            $scope.list_details = a;
        });
    };

    $scope.loadUser = function () {
        userdetailService.get_user().then(function (a) {
            $scope.danhsachuser = a;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.edit = function (username) {
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_save = {
            AVATAR: name_without_ext
        }
        userdetailService.edit_image(username, data_save).then(function (response) {
            $scope.load_userdetails();
        });
    };

    $scope.load_userdetails();

    $scope.changepw = function () {
        var username = $('#username').val();
        var oldpw = $scope.oldpw;
        var newpw = $scope.newpw;

        var data_save = {
            PASSWORD: newpw
        }
        userdetailService.save_pw(username, oldpw, data_save).then(function (response) {
            $scope.loadUser();
            $scope.load_userdetails();
            $scope.oldpw = '';
            $scope.newpw = '';
            $('.successful').css('display', 'block');
            $window.sessionStorage["windowKey"] = null;
        });

    };


});

app.controller('bangchamcongCtrl', function (bangchamcongService, $scope) {
    $scope.load_chamcong = function () {
        var username = $('#username').val();
        bangchamcongService.get_chamcong(username).then(function (a) {
            $scope.list_chamcong = a;
        });
    };
    $scope.load_chamcong();


    $scope.kiemtramk = function (matkhau) {
        var password = $('#password').val();
        if (matkhau.toLowerCase() == password.toLowerCase()) {
            $scope.matkhau = true;
            SuccessSystem("Mật khẩu đúng")
        } else {
            ErrorSystem("Sai mật khẩu")
        }
    };
});

app.controller('bangluongCtrl', function (bangluongService, $scope) {
    $scope.load_bangluong = function () {
        var username = $('#username').val();
        bangluongService.get_bangluong(username).then(function (a) {
            $scope.list_bangluong = a;
        });
    };
    $scope.load_bangluong();

    $scope.xacnhanmk = function (matkhau) {
        var password = $('#password').val();
        if(matkhau.toLowerCase() == password.toLowerCase())
        {
            $scope.matkhau = true;
            SuccessSystem("Mật khẩu đúng")
        } else {
            ErrorSystem("Sai mật khẩu")
        }
    };
});

app.controller('addmenuCtrl', function (addmenuService, menuService, $scope) {
    $scope.load_menu = function () {
        addmenuService.get_menu().then(function (a) {
            $scope.dsmenu = a;
        });
    };
    $scope.load_menu();

    $scope.add = function () {
        var data_add = {
            MA_MENU: $scope.ma_menu,
            TEN_MENU: $scope.ten_menu,
            LINK: $scope.link_menu,
            MENU_CHA: $scope.menu_cha
        }
        addmenuService.add_menu(data_add).then(function (response) {
            $scope.load_menu();
        });
    }

    $scope.edit = function (menucha) {
        var username = $('#username').val();
        menuService.get_menucha(username, menucha).then(function (a) {
            $scope.danhsachmenucha = a;
        });
        $('#editbtn').show();
    };

    $scope.push = function (zzz) {
        var username = $('#username').val();
        menuService.get_listmenucha(username, zzz).then(function (z) {
            $scope.listmenu = z;
        });
    };

    $scope.send = function (abc) {
        $scope.newmodel = abc;
    };

    $scope.save = function (mamenu) {
        var data_save = {
            MA_MENU: mamenu,
            TEN_MENU: $scope.newmodel.TEN_MENU,
            LINK: $scope.newmodel.LINK,
            MENU_CHA: $scope.newmodel.MENU_CHA
        }
        addmenuService.save_menu(mamenu, data_save).then(function (response) {
            $scope.load_menu();
        });
    };

    $scope.delete = function (mamenu) {
        var data_delete = {
            MA_MENU: mamenu
        }
        addmenuService.delete_menu(mamenu, data_delete).then(function (response) {
            $scope.load_menu();
        });
    };
});

app.controller('tonghopnvCtrl', function (tonghopnvService, $scope) {
    var macongty = $('#macongty').val();
    $scope.load_tonghop = function () {
        tonghopnvService.get_tonghop(macongty).then(function (a) {
            $scope.listtonghop = a;
        });
    };
    $scope.load_tonghop();
});


app.controller('dsnghiepvuCtrl', function (dsnghiepvuService, $scope) {
    $scope.load_dsnghiepvu = function (id_menu) {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        console.log(url);

        var pathArray = window.location.pathname.split('/');
        dsnghiepvuService.get_dsnghiepvu(url).then(function (a) {
            $scope.dsnghiepvu = a;
        });
    };
    $scope.load_dsnghiepvu();

    $scope.edit = function (item) {
        $scope.item = item;

    }

    $scope.save = function (id) {

        var data_update = {
            MO_TA: $scope.item.MO_TA

        }
        dsnghiepvuService.save_nv(id, data_update).then(function (response) {
            $scope.load_dsnghiepvu();
        });
    }
});

app.controller('danhsachnghiepvuCtrl', function (danhsachnghiepvuService, $scope) {

    $scope.loaddanhsachnghiepvu = function () {
        danhsachnghiepvuService.get_nv(macongty).then(function (d) {
            $scope.danhsachnghiepvu = d;
        });

    };
    $scope.loaddanhsachnghiepvu();
    $scope.edit = function (item) {
        $scope.item = item;

    }

    $scope.save = function (id) {

        var data_update = {
            TEN_NGHIEP_VU: $scope.item.TEN_NGHIEP_VU

        }
        danhsachnghiepvuService.save_nv(id, data_update).then(function (response) {
            $scope.loaddanhsachnghiepvu();
        });
    }
});

app.controller('chitietbaivietCtrl', function (chitietbaivietService, $scope,$http) {
    $scope.checkid = function (item) {
        var nguoidangbai = item;
        console.log(nguoidangbai);
        var username = $('#username').val();
        var isadmin = $('#admin').val();

        if (username == nguoidangbai || isadmin == 'True') {
            return "show";
        } else {
            return "notshow";
        }
    }
    $scope.checkid();

    $scope.load_baiviet = function () {
        $http.post('/api/Api_BaiViet_TongHop/GetTongHopBaiViet').then(function (response) {
            $scope.list_baiviet = response.data;
        });
    };
    $scope.load_baiviet();
   
});


app.controller('phanquyenmenuCtrl', function (phanquyenService, $scope) {
    $scope.load_menu = function () {
        phanquyenService.get_dsphanquyen().then(function (a) {
            $scope.dsmenu = a;
        });
    };
    $scope.load_menu();

    $scope.transfer = function (mamenu) {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = mamenu;
        var tenmenu = $scope.item.MA_MENU;
        var pathArray = window.location.pathname.split('/');
        phanquyenService.check_trangthai(url, tenmenu).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.return = function () {
                    return ("hienthi");
                }
                $scope.class = function () {
                    return ("nothienthi");
                }
                $scope.kiemtra = function () {
                    return ("hienthi");
                };
                phanquyenService.get_trangthai(url, tenmenu).then(function (b) {
                    $scope.danhsachtrangthai = b;
                });
            } else {
                $scope.return = function () {
                    return ("nothienthi");
                }
                $scope.class = function () {
                    return ("hienthi");
                }
                $scope.kiemtra = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_addnew = {
                        TRANG_THAI: 1,
                        MA_MENU: tenmenu,
                        USERNAME: url,
                    }
                    phanquyenService.add_trangthai(data_addnew).then(function (response) {
                        $scope.load_menu();
                        $scope.ketqua = "Successful!"
                        $scope.kiemtra = function () {
                            return ("hienthi");
                        };
                    });
                };
            }
        });
    };

    $scope.click = function (trangthai, mamenu) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        var pathArray = window.location.pathname.split('/');
        var data_save = {
            USERNAME: url,
            TRANG_THAI: trangthai,
            MA_MENU: mamenu
        }
        phanquyenService.save_trangthai(url, mamenu, data_save).then(function (response) {
            $scope.load_menu();
        });
    }

});



app.controller('lichsuCtrl', function (lichsuService, $scope) {
    $scope.load_lichsu = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        lichsuService.get_lichsu(url).then(function (a) {
            $scope.list_lichsu = a;
        });
    };
    $scope.load_lichsu();
    $scope.show = function (lichsu) {
        if (lichsu != "") {
            return ("nothienthi");
        } else {
            return ("hienthi");
        }
    }
});



app.controller('nhomnghiepvuCtrl', function (nhomnghiepvuService, $scope) {
    $scope.load_nhomnghiepvu = function () {
        nhomnghiepvuService.get_nhomnghiepvu().then(function (a) {
            $scope.list_nhomnghiepvu = a;
        });
    };
    $scope.load_nhomnghiepvu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            TEN_NHOM: $scope.tennhom,
            DIEN_GIAI: $scope.diengiai,
            TRUC_THUOC: macongty
        }
        nhomnghiepvuService.add_nhomnghiepvu(data_add).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.save = function (tennhom) {
        var data_save = {
            TEN_NHOM: tennhom,
            DIEN_GIAI: $scope.item.DIEN_GIAI,
            TRUC_THUOC: macongty
        }
        nhomnghiepvuService.save_nhomnghiepvu(tennhom, data_save).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.delete = function (tennhom) {
        var data_delete = {
            TEN_NHOM: tennhom
        }
        nhomnghiepvuService.delete_nhomnghiepvu(tennhom, data_delete).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.open = function (tennhom) {
        $('#myDetails').modal('toggle');
        var tennhom = tennhom;
        nhomnghiepvuService.get_details(tennhom).then(function (z) {
            $scope.list_hovaten = z;
        });
        nhomnghiepvuService.get_mota(tennhom).then(function (h) {
            $scope.list_mota = h;
        });
        $scope.transfer = function (hovaten) {
            $scope.item = hovaten;
            var username = $scope.item.USERNAME;
            nhomnghiepvuService.get_trangthai(username).then(function (a) {
                $scope.trangthai = a;
                $scope.insert = function () {
                    nhomnghiepvuService.insert(tennhom, username);
                    $scope.checkthis = function () {
                        return ("nothienthi");
                    };
                };
                if ($scope.trangthai == true) {
                    $scope.checkthis = function () {
                        return ("nothienthi");
                    };
                } else {
                    $scope.checkthis = function () {
                        return ("hienthi");
                    };
                }
            });
        };
    };
});


app.controller('chitietnghiepvuCtrl', function (chitietnghiepvuService, $scope) {
    $scope.load_chitietnghiepvu = function () {
        chitietnghiepvuService.get_chitietnghiepvu().then(function (a) {
            $scope.list_chitietnghiepvu = a;
        });
    };
    $scope.load_chitietnghiepvu();


    $scope.transfer = function (item) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = item;
        var mamota = $scope.item.ID;
        var pathArray = window.location.pathname.split('/');
        chitietnghiepvuService.get_trangthai(url, mamota).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.class = function () {
                    return ("hienthi");
                };
                $scope.delete = function () {
                    chitietnghiepvuService.delete_chitietnhomnghiepvu(url, mamota).then(function (response) {
                        reload();
                    });
                };
            } else {
                $scope.class = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_add = {
                        ID_NHOM_NGHIEP_VU: url,
                        ID_CHI_TIET_NGHIEP_VU: mamota,
                    }
                    chitietnghiepvuService.add_chitietnhomnghiepvu(data_add);
                    //chitietnghiepvuService.add_chitietnhomnghiepvu(data_add).then(function (response) {
                    //reload();
                    // });
                };
            }
        });
    };


});


app.controller('themnghiepvuCtrl', function (themnghiepvuService, $scope) {
    $scope.load_nguoidung = function () {
        themnghiepvuService.get_user().then(function (a) {
            $scope.list_nguoidung = a;
        });
    };
    $scope.load_nguoidung();

    $scope.transfer = function (item) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = item;
        var username = $scope.item.USERNAME;
        var pathArray = window.location.pathname.split('/');
        themnghiepvuService.get_trangthai(url, username).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.class = function () {
                    return ("hienthi");
                };
                $scope.delete = function () {
                    themnghiepvuService.delete_nghiepvunguoidung(url, username).then(function (response) {
                        reload();
                    });
                };
            } else {
                $scope.class = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_add = {
                        ID_NHOM_NGHIEP_VU: url,
                        USERNAME: username,
                    }
                    themnghiepvuService.add_nghiepvunguoidung(data_add).then(function (response) {
                        $scope.ketqua = "Successful!"
                        $scope.kiemtra = function () {
                            return ("hienthi");
                        };
                    });
                };
            }
        });
    };
});

app.controller('congtyCtrl', function (congtyService, $scope) {
    $scope.load_congty = function () {
        congtyService.get_congty().then(function (a) {
            $scope.listcongty = a;
        });
    };
    $scope.load_congty();

    $scope.add = function () {
        var data_add = {
            MA_CONG_TY: $scope.macongty,
            TEN_CONG_TY: $scope.tencongty,
            NGAY_THANH_LAP: $scope.ngaythanhlap,
            EMAIL: $scope.email,
            FAX: $scope.fax,
            SDT: $scope.sdt,
            MST: $scope.mst,
            LOGO: $scope.logo,
            DIA_CHI: $scope.diachi,
            DIA_CHI_XUAT_HOA_DON: $scope.diachixuathoadon,
            CONG_TY_ME: $scope.congtyme,
            CAP_TO_CHUC: $scope.captochuc,
            GHI_CHU: $scope.ghi_chu
        }
        congtyService.add_congty(data_add).then(function (response) {
            $scope.load_congty();
        });
    };
    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.save = function (macongty) {
        var data_save = {
            MA_CONG_TY: macongty,
            TEN_CONG_TY: $scope.item.TEN_CONG_TY,
            NGAY_THANH_LAP: $scope.item.NGAY_THANH_LAP,
            EMAIL: $scope.item.EMAIL,
            FAX: $scope.item.FAX,
            SDT: $scope.item.SDT,
            MST: $scope.item.MST,
            LOGO: $scope.item.LOGO,
            DIA_CHI: $scope.item.DIA_CHI,
            DIA_CHI_XUAT_HOA_DON: $scope.item.DIA_CHI_XUAT_HOA_DON,
            CONG_TY_ME: $scope.item.CONG_TY_ME,
            CAP_TO_CHUC: $scope.item.CAP_TO_CHUC,
            GHI_CHU: $scope.item.GHI_CHU,
        }
        congtyService.save_congty(macongty, data_save).then(function (response) {
            $scope.load_congty();
        });
    };

    $scope.delete = function (macongty) {
        var data_delete = {
            MA_CONG_TY: macongty
        }
        congtyService.delete_congty(macongty, data_delete).then(function (response) {
            $scope.load_congty();
        });
    };
});


app.controller('mohinhcongtyCtrl', function (mohinhcongtyService, $scope) {
    $scope.load_mohinhcongty = function () {
        mohinhcongtyService.get_mohinhcongty().then(function (a) {
            $scope.listmohinhcongty = a;
        });
    };
    $scope.load_mohinhcongty();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            MA_MO_HINH: $scope.ma_mo_hinh,
            TEN_MO_HINH: $scope.ten_mo_hinh,
            GHI_CHU: $scope.ghi_chu
        }
        mohinhcongtyService.add_mohinhcongty(data_add).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };

    $scope.save = function (mamohinh) {
        var data_save = {
            MA_MO_HINH: mamohinh,
            TEN_MO_HINH: $scope.item.TEN_MO_HINH,
            GHI_CHU: $scope.item.GHI_CHU
        }
        mohinhcongtyService.save_mohinhcongty(mamohinh, data_save).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };

    $scope.delete = function (mamohinh) {
        var data_delete = {
            MA_MO_HINH: mamohinh
        }
        mohinhcongtyService.delete_mohinhcongty(mamohinh, data_delete).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };
});

app.controller('dichvuCtrl', function (dichvuService, $scope) {
    $scope.load_dichvu = function () {
        dichvuService.get_dichvu().then(function (a) {
            $scope.listdichvu = a;
        });
    };
    $scope.load_dichvu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            MA_DICH_VU: $scope.ma_dich_vu,
            TEN_DICH_VU: $scope.ten_dich_vu,
            GHI_CHU: $scope.ghi_chu
        }
        dichvuService.add_dichvu(data_add).then(function (response) {
            $scope.load_dichvu();
        });
    };

    $scope.save = function (madichvu) {
        var data_save = {
            MA_DICH_VU: madichvu,
            TEN_DICH_VU: $scope.item.TEN_DICH_VU,
            GHI_CHU: $scope.item.GHI_CHU
        }
        dichvuService.save_dichvu(madichvu, data_save).then(function (response) {
            $scope.load_dichvu();
        });
    };

    $scope.delete = function (madichvu) {
        var data_delete = {
            MA_DICH_VU: madichvu
        }
        dichvuService.delete_dichvu(madichvu, data_delete).then(function (response) {
            $scope.load_dichvu();
        });
    };
});


app.controller('hangduocquantamCtrl', function (hangduocquantamService, $scope) {
    $scope.load_hangduocquantam = function () {
        hangduocquantamService.get_hangduocquantam().then(function (a) {
            $scope.list_hangduocquantam = a;
        });
    };
    $scope.load_hangduocquantam();
});


app.controller('DangkypheduyetCtrl', function (DangkypheduyetService, $scope) {
    $scope.Dangkypheduyet = function () {
        DangkypheduyetService.get_dangkypheduyet().then(function (a) {
            $scope.dangkypheduyet = a;
        });
    };
    $scope.Dangkypheduyet();
    $scope.add = function () {
        var data_add = {
            ID: $scope.id,
            MA_PHE_DUYET: $scope.mapheduyet,
            NGUOI_PHE_DUYET: $scope.nguoipheduyet,
            TRUC_THUOC: macongty,
            GHI_CHU: $scope.ghichu

        }

        DangkypheduyetService.add(data_add).then(function (response) {
            $scope.Dangkypheduyet();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            ID: $scope.item.ID,
            MA_PHE_DUYET: $scope.item.MA_PHE_DUYET,
            NGUOI_PHE_DUYET: $scope.item.NGUOI_PHE_DUYET,
            TRUC_THUOC: $scope.item.TRUC_THUOC,
            GHI_CHU: $scope.item.GHI_CHU

        }
        DangkypheduyetService.save(id, data_update).then(function (response) {
            $scope.Dangkypheduyet();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            ID: id
        }
        DangkypheduyetService.delete(id, data_delete).then(function (response) {
            $scope.Dangkypheduyet();
        });
    };

});

//Định khoản tự động
app.controller('DinhkhoantudongCtrl', function (DinhkhoantudongService, $scope) {
    $scope.Dinhkhoantudong = function () {
        DinhkhoantudongService.get_dinhkhoantudong().then(function (a) {
            $scope.dinhkhoantudong = a;
        });
    };
    $scope.Dinhkhoantudong();
    $scope.add = function () {
        var data_add = {
            ID: $scope.id,
            MA_LOAI_CHUNG_TU: $scope.maloaichungtu,
            MA_LY_DO: $scope.malydo,
            TEN_LY_DO: $scope.tenlydo,
            TK_NO: $scope.tkno,
            TK_CO: $scope.tkco

        }


        DinhkhoantudongService.add(data_add).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            ID: $scope.item.ID,
            MA_LOAI_CHUNG_TU: $scope.item.MA_LOAI_CHUNG_TU,
            MA_LY_DO: $scope.item.MA_LY_DO,
            TEN_LY_DO: $scope.item.TEN_LY_DO,
            TK_NO: $scope.item.TK_NO,
            TK_CO: $scope.item.TK_CO

        }
        DinhkhoantudongService.save(id, data_update).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            ID: id
        }
        DinhkhoantudongService.delete(id, data_delete).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    };

});
// Loại chứng từ
app.controller('LoaichungtuCtrl', function (LoaichungtuService, $scope) {
    $scope.Loaichungtu = function () {
        LoaichungtuService.get_loaichungtu().then(function (a) {
            $scope.loaichungtu = a;
        });
    };
    $scope.Loaichungtu();
    $scope.add = function () {
        var data_add = {
            MA_LOAI_CHUNG_TU: $scope.maloaichungtu,
            TEN_LOAI_CHUNG_TU: $scope.tenloaichungtu
        }


        LoaichungtuService.add(data_add).then(function (response) {
            $scope.Loaichungtu();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI_CHUNG_TU: $scope.item.MA_LOAI_CHUNG_TU,
            TEN_LOAI_CHUNG_TU: $scope.item.TEN_LOAI_CHUNG_TU
        }
        LoaichungtuService.save(id, data_update).then(function (response) {
            $scope.Loaichungtu();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI_CHUNG_TU: id
        }
        LoaichungtuService.delete(id, data_delete).then(function (response) {
            $scope.Loaichungtu();
        });
    };

});

// Loại đối tượng
app.controller('LoaidoituongCtrl', function (LoaidoituongService, $scope) {
    $scope.Loaidoituong = function () {
        LoaidoituongService.get_loaidoituong().then(function (a) {
            $scope.loaidoituong = a;
        });
    };
    $scope.Loaidoituong();
    $scope.add = function () {
        var data_add = {
            MA_LOAI_DOI_TUONG: $scope.maloaidoituong,
            TEN_LOAI_DOI_TUONG: $scope.tenloaidoituong
        }


        LoaidoituongService.add(data_add).then(function (response) {
            $scope.Loaidoituong();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI_DOI_TUONG: $scope.item.MA_LOAI_DOI_TUONG,
            TEN_LOAI_DOI_TUONG: $scope.item.TEN_LOAI_DOI_TUONG
        }
        LoaidoituongService.save(id, data_update).then(function (response) {
            $scope.Loaidoituong();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI_DOI_TUONG: id
        }
        LoaidoituongService.delete(id, data_delete).then(function (response) {
            $scope.Loaidoituong();
        });
    };

});

// Loại tài khoản ngân hàng
app.controller('LoaitknganhangCtrl', function (LoaitknganhangService, $scope) {
    $scope.Loaitknganhang = function () {
        LoaitknganhangService.get_loaitknganhang().then(function (a) {
            $scope.loaitknganhang = a;
        });
    };
    $scope.Loaitknganhang();
    $scope.add = function () {
        var data_add = {
            MA_LOAI: $scope.maloai,
            TEN_LOAI: $scope.tenloai
        }


        LoaitknganhangService.add(data_add).then(function (response) {
            $scope.Loaitknganhang();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI: $scope.item.MA_LOAI,
            TEN_LOAI: $scope.item.TEN_LOAI
        }
        LoaitknganhangService.save(id, data_update).then(function (response) {
            $scope.Loaitknganhang();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI: id
        }
        LoaitknganhangService.delete(id, data_delete).then(function (response) {
            $scope.Loaitknganhang();
        });
    };

});

// Loại tài khoản ngân hàng nội bộ
app.controller('LoaitknganhangnoiboCtrl', function (LoaitknganhangnoiboService, $scope) {
    $scope.Loaitknganhangnoibo = function () {
        LoaitknganhangnoiboService.get_loaitknganhangnoibo().then(function (a) {
            $scope.loaitknganhangnoibo = a;
        });
    };
    $scope.Loaitknganhangnoibo();
    $scope.add = function () {
        var data_add = {
            SO_TAI_KHOAN: $scope.sotaikhoan,
            MA_CONG_TY: macongty,
            TEN_TAI_KHOAN: $scope.tentaikhoan,
            LOAI_TAI_KHOAN: $scope.loaitaikhoan,
            TEN_NGAN_HANG: $scope.tennganhang,
            CHI_NHANH: $scope.chinhanh,
            TINH_TP: $scope.tinhtp,
            GHI_CHU: $scope.ghichu
        }

        LoaitknganhangnoiboService.add(data_add).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            SO_TAI_KHOAN: $scope.item.SO_TAI_KHOAN,
            MA_CONG_TY: $scope.item.MA_CONG_TY,
            TEN_TAI_KHOAN: $scope.item.TEN_TAI_KHOAN,
            LOAI_TAI_KHOAN: $scope.item.LOAI_TAI_KHOAN,
            TEN_NGAN_HANG: $scope.item.TEN_NGAN_HANG,
            CHI_NHANH: $scope.item.CHI_NHANH,
            TINH_TP: $scope.item.TINH_TP,
            GHI_CHU: $scope.item.GHI_CHU
        }
        LoaitknganhangnoiboService.save(id, data_update).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI: id
        }
        LoaitknganhangnoiboService.delete(id, data_delete).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    };

});

// Mẫu số hóa đơn
app.controller('MausohoadonCtrl', function (MausohoadonService, $scope) {
    $scope.Mausohoadon = function () {
        MausohoadonService.get_mausohoadon().then(function (a) {
            $scope.mausohoadon = a;
        });
    };
    $scope.Mausohoadon();
    $scope.add = function () {
        var data_add = {
            MAU_SO: $scope.mauso,
            TEN_MAU: $scope.tenmau
        }


        MausohoadonService.add(data_add).then(function (response) {
            $scope.Mausohoadon();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MAU_SO: $scope.item.MAU_SO,
            TEN_MAU: $scope.item.TEN_MAU
        }
        MausohoadonService.save(id, data_update).then(function (response) {
            $scope.Mausohoadon();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MAU_SO: id
        }
        MausohoadonService.delete(id, data_delete).then(function (response) {
            $scope.Mausohoadon();
        });
    };

});


app.controller('thamchieuchungtuCtrl', function (thamchieuchungtuService, $scope) {
    $scope.load_thamchieu = function () {
        thamchieuchungtuService.get_thamchieu().then(function (a) {
            $scope.listthamchieu = a;
        });
    };

    $scope.load_chungtu = function () {
        thamchieuchungtuService.get_chungtu().then(function (a) {
            $scope.listchungtu = a;
        });
    };

    $scope.load_chungtu();
    $scope.load_thamchieu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            SO_CHUNG_TU_GOC: $scope.so_chung_tu_goc,
            SO_CHUNG_TU_THAM_CHIEU: $scope.so_chung_tu_tham_chieu,
        }
        thamchieuchungtuService.add_thamchieu(data_add).then(function (response) {
            $scope.load_thamchieu();
        });
    };

    $scope.save = function (id) {
        console.log(id)
        var data_save = {
            ID: id,
            SO_CHUNG_TU_GOC: $scope.item.SO_CHUNG_TU_GOC,
            SO_CHUNG_TU_THAM_CHIEU: $scope.item.SO_CHUNG_TU_THAM_CHIEU,
        }
        thamchieuchungtuService.save_thamchieu(id, data_save).then(function (response) {
            $scope.load_thamchieu();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        thamchieuchungtuService.delete_thamchieu(id, data_delete).then(function (response) {
            $scope.load_thamchieu();
        });
    };
});

app.controller('salephutrachCtrl', function (salephutrachService, khachhangService, $scope, $http) {
    $scope.load_salephutrach = function () {
        salephutrachService.get_salephutrach().then(function (a) {
            $scope.listsalephutrach = a;
        });
    };

    $scope.load_nhanvienphutrach = function () {
        salephutrachService.get_nhanvienphutrach().then(function (a) {
            $scope.listnhanvienphutrach = a;
        });
    };

    $scope.load_lienhe = function () {
        salephutrachService.get_idlienhe().then(function (a) {
            $scope.listlienhe = a;
        });
    };

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();
    $scope.load_salephutrach();
    $scope.load_nhanvienphutrach();
    $scope.load_lienhe();

    $scope.edit = function (item) {
        $scope.item = item;     
    };

    $scope.add = function () {
        var data_add = {
            ID_LIEN_HE : $scope.newlienhe.ID_LIEN_HE,
            SALES_PHU_TRACH: $scope.new.USERNAME,
            NGAY_BAT_DAU_PHU_TRACH: $scope.ngay_bat_dau_phu_trach,
            NGAY_KET_THUC_PHU_TRACH: $scope.ngay_ket_thuc_phu_trach,
            TRANG_THAI: $scope.trangthai,
            SALES_CU: $scope.sales_cu,
            SALES_MOI : $scope.sales_moi
        }
        salephutrachService.add_salephutrach(data_add).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    $scope.save = function (id) {
        var data_save = {
            ID: id,
            ID_LIEN_HE: $scope.item.ID_LIEN_HE,
            SALES_PHU_TRACH: $scope.item.SALES_PHU_TRACH,
            NGAY_BAT_DAU_PHU_TRACH: $scope.item.NGAY_BAT_DAU_PHU_TRACH,
            NGAY_KET_THUC_PHU_TRACH: $scope.item.NGAY_KET_THUC_PHU_TRACH,
            TRANG_THAI: $scope.item.TRANG_THAI,
            SALES_CU: $scope.item.SALES_CU,
            SALES_MOI : $scope.item.SALES_MOI,
        }
        salephutrachService.save_salephutrach(id, data_save).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        salephutrachService.delete_salephutrach(id, data_delete).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    //Lọc lien he them moi
    $scope.arrayLienHenewFinded = [];
    $scope.arraynewLienHe = [];
    $scope.showtable_lienhenew = false;

    $http.get(window.location.origin + '/api/Api_ListLienHeKH')
            .then(function (response) {
                if (response.data) {
                    $scope.arraynewLienHe = response.data;
                    $scope.arrayLienHenewFinded = $scope.arraynewLienHe.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.newlienheFind = function () {
        if (!$scope.newlienhe.NGUOI_LIEN_HE) {
            $scope.arrayLienHenewFinded = $scope.arraynewLienHe.map(function (item) {
                return item;
            });
        }
        $scope.arrayLienHenewFinded = $scope.arraynewLienHe.filter(function (item) {
            if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.newlienhe.NGUOI_LIEN_HE.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoLHnewStaff = function (staff) {
        $scope.newlienhe = staff;
        $scope.showtable_lienhenew = false;
    }
    // End Lọc lien he them moi

    //Lọc nhân viên them moi
    $scope.arraynewNVFinded = [];
    $scope.arraynewStaffs = [];
    $scope.showtable_ho_va_ten_new = false;

    $http.get(window.location.origin + '/api/Api_NhanvienKD')
            .then(function (response) {
                if (response.data) {
                    $scope.arraynewStaffs = response.data;
                    $scope.arraynewNVFinded = $scope.arraynewStaffs.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onNhanVienNewFind = function () {
        if (!$scope.new.HO_VA_TEN) {
            $scope.arraynewNVFinded = $scope.arraynewStaffs.map(function (item) {
                return item;
            });
        }
        $scope.arraynewNVFinded = $scope.arraynewStaffs.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.new.HO_VA_TEN.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfonewStaff = function (staff) {
        $scope.new = staff;
        $scope.showtable_ho_va_ten_new = false;
    }
    // End Lọc nhân viên them moi
   
});


app.controller('purphutrachCtrl', function (purphutrachService, $scope) {
    $scope.load_purphutrach = function () {
        purphutrachService.get_purphutrach().then(function (a) {
            $scope.listpurphutrach = a;
        });
    };

    $scope.load_nhanvienpurphutrach = function () {
        purphutrachService.get_nhanvienpurphutrach().then(function (a) {
            $scope.listnhanvienpurphutrach = a;
        });
    };

    $scope.load_lienhe = function () {
        purphutrachService.get_idlienhe().then(function (a) {
            $scope.listlienhe = a;
        });
    };


    $scope.load_purphutrach();
    $scope.load_nhanvienpurphutrach();
    $scope.load_lienhe();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            ID_LIEN_HE: $scope.id_lien_he,
            PUR_PHU_TRACH: $scope.pur_phu_trach,
            NGAY_BAT_DAU_PHU_TRACH: $scope.ngay_bat_dau_phu_trach,
            NGAY_KET_THUC_PHU_TRACH: $scope.ngay_ket_thuc_phu_trach,
            TRANG_THAI: $scope.trangthai,
        }
        purphutrachService.add_purphutrach(data_add).then(function (response) {
            $scope.load_purphutrach();
        });
    };

    $scope.save = function (id) {
        var data_save = {
            ID: id,
            ID_LIEN_HE: $scope.item.ID_LIEN_HE,
            PUR_PHU_TRACH: $scope.item.PUR_PHU_TRACH,
            NGAY_BAT_DAU_PHU_TRACH: $scope.item.NGAY_BAT_DAU_PHU_TRACH,
            NGAY_KET_THUC_PHU_TRACH: $scope.item.NGAY_KET_THUC_PHU_TRACH,
            TRANG_THAI: $scope.item.TRANG_THAI,
        }
        purphutrachService.save_purphutrach(id, data_save).then(function (response) {
            $scope.load_purphutrach();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        purphutrachService.delete_purphutrach(id, data_delete).then(function (response) {
            $scope.load_purphutrach();
        });
    };
});

// Đơn hàng dự kiến
app.controller('DonhangdukienCtrl', function (DonhangdukienService, $scope,$http) {
    $scope.Donhangdukien = function () {
        var username = $('#username').val();
        DonhangdukienService.get_donhangdukien(username,macongty).then(function (a) {
            $scope.donhangdukien = a;
        });
        DonhangdukienService.get_khachhang().then(function (b) {
            $scope.danhsachkhachhang = b;
        });
    };
    $scope.Donhangdukien();
    var username = $('#username').val();
    $scope.add = function () {

        var data_add = {
            MA_DU_KIEN: $scope.madukien,
            MA_KHACH_HANG: $scope.makhachhang,
            THANH_CONG: $scope.thanhcong,
            THAT_BAI: $scope.thatbai,
            ID_LIEN_HE : $scope.id_lien_he,
            LY_DO_THAT_BAI: $scope.lydothatbai,
            SALES_QUAN_LY : username,
            TRUC_THUOC: macongty
        }


        DonhangdukienService.add(data_add).then(function (response) {
            $scope.Donhangdukien();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {

        var data_update = {
            MAU_DU_KIEN: $scope.item.MAU_DU_KIEN,
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            THANH_CONG: $scope.item.THANH_CONG,
            THAT_BAI: $scope.item.THAT_BAI,
            LY_DO_THAT_BAI: $scope.item.LY_DO_THAT_BAI,
            TRUC_THUOC: $scope.item.TRUC_THUOC
        }
        DonhangdukienService.save(id, thanhcong, thatbai, data_update).then(function (response) {
            $scope.Donhangdukien();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MAU_DU_KIEN: id
        }
        DonhangdukienService.delete(id, data_delete).then(function (response) {
            $scope.Donhangdukien();
        });
    };
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);

    $scope.load_create_dukien = function () {

        $('#makhachhang').text(url);
    };
    $scope.load_create_dukien();

    $scope.arrayLHFinded = [];
    $scope.arrayLH = [];
    $scope.showtable_id_lien_he = false;

    $scope.lienhekh = function (url) {
        //get data liên hệ
        $http.post(window.location.origin + '/api/Api_LienHeKhachHang/' + url)
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayLH = response.data;
                     $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });
    }
    $scope.lienhekh(url)


    //hàm tìm kiếm
    $scope.onLienHeFind = function () {
        if (!$scope.NGUOI_LIEN_HE) {
            $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                return item;
            });
        }
        $scope.arrayLHFinded = $scope.arrayLH.filter(function (item) {
            if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.arrayLienHe.nguoi_lien_he.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoLH = function (p_dt) {
        $scope.id_lien_he = p_dt.ID_LIEN_HE;
        $scope.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
        $scope.showtable_id_lien_he = false;
    }

    $scope.addnew = function () {
        var makh = $('#makhachhang').text();
        var data_add = {
            MA_DU_KIEN: $scope.madukien,
            MA_KHACH_HANG: makh,
            THANH_CONG: $scope.thanhcong,
            THAT_BAI: $scope.thatbai,
            ID_LIEN_HE: $scope.id_lien_he,
            LY_DO_THAT_BAI: $scope.lydothatbai,
            SALES_QUAN_LY: username,
            TRUC_THUOC: macongty
        }
        DonhangdukienService.add(data_add).then(function (response) {
            SuccessSystem("Bạn đã thêm thành công đơn dự kiến "+ response.data);
            window.location = "/Baogia/Index/" + response.data;
            //$scope.Donhangdukien();
        });
    };
});

app.controller('productdetailsCtrl', function (productdetailsService, $scope) {
    $scope.load_productdetails = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        productdetailsService.get_productdetails(url).then(function (a) {
            $scope.list_productdetails = a;
        });
    };
    $scope.load_productdetails();
});



// Các phần bổ trợ,không sửa xóa,viết code js ở trên đoạn này


function reload() {
    location.reload();
}

function change() {
    $('.listmenu').toggle();
}

function accept() {
    $('.listmenu').css('display', 'none');
    reload();
}
app.directive('checkList', function () {
    return {
        scope: {
            list: '=checkList',
            value: '@'
        },
        link: function (scope, elem, attrs) {
            var handler = function (setup) {
                var checked = elem.prop('checked');
                var index = scope.list.indexOf(scope.value);

                if (checked && index == -1) {
                    if (setup) elem.prop('checked', false);
                    else scope.list.push(scope.value);
                } else if (!checked && index != -1) {
                    if (setup) elem.prop('checked', true);
                    else scope.list.splice(index, 1);
                }
            };

            var setupHandler = handler.bind(null, true);
            var changeHandler = handler.bind(null, false);

            elem.on('change', function () {
                scope.$apply(changeHandler);
            });
            scope.$watch('list', setupHandler, true);
        }
    };
});

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.filter('stringToDate', function ($filter) {
    return function (ele, dateFormat) {
        return $filter('date')(new Date(ele), dateFormat);
    }
})

function help_left() {
    $('.help_left').show();
    $('.nohelp_left').hide();
    $('.container_right').hide();
}

function nohelp_left() {
    $('.help_left').hide();
    $('.nohelp_left').show();
    $('.container_right').show();
}

function help_right() {
    $('.help_right').show();
    $('.nohelp_right').hide();
    $('.container_left').hide();
}

function nohelp_right() {
    $('.help_right').hide();
    $('.nohelp_right').show();
    $('.container_left').show();
}

// End bổ trợ




