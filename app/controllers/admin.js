var mongoose = require('mongoose')
	, UserModel = mongoose.model('UserModel');
	
exports.register = function(req,res){
	res.render('register' , {title: "Pawhelp Registration"});
};
exports.upload = function(req,res){
	res.render('upload' , {title: "Pawhelp Upload"});
};
exports.registersave = function(req,res){
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
	    		company: req.body.company, 
	    		address: req.body.address,
				postalcode: req.body.postalcode
	 			
            }).save(function(error, user) {
    	  		if(error) 
    				res.render('index' , {title: "Pawhelp"});
    		});
        }
	});
	

    

	res.render('/' , {title: "Pawhelp"});
};