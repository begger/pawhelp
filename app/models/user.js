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
    address: String,
	postalcode: String
});

mongoose.model('UserModel', UserSchema);