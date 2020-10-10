const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');

const { body, validationResult } = require('express-validator');

// Display list of all authors
exports.author_list = (req, res, next) => {
    Author.find()
          .populate('author')
          .sort([['family_name', 'ascending']])
          .exec((err, list_authors) => {
              if(err) return next(err);
              res.render('author_list', { title: 'Authors List', author_list: list_authors });
          });
}

// Display detail page for a specific Author
exports.author_detail = (req, res, next) => {
    async.parallel({
        author: callback => Author.findById(req.params.id)
                                  .exec(callback),
        authors_books: callback => Book.find({author: req.params.id}, 'title summary')
                                       .exec(callback)
    }, (err, results) => {
        if(err) return next(err);
        if(!results.author) {
            const err = new Error('No author found');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', { title: 'Author Detail',
                                      author: results.author,
                                      author_books: results.authors_books });
    });
}

// Display Author create form on GET
exports.author_create_get = (req, res, next) => {
    res.render('author_form', { title: 'Create Author' });
}

// Display Author create on POST
exports.author_create_post = [
    body('first_name').isLength({ min: 1 }).trim().escape().withMessage('First name must be specified.')
                      .isAlphanumeric().withMessage('First name must be non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().escape().withMessage('Family name must be specified.')
                       .isAlphanumeric().withMessage('Family name must be non-alphanumeric characters'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),     // runs only if there is input; checkFalsy means we'll 
    body('date_of_date', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),        // accept either empty string or null as empty value
                                                                                                            // you can use toBoolean() or toDate() for conversion

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('author_form', { title: 'Create Author',
                                        author: req.body,
                                        errors: errors.array() });
            return
        }
        else {
            const author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(err => {
                if(err) return next(err);
                res.redirect(author.url);
            });
        }
    }
 ];

// Display Author delete form on GET
exports.author_delete_get = (req, res) => {
    async.parallel({
        author: callback => Author.findById(req.params.id).exec(callback),
        authors_books: callback => Book.find({ 'author': req.params.id }).exec(callback)
        }, (err, results) => {
            if(err) return next(err);
            if (!results.author) res.redirect('/catalog/authors');
            res.render('author_delete', { title: 'Delete Author',
                                          author: results.author,
                                          author_books: results.authors_books });
        }
    );
}

// Display Author delete on POST
exports.author_delete_post = (req, res, next) => {
    async.parallel({
        author: callback => Author.findById(req.body.authorid).exec(callback),
        authors_books: callback => Book.find({author: req.body.authorid}).exec(callback)
    }, (err, results) => {
        if(err) return next(err);
        if(results.authors_books.length > 0) {
            res.render('author_delete', { title: 'Delete Author',
                                          author: results.author,
                                          author_books: results.authors_books });
            return;
        }
        else {
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if(err) return next(err);
                res.redirect('/catalog/authors');
            })
        }
    }
    );
}

// Display Author update form on GET
exports.author_update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET');
}

// Display Author update on POST
exports.author_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
}