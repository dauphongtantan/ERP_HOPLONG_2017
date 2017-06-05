// Code goes here
//var myApp = angular.module("myApp", []);
app.directive('exportToCsv', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var el = element[0];
            element.bind('click', function (e) {
                var row = document.getElementById("myTable").rows.length;
                var table = e.target.nextElementSibling;
                var csvString = '';
                for (var i = 0; i < row; i++) {
                    var rowData = table.rows[i].cells;
                    for (var j = 0; j < rowData.length; j++) {
                        csvString = csvString + rowData[j].innerHTML + ",";
                    }
                    csvString = csvString.substring(0, csvString.length - 1);
                    csvString = csvString + "\n";
                }
                csvString = csvString.substring(0, csvString.length - 1);
                var a = $('<a/>', {
                    style: 'display:none',
                    href: 'data:application/octet-stream;base64,' + btoa(csvString),
                    download: 'emailStatistics.csv'
                }).appendTo('body')
                a[0].click()
                a.remove();
            });
        }
    }
});

app.controller('sampleController', function ($scope) {
    $scope.message = "";
});
