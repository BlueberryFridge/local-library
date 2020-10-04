var mongoose = require('mongoose');

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
            .get( () => {
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
            .get( () =>
                (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
            );

// virtual for author's URL
AuthorSchema.virtual('url')
            .get( () => 
                `/catalog/author/${this._id}`
            );

// export model
module.exports = mongoose.model('Author', AuthorSchema);