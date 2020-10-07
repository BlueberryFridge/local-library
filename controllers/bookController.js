// same patter as all the other controllers but 
// with 'index()' function for the welcome page
const Book = require('../models/book');
const Author = require('../models/author');
const BookInstance = require('../models/bookinstance');
const Genre = require('../models/genre');

const async = require('async');

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
exports.book_list = (req, res) => {
    Book.find({}, 'title author')   // selecting only title and author in the objects returned; these also include '_id' and virtual fields
        .populate('author')         // specifying 'author' field will replace stored book author id with full author details
        .exec( (err, list_books) => {
            if(err) return next(err);
            res.render('book_list', { title: 'Book List', book_list:  list_books });
        });
}

// Display detail page for a specific Book
exports.book_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Book detail ${req.params.id}`);
}

// Display Book create form on GET
exports.book_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create GET');
}

// Display Book create on POST
exports.book_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create POST');
}

// Display Book delete form on GET
exports.book_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
}

// Display Book delete on POST
exports.book_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
}

// Display Book update form on GET
exports.book_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update GET');
}

// Display Book update on POST
exports.book_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update POST');
}
