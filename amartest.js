var mongoose = require('mongoose');

 //var db = mongoose.connect('mongodb://localhost/napkin_0.1');
mongoose.connect('mongodb://localhost/what', function (error) {
    if (error) {
        console.log(error);
    }
});
var db = mongoose.connection;
db.on('error', function callback(err) {console.log("Database connection failed. Error: " + err);});
db.once('open', function callback() {console.log("Database connection successful.");});
var Schema = mongoose.Schema;
 var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var UserSchema = new mongoose.Schema({
    //name: String
	Email:{
        type: String,
        trim: true,
        unique: true,
        index:true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true },
	 date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
//var mongoose = require('mongoose');

/*
* Defining User Schema with name(as Required Field), age(with Minimum and Maximum values),
* gender (which is ENUM, so it can be MALE or FEMALE only) and last one is email (which 
* will match the provided regex.)
* */
/*
var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});
module.exports = mongoose.model('Post', PostSchema);*/
var RelationSchema = mongoose.Schema({
    //IP: {type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
    //IP:   [{
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'Device',
	//autopopulate: true 
	//}],
	DomeIP:{type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
	IP:{type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation
    
	users:[{
	text: String,	
	NurseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	}
    }]
});
module.exports = mongoose.model('Relation', RelationSchema);


//require("./database");

//var User = require('./User'),
   // Post = require('./Post');
var User = mongoose.model('User');
var Relation = mongoose.model('Relation');

var alex = new User({
    Email: 'Alex@gmail.com'
});

var joe = new User({
    Email: 'Joe@gmail.com'
})

alex.save();
joe.save();
/*var post = new Post({
    title: "Hello World",
    //postedBy: alex._id,
    postedBy: alex,
    users: [{
        text: "Nice post!",
        postedBy: joe._id
        //postedBy: joe
    }, {
        text: "Thanks :)",
        postedBy: alex._id
       // postedBy: alex
    }]
})*/
var relation = new Relation({
    //title: "Hello World",
    DomeIP: '123.45.67.89',
    //postedBy: alex._id,
    //postedBy: alex,
	IP:'123.78.90.9',
    users: [{
        text: "Nice post!",
        NurseID: joe._id
        //postedBy: joe
    }, {
        text: "Thanks :)",
        NurseID: alex._id
       // postedBy: alex
    }]
})
relation.save(function(error) {
    if (!error) {
        Relation.find({})
        //Relation.findById()
		
            .populate('NurseID')
            .populate('users.NurseID')
            .exec(function(error, relations) {
                console.log(JSON.stringify(relations, null, "\t"))
            })
    }
});