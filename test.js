var Employee = require('./model').Employee,
  Unit = require('./model').Unit;

Employee.find()
  .populate('unit')
  .exec(function(err, employees) {
    if(err) throw new Error(err);

    // ここでUnitに対してpopulateを行う
    var options = {
      path: 'unit.employees',
      model: Employee
    };

    Unit.populate(employees, options, function(err, employees) {
      if(err) throw new Error(err);
      console.log(employees);
    });
  });