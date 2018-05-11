module.exports = function(router) {

	const pieceController = require('../controllers/piece.js');
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
	
	router.get('/stock-manage', passport.authenticate('jwt', { session: false}), function(req, res, next) {
		var token = getToken(req.headers);
		if (token) {
		 next();
		} else {
			res.redirect('/login');
		  //return res.status(403).send({success: false, msg: 'Token Unauthorized.'});
		}
	  });

	//User group routes
	router.route('/stock-manage')
				.get(pieceController.getAllPieces)
				.put(pieceController.updatePiece)
				.post(pieceController.deletePiece);
};