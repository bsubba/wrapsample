var myApp = angular.module('weatherApp', []);
myApp.controller('wCtrl', ['$scope','$http',function ($scope,$http) {
    if ($scope.search === undefined) {
        $scope.search = "Knivsta";
        getData();
    }
    function getData() {
        var url = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ $scope.search + '") and u="c"&format=json';

        $http.get(url).
        success(function(data) {
          $scope.place = data.query.results.channel;
        }).
        error(function(err) {
          //log error
            console.log(err);
        });
  }
}]);
/* Custom filter to display date */
myApp.filter('dateFilter', function(){
    function formatDate(date){
        var res = date.split(" ");
        return res[2]+' '+res[1]+' '+res[3];
    }
    return formatDate;
});
