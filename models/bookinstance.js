// arrow functions don't work on Schema methods
// since arrow functions don't bind the 'this' keyword
// as function expression does

// BookInstance represents a specific copy of a book 
// that someone might borrow and includes info about
// whether the copy is available, on what date it is
// expected back, and 'imprint' (or version) details

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },     // reference to the associated book
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
        due_back: { type: Date, default: Date.now() }
    }
);

// virtual for bookinstance's URL
BookInstanceSchema.virtual('url')
                  .get( function() {`/catalog/bookinstance/${this._id}`;} );

// export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);