
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
  mongoose.connect('mongodb://localhost/pop3');
var personSchema = new mongoose.Schema({
  name: String
});
/*
var bandSchema = new mongoose.Schema({
  name: String,
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'person' }
});*/
var bandSchema = new mongoose.Schema({
  name: String,
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'person' }
});

var autoPopulateLead = function(next) {
  this.populate('lead');
  next();
};

bandSchema.
  pre('findOne', autoPopulateLead).
  pre('find', autoPopulateLead);

var Band = mongoose.model('band', bandSchema, 'bands');

var Person = mongoose.model('person', personSchema, 'people');
//var Band = mongoose.model('band', bandSchema, 'bands');

var axl = new Person({ name: 'Axl Rose' });
var gnr = new Band({ name: "Guns N' Roses", lead: axl._id });
// Save Person and Band
/*
Band.
  findOne({ name: "Guns N' Roses" }).
  populate('lead').
  exec(function(err, band) {
    console.log(band.lead.name); // "Axl Rose"
  });*/
  Band.
  findOne({ name: "Guns N' Roses" }).
  exec(function(err, band) {
    console.log(band.lead.name); // "Axl Rose"
  });