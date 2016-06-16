var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
    , ObjectId = Schema.Types.ObjectId
    , Mixed = Schema.Types.Mixed;
  //var ObjectId = mongoose.Types.ObjectId;
  var autoref = require('mongoose-autorefs');
  mongoose.connect('mongodb://localhost/population');  
/*var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});*/
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var RoomTypes = 'Single VIP DoubleShare MaleWard FemaleWard ICU CCU MICU Dialysis '.split(' ');

var DeviceSchema = new Schema({
    //_id     : Number,
	 _id: ObjectId,
    Floor: {type: String}, // 1. Required validation
    //gender: {type: String, enum: genders}, // 3. ENUM validation
    RoomType: {type: String,enum:RoomTypes}, // 1. Required validation
    RoomNumber: {type: String}, // 1. Required validation
    BedNumber: {type: String}, // 1. Required validation
    IP: [{type: String,unique: true,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}] // 1. Required validation

});
var Device  = mongoose.model('Device', DeviceSchema);

/*var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});*/
var RelationSchema = new Schema({
    _id: ObjectId,
	IP:[ {type: ObjectId,
        ref: 'Device'}], 
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
RelationSchema.plugin(autoref, [
    'employees.employer',
    'interviewees.interviewers'
]);

/*var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);*/

var Relation = mongoose.model('Relation', RelationSchema);
//var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
var device = new Device({ IP:'145.36.33.23', Floor: 'Aaron',RoomType:'Single',RoomNumber:'sa',BedNumber:'AZA', IP: '100.45.67.8' });
/*
aaron.save(function (err) {
  if (err) {
	  
  };*/
/* person.save(function(err, mike){
    // Listen for the autoref completed event
    personn.on('autoref', function(err, mike){
        // Do some stuff
    });
});*/

  /*
  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) {
		
	};
    // thats it!
  });
});*/
var relation = new Relation({
   // title: "Once upon a timex.",
    KIP: Device.IP,    // assign the _id from the person
    DomeIP:'123.36.96.3',
	NurseID:'sasas@gmail.com'
  });
  /*
  device.save(function (err,device) {
  if (err) {
	devices.on('autoref', function(err, device){  
  };*/
  relation.save(function (err,relation) {
    if (err) {}
	relationn.on('autoref', function(err, KIP){  	
	//};
    // thats it!
  });
});

/*
Person
.findOne({ name: 'Aaron' })
.populate('stories') // only works if we pushed refs to children
.exec(function (err, person) {
  if (err) return handleError(err);
  console.log(person);
})*/
/*Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) {
	  
  };
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
});*/
/*Relation
.findById({ DomeIP:'123.36.96.3' })
.populate('IP')
.exec(function (err, relation) {
  if (err) {
	  
  };*/
  Device.
  findOne({ }).
  populate('NurseID').
  exec(function(error, devices) {
    // doc.connections[0].item is a User doc
    // relation.relations[1].IP //is an Organization doc
  });
  console.log('The creator is %s', Device.IP);
  // prints "The creator is Aaron"
//});