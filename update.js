var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/time');
var timestamps = require('mongoose-timestamp');
var UserSchema = new Schema({
    username: String
});
UserSchema.plugin(timestamps);
mongoose.model('User', UserSchema);
var User = mongoose.model('User', UserSchema);
var user = new User({username: 'els'});
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
