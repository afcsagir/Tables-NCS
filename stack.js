var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stack');
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
    console.log('connected ');
});

var user = mongoose.Schema({
    userName: String
});

var client = mongoose.Schema({
    fk_user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    name: String
});



var UserModel = mongoose.model('Users', user);
var ClientModel = mongoose.model('Clients', client);

ClientModel.findOne().populate('fk_user').exec(function(err, c) {
    if (err) { return console.log(err); }

    console.log(c.fk_user.userName);
});