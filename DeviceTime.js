var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/timestamp');
var timestamps = require('mongoose-timestamp');
//FormatDate = mongoose.Schema.Types.FormatDate = require('../formatdate');
/*var UserSchema = new Schema({
    username: String
});*/
//date: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now}
var CallSchema = mongoose.Schema({
   
    IP: {type: String,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
    CallType:String
	// 1. Required validation
});
/*UserSchema.plugin(timestamps);
mongoose.model('User', UserSchema);
var User = mongoose.model('User', UserSchema);
var user = new User({username: 'els'});*/
CallSchema.plugin(timestamps);
mongoose.model('Call', CallSchema);
var Call = mongoose.model('Call', CallSchema);
var call = new Call({IP: '123.90.89.4'})
call.save(function (err) {
  console.log(call.createdAt); // Should be approximately now
  console.log(call.createdAt === call.updatedAt); // true
  // Wait 1 second and then update the user
  setTimeout( function () {
    call.IP = '123.93.89.4';
    call.save( function (err) {
      console.log('User Upadted At',call.updatedAt); // Should be approximately createdAt + 1 second
      console.log('Updated on Save',call.createdAt < call.updatedAt); // true
    });
  }, 1000);
});
Call.findOneAndUpdate({IP: '123.93.89.4' ,CallType:'Emergency'}, { new: true, upsert: true })
            .exec(function (err, updated) {
                console.log('Update At',call.updatedAt); // Should be approximately createdAt + 1 second
                console.log('The difference id is',call.createdAt < call.updatedAt); // true
				console.log('The difference  is',( call.updatedAt-call.createdAt));
            });
Call.find({}).sort({updatedAt: 'asc'})
             .exec(function(err, updated) { 
                console.log('Update At ------',call.updatedAt);


			 });
/*
user.save(function (err) {
  console.log(user.createdAt); // Should be approximately now
  console.log(user.createdAt === user.updatedAt); // true
  // Wait 1 second and then update the user
  setTimeout( function () {
    user.username = 'el';
    user.save( function (err) {
      console.log('User Upadted At',user.updatedAt); // Should be approximately createdAt + 1 second
      console.log('Updated on Save',user.createdAt < user.updatedAt); // true
    });
  }, 1000);
});
User.findOneAndUpdate({username: 'els'}, { password: 'tycheese' }, { new: true, upsert: true })
            .exec(function (err, updated) {
                console.log('Update At',user.updatedAt); // Should be approximately createdAt + 1 second
                console.log('The difference id is',user.createdAt < user.updatedAt); // true
            });
*/