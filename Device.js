/*
* requiring mongoose module.
* */
var mongoose = require ('mongoose'),
//timestamps = require ('mongoose-times'),

validator = require('node-mongoose-validator');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin; 
// Defining ENUMs for the gender field which will use for validation.
//var genders = 'MALE FEMALE'.split(' ')
 var RoomTypes = 'Single VIP DoubleShare MaleWard FemaleWard ICU CCU MICU Dialysis '.split(' ');
// Connecting with mongodb(validation db).
mongoose.connect('mongodb://localhost/Device');

 
/*
* Defining User Schema with name(as Required Field), age(with Minimum and Maximum values),
* gender (which is ENUM, so it can be MALE or FEMALE only) and last one is email (which 
* will match the provided regex.)
* */
var DeviceSchema = mongoose.Schema({
    Floor: {type: String}, // 1. Required validation
	//gender: {type: String, enum: genders}, // 3. ENUM validation
    RoomType: {type: String,enum:RoomTypes}, // 1. Required validation
    RoomNumber: {type: String}, // 1. Required validation
    BedNumber: {type: String}, // 1. Required validation
    IP: {type: String,unique: true,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
	
	
    //age: {type: Number, min: 16, max: 60}, // 2. Minimum and Maximum value validation
   // gender: {type: String, enum: genders}, // 3. ENUM validation
    //email: {type: String, match: /\S+@\S+\.\S+/} // 4. Match validation via regex
});
 
var Device = mongoose.model('Device', DeviceSchema);



// create a new user called chris
var device = new Device({
  Floor: 'Charis',
  RoomType: 'VIP',
  RoomNumber: 'pasasword' ,
  BedNumber:'asaas',
  IP:'125.136.1.12'
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
//chris.dudify(function(err, name) {
 // if (err) throw err;

 // console.log('Your new name is ' + name);
//});

// call the built-in save method to save to the database
device.save(function(err) {
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