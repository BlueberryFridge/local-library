const BookInstance = require('../models/bookinstance');

// Display list of all BookIntances
exports.bookinstance_list = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance list');
}

// Display detail page for a specific BookInstance
exports.bookinstance_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail ${req.params.id}`);
}

// Display BookInstance create form on GET
exports.bookinstance_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
}

// Display BookInstance create on POST
exports.bookinstance_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
}

// Display BookInstance delete form on GET
exports.bookinstance_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
}

// Display BookInstance delete on POST
exports.bookinstance_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
}

// Display BookInstance update form on GET
exports.bookinstance_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
}

// Display BookInstance update on POST
exports.bookinstance_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
}