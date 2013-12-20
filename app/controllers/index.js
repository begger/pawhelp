var mongoose = require('mongoose')
	, UserModel = mongoose.model('UserModel');
	
exports.login = function(req,res){
	res.render('index' , {title: "Pawhelp"});
};
