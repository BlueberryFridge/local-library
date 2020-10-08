// arrow functions don't work on Schema methods
// since arrow functions don't bind the 'this' keyword
// as function expression does

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
        name: { type: String,  required: true, minlength: 3, maxlength: 100}
    }
);

GenreSchema.virtual('url')
           .get( function() {return `/catalog/genre/${this._id}`;} );

module.exports = mongoose.model('Genre', GenreSchema);