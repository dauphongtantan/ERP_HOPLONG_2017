
    app.controller('ctrThamChieuChungTu', controller);

    function controller($scope, DataService, $uibModalInstance, items) {
        $scope.title = 'controller';

        $scope.loaichungtu = 'LoaiChungTu';
        $scope.showchungtu = true;

        $scope.valueLoaiChungTu = [];

        $scope.valueselected_CTTC = '';
        $scope.valueselected_LoaiChungTu_CTTC = '';

        $scope.dataFinded = [];
        $scope.chung_tu_selected = [];

        if (items.length) {
            items.forEach(function (item) {
                $scope.dataFinded.push(item);
                $scope.chung_tu_selected.push(item);
            });
        }

        $scope.changeTypeThamChieu = function ($event) {
            if ($scope.loaichungtu != 'DoiTuong') {
                $scope.showchungtu = true;
            } else {
                $scope.showchungtu = false;
            }
            $scope.valueselected_CTTC = '';
            $scope.valueselected_LoaiChungTu_CTTC = '';

            $scope.valueLoaiChungTu = [];
            getValue_CTTC($scope.loaichungtu);
        }

        getValue_CTTC($scope.loaichungtu);
		function getValue_CTTC(p_type)  {
            var data = {};
            
            function success(response) {
                if (response.data) {
                     if (p_type != 'DoiTuong') {
                         $scope.valueLoaiChungTu = response.data.map(function (item) {
                             if ($scope.loaichungtu != 'LoaiChungTu') {
                                item.name = item.ma_chung_tu
                             } else {
                                item.name = item.ma_loai_chung_tu
                             }
                             return item;
                        });
                     } else {
                        $scope.valueLoaiChungTu = response.data;
                     }
                 }
            }

            function error(response) {
                console.log(response);
            }

            switch (p_type) {
                case 'LoaiChungTu':
                    DataService.getDmLoaiChungTu(data, success, error, $('#container'));
                    break;
                case 'DoiTuong':
                    DataService.getDoiTuong(data, success, error, $('#container'));
                    break;
                default:
                    DataService.getDmChungTu(data, success, error, $('#container'));
                    break
            }
            
            
        };

        $scope.ok = function () {
            if ($scope.chung_tu_selected) {
                $uibModalInstance.close($scope.chung_tu_selected);
            } else {
                alert("Bạn Cần Chọn Một Chứng Từ Tham Chiếu!")
            }         
        };
        $scope.cancel = function () {
            //it dismiss the modal 
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showSlected = function (p_dt) {
            $scope.valueselected_CTTC = p_dt;
        }

        $scope.getData = function () {
            $scope.dataFinded = [];
            $scope.ma_chung_tu = '';
            
            function success(response) {
                $scope.joinArray(response.data);
            }

            function error(response) {
                console.log(response);
            }

            switch($scope.loaichungtu) {
                case 'LoaiChungTu':
                    var data = {
                        MLCT: $scope.valueselected_LoaiChungTu_CTTC.ma_loai_chung_tu
                    };
                    DataService.findDmChungTuWithMaLoaiChungTu(data, success, error, $('#container'));
                    break;
                case 'DoiTuong':
                    var data = {
                        MCT: $scope.valueselected_CTTC.ma_cong_ty
                    };
                    DataService.findDmChungTuWithMaCongTy(data, success, error, $('#container'));
                    break;
                default:
                    $scope.getDataSoHoaDon();
                    break
            }
        }

        $scope.getDataSoHoaDon = function () {
            let arrResult = $scope.valueLoaiChungTu.filter(item => {
                return $scope.valueselected_LoaiChungTu_CTTC.ma_chung_tu == item.ma_chung_tu;
            });
            $scope.joinArray(arrResult);
        }

        $scope.joinArray = function (arrResult) {
            $scope.dataFinded = [];
            $scope.chung_tu_selected.forEach(function (item) {
                $scope.dataFinded.push(item);
            });
            arrResult.forEach(function (item) {
                let t_temp = $scope.dataFinded.find(function (item1) {
                    return (item1.ma_chung_tu == item.ma_chung_tu)
                });
                if (!t_temp) {
                    $scope.dataFinded.push(item);
                }
            });
        }

        $scope.changeChecked = function (valuefind) {
            let ishave = false;
            let t_index= $scope.chung_tu_selected.findIndex(function (item) {
                if (item.ma_chung_tu == valuefind.ma_chung_tu) {
                    return true;
                } else {
                    return false;
                }
            });

            if (t_index >= 0) {
                valuefind.selected = false;
                $scope.chung_tu_selected.splice(t_index, 1);
            } else {
                valuefind.selected = true;
                $scope.chung_tu_selected.push(valuefind);
            }
        }
    }

