var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema
 */
var ProviderSchema = Schema({
	id: Schema.ObjectId, 
    company: String,
    email: String,
    password: String, 
    address1: String,
    address2: String,
    state: String,
	postalcode: String,
	facebook: String, 
	twitter: String, 
	google: String, 
	tumblr: String, 
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
	admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
});

mongoose.model('ProviderModel', ProviderSchema);