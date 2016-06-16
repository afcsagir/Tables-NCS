var mongoose = require('mongoose');
var minute = require('mongoose-minute');
 var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/Minute');
var ObjectId = mongoose.Types.ObjectId;
 
var schema = new Schema({
	counter: { type: Number, default: 0 }
});
 
minute(schema);
 
var Model = mongoose.model('Model', schema);
 
// Set createdAt and updatedAt on model instance 
var model = new Model();
model.save();
 
Model.findOneAndUpdate(
	{ _id: mongoose.Types.ObjectId() },
	{},
	{
		'new': true,
		upsert: true,
		setDefaultsOnInsert: true
	},
	function(err, model) {
		 if (err) throw err;

 console.log('User saved successfully!');
		// model has createdAt and updatedAt 
	});
 
Model.update(
	{ _id: mongoose.Types.ObjectId() },
	{ counter: 0 },
	{ upsert: true },
	function(err, model) {
		// model has createdAt and updatedAt 
	});