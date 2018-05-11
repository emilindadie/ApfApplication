module.exports = function(router) {
	
    const reparationController = require('../controllers/reparation.js');
    //const pieceController = require('../controllers/piece.js');
	  const passport = require('passport');

	getToken = function (headers) {
		if (headers && headers.authorization) {
		  var parted = headers.authorization.split(' ');
		  if (parted.length === 2) {
			return parted[1];
		  } else {
			return null;
		  }
		} else {
		  return null;
		}
	  };
	
	router.get('/reparation-details/:fresenius_id', passport.authenticate('jwt', { session: false}), function(request, result, next) {
		var token = getToken(request.headers);
		if (token) {
		 next();
		} else {
			result.redirect('/login');
		  //return res.status(403).send({success: false, msg: 'Token Unauthorized.'});
		}
	  });



		
	router.route('/reparation-details/:fresenius_id')
		.get(reparationController.details)
				.put(reparationController.updateReparation)
	
};


