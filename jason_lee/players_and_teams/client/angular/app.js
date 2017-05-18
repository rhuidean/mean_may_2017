var app = angular.module('app',['ngRoute','ngAnimate']);
console.log('test')

app.config(function($routeProvider){
	$routeProvider
	.when('/players',{
		templateUrl: 'partials/players.html',
		controller: "PlayersController as PC"
	})
	.when('/teams',{
		templateUrl: 'partials/teams.html',
    controller: "TeamsController as TC"
	})
	.when('/associations',{
		templateUrl: 'partials/associations.html',
    controller: 'AssociationsController as AC'
	})
})


app.controller('MainCtrl',['$route','$routeParams','$location',function MainCtrl($route,$routeParams,$location){
	this.$route = $route;
	this.$location = $location;
	this.$routeParams = $routeParams;
}])


app.factory('PlayerFactory',function(){
  var factory = {};
  factory.players = [];
  
  factory.getPlayers = function(callback){
    callback(this.players);
  }

  factory.addPlayer = function(newPlayer,callback){
    newPlayer.team="";
    factory.players.push(newPlayer);
    callback();
  }
  
  factory.removePlayer = function(player,callback){
    var i = this.players.indexOf(player);
    this.players.splice(i,1);
    callback();
  }

  factory.addAssignment = function(newAssignment,callback){
    console.log(newAssignment.player);
    var index;
    for(var i=0;i<this.players.length;i++){
      if(this.players[i].name=newAssignment.player){
        index=i;
      }
    }
    console.log(index);
    this.players[index].team=newAssignment.team;
    callback();
  }

  factory.clearAssignment = function(player,callback){
    var i = this.players.indexOf(player);
    this.players.team="";
    callback();
  }



  return factory;
})


app.controller('PlayersController',function(PlayerFactory){
	
	var self = this;

	self.getPlayers = function(){
    PlayerFactory.getPlayers(function(players){
    	self.players = players;
    	console.log(players);
    })
  }      
  
  self.addPlayer = function(newPlayer) {
    PlayerFactory.addPlayer(newPlayer,function(){
      self.getPlayers();
      self.newPlayer = {};
    })
  }

  self.removePlayer = function(player) {
    console.log(player);
    PlayerFactory.removePlayer(player,function(){
      self.getPlayers();
    })
  }
})



app.factory('TeamFactory',function(){
  var factory = {};
  factory.teams = [];
  
  factory.getTeams = function(callback){
    callback(this.teams);
  }

  factory.addTeam = function(newTeam,callback){
    factory.teams.push(newTeam);
    callback();
  }
  
  factory.removeTeam = function(team,callback){
    var i = this.teams.indexOf(team);
    this.teams.splice(i,1);
    callback();
  }

  return factory;
})


app.controller('TeamsController',function(TeamFactory){
  
  var self = this;

  self.getTeams = function(){
    TeamFactory.getTeams(function(teams){
      self.teams = teams;
      console.log(teams);
    })
  }      
  
  self.addTeam = function(newTeam) {
    TeamFactory.addTeam(newTeam,function(){
      self.getTeams();
      self.newTeam = {};
    })
  }

  self.removeTeam = function(team) {
    console.log(team);
    TeamFactory.removeTeam(team,function(){
      self.getTeams();
    })
  }
})



app.controller('AssociationsController',function(PlayerFactory,TeamFactory){
  
  var self = this;

  self.getPlayers = function(){
    PlayerFactory.getPlayers(function(players){
      self.players = players;
      console.log(players);
    })
  }

  self.getTeams = function(){
    TeamFactory.getTeams(function(teams){
      self.teams = teams;
      console.log(teams);
    })
  }


  self.addAssignment = function(newAssignment){
    PlayerFactory.addAssignment(function(newAssignment){
      self.getPlayers();
      self.newAssignment={};
    })
  }

  self.clearAssignment = function(player){
    PlayerFactory.clearAssignment(function(player){
      self.getPlayers();
      self.newAssignment={};
    })
  }

})