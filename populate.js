//var mongoose = require('../../lib')

var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;

console.log('Running mongoose version %s', mongoose.version);

/**
 * Console schema
 */
/*
var consoleSchema = Schema({
    name: String
  , manufacturer: String
  , released: Date
})*/
var relationSchema = Schema({
    IP: String
  , DomeIP: String
  , NurseID: String
})

var Relation = mongoose.model('Relation', relationSchema);

/**
 * Game schema
 var gameSchema = Schema({
    name: String
  , developer: String
  , released: Date
  , consoles: [{ type: Schema.Types.ObjectId, ref: 'Console' }]
})
var Game = mongoose.model('Game', gameSchema);

 */

var deviceSchema = Schema({
    IP: String
  , Floor: String
  , RoomType: String
  , RoomNumber: String
  , BedNumber: String
 
 
  , IP: [{ type: Schema.Types.ObjectId, ref: 'Relation' }]
})
var Device = mongoose.model('Device', deviceSchema);

/**
 * Connect to the console database on localhost with
 * the default port (27017)
 */

mongoose.connect('mongodb://localhost/console', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData();
})

/**
 * Data generation
 */

function createData () {
  Relation.create({
      IP: 'Nintendo 64'
    , DomeIP: 'Nintendo'
    , NurseID: 'Nintendo'
	,RoomNumber:'Nintendo'
	,
  }, function (err, nintendo64) {
    if (err) return done(err);
/*Game.create({
        name: 'Legend of Zelda: Ocarina of Time'
      , developer: 'Nintendo'
      , released: new Date('November 21, 1998')
      , consoles: [nintendo64]*/
    Device.create({
        IP: 'Legend of Zelda: Ocarina of Time'
      , Floor: 'Nintendo'
      , RoomType: 'Nintendo'
       , BedNumber: 'Nintendo'
	   ,IP: [nintendo64]
    }, function (err) {
      if (err) return done(err);
      example();
    })
  })
}

/**
 * Population
 */
/*
function example () {
  Game
  .findOne({ name: /^Legend of Zelda/ })
  .populate('consoles')
  .exec(function (err, ocinara) {
    if (err) return done(err);

    console.log(
        '"%s" was released for the %s on %s'
      , ocinara.name
      , ocinara.consoles[0].name
      , ocinara.released.toLocaleDateString());

    done();
  })
}*/
function example () {
  Device
  .findOne({ IP: /^Legend of Zelda/ })
  .populate('IP')
  .exec(function (err, ocinara) {
    if (err) return done(err);

    console.log(
        //'"%s" was released for the %s on %s'
       ocinara.IP
      , ocinara.IP
      );

    done();
  })
}

function done (err) {
  if (err) console.error(err);
  Relation.remove(function () {
    Device.remove(function () {
      mongoose.disconnect();
    })
  })
}
