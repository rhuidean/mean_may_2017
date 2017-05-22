// import controllers
var Users = require('../controllers/users.js');
// define routes

module.exports = function(app) {
	app.get('/users',Users.index); 
	app.post('/users',Users.create);
	app.get('/users/:id',Users.show);
	app.put('/users/:id',Users.update);
	app.delete('/users/:id',Users.destroy)
};