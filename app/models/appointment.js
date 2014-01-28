var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema
 */

 var AppointmentSchema = Schema({
	id: Schema.ObjectId, 
    startTime: Date, 
    endTime: Date, 
    notes: String, 
    name: String, 
    details: String, 
    pickup: Boolean, 
    pickupTime: Date, 
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}], 
	provider: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProviderModel'}]
});



mongoose.model('AppointmentModel', AppointmentSchema);