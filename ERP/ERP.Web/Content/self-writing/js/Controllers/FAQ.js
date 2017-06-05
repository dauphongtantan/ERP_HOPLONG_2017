app.controller('FAQCtrl', function ($scope, $http) {
    $scope.lisDSPhanHoi = [];
    var nguoiduyet = $('#nguoiduyet').val();
    // Lấy list DS phản hồi
    function init() {
        $http.get(window.location.origin + '/api/Api_HT_PHAN_HOI_PHAN_MEM/GetPHAN_HOI_PHAN_MEM/')
    .then(function (response) {
        if (response.data) {
            $scope.lisDSPhanHoi = response.data;
        }
    }, function (error) {
        console.log(error);
    });

        $http.get(window.location.origin + '/api/Api_HT_PHAN_HOI_PHAN_MEM/GetPHAN_HOI_PHAN_MEM_TL/')
            .then(function (response) {
                if (response.data) {
                    $scope.lisDSPhanHoichuatraloi = response.data;
                }
            }, function (error) {
                console.log(error);
            });
    }
    init();

    $scope.showdata = function () {
        if ($("#item-{{$index}}").css("display") == "none") {
            $("#item-{{$index}}").css({ "display": "block" });
        }
        else {
            $("#item-{{$index}}").css({ "display": "block" });
        }
    }

    $scope.LocFAQ = function (tukhoa) {
        if (tukhoa == '') {
            init();
        }
        $http.get(window.location.origin + '/api/Api_HT_PHAN_HOI_PHAN_MEM/GetPHAN_HOI_PHAN_MEM_TK/' + tukhoa)
    .then(function (response) {
        if (response.data) {
            $scope.lisDSPhanHoi = response.data;
        }
    }, function (error) {
        console.log(error);
    });
    }

    $scope.Post = function (item) {
        var data_save = {
            TRA_LOI_PHAN_HOI: item.TRA_LOI_PHAN_HOI
        }
        $http.put('/api/Api_HT_PHAN_HOI_PHAN_MEM/PutTraLoi_PHAN_HOI_PHAN_MEM/' + item.ID, data_save).then(function (response) {
            SuccessSystem('Trả lời thành công')
            init();
        }, function (error) {
            ErrorSystem("Lỗi khi trả lời");
        });
    }
})