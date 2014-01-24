var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema
 */
var UserSchema = Schema({
    company: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String, 
    address1: String,
    address2: String,
    state: String,
	postalcode: String
	
});

mongoose.model('UserModel', UserSchema);