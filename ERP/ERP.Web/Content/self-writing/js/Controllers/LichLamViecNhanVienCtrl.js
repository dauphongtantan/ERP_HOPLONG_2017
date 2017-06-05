app.controller('LichLamViecNhanVienCtrl', function ($scope, $http) {
    var salehienthoi = $('#salehienthoi').val();

    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();
    var MaPhongBan = $('#maphongban').val();

    var macongty = $('#macongty').val();

    //get data lich lam viec
    $scope.get_datalichlamviec = function (nhanvienthuchien) {
        $http.get("/api/LichLamViec/GetLichLamViec/" + nhanvienthuchien)
         .then(function (response) {
             if (response.data) {
                 $scope.DataLichLamViec = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được dữ liệu lịch làm việc của nhân viên");
         });
        $('#collapseTwo').addClass("navbar-collapse");
    }
    //End get data lịch làm việc

    //Get data_phòng ban
    $scope.get_dataphongban = function (macongty) {
        $http.get("/api/PhongBan/GetPhongBan/" + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.DataPhongBan = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được danh sách phòng ban");
         });
    }
    $scope.get_dataphongban(macongty)
    //end get data phòng ban

    $scope.EditLichLamViec = function (id) {
        var data_save = {
            TIEU_DE_CONG_VIEC: $scope.kq.TIEU_DE_CONG_VIEC,
            NOI_DUNG_CONG_VIEC: $scope.kq.NOI_DUNG_CONG_VIEC,
            DIA_DIEM_LAM_VIEC: $scope.kq.DIA_DIEM_LAM_VIEC,
            THOI_GIAN_BAT_DAU: $scope.kq.THOI_GIAN_BAT_DAU,
            THOI_GIAN_KET_THUC: $scope.kq.THOI_GIAN_KET_THUC,
            TRANG_THAI: $scope.kq.TRANG_THAI,
            GHI_CHU: $scope.kq.GHI_CHU,
            HUY_CONG_VIEC: $scope.kq.HUY_CONG_VIEC
        }
        $http.put("/api/Api_TaiKhoanKH/PutLichLamViec/" + id, data_save).then(function (response) {
            alert('Sửa thành công')
            $scope.get_datalichlamviec($scope.kq.NHAN_VIEN_THUC_HIEN);
        }, function (error) {
            alert("Lỗi khi sửa");
        });
    }

    $scope.delete_lichlamviec = function (id) {
        $http.delete('/api/Api_TaiKhoanKH/DeleteLichLamViec/' + id).then(function (response) {
            alert('Xóa thành công');
            $scope.get_datalichlamviec($scope.kq.NHAN_VIEN_THUC_HIEN);
        }, function (error) {
            alert("Lỗi khi xóa");
        });
    };

    $scope.AddLichLamViec = function () {
        var data_add = {
            TIEU_DE_CONG_VIEC: $scope.tieu_de_cong_viec,
            NOI_DUNG_CONG_VIEC: $scope.noi_dung_cong_viec,
            DIA_DIEM_LAM_VIEC: $scope.dia_diem_lam_viec,
            THOI_GIAN_BAT_DAU: $scope.thoi_gian_bat_dau,
            THOI_GIAN_KET_THUC: $scope.thoi_gian_ket_thuc,
            TRANG_THAI: $scope.trang_thai,
            GHI_CHU: $scope.ghi_chu,
            NHAN_VIEN_THUC_HIEN: Username,
        }
        $http.post('/api/Api_TaiKhoanKH/PostLichLamViec', data_add).then(function (response) {
            alert('Thêm mới thành công');
            window.location.href = "/LichLamViecNhanVien/Index";
        }, function (error) {
            alert("Lỗi khi thêm mới");
        });
    };

    //Get data_nhân viên phòng ban
    $scope.get_datanhanvienphongban = function (maphongban) {
        $http.get("/api/NhanVien/GetNhanVienPhongBan/" + maphongban)
         .then(function (response) {
             if (response.data) {
                 $scope.DataNhanVienPhongBan = response.data;
             }
         }, function (error) {
             alert("Lỗi kết nối không thể lấy được danh sách nhân viên phòng ban");
         });
        $('#collapseOne').addClass("in");
        $('#collapseTwo').removeClass("navbar-collapse");
    }
    //end get data nhân viên phòng ban

    $scope.edit = function (kq) {
        $scope.kq = kq;
    };
    $scope.Loadgiaoviec = function () {
        $http.get('/api/Api_GiaoViec/GetGiaoViec/' + Username).then(function (response) {
            $scope.list_congviec = response.data;
        });
    };
    $scope.Loadgiaoviec();

    $scope.save_giao_viec = function (entry) {
        $scope.entry = entry;
        var data_save = {
            TRANG_THAI: $scope.entry.TRANG_THAI,
            GHI_CHU: $scope.entry.GHI_CHU,
            PHUONG_AN_XU_LY: $scope.entry.PHUONG_AN_XU_LY,
        }
        $http.put('/api/Api_GiaoViec/PutNV_GIAO_VIEC/' + $scope.entry.ID, data_save).then(function (response) {
            SuccessSystem('Sửa thành công')
            $scope.Loadgiaoviec();
        }, function (error) {
            ErrorSystem("Lỗi khi sửa");
        });
    };

    //table expand row
    //mouse over navbar
    $('.navbar').mouseover(function (event) {
        $(this).find('.navbar-tool').show();
    });

    //mouse out of navbar
    $('.navbar').mouseout(function (event) {
        $(this).find('.navbar-tool').hide();
    });

    //on close collapse
    $('.collapse').on('hidden.bs.collapse', function () {
        var target = '#' + $(this).attr('data-parent');
        $(target).removeClass('collapse-open');
    });

    //on open collapse
    $('.collapse').on('shown.bs.collapse', function () {
        var target = '#' + $(this).attr('data-parent');
        $(target).addClass('collapse-open');
    })

    //End table expand row

    $scope.trangthailamviec = ['Đang thực hiện', 'Chưa hoàn thành', 'Đã xong việc'];

    // Chon khach hang bao gia moi

    $scope.arrayNVFinded = [];
    $scope.arrayNV = [];
    $scope.showtable_NV = false;

    $http.get(window.location.origin + '/api/NhanVien/GetNhanVienPhongBan/' + MaPhongBan + '/' + IsAdmin)

     .then(function (response) {
         if (response.data) {
             $scope.arrayNV = response.data;
             $scope.arrayNVFinded = $scope.arrayNV.map(function (item) {
                 return item;
             });
         }
     }, function (error) {
         console.log(error);
     });
    //hàm tìm kiếm
    $scope.onNVFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNVFinded = $scope.arrayNV.map(function (item) {
                return item;
            });
        }
        $scope.arrayNVFinded = $scope.arrayNV.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.ho_va_ten.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoNV = function (p_dt) {
        $scope.ho_va_ten = p_dt.HO_VA_TEN;
        $scope.username = p_dt.USERNAME;
        $scope.showtable_NV = false;
    }

    $scope.newgiaoviec = function () {
        var data = {
            PHUONG_AN_XU_LY: $scope.phuong_an_xu_ly,
            NGAY_GIAO_VIEC: $scope.NGAY_GIAO_VIEC,
            NOI_DUNG_CONG_VIEC: $scope.noi_dung_cong_viec_giao_viec,
            NGAY_HOAN_THANH: $scope.thoi_gian_hoan_thanh_giao_viec,
            NHAN_VIEN_THUC_HIEN: $scope.username,
            GHI_CHU: $scope.ghi_chu_giao_viec,
            TRANG_THAI: $scope.trang_thai_giao_viec,
            NGUOI_GIAO_VIEC: Username,
            HUY_CONG_VIEC: $scope.huy_cong_viec
        }

        $http.post('/api/Api_GiaoViec/PostNV_GIAO_VIEC', data).then(function (response) {
            SuccessSystem('Thành công');
        });
    };

    $scope.showbutton = false;
    function init() {
        $scope.list_dspheduyet = [];
        $http.post(window.location.origin + '/api/Api_DangKyPheDuyetPO/DanhsachpheduyetGV/' + IsAdmin + '/' + Username)
        .then(function (response) {
            $scope.list_dspheduyet = response.data;
            $scope.nguoiduyet = response.data[0].NGUOI_PHE_DUYET
            if ($scope.nguoiduyet == Username || IsAdmin == 'True') {
                $scope.showbutton = true;
            }
            else {
                $scope.showbutton = false;
            }
        });
    }
    init();

    //List giao việc chưa hoàn thành
    function loadlistCV() {
        $http.get(window.location.origin + '/api/Api_GiaoViec/GetGiaoViecChuaHoanThanh/' + Username + '/' + IsAdmin)

  .then(function (response) {
      if (response.data) {
          $scope.ListCVChuaHoanThanh = response.data;
      }
  }, function (error) {
      console.log(error);
  });
    }

    loadlistCV();

    $scope.EditLichLamViecNV = function (item) {
        var data_save = {
            NOI_DUNG_CONG_VIEC: item.NOI_DUNG_CONG_VIEC,
            PHUONG_AN_XU_LY: item.PHUONG_AN_XU_LY,
            NGAY_HOAN_THANH: item.NGAY_HOAN_THANH,
            GHI_CHU: item.GHI_CHU
        }
        $http.put("/api/Api_GiaoViec/PutNV_GIAO_VIEC_CHUA_HT/" + item.ID, data_save).then(function (response) {
            SuccessSystem('Sửa thành công')
            loadlistCV();
        }, function (error) {
            ErrorSystem("Lỗi khi sửa");
        });
    }

    $scope.deleteitem = function (item) {
        $scope.item = item;
    }

    $scope.delete_lichlamviecNV = function () {
        $http.delete('/api/Api_GiaoViec/DeleteNV_GIAO_VIEC_CHUA_HT/' + $scope.item.ID).then(function (response) {
            SuccessSystem('Xóa thành công');
            loadlistCV();
        }, function (error) {
            ErrorSystem("Lỗi khi xóa");
        });
    };
});