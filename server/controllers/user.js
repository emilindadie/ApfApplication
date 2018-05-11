/**
 * Signup
 */

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
let localStorage = require('localStorage');
const Piece = require('../models/piece');
var db = require('../../config/database');

exports.logged_user = function(request, response) {

  const email = request.body.email;
  const password = request.body.password;
  
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return response.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {

        const payload = {
          admin: user.admin 
        };

        var token = jwt.sign({ data: user}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        //response.status(200).send({ success: true, token: token });
        localStorage.setItem('jwtToken', 'JWT'+ token);


        response.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      } else {
        return response.json({success: false, msg: 'Wrong password'});
      }
    });

  })
}


exports.create_user = function(request, response) {
  let newUser = new User ({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      response.json({success: false, msg: 'Failed to register user'});
    } else {
      response.json({success: true, msg: 'User registered'});
    }
  });
};


exports.getUserData = function(request, response) {
  let token = localStorage.getItem('jwtToken').substring(3);
  let decoded = jwt.verify(token, db.secret);

  Piece.find(function(err, pieces) {
      if (err)
      {
          response.json(500, err);
      }

      if (pieces) {
          let tabPieces = new Array();
          for(let i = 0; i< pieces.length; i++){
              if(pieces[i].quantity < pieces[i].min_quantity_level){
                  tabPieces.push(pieces[i]);
              }
          }
          console.log(tabPieces);

          response.json({success: true, data: decoded.data, piecesNotifQuantity : tabPieces});
      } 
  });      
};




