var mongoose = require('mongoose');
  //, Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/populate');

 var RoomTypes = 'Single VIP DoubleShare MaleWard FemaleWard ICU CCU MICU Dialysis '.split(' ');
/*var PersonSchema = new Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});*/
var DeviceSchema = mongoose. Schema({
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

/*var StorySchema = new Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : String,
  fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});*/
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var RelationSchema = mongoose. Schema({
    IP:   { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },

	//{type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
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

//var Story  = mongoose.model('Story', StorySchema);
var Device  = mongoose.model('Device', DeviceSchema);

//var Person = mongoose.model('Person', PersonSchema);
var Relation = mongoose.model('Relation', RelationSchema);

var rel = new Relation({ IP: '123.48.90.99',DomeIP:'123.45.67.8' ,NurseID:'Da@gmail.com' });


rel.save(function(err) {
  if (err) throw err;

 console.log('User saved successfully!');
});
  var device = new Device({
    Floor:'Once upon a timex',
    RoomType: 'MICU',
	RoomNumber:'23e',
	BedNumber:'DSA',
     IP: rel._id    // assign an ObjectId
  });

  
  device.save(function (err) {
    if (err) throw err;
    // thats it!
  });

Device
.findOne({ Floor: /timex/ })
.populate('IP')
.exec(function (err, relation) {
   if (err) throw err;
  console.log('The creator is %s', rel.IP); // prints "The creator is Aaron"
});
Device
.findOne({ IP: '123.48.90.99' })
.populate('relations') // only works if we pushed refs to children
.exec(function (err, relation) {
  if (err) return handleError(err);
  console.log(relation);
});