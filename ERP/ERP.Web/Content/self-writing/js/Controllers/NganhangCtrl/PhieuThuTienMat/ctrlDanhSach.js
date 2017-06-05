
    app.controller('ctrDanhSach', controller);
    controller.$inject = ['$scope', 'DataService', '$timeout'];

    function controller($scope, DataService, $timeout) {
        $scope.title = 'controller';

        // Danh sách tài khoản ngân hàng

        // Danh sách phiếu thu ngân hàng
        $scope.listPhieuThu = [
        ];
        $scope.itemsByPage = 10;
        var pagination;
        $scope.getDanhSachPhieuThuTienMat = function (tableState) {
            pagination = tableState ? tableState.pagination : pagination;
            //var current_page = pagination.start + 1;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            if (!tableState) {
                pagination.start = 0;
            }
            var page_size = pagination.number || 10;  // Number of entries showed per page.*/
            var current_page = pagination.start / page_size + 1;
            var from_day = $scope.from_day ? $scope.from_day.format('YYYY-MM-DD') : null;
            var to_day = $scope.to_day ? $scope.to_day.format('YYYY-MM-DD') : null;
            var data = {
                page_size: page_size,
                current_page: current_page,
                from_day: from_day,
                to_day: to_day
            };

            function success(response) {
                var data = response.data;
                $scope.listPhieuThuCollection = data.data;
                pagination.numberOfPages = data.max_page;
                //$timeout(function () {
                //    // We must reevaluate the value in case it was changed by a subsequent
                //    // watch handler in the digest.
                //    $scope.$apply(function () {
                //        $scope.listPhieuChiCollection = data.data;
                //        pagination.numberOfPages = data.max_page;//set the number of pages so the pagination can update
                //        pagination.start = data.current_page ;//set the current page so the pagination can update
                //    });
                //}, 1000);
            }
            function error(response) {
                console.log(response);
            }
            DataService.getDanhSachPhieuThuTienMat(data, success, error);
        }
    }
