var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
    , ObjectId = Schema.Types.ObjectId
    , Mixed = Schema.Types.Mixed;
	var CascadePlugin = require('k-mongoose-soft-delete-cascade');
mongoose.connect('mongodb://localhost/k-mongoose-soft-delete-cascade');

ResourceDependent = new mongoose.Schema({
    title: {type: String},
    dependent: { type : Schema.Types.ObjectId, ref: 'Resource', default: null }
},{timestamps:true});
ResourceDependent.plugin(CascadePlugin);


mongoose.model('ResourceDependent', ResourceDependent);
mongoose.model('ResourceDependent1', ResourceDependent);
mongoose.model('ResourceDependent2', ResourceDependent);
mongoose.model('ResourceDependent3', ResourceDependent);


Resource = new mongoose.Schema({
    title: {type: String},
    second: {type: String, soft_delete_action: 'null'},
    third:  {type: String, soft_delete_action: 'prefix'}
},{timestamps:true});


// Cascade
var tempObjectID = mongoose.Types.ObjectId(),
    cascade = [
        {model: mongoose.model('ResourceDependent'), keys: ["dependent"]},
        {model: mongoose.model('ResourceDependent1'), keys: ["dependent"], set: null },
        {model: mongoose.model('ResourceDependent2'), keys: ["dependent"], set: function(){
            "use strict";
            return tempObjectID;
        }},
        {model: mongoose.model('ResourceDependent3'), keys: ["dependent"], callback: function (err, resourceDependent) {
            mongoose.model('ResourceDependent3').create({
                title: second
            }, function (err, doc) {
                console.log("here");
            });
        }}
    ];

Resource.plugin(CascadePlugin)
    .plugin(CascadeDeletePlugin, {"cascade": cascade});
