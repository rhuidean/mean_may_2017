// pull in all controllers

var Users = require('../controllers/users');
var Messages = require('../controllers/messages');
var Comments = require('../controllers/comments');

// exporting app must be declared in the controllers
module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.post('/messages',Messages.create);
	app.get('/messages',Messages.index);
	app.get('/comments',Comments.index);
	app.post('/comments',Comments.create);
	app.get('/users/:id',Users.show);
}