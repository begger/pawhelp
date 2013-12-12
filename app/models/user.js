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
    address: String
});

mongoose.model('UserModel', UserSchema);