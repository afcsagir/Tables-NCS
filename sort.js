
var	mongoose = require('mongoose');
var	Schema = mongoose.Schema;
	mongoose.connect('mongodb://localhost/kittehs');
	KittehModel = mongoose.model(
		'kittehs',
		new Schema({
			birthday : { type : Date, default : Date.now },
			features : {
				color : String,
				isFurreh : Boolean
			},
			home : String,
			name : String,
			peePatches : [String]
		})
	);
 
require('mongoose-middleware').initialize(mongoose);
 
/*
	Retrieve the name, home and features.color of kittehs that live in Seattle,
	that are named "Hamish" and that are brindle, black or white in color and born
	prior to January 1st, 2014. The results should be sorted by birthday in
	descending order and name in ascending order.
*/
var options = {
	filters : {
		field : ['name', 'home', 'features.color'],
		mandatory : {
			contains : {
				home : 'seattle'
			},
			exact : {
				name : 'Hamish'
			},
			lessThan : {
				birthday : new Date(2014, 1, 1)
			}
		},
		optional : {
			contains : {
				'features.color' : ['brindle', 'black', 'white']
			}
		}
	},
	sort : {
		desc : 'birthday',
		asc : 'name'
	},
	start : 0,
	count : 500
};
 
KittehModel
	.find()
	.field(options)
	.keyword(options)
	.filter(options)
	.order(options)
	.page(options,
		function (err, kittehs) {
			if (!err) {
				console.log('we haz kittehs!');
				console.log(kittehs);
			} else {
				console.log(err);
			}
		});