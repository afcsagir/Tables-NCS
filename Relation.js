/*
* requiring mongoose module.
* */
var mongoose = require ('mongoose');
var timestamps = require('mongoose-timestamp');
var autopopulate =('mongoose-autopopulate');
//var mongooseTypes = require('mongoose-types')
//  , useTimestamps = mongooseTypes.useTimestamps;
//var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;
mongoose.connect('mongodb://localhost/Relation');




var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
 
/*
* Defining User Schema with name(as Required Field), age(with Minimum and Maximum values),
* gender (which is ENUM, so it can be MALE or FEMALE only) and last one is email (which 
* will match the provided regex.)
* */
var RelationSchema = mongoose.Schema({
    //IP: {type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
    IP:   [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
	autopopulate: true 
	}],
	DomeIP:{type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
    NurseID:{
        type: String,
        trim: true,
        unique: true,
        index:true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
     
	 
	 
	 



});
//members: [{ type: ObjectId, ref: 'people', autopopulate: true }]

RelationSchema.plugin(timestamps);
RelationSchema.plugin(autopopulate);
//RelationSchema.plugin(useTimestamps);
//RelationSchema.plugin(createdModifiedPlugin, {index: true});

 
var Relation = mongoose.model('Relation', RelationSchema);



// create a new user called chris
var relation = new Relation({
  IP:'126.133.1.12',
  DomeIP:'123.136.1.12',
  NurseID:'KHD@gmail.com'
 // CallDate: '12-01-2016' 
 
  
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
//chris.dudify(function(err, name) {
 // if (err) throw err;

 // console.log('Your new name is ' + name);
//});

// call the built-in save method to save to the database
relation.save(function(err) {
  if (err) throw err;

 console.log('User saved successfully!');
});

/*
* When we call save function on the model, then first it calls validate function to validate 
* the values. Validate method takes callback as argument, if any error occurs at the time
* of validating values then validate function calls callback with errors otherwise calls
* with null.

new Device({Floor: "sdsdsds"}).validate(function (error) {
    console.log("ERROR: ", error); // Error for Name Field because its marked as Required.
});
new Device({Floor: "Amit Thakkar", RoomType:"12w"}).validate(function (error) {
    console.log("ERROR: ", error); // Error for Age Field, age is less than Minimum value.
});
new Device({Floor: "Amit Thakkar", RoomType:"61E"}).validate(function (error) {
    console.log("ERROR: ", error); // Error for Age Field, age is more than Maximum value.
});
new Device({Floor: "Amit Thakkar", RoomType:"25C", RoomNumber:"Dmale"}).validate(function (error) {
    console.log("ERROR: ", error); // Error for Gender Field, male does not match with ENUM.
});
new Device({Floor: "AmitrThakkar", RoomType:"25D", RoomNumber:"MALE",BedNumber:"Dmale", IP:"192.168.1.12"}).validate(function (error) {
    console.log("ERROR: ", error); // Error for Invalid Email id.
});* */
//new Device({Floor: "AmitdThakkar", RoomType:"25X", RoomNumber:"MALE",BedNumber:"Dmales", IP:"192.168.1.13"})//.validate(function (error) {
//	{
//		console.log("ERROR: ", error); // Error will be undefined
//};
