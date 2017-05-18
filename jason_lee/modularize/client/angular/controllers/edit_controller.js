app.controller('editController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, rParams) {
       /* Public Properties */
  $scope.controlValue = "Current Name:";
  /* Public Methods */
  $scope.getUser = function() {
    userFactory.show(rParams.id, function passedToUserFactoryShow(user) {
      console.log(user)
    $scope.user = user;
    })
  }

  $scope.updateUser = function(updateUser){
    console.log(updateUser)
    userFactory.update(updateUser, rParams.id, function passedToUserFactoryUpdate(userFromFactory){
      $scope.user = userFromFactory;
      // what is this?
      $scope.controlValue = "Updated Name: "
    });
  }
     /* on load time */
  $scope.getUser();
  console.log($scope);
}]);
