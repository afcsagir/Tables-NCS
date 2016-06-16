// schema on nodejs via mongoose:
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;
	mongoose.connect('mongodb://localhost/Flat');
 
var flatSchema = new Schema({
    _id: ObjectId,
    rentType: Number,
    price: Number,
    thumbnail: String,
    address: {
        country: String,
        city: String,
        street: String,
        district: Number
        // ... more fields
    }
    // ... some more fields
}, { collection: 'flats'});
 
module.exports = mongoose.model('Flat', flatSchema);
// e.g. let's define request
    var rules = [{'address.city': '1'}, {price: {$gte: 200}}];
 
    // and here are the grouping request:
    flatSchema.aggregate([
        { $match: {$and: rules } },
        {
            $project: {
                _id: 0, // let's remove bson id's from request's result
                price: 1, // we need this field
                district: '$address.district' // and let's turn the nested field into usual field (usual renaming)
            }
        },
        {
            $group: {
                _id: '$district', // grouping key - group by field district
                minPrice: { $min: '$price'}, // we need some stats for each group (for each district)
                maxPrice: { $max: '$price'},
                flatsCount: { $sum: 1 }
            }
        }
    ], {});