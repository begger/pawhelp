var mongoose = require('mongoose')
	, UserModel = mongoose.model('UserModel');
	
exports.register = function(req,res){
	res.render('register' , {title: "Pawhelp Registration"});
};

exports.register.save = function(req,res){
	UserModel.findOne({email : req.body.username}, function(err, existing) {
        if(existing) {
        	//do something
        }
        else {
        	var user = new UserModel({
	            email: req.body.username,
	    		password: req.body.password, 
	    		firstname: req.body.firstname,
	    		lastname: req.body.lastname,
	    		company: req.body.company
            }).save(function(error, user) {
    	  		if(error) 
    				res.render('/' , {title: "Pawhelp"});
    		});
        }
	});
	

    

	res.render('/' , {title: "Pawhelp"});
};