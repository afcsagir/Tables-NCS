var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/population');  
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
var aaron1 = new Person({ _id: 1, name: 'Aaron', age: 100 });

aaron1.save(function (err) {
  if (err) {
	  
  };
  
  var story1 = new Story({
    title: "Once upon a timex.",
    _creator: aaron1._id    // assign the _id from the person
  });
  
  story1.save(function (err) {
    if (err) {
		
	};
    // thats it!
  });
});
/*
Person
.findOne({ name: 'Aaron' })
.populate('stories') // only works if we pushed refs to children
.exec(function (err, person) {
  if (err) return handleError(err);
  console.log(person);
})*/
Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) {
	  
  };
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
});