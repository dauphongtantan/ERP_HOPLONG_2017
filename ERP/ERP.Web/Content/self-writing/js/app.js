
var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngMask', 'ngRoute', 'smart-table', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngMaterial', 'debounce', "ui.router"]);
var LandingPageController = function ($rootScope, $scope, $http, $location, config) {
    //$rootScope.$on('$routeChangeStart', function (event) {
    //    $http({
    //        method: 'GET',
    //        url: '/Account/CheckSession'
    //    }).then(function (response) {
    //        if (response.data == "" && location.href.indexOf("expire") == -1) {
    //            event.preventDefault();
    //            $location.path("/expire");
    //        }
    //    }, function (error) {
    //        ConnectFail();
    //    });
    //});
    //$rootScope.title = "Trang chủ";
    //$rootScope.dashboard = true;



}
app.controller('LandingPageController', LandingPageController);
var configFunction = function ($routeProvider) {
    $routeProvider.
        when('/nhap-kho', {
            templateUrl: 'store/insert',
            controller: 'StoreInsertController'
        }).when('/', {
            templateUrl: 'home/dashBoard',
            controller: 'DashBoardController',
        }).when('/xuat-kho', {
            templateUrl: 'store/export',
            controller: 'StoreExportController'
        }).when('/chuyen-kho', {
            templateUrl: 'store/exchange',
            controller: 'StoreExchangeController'
        }).when('/expire', {
            templateUrl: 'home/expire'
        })
        .otherwise({ redirectTo: '/' });
}
configFunction.$inject = ['$routeProvider'];

app.$inject = ['$scope'];
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);

app.config(configFunction);

app.constant('config', {
    FAIL: "-1",
    INPUT_ERROR: "-2",
});

function LamTron(number) {
    var so = number;
    var phantram = Math.ceil(so / 100);
    var ketqua = phantram * 100;

    return ketqua;
}



function ErrorSystem() {
    new PNotify({
        title: 'Thất bại',
        text: 'Lỗi hệ thống, Xin vui lòng thử lại sau',
        addclass: 'bg-danger'
    });
}
function ConnectFail() {
    new PNotify({
        title: 'Thông báo',
        text: 'Không thể kết nối được server. Vui lòng kiểm tra đường truyền mạng và thử lại',
        addclass: 'bg-danger'
    });
}
function InputFail() {
    new PNotify({
        title: 'Thất bại',
        text: 'Dữ liệu nhập vào sai. Kiểm tra lại các trường dữ liệu kho và chi tiết số lượng kho hàng của hàng hóa',
        addclass: 'bg-warning'
    });
}
function Success() {
    new PNotify({
        title: 'Thành công',
        text: 'Xử lý dữ liệu thành công.',
        addclass: 'bg-primary'
    });
}
function Norecord() {

    new PNotify({
        title: 'Thông tin',
        text: 'Không có dữ liệu phù hợp được tìm thây',
        addclass: 'alert alert-styled-left',
        type: 'info'
    });
}
function ConvertToDate(input) {
    var date = input.split("/");
    return date[2] * 365 + date[1] * 12 + date[0];
}
$('body').click(function (event) {
    if ($(event.target).is('.tableselect') == false && $(event.target).is('.showtableselect') == false) {
        $(".tableselect").css({ "display": "none" });
    }
});


function ErrorSystem(errorString) {
    new PNotify({
        title: 'Thất bại',
        text: errorString,
        addclass: 'bg-danger'
    });
}

function SuccessSystem(errorString) {
    new PNotify({
        title: 'Thành Công',
        text: errorString,
        addclass: 'bg-info'
    });
}


//app.filter('number', ['$filter', function ($filter) {
//    return function (input, symbol, fraction) {
//        if (input) {
//            var decimal = input.toString().split('.')[1],
//              value = input.toString().split('.')[0],
//              filtered = value.replace(/(?=(\d\d\d)$)/g, ".");
//            return (decimal) ? (fraction > 0 ? filtered + '.' + decimal.slice(0, fraction) : filtered) : filtered;
//        } else {
//            return 0
//        }
//    }
//}])