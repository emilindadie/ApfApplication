
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require("../models/user");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
    email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	
	password:{
	type: String,
	required: true
	},

	admin: { type:
		Boolean,
	default: false,
	required: true
	},

	created: {
		type: Date,
		default: Date.now,
		required: true
	  }
});

const User = module.exports = mongoose.model('User', userSchema)

	module.exports.getUserByEmail = function(email, callback) {
	const query = {email: email}
	User.findOne(query, callback);
  }
  
	module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
	  bcrypt.hash(newUser.password, salt, (err, hash) => {
		if(err) throw err;
		newUser.password = hash;
		newUser.save(callback);
	  });
	});
  }

	module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
	  if(err) throw err;
	  callback(null, isMatch);
	});
}

//module.exports = mongoose.model('User', userSchema);

