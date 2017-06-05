app.controller('PrintPhieuXuatKhoCtrl', function ($scope, $http) {
    //this gets the full url
    var macongty = $('#macongty').val();
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return


    //hàm tìm kiếm
    $scope.getdataphieuxuatkho = function (sochungtu) {
        var so_luong = 0;
        var tong_tien = 0;
        $http.post(window.location.origin + '/api/Api_XuatKho/PrintPhieuXuatKho/' + sochungtu + '/' + macongty)
         .then(function (response) {
             if (response.data) {
                 $scope.thongtinbaogia = response.data;
                 $scope.thongtinchung = $scope.thongtinbaogia.ChungPhieuXuatKho;
                 $scope.thongtinchitiet = $scope.thongtinbaogia.ChiTietPhieuXuatKho;
             }
             for (i = 0; i < $scope.thongtinchitiet.length; i++) {
                 so_luong = so_luong + $scope.thongtinchitiet[i].SO_LUONG;
                 tong_tien = tong_tien + $scope.thongtinchitiet[i].THANH_TIEN
             }
             $scope.tongsoluong = so_luong;
             $scope.tong_tien = tong_tien;
             $scope.so_tien_bang_chu = docso(parseInt($scope.tong_tien));
         }, function (error) {
             console.log(error);
         })
    }
    $scope.getdataphieuxuatkho(url);
    $scope.CurrentDate = new Date();
    //$scope.getTotal = function () {
    //    var total = 0;
    //    for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
    //        var product = $scope.thongtinchitiet[i];
    //        total += product.THANH_TIEN;
    //    }
    //    return total;
    //}



    $scope.printToCart = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="styl  esheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();

    }

    var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    function dochangchuc(so, daydu) {
        var chuoi = "";
        chuc = Math.floor(so / 10);
        donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + mangso[chuc] + " mươi";
            if (donvi == 1) {
                chuoi += " mốt";
            }
        } else if (chuc == 1) {
            chuoi = " mười";
            if (donvi == 1) {
                chuoi += " một";
            }
        } else if (daydu && donvi > 0) {
            chuoi = " lẻ";
        }
        if (donvi == 5 && chuc >= 1) {
            chuoi += " lăm";
        } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            chuoi += " " + mangso[donvi];
        }
        return chuoi;
    }
    function docblock(so, daydu) {
        var chuoi = "";
        tram = Math.floor(so / 100);
        so = so % 100;
        if (daydu || tram > 0) {
            chuoi = " " + mangso[tram] + " trăm";
            chuoi += dochangchuc(so, true);
        } else {
            chuoi = dochangchuc(so, false);
        }
        return chuoi;
    }
    function dochangtrieu(so, daydu) {
        var chuoi = "";
        trieu = Math.floor(so / 1000000);
        so = so % 1000000;
        if (trieu > 0) {
            chuoi = docblock(trieu, daydu) + " triệu";
            daydu = true;
        }
        nghin = Math.floor(so / 1000);
        so = so % 1000;
        if (nghin > 0) {
            chuoi += docblock(nghin, daydu) + " nghìn";
            daydu = true;
        }
        if (so > 0) {
            chuoi += docblock(so, daydu);
        }
        return chuoi;
    }
    function docso(so) {
        if (so == 0) return mangso[0];
        var chuoi = "", hauto = "";
        do {
            ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);
        return chuoi;
    }

});
