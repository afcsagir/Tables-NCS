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

var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model('Post', PostSchema);
//require("./database");

//var User = require('./User'),
   // Post = require('./Post');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

var alex = new User({
    Email: 'Alex@gmail.com'
});

var joe = new User({
    Email: 'Joe@gmail.com'
})

alex.save();
joe.save();
var post = new Post({
    title: "Hello World",
    //postedBy: alex._id,
    postedBy: alex,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
        //postedBy: joe
    }, {
        text: "Thanks :)",
        postedBy: alex._id
       // postedBy: alex
    }]
})
post.save(function(error) {
    if (!error) {
        Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
});