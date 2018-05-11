module.exports = function(router) {
	
	const user  = require('../controllers/user.js');
	const passport = require('passport');



	//User group routes
	router.route('/login')
		.post(user.logged_user);
};