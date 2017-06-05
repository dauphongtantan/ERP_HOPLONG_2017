app.service('ChecktonService', function ($http) {
    this.get_dataton = function (sotrang) {
        return $http.get("/api/Api_Checktonkho/Get/"+sotrang).then(function (response) {
            return response.data;
        });
    }
});
