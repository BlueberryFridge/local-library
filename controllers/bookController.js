// same patter as all the other controllers but 
// with 'index()' function for the welcome page

exports.index = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}

// Display list of all Book
exports.book_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Book list');
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
