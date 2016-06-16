var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/populate2');
var ObjectId = mongoose.SchemaTypes.ObjectId;
/*var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.ObjectId, ref: 'Story' }]
});*/
 var RoomTypes = 'Single VIP DoubleShare MaleWard FemaleWard ICU CCU MICU Dialysis '.split(' ');
// Connecting with mongodb(validation db).


 
/*
* Defining User Schema with name(as Required Field), age(with Minimum and Maximum values),
* gender (which is ENUM, so it can be MALE or FEMALE only) and last one is email (which 
* will match the provided regex.)
* */
var DeviceSchema = new Schema({
    Floor: {type: String}, // 1. Required validation
	//gender: {type: String, enum: genders}, // 3. ENUM validation
    RoomType: {type: String,enum:RoomTypes}, // 1. Required validation
    RoomNumber: {type: String}, // 1. Required validation
    BedNumber: {type: String}, // 1. Required validation
    IP: [{type: String,unique: true,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}], // 1. Required validation
	
	
    //age: {type: Number, min: 16, max: 60}, // 2. Minimum and Maximum value validation
   // gender: {type: String, enum: genders}, // 3. ENUM validation
    //email: {type: String, match: /\S+@\S+\.\S+/} // 4. Match validation via regex
});
 
var Device = mongoose.model('Device', DeviceSchema);


/*var StorySchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.ObjectId, ref: 'Person' }]
});*/

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
/*var RestaurantSchema = new Schema({
  id                    : {type: String, required: true, unique: true},
  name                  : {type: String, required: true},
  owner_name            : String,
  reservation_email     : Email,
  survey_url            : String,
  survey_codes          : [{type: ObjectId, ref: SurveyCode}],
  created_at            : {type: Date, default: Date.now}
});*/
/*var SurveyCodeSchema = new Schema({
  code                  : {type: String, unique: true, required: true},
  valid                 : {type: Boolean, default: true},
  create_date           : {type: Date, default: Date.now},
  used_date             : {type: Date, default: null}
});*/  
var RelationSchema = new Schema({
    IP:   [ DeviceSchema ],

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
var Relation = mongoose.model('Relation', RelationSchema);
var device = new Device({ IP: '197.78.90.2',RoomType:'Single',RoomNumber:'asas',BedNumber:'asa',Floor:'ZZZ'});

device.save(function (err) {


  var relation = new Relation({
     // title: "A man who cooked Nintendo"
     IP:[{ type: ObjectId, ref: 'Device' }] 
	 //device._id
	,DomeIP:'123.90.89.0'
	,NurseID:'Sagir@gmail.com'
  });

  relation.save(function (err) {
  
  });
});
Relation
.findOne({ NurseID: 'Sagir@gmail.com' })
//.populate('IP') // <--
//console.log('IP')
.populate('IP') // <-- only return the Persons name

.exec(function (err, relation) {
  if(err)
	  console.log('Error in view survey codes function');
  console.log('The creator is %s', relation.IP);
  // prints "The creator is Aaron"
})