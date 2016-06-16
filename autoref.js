var autoref = require('mongoose-autorefs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
 
var companySchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    employees: [{type: ObjectId, ref: 'Person'}],
    interviewees: [{ type: ObjectId, ref: 'Person' }]
});
companySchema.plugin(autoref, [
    'employees.employer',
    'interviewees.interviewers'
]);
var Company = mongoose.model('Company', companySchema);
 
var personSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    partner: { type: ObjectId, ref: 'Person' }, // 1-1 self
    friends: [{ type: ObjectId, ref: 'Person' }], // *-* self
    employer: { type: ObjectId, ref: 'Company' }, // 1-*
    interviewers: [{ type: ObjectId, ref: 'Company' }] // *-*
});
personSchema.plugin(autoref, [
    'partner.partner',
    'friends.friends',
    'employer.employees',
    'interviewers.interviewees'
]);
var Person = mongoose.model('Person', personSchema);

 
var person = new Person({name: 'Mike'});
person.save(function(err, mike){
    // Listen for the autoref completed event
    personn.on('autoref', function(err, mike){
        // Do some stuff
    });
});