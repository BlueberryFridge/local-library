// arrow functions don't work on Schema methods
// since arrow functions don't bind the 'this' keyword
// as function expression does

var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 10},
        family_name: { type: String, required: true, maxlenght: 10 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date }
    }
);

// virtual for author's full name
AuthorSchema.virtual('name')
            .get(function() {
                // to avoid errors in cases where an author doesn't have either a family or first name
                // we want to make sure we handle the exception by returning an empty string for that case
                var fullname = '';
                if(this.first_name && this.family_name) {
                    fullname = `${this.family_name}, ${this.first_name}`;
                }
                if(!this.first_name || !this.family_name) {
                    fullname = '';
                }
                return fullname;
            });

// virtual for author's lifespan
AuthorSchema.virtual('lifespan')
            .get(function() {
                (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
            });

// virtual for author's URL
AuthorSchema.virtual('url')
            .get(function() {
                `/catalog/author/${this._id}`
            });

// virtual for date of birth
AuthorSchema.virtual('date_of_birth_formatted')
            .get(function() {
                return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
            });

// virtual for date of death
AuthorSchema.virtual('date_of_date_formatted')
            .get(function() {
                return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
            });

// export model
module.exports = mongoose.model('Author', AuthorSchema);