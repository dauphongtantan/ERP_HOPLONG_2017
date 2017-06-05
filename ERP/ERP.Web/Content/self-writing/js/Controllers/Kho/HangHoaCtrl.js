app.controller('HangHoaCtrl', function (hanghoaService, $scope) {
    var userhienthoi = $("#userhienthoi").val();
    var isadmin = $("#isadmin").val();


    $scope.timkiemhanghoa = function (ma_chuan) {
        hanghoaService.find_hanghoa(ma_chuan).then(function (d) {
            if (d.length > 0) {
                $scope.danhsachtimkiem = d;
            }
            else {
                $scope.danhsachtimkiem = ["Không tìm thấy dữ liệu phù hợp"];
            }

        });
    }
    $scope.loadHangHoa = function (manhomhang, sotrang) {
        var thamso = {
            manhomhang: manhomhang,
            sotrang: sotrang,
            username: userhienthoi,
            isadmin:isadmin
        }
        hanghoaService.get_hanghoa(thamso).then(function (d) {
            $scope.danhsachhanghoa = d;
        });

        hanghoaService.get_nhomhang().then(function (a) {
            $scope.danhsachnhomhang = a;
        });
    };
    $scope.loadQuanTam = function () {
        var quantam = $('#userquantam').val();
        hanghoaService.get_quantam(quantam).then(function (z) {
            $scope.danhsachquantam = z;
        });
    }
    $scope.loadQuanTam();
    //$scope.loadHangHoa('AUTONICS',1);

    //$scope.manhomhang = "AUTONICS";

    $scope.add = function () {

        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=thongso]").val(CKEDITOR.instances.thongso.getData());
        $("textarea[name=donggoi]").val(CKEDITOR.instances.donggoi.getData());
        var thongso = $("[name=thongso]").val();
        var donggoi = $("[name=donggoi]").val();
        var data_add = {
            MA_HANG: $scope.mahang,
            MA_CHUAN: $scope.machuan,
            THONG_SO: $scope.thongso,
            MA_NHAP_HANG: $scope.manhaphang,
            TEN_HANG: $scope.tenhang,
            MA_NHOM_HANG: $scope.manhomhang,
            KHOI_LUONG: $scope.khoiluong,
            XUAT_XU: $scope.xuatxu,
            THONG_SO_KY_THUAT: thongso,
            GIA_NHAP: $scope.gianhap,
            GIA_LIST: $scope.gialist,
            QUY_CACH_DONG_GOI: donggoi,
            DISCONTINUE: $scope.discontinue,
            MA_CHUYEN_DOI: $scope.machuyendoi,
            BAO_HANH: $scope.baohanh,
            DON_VI_TINH: $scope.donvitinh,
            HINH_ANH: name_without_ext,
            GHI_CHU: $scope.ghichu,
            TK_HACH_TOAN_KHO: $scope.tkhachtoankho,
            TK_DOANH_THU: $scope.tkdoanhthu,
            TK_CHI_PHI: $scope.tkchiphi,
            SERIES: $scope.series,
        }
        hanghoaService.add(data_add).then(function (response) {

            SuccessSystem("Bạn đã thêm mới 1 hàng hóa!" + response.data);
            //$scope.loadHangHoa('AUTONICS',1);

            $('#imgInp').val() = '';
        }, function errorCallback(response) {
            SuccessSystem('Thêm không thành công');
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
        var donggoivalue = $('.' + item.MA_HANG + '-1').html();
        CKEDITOR.instances.editdonggoi.setData(donggoivalue);
        var thongsovalue = $('.' + item.MA_HANG + '-2').html();
        CKEDITOR.instances.editthongso.setData(thongsovalue);
    }

    $scope.save = function (mahang) {
        $("textarea[name=editthongso]").val(CKEDITOR.instances.editthongso.getData());
        $("textarea[name=editdonggoi]").val(CKEDITOR.instances.editdonggoi.getData());
        var thongso = $("[name=editthongso]").val();
        var donggoi = $("[name=editdonggoi]").val();
        var a = $('#imgEdit').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_update = {
            MA_HANG: mahang,
            MA_CHUAN: $scope.item.MA_CHUAN,
            THONG_SO: $scope.item.THONG_SO,
            MA_NHAP_HANG: $scope.item.MA_NHAP_HANG,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_NHOM_HANG: $scope.item.MA_NHOM_HANG,
            KHOI_LUONG: $scope.item.KHOI_LUONG,
            XUAT_XU: $scope.item.XUAT_XU,
            THONG_SO_KY_THUAT: thongso,
            GIA_NHAP: $scope.item.GIA_NHAP,
            GIA_LIST: $scope.item.GIA_LIST,
            QUY_CACH_DONG_GOI: donggoi,
            DISCONTINUE: $scope.item.DISCONTINUE,
            MA_CHUYEN_DOI: $scope.item.MA_CHUYEN_DOI,
            BAO_HANH: $scope.item.BAO_HANH,
            DON_VI_TINH: $scope.item.DON_VI_TINH,
            HINH_ANH: name_without_ext,
            GHI_CHU: $scope.item.GHI_CHU,
            TK_HACH_TOAN_KHO: $scope.item.TK_HACH_TOAN_KHO,
            TK_DOANH_THU: $scope.item.TK_DOANH_THU,
            TK_CHI_PHI: $scope.item.TK_CHI_PHI,
            SERIES: $scope.item.SERIES,
        }

        hanghoaService.save(data_update).then(function (response) {
            SuccessSystem('Sửa thành công');
            reload();
        }, function errorCallback(response) {
            ErrorSystem('Không lưu được chi tiết hàng hóa');

        });
    }

    $scope.delete = function (mahang) {
        var data_delete = {
            MA_HANG: mahang
        }

        hanghoaService.delete(mahang, data_delete).then(function (response) {
            SuccessSystem('Xóa thành công');
            reload();

        });
    };
    //$scope.get_tonkho = function (id) {
    //    hanghoaService.get_hangtonkho(id).then(function (a) {
    //        $scope.danhsachtonkho = a;
    //    });
    //};
    //$scope.get_tonkho();
    $scope.getTotal = function (type) {
        var total = 0;
        angular.forEach($scope.danhsachtonkho, function (el) {
            total += el[type];
        });
        return total;
    };

});