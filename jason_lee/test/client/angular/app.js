var app = angular.module('app',[]);
console.log(app);

app.controller('UsersController',function($scope){
	$scope.current_user = {'name': 'Cody'};
	$scope.h1_state = true;
	$scope.getUsers = function(){
		$scope.users = [
			{'name':'Bill'},
			{'name':'Ted'},
			{'name':'Jane'},
			{'name':'Bob'},
		]
	}
	$scope.changeState = function() {
		$scope.h1_state = !$scope.h1_state;
	}

	$scope.createUser = function(newUser) {
		$scope.users.push(newUser);
		$scope.newUser = {};
	}

	$scope.destroyUser = function(user,index) {
		console.log(user);
		var i = $scope.users.indexOf(user);
		$scope.users.splice(index,1);
	}
})