
app.controller('ctrDanhSachPhieuThuNganHang', controller);
controller.$inject = ['$scope', 'DataService'];

function controller($scope, DataService) {
    $scope.title = 'controller';

    // Danh sách tài khoản ngân hàng
    $scope.listTknh = [
    ];

    // Danh sách phiếu thu ngân hàng
    $scope.listPhieuThu = [
    ];

    $scope.itemsByPage = 10;

    $scope.getTaiKhoanNganHang = function () {
        var data = {};
        $scope.listTknh = [];

        function success(response) {
            $scope.listTknh = response.data;
        }

        function error(response) {
            console.log(response);
        }

        DataService.getTaiKhoanNganHang(data, success, error, $('#container'));
    };

    var pagination;
    $scope.getDanhSachPhieuThuNganHang = function (tableState) {
        pagination = tableState ? tableState.pagination : pagination;

        var current_page = pagination.start + 1;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var page_size = pagination.number || 10;  // Number of entries showed per page.*/
        //return;

        var so_tai_khoan = $scope.so_tai_khoan;
        var from_day = $scope.from_day ? $scope.from_day.format('YYYY-MM-DD') : null;
        var to_day = $scope.to_day ? $scope.to_day.format('YYYY-MM-DD') : null;
        var data = {
            page_size: page_size,
            current_page: current_page,
            so_tai_khoan: so_tai_khoan,
            from_day: from_day,
            to_day: to_day
        };

        $scope.listTknh = [];

        function success(response) {
            var data = response.data;
            $scope.listPhieuThuCollection = data.data;
            pagination.numberOfPages = data.max_page;//set the number of pages so the pagination can update
            pagination.start = data.current_page - 1;//set the current page so the pagination can update
        }

        function error(response) {
            console.log(response);
        }



        DataService.getDanhSachPhieuThuNganHang(data, success, error);
    }

    $scope.selectTaiKhoanNganHang = function (tknh) {
        $scope.so_tai_khoan = tknh.SO_TAI_KHOAN;
    };


}
