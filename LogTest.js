var mongoose = require('mongoose');
var Schema =mongoose.Schema;
mongoose.connect('mongodb://localhost/logTest');
 
var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

var LogSchema = mongoose.Schema({
    IP: {type: String,unique: true,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation

    IsConneted:{ type: Boolean, default: false },
    CallDate: { type: Date, default: Date.now }
    
});
 
var Log = mongoose.model('Log', LogSchema);

var log = new Log({
 IP : '121.36.96.36',
 IsConneted :false,
 CallDate : new Date
});
/*
LogSchema.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});*/
// on every save, add the date
log.save(function (err, data) {
if (err) console.log(err);
else console.log('Saved ', data );
});
/*
arvind.save(function (err, data) {
if (err) console.log(err);
else console.log('Saved ', data );
});*/
 
console.log('isYounger : True');
