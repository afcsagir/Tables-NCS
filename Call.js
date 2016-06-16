/*
* requiring mongoose module.
* */
var mongoose = require ('mongoose');
var timestamps = require('mongoose-timestamp');

mongoose.connect('mongodb://localhost/CallR');
 var CallTypes = 'Normal Emergency BlueCode Toilet '.split(' ');
var CallSchema = mongoose.Schema({
   
    IP: {type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation

	CallType: {type: String,enum:CallTypes}, 
    CallDate: { type: Date, default: Date.now },
	RelationIP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Relation'
    },
	DomeIP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Relation'
    },
   
    NurseID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    
	
 


});
//CallSchemaCallSchema.plugin(createdModifiedPlugin, {index: true});
CallSchema.plugin(timestamps);
var Call = mongoose.model('Call', CallSchema);



// create a new user called chris
var call = new Call({
 IP:'134.36.3.32',
  CallType: 'BlueCode',
  //RelationIP:'121.45.67.8',
 // DomeIP:'125.45.67.8',
  //NurseID:'sa6@gmail.com'
 // CallDate: '12-01-2016' 
  
  
});



// call the built-in save method to save to the database
call.save(function(err) {
  if (err) throw err;

 console.log('User saved successfully!');
});
 

