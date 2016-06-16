var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/populate');

// Employee
var employeeSchema = Schema({
  name: String,
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }
});

// Unit
var unitSchema = Schema({
  name: String,
  employees: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});

exports.Employee = mongoose.model('Employee', employeeSchema);
exports.Unit = mongoose.model('Unit', unitSchema);