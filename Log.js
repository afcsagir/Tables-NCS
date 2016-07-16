var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var LogSchema = mongoose.Schema({
    IP: {type: String,unique: true,required: true,index: true,match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}, // 1. Required validation

    IsConneted:{ type: Boolean, default: false },
    CallDate: { type: Date, default: Date.now }
    
});
 
var Log = mongoose.model('Log', LogSchema);


