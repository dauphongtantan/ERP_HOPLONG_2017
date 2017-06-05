app.controller('LoadChiTietBaiVietCtrl', function (chitietbaivietService,$http, $scope) {
    $scope.load_chitietbaiviet = function () {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var pathArray = window.location.pathname.split('/');
        chitietbaivietService.get_chitietbaiviet(url).then(function (a) {
            $scope.listchitiet = a;
        });
    };
    $scope.load_chitietbaiviet();

    $scope.edit = function (item) {
        $scope.item = item;
        var noidungvalue = $('.' + item.MA_BAI_VIET + '-1').html();
        CKEDITOR.instances.editnoidung.setData(noidungvalue);
    }

    $scope.save = function (mabaiviet) {
        $("textarea[name=editnoidung]").val(CKEDITOR.instances.editnoidung.getData());
        var editnoidung = $("[name=editnoidung]").val();
        var data_save = {
            MA_BAI_VIET: mabaiviet,
            NOI_DUNG_BAI_VIET: editnoidung,
            TIEU_DE_BAI_VIET: $scope.item.TIEU_DE_BAI_VIET,
        }
        chitietbaivietService.save(mabaiviet, data_save).then(function (response) {
            $scope.load_chitietbaiviet();
        });
    }
});