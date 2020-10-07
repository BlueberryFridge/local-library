const express = require('express');
const router = express.Router();

// require controller modules
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const bookinstance_controller = require('../controllers/bookinstanceController');
const genre_controller = require('../controllers/genreController');

//----------------------book routes----------------------//

// GET catalog home page
router.get('/', book_controller.index);
// GET request for creating book; must come before routes with book id
router.get('/book/create', book_controller.book_create_get);
// POST request for creating book; has no book id like previous request so comes before anything else
router.post('/book/create', book_controller.book_create_post);
// GET request for deleting book
router.get('/book/:id/delete', book_controller.book_delete_get);
// POST request for deleting book
router.post('/book/:id/delete', book_controller.book_delete_post);
// GET request for updating book
router.get('/book/:id/update', book_controller.book_update_get);
// POST request for updating book
router.post('/book/:id/update', book_controller.book_update_post);
// GET request for one book
router.get('/book/:id', book_controller.book_detail);
// GET request for list of all Book items
router.get('/books', book_controller.book_list);

//---------------------author routes---------------------//

// GET request for creating author
router.get('/author/create', author_controller.author_create_get);
// POST request for creating author
router.post('/author/create', author_controller.author_create_post);
// GET request for deleting author
router.get('/author/:id/delete', author_controller.author_delete_get);
// POST request for deleting author
router.post('/author/:id/delete', author_controller.author_delete_post);
// GET request for updating author
router.get('/author/:id/update', author_controller.author_update_get);
// POST request for updating author
router.post('/author/:id/update', author_controller.author_update_post);
// GET request for one author
router.get('/author/:id', author_controller.author_detail);
// GET request for all Authors
router.get('/authors', author_controller.author_list);

//----------------------genre routes----------------------//

// GET request for creating genre
router.get('/genre/create', genre_controller.genre_create_get);
// POST request for creating genre
router.post('/genre/create', genre_controller.genre_create_post);
// GET request for deleting genre
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
// POST request for deleting genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
// GET request for updating genre
router.get('/genre/:id/update', genre_controller.genre_update_get);
// POST request for updating genre
router.post('/genre/:id/update', genre_controller.genre_update_post);
// GET request for one genre
router.get('/genre/:id', genre_controller.genre_detail);
// GET request for all Genres
router.get('/genres', genre_controller.genre_list);

//----------------------bookinstance routes----------------------//

// GET request for creating bookinstance
router.get('/bookinstance/create', bookinstance_controller.bookinstance_create_get);
// POST request for creating bookinstance
router.post('/bookinstance/create', bookinstance_controller.bookinstance_create_post);
// GET request for deleting bookinstance
router.get('/bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_get);
// POST request for deleting bookinstance
router.post('/bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_post);
// GET request for updating bookinstance
router.get('/bookinstance/:id/update', bookinstance_controller.bookinstance_update_get);
// POST request for updating bookinstance
router.post('/bookinstance/:id/update', bookinstance_controller.bookinstance_update_post);
// GET request for one bookinstance
router.get('/bookinstance/:id', bookinstance_controller.bookinstance_detail);
// GET request for all BookInstances
router.get('/bookinstances', bookinstance_controller.bookinstance_list);

module.exports = router;