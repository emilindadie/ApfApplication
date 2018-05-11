module.exports = function(router) {
	
	const user  = require('../controllers/user.js');

	//Dummy base route


	//User group routes
	router.route('/sign-up')
		.put(user.create_user);
};