var mongoose = require('mongoose')
	, UserModel = mongoose.model('UserModel')
	, AppointmentModel = mongoose.model('AppointmentModel');



exports.view = function(req,res){
	res.render('Calendar' , {title: "Appointments"});
};
