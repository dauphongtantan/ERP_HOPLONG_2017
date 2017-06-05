
app.controller('FeedBackCtrl', function ($scope, $http) {

    $scope.lisDS = [];
    var nguoiduyet = $('#nguoiduyet').val();
    // Lấy list DS phản hồi
    $http.get(window.location.origin + '/api/Api_HT_PHAN_HOI_PHAN_MEM/GetHT_PHAN_HOI_PHAN_MEM/' + nguoiduyet)
    .then(function (response) {
        if (response.data) {
            $scope.lisDS = response.data;
        }
    }, function (error) {
        console.log(error);
    });

    $scope.edit = function (item, index) {
        $scope.item = item;
        var thongtinvalue = $('.thongtinphanhoi-' + index).html();
        CKEDITOR.instances.edit_thong_tin_phan_hoi.setData(thongtinvalue);
    };

    // Update chấm điểm
    var usernamenguoiduyet = $('#usernamenguoiduyet').val();
    $scope.SaveChamDiem = function () {
        $("textarea[name=edit_thong_tin_phan_hoi]").val(CKEDITOR.instances.edit_thong_tin_phan_hoi.getData());
        var phanhoi = $("[name=edit_thong_tin_phan_hoi]").val();
        $http({
            method: 'PUT',
            url: '/api/Api_HT_PHAN_HOI_PHAN_MEM/PutHT_PHAN_HOI_PHAN_MEM',
            data: {
                ID: $scope.item.ID,
                NHAN_VIEN_PHAN_HOI: $scope.item.NHAN_VIEN_PHAN_HOI,
                THONG_TIN_PHAN_HOI:phanhoi,
                THONG_TIN_PHAN_HOI_TOT: $scope.item.Tot,
                THONG_TIN_PHAN_HOI_TRUNG_BINH: $scope.item.TB,
                THONG_TIN_PHAN_HOI_KHONG_TOT: $scope.item.KhongTot,
                THONG_TIN_PHAN_HOI_LUNG_TUNG: $scope.item.Kem,
                NGUOI_DUYET: usernamenguoiduyet,
                TINH_DIEM: $scope.item.TINH_DIEM

            }
        }).then(function (response) {
            $scope.data1 = response.data;
            if (!$scope.data1) {
                ErrorSystem();
            }


            else {
                new PNotify({
                    title: 'Thành công',
                    text: 'Chấm điểm thành công',
                    addclass: 'bg-primary'
                });
            }
        }, function (error) {
            ConnectFail();
        });
    }





    // Save phản hồi
    var m = moment().format("DD/MM/YYYY");
    var nhanvien = $('#nhanvienphanhoi').val();
    
    //Get Danh sách dự kiến theo sale
    $scope.Save = function () {
        $("textarea[name=noidungphanhoi]").val(CKEDITOR.instances.noidungphanhoi.getData());
        var danhmuc = $("[name=noidungphanhoi]").val();
        $http({
            method: 'POST',
            url: '/api/Api_HT_PHAN_HOI_PHAN_MEM/PostHT_PHAN_HOI_PHAN_MEM',
            data: {
                NGAY_PHAN_HOI: m,
                NHAN_VIEN_PHAN_HOI: nhanvien,
                THONG_TIN_PHAN_HOI: danhmuc,
            }
        }).then(function (response) {
            $scope.data1 = response.data;
            if (!$scope.data1) {
                ErrorSystem();
            }


            else {
                CKEDITOR.instances.noidungphanhoi.setData('');
                new PNotify({
                    title: 'Thành công',
                    text: 'Phản hồi của bạn đã được gửi',
                    addclass: 'bg-primary'
                });
            }
        }, function (error) {
            ErrorSystem();
        });
    }
})