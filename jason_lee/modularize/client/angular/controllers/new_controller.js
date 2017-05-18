app.controller('newController', ['$scope','userFactory', function($scope,userFactory) {
  $scope.addUser = function(){
    userFactory.create($scope.user,function(){
      console.log($scope.user); 
    })
  }
}]);