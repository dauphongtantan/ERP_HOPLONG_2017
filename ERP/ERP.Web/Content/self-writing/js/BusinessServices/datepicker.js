app.directive("datepicker", function () {
        return {
            restrict: "A",
            scope: false,
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {
                var updateModel = function (date) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(date);
                    });
                };
                var options = {
                    onSelect: function (dateText) {
                        updateModel(dateText);
                        console.log(dateText);
                    }
                };
                elem.datetimepicker({
                    format: 'DD/MM/YYYY',
                    widgetPositioning: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    }
                }).on('dp.change', function (data) {
                    
                    console.log('xxxxxxxxxxxxxxxx');
                    console.log(data.date);
                    updateModel(data.date);
                });
            }
        }
    }).directive("float", function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.float = function(modelValue) {  
                    return /^-?\d*(\.\d+)?$/.test(modelValue);
                }
            }
        };
    });
