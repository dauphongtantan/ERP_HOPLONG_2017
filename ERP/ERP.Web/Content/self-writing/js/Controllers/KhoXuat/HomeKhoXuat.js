app.controller('GiuHangCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListHangGiu");
                break;
            case 1:
                $location.url("/HangGiuChuaBan");
                break;
            case 2:
                $location.url("/HangGiuDaBan");
                break;
            case 3:
                $location.url("/HangGiuQuaNgayGiaoHang");
                break;
            case 4:
                $location.url("/HangGiuSapDenNgayXuat");
                break;
        }
    });
});
app.controller('HangCanXuatCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListHangCanXuat");
                break;
            case 1:
                $location.url("/ListHangCanDat");
                break;
            case 2:
                $location.url("/ListHangGiu1");
                break;
            case 3:
                $location.url("/HangChuaGiu");
                break;
                
        }
    });
});
app.controller('XuatHangCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/ListXuatHang");
                break;
            case 1:
                $location.url("/ListBanHang");
                break;
            case 2:
                $location.url("/ListBanHangChuaXuat");
                break;
        }
    });
});
app.config(function ($stateProvider, $urlRouterProvider) {
    // Giữ hàng
    $urlRouterProvider.otherwise('/tab/dash');
    $stateProvider
    .state('ListHangGiu', {
        url: "/ListHangGiu",
        templateUrl: "ListHangGiu",
        controller: "KhoXuatController"
    })
    .state('HangGiuChuaBan', {
        url: "/HangGiuChuaBan",
        templateUrl: "HangGiuChuaBan",
        controller: "KhoXuatController"
    })
    .state('HangGiuDaBan', {
        url: "/HangGiuDaBan",
        templateUrl: "HangGiuDaBan",
        controller: "KhoXuatController"
    })
    .state('HangGiuQuaNgayGiaoHang', {
        url: "/HangGiuQuaNgayGiaoHang",
        templateUrl: "HangGiuQuaNgayGiao",
        controller: "KhoXuatController"
    })
    .state('HangGiuSapDenNgayXuat', {
        url: "/HangGiuSapDenNgayXuat",
        templateUrl: "HangGiuSaoDenNgayXuat",
        controller: "KhoXuatController"
    })
    // Hàng cần xuất
    .state('ListHangCanXuat', {
        url: "/ListHangCanXuat",
        templateUrl: "HangCanXuat",
        controller: "KhoXuatController"
    })
    .state('ListHangCanDat', {
        url: "/ListHangCanDat",
        templateUrl: "HangCanDat",
        controller: "KhoXuatController"
    })
    .state('ListHangGiu1', {
        url: "/ListHangGiu1",
        templateUrl: "ListHangGiu",
        controller: "KhoXuatController"
    })

    .state('HangChuaGiu', {
        url: "/HangChuaGiu",
        templateUrl: "HangChuaGiu",
        controller: "KhoXuatController"
    })
    // Xuất Hàng
    
    .state('ListXuatHang', {
        url: "/ListXuatHang",
        templateUrl: "XuatHang",
        controller: "KhoXuatController"
    })
    .state('ListBanHang', {
        url: "/ListBanHang",
        templateUrl: "BanHang",
        controller: "KhoXuatController"
    })
     .state('ListBanHangChuaXuat', {
         url: "/ListBanHangChuaXuat",
         templateUrl: "BanHangChuaXuat",
         controller: "KhoXuatController"
     })
    ;
})

