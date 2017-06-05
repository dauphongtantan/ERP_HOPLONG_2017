app.controller('TachGopMaCtrl', function ($scope, $http) {
    //Tìm Kiếm hàng hóa
    $scope.load_hanghoa = function (tukhoa) {
        $http.get("/api/Api_FindHH/"+tukhoa)
           .then(function successCallback(response) {
               $scope.dshanghoa = response.data;
           }, function errorCallback(response) {
               console.log(response);
               ErrorSystem("Sự cố hệ thống, Không lấy được dữ liệu hàng hóa, Bạn vui lòng liên hệ với admin để khắc phục");
           });
    };

    //-------------------
    //truyền DỮ LIỆU HH
    $scope.DataTransfer = function (dulieu) {
        $scope.datatruyen = dulieu;
    };
    //--------------------



    //tìm mã hàng điền vào các mã
    $scope.laymahang = function (key,mahang, machuan) {
        if (key == 111)
        {
            $scope.ma_goc_1 = mahang;
            $scope.machuangoc1 = machuan;
        }
            
        if (key == 222)
        {
            $scope.ma_goc_2 = mahang;
            $scope.machuangoc2 = machuan;
        }
            
        if (key == 333)
        {
            $scope.ma_goc_3= mahang;
            $scope.machuangoc3 = machuan;
        }
        if (key == 1)
        {
            $scope.ma_dich_1 = mahang;
            $scope.machuandich1 = machuan;
        }
            
        if (key == 2)
        {
            $scope.ma_dich_2 = mahang;
            $scope.machuandich2 = machuan;
        }
            
        if (key == 3)
        {
            $scope.ma_dich_3 = mahang;
            $scope.machuandich3 = machuan;
        }
            
        if (key == 4)
        {
            $scope.ma_dich_4 = mahang;
            $scope.machuandich4 = machuan;
        }
           
        if (key == 5) {
            $scope.ma_dich_5 = mahang;
            $scope.machuandich5 = machuan;
        }
            
        if (key == 6) {
            $scope.ma_dich_6 = mahang;
            $scope.machuandich6 = machuan;
        }
            
        if (key == 7) {
            $scope.ma_dich_7 = mahang;
            $scope.machuandich7 = machuan;
        }
            
        if (key == 8) {
            $scope.ma_dich_8 = mahang;
            $scope.machuandich8 = machuan;
        }
            
        if (key == 9) {
            $scope.ma_dich_9 = mahang;
            $scope.machuandich9 = machuan;
        }
            
        if (key == 10) {
            $scope.ma_dich_10 = mahang;
            $scope.machuandich10 = machuan;
        }
            
        if (key == 11) {
            $scope.ma_dich_11 = mahang;
            $scope.machuandich11 = machuan;
        }
           
        if (key == 12) {
            $scope.ma_dich_12 = mahang;
            $scope.machuandich12 = machuan;
        }
           
        if (key == 13) {
            $scope.ma_dich_13 = mahang;
            $scope.machuandich13 = machuan;
        }
           
        if (key == 14) {
            $scope.ma_dich_14 = mahang;
            $scope.machuandich14 = machuan;
        }
            
        if (key == 15) {
            $scope.ma_dich_15 = mahang;
            $scope.machuandich15 = machuan;
        }
            
        if (key == 16) {
            $scope.ma_dich_16 = mahang;
            $scope.machuandich16 = machuan;
        }
            
        if (key == 17) {
            $scope.ma_dich_17 = mahang;
            $scope.machuandich17 = machuan;
        }
            
        if (key == 18) {
            $scope.ma_dich_18 = mahang;
            $scope.machuandich18 = machuan;
        }
           
        if (key == 19) {
            $scope.ma_dich19 = mahang;
            $scope.machuandich19 = machuan;
        }
           
        if (key == 20) {
            $scope.ma_dich_20 = mahang;
            $scope.machuandich20 = machuan;
        }
            
        if (key == 21) {
            $scope.ma_dich_21 = mahang;
            $scope.machuandich21 = machuan;
        }
            
        if (key == 22) {
            $scope.ma_dich_22 = mahang;
            $scope.machuandich22 = machuan;
        }
            
        if (key == 23) {
            $scope.ma_dich_23 = mahang;
            $scope.machuandich23 = machuan;
        }
           
        if (key == 24) {
            $scope.ma_dich_24 = mahang;
            $scope.machuandich24 = machuan;
        }
            
        if (key == 25)
        {
            $scope.ma_dich_25 = mahang;
            $scope.machuandich25 = machuan;
        }
            
    }
    //------------------


    //truyền key
    $scope.KeyTransfer = function (item) {
        $scope.key = item;
    };
    //--------------------


   //load danh sách
    $scope.LoadDSTachGopMa = function(){

        $http.get("/api/Api_TachGopMaHang")
          .then(function successCallback(response) {
              $scope.danhsachtachgop = response.data;
          }, function errorCallback(response) {
              console.log(response);
              ErrorSystem("Sự cố hệ thống, Không lấy được dữ liệu tách gộp mã, Bạn vui lòng liên hệ với admin để khắc phục");
          });
    }
    $scope.LoadDSTachGopMa();
    //end load danh sách

    //Thêm mới 
    $scope.AddNew = function () {
        if ($scope.loai_tach == null)
            ErrorSystem("Bạn phải xác định loại tách mã hàng");
        if ($scope.ma_goc_1 == null)
            ErrorSystem("Bạn phải điền mã gốc 1");
        if ($scope.sl_ma_goc_1 == null)
            ErrorSystem("Bạn phải điền số lượng mã gốc 1");

        if ($scope.ma_dich_1 == null)
            ErrorSystem("Bạn phải điền mã đích 1");
        if ($scope.sl_ma_dich_1 == null)
            ErrorSystem("Bạn phải điền số lượng mã đích 1");


        var data_add = {
            LOAI_TACH: $scope.loai_tach,
            MA_HANG_GOC_1: $scope.ma_goc_1,
            SL_MA_GOC_1: $scope.sl_ma_goc_1,
            MA_HANG_GOC_2:$scope.ma_goc_2,
            SL_MA_GOC_2: $scope.sl_ma_goc_2,
            MA_HANG_GOC_3:$scope.ma_goc_3,
            SL_MA_GOC_3: $scope.sl_ma_goc_3,
            MA_HANG_DICH_1: $scope.ma_dich_1,
            SL_MA_DICH_1: $scope.sl_ma_dich_1,
            MA_HANG_DICH_2: $scope.ma_dich_2,
            SL_MA_DICH_2: $scope.sl_ma_dich_2,
            MA_HANG_DICH_3: $scope.ma_dich_3,
            SL_MA_DICH_3: $scope.sl_ma_dich_3,
            MA_HANG_DICH_4: $scope.ma_dich_4,
            SL_MA_DICH_4: $scope.sl_ma_dich_4,
            MA_HANG_DICH_5: $scope.ma_dich_5,
            SL_MA_DICH_5: $scope.sl_ma_dich_5,
            MA_HANG_DICH_6: $scope.ma_dich_6,
            SL_MA_DICH_6: $scope.sl_ma_dich_6,
            MA_HANG_DICH_7: $scope.ma_dich_7,
            SL_MA_DICH_7: $scope.sl_ma_dich_7,
            MA_HANG_DICH_8: $scope.ma_dich_8,
            SL_MA_DICH_8: $scope.sl_ma_dich_8,
            MA_HANG_DICH_9: $scope.ma_dich_9,
            SL_MA_DICH_9: $scope.sl_ma_dich_9,
            MA_HANG_DICH_10: $scope.ma_dich_10,
            SL_MA_DICH_10: $scope.sl_ma_dich_10,
            MA_HANG_DICH_11: $scope.ma_dich_11,
            SL_MA_DICH_11: $scope.sl_ma_dich_11,
            MA_HANG_DICH_12: $scope.ma_dich_12,
            SL_MA_DICH_12: $scope.sl_ma_dich_12,
            MA_HANG_DICH_13: $scope.ma_dich_13,
            SL_MA_DICH_13: $scope.sl_ma_dich_13,
            MA_HANG_DICH_14: $scope.ma_dich_14,
            SL_MA_DICH_14: $scope.sl_ma_dich_14,
            MA_HANG_DICH_15: $scope.ma_dich_15,
            SL_MA_DICH_15: $scope.sl_ma_dich_15,
            MA_HANG_DICH_16: $scope.ma_dich_16,
            SL_MA_DICH_16: $scope.sl_ma_dich_16,
            MA_HANG_DICH_17: $scope.ma_dich_17,
            SL_MA_DICH_17: $scope.sl_ma_dich_17,
            MA_HANG_DICH_18: $scope.ma_dich_18,
            SL_MA_DICH_18: $scope.sl_ma_dich_18,
            MA_HANG_DICH_19: $scope.ma_dich_19,
            SL_MA_DICH_19: $scope.sl_ma_dich_19,
            MA_HANG_DICH_20: $scope.ma_dich_20,
            SL_MA_DICH_20: $scope.sl_ma_dich_20,
            MA_HANG_DICH_21: $scope.ma_dich_21,
            SL_MA_DICH_21: $scope.sl_ma_dich_21,
            MA_HANG_DICH_22: $scope.ma_dich_22,
            SL_MA_DICH_22: $scope.sl_ma_dich_22,
            MA_HANG_DICH_23: $scope.ma_dich_23,
            SL_MA_DICH_23: $scope.sl_ma_dich_23,
            MA_HANG_DICH_24: $scope.ma_dich_24,
            SL_MA_DICH_24: $scope.sl_ma_dich_24,
            MA_HANG_DICH_25: $scope.ma_dich_25,
            SL_MA_DICH_25: $scope.sl_ma_dich_25,
        }

        $http.post("/api/Api_TachGopMaHang", data_add)
          .then(function successCallback(response) {
              SuccessSystem('Bạn đã khởi tạo thành công 1 mã tách');
              $scope.LoadDSTachGopMa();
          }, function errorCallback(response) {
              console.log(response);
              ErrorSystem("Sự cố hệ thống, Không thêm được dữ liệu tách gộp mã, Bạn vui lòng liên hệ với admin để khắc phục");
          });
    }
    //end thêm mới

});
