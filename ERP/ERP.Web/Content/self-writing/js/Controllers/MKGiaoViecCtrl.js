app.controller('MKGiaoViecCtrl', function ($http, $scope) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();

    $http.post('/api/Api_MarketingGiaoViec/ListNhanVienHL').then(function (response) {
        $scope.list_nhanvienHL = response.data;
    });

    $scope.transfer = function (item) {
        $scope.item = item;
        CKEDITOR.instances.muctieunhanvien.setData('');
        CKEDITOR.instances.nhiemvunhanvien.setData('');
        CKEDITOR.instances.nhiemvuphongban.setData('');
        CKEDITOR.instances.thongbaomarketing.setData('');
    };

    $scope.giaoviec = function () {
        $("textarea[name=muctieunhanvien]").val(CKEDITOR.instances.muctieunhanvien.getData());
        var muctieunhanvien = $("[name=muctieunhanvien]").val();

        $("textarea[name=nhiemvunhanvien]").val(CKEDITOR.instances.nhiemvunhanvien.getData());
        var nhiemvunhanvien = $("[name=nhiemvunhanvien]").val();

        $("textarea[name=nhiemvuphongban]").val(CKEDITOR.instances.nhiemvuphongban.getData());
        var nhiemvuphongban = $("[name=nhiemvuphongban]").val();

        $("textarea[name=thongbaomarketing]").val(CKEDITOR.instances.thongbaomarketing.getData());
        var thongbaomarketing = $("[name=thongbaomarketing]").val();
        
        var data_add = {
            MA_PHONG_BAN_SALE: 'SALE_HL',
            MA_PHONG_BAN_MARK: 'MARK_HL',
            NOI_DUNG_MARK: thongbaomarketing,
            MA_PHONG_BAN: $scope.item.MA_PHONG_BAN,
            NGUOI_CAP_NHAT: username,
            NHIEM_VU_PHAI_LAM: nhiemvuphongban,
            USERNAME: $scope.item.USERNAME,
            NHIEM_VU_CHI_TIET: nhiemvunhanvien,
            MUC_TIEU_CONG_VIEC: muctieunhanvien,
        }

        $http.post('/api/Api_MarketingGiaoViec/PostHT_THONG_BAO_MARKETING', data_add).then(function (response) {
            SuccessSystem("Thành công");
            $(function () {
                setTimeout(function () {
                    window.location.href = "/ThongBao/Index";

                }, 2000);
            });
        }, function errorCallback(response) {
            ErrorSystem('Lỗi không thêm được');
        });

    };
});