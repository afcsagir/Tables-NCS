var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/cascade');

// parent customer schema... 
var customerSchema = mongoose. Schema({ 
    name: { first: String, last: String }, 
    address: [ addressSchema ], 
    createdOn: { type: Date, default: Date.now }, 
    isActive: { type: Boolean, default: true}
});

// child address schema... 
var addressSchema = mongoose.Schema({ 
    type: String, 
    street: String, 
    city: String, 
    state: String, 
    country: String, 
    postalCode: Number 
});

var user = new User({
  name: 'Hemant',
  age: 20
});


user.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});
// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});