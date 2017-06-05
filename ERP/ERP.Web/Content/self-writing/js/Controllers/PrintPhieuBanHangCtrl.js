app.controller('PrintPhieuBanHangCtrl', function ($scope, $http) {
    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return


    //hàm tìm kiếm
    $scope.getdataBanHang = function (masobh) {
        $http.post('/api/Api_BanHang/PrintBanHang/' + masobh)
         .then(function (response) {
             if (response.data) {
                 $scope.thongtinbanhang = response.data;
                 $scope.thongtinchung = $scope.thongtinbanhang.BanHang;
                 $scope.thongtinchitiet = $scope.thongtinbanhang.CTBanHang;
             }
         }, function (error) {
             console.log(error);
         })
    }
    $scope.getdataBanHang(url);
    $scope.CurrentDate = new Date();
    //$scope.getTotal = function () {
    //    var total = 0;
    //    for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
    //        var product = $scope.thongtinchitiet[i];
    //        total += product.THANH_TIEN;
    //    }
    //    return total;
    //}

    $scope.backToList = function () {
        window.location.href = "/KinhDoanh/DonBanHang/DonBanHangHome";
    };

    $scope.printToCart = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="styl  esheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();

    }


});
