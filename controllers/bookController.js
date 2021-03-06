// same patter as all the other controllers but 
// with 'index()' function for the welcome page
const Book = require('../models/book');
const Author = require('../models/author');
const BookInstance = require('../models/bookinstance');
const Genre = require('../models/genre');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display home page
exports.index = (req, res) => {
    async.parallel({
        book_count: callback => 
            Book.countDocuments({}, callback),
        book_instance_count: callback => 
            BookInstance.countDocuments({}, callback),
        book_instance_available_count: callback =>
            BookInstance.countDocuments({status: 'Available'}, callback),
        author_count: callback =>
            Author.countDocuments({}, callback),
        genre_count: callback =>
            Genre.countDocuments({}, callback)
    }, (err, results) =>
            res.render('index', { title: 'Local Library Home', error: err, data: results })
    );
}

// Display list of all Book
exports.book_list = (req, res, next) => {
    Book.find({}, 'title author')   // selecting only title and author in the objects returned; these also include '_id' and virtual fields
        .populate('author')         // specifying 'author' field will replace stored book author id with full author details
        .exec( (err, list_books) => {
            if(err) return next(err);
            res.render('book_list', { title: 'Book List', book_list:  list_books });
        });
}

// Display detail page for a specific Book
exports.book_detail = (req, res, next) => {
    async.parallel({
        book: callback => Book.findById(req.params.id)
                              .populate('author')
                              .populate('genre')
                              .exec(callback),
        book_instance: callback => BookInstance.find({book: req.params.id})
                                               .exec(callback)
    }, (err, results) => {
        if(err) return next(err);
        if(!results.book) {
            const err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        res.render('book_detail', { title: results.book.title,
                                    book: results.book,
                                    book_instances: results.book_instance });
    });
}

// Display Book create form on GET
// a little more complication than Author and Genre because we need to get
// and display available Author and Genre records in our Book form
exports.book_create_get = (req, res, next) => {
    // get all authors and genres, which we can use for adding to our book
    async.parallel({
        authors: callback => Author.find(callback),
        genres: callback => Genre.find(callback)
        }, (err, results) => {
            if(err) return next(err);
            res.render('book_form', { title:'Create Book',
                                      authors: results.authors,
                                      genres: results.genres });
        });
}

// Display Book create on POST
exports.book_create_post = [
    // convert genre to an array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)) {
            if(typeof req.body.genre === 'undefined') req.body.genre = [];
            else req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    // validate and sanitise fields
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('isbn', 'ISBN must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('genre.*').escape(),           // '*' individually validates each of the genre in the array entries
    // process request
    (req, res, next) => {
        const errors = validationResult(req);
        const book = new Book(
            { title: req.body.title,
              author: req.body.author,
              summary: req.body.summary,
              isbn: req.body.isbn,
              genre: req.body.genre
            });
        if(!errors.isEmpty()) {
            // there are errors; get all authors and genres for form
            async.parallel({
                authors: callback => Author.find(callback),
                genres: callback => Genre.find(callback)
                }, (err, results) => {
                    if(err) return next(err);
                    // mark selected genres as checked; pass in existing genres and authors to the form
                    for(let i = 0; i < results.genres.length; i++) {
                        if(book.genre.indexOf(results.genres[i]._id) > -1) {
                            results.genres[i].checked = 'true';
                        }
                    }
                    res.render('book_form', { title: 'Create Book',
                                              authors: results.authors,
                                              genres: results.genres,
                                              book: book,
                                              errors: errors.array() });           
                });
                return;
        }
        else {
            // data from form is valid; save book
            book.save( err => {
                if(err) return next(err);
                res.redirect(book.url);
            });
        }
    }
];

// Display Book delete form on GET
exports.book_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
}

// Display Book delete on POST
exports.book_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
}

// Display Book update form on GET
exports.book_update_get = (req, res, next) => {
    async.parallel({
        book: callback => Book.findById(req.params.id).populate('genre').exec(callback),
        authors: callback => Author.find(callback),
        genres: callback => Genre.find(callback)
        }, (err, results) => {
            if(err) return next(err);
            if(results.book==null) {
                const err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            // success; mark selected genres as checked
            for(let all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++ ) {
                for(let book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                    if(results.genres[all_g_iter]._id.toString() == results.book.genre[book_g_iter]._id.toString()) {
                        results.genres[all_g_iter].checked='true';
                    }
                }
            }
            res.render('book_form', { title: 'Update Book', 
                                      authors: results.authors,
                                      genres: results.genres,
                                      book: results.book });
        });
}

// Display Book update on POST
exports.book_update_post = [
    // convert genre to array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)) {
            if(typeof req.body.genre === 'undefined') req.body.genre = [];
            else req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    // validate and sanitise fields
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('isbn', 'ISBN must not be empty.').isLength({ min: 1 }).trim().escape(),
    body('genre.*').escape(),
    // process request after validation and sanitisation
    (req, res, next) => {
        const errors = validationResult(req);
        const book = new Book(
            { title: req.body.title,
              author: req.body.author,
              summary: req.body.summary,
              isbn: req.body.isbn,
              genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre,
              _id: req.params.id    // this is required, or a new ID will be assigned! 
            });
        if(!errors.isEmpty()) {
            async.parallel({
                authors: callback => Author.find(callback),
                genres: callback => Genre.find(callback)
                }, (err, results) => {
                    if(err) return next(err);
                    // mark selected genres as checked
                    for (let i = 0; i < results.genres.length; i++){
                        if(book.genre.indexOf(results.genres[i]._id) > -1) results.genres[i].checked = 'true';
                    }
                    res.render('book_form', { title: 'Update Book',
                                              authors: results.authors,
                                              genres: results.genres,
                                              book: book,
                                              errors: errors.array() });
                });
            return;
        }
        else {
            Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
                if(err) return next(err);
                res.redirect(thebook.url);
            })
        }
    }
];