var mongoose = require('mongoose');

 //var db = mongoose.connect('mongodb://localhost/napkin_0.1');
mongoose.connect('mongodb://localhost/Ref', function (error) {
    if (error) {
        console.log(error);
    }
});
var db = mongoose.connection;
db.on('error', function callback(err) {console.log("Database connection failed. Error: " + err);});
db.once('open', function callback() {console.log("Database connection successful.");});
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('User', UserSchema);
//var mongoose = require('mongoose');

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
    name: "Alex"
});

var joe = new User({
    name: "Joe"
})

alex.save();
joe.save();
var post = new Post({
    title: "Hello World",
    postedBy: alex._id,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
    }, {
        text: "Thanks :)",
        postedBy: alex._id
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