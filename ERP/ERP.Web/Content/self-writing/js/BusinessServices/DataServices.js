
    angular
        .module('myApp')
        .service('DataService', DataService);

    DataService.$inject = ['ajaxService'];

    function DataService(ajaxService) {

        var service = {
            getTaiKhoanNganHang: getTaiKhoanNganHang,
            getDanhSachPhieuThuNganHang: getDanhSachPhieuThuNganHang,
            getDanhSachPhieuChiNganHang: getDanhSachPhieuChiNganHang,
            getDanhSachPhieuThuTienMat: getDanhSachPhieuThuTienMat,
            getDanhSachPhieuChiTienMat: getDanhSachPhieuChiTienMat,
            
        };

        return service;

        function getTaiKhoanNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_LoaiTKnganhangnoibo", successFunction, errorFunction, ui);
        }

        function getDanhSachPhieuThuNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_NganHang/", successFunction, errorFunction, ui);
        }
        function getDanhSachPhieuChiNganHang(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_NH_UNC", successFunction, errorFunction, ui);
        }
        function getDanhSachPhieuThuTienMat(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_QUY_PHIEU_THU", successFunction, errorFunction, ui);
        }
        function getDanhSachPhieuChiTienMat(data, successFunction, errorFunction, ui) {
            ajaxService.AjaxGetWithData(data, "/api/Api_QUY_PHIEU_CHI", successFunction, errorFunction, ui);
        }
        
    };