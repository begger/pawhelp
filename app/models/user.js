var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema
 */
var UserSchema = Schema({
    Company: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

mongoose.model('UserModel', UserSchema);