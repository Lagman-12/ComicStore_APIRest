const express = require('express');
const router = express.Router();
const { createComic, getComics, getComicById } = require('../controllers/comicController');

router.post('/', createComic);
router.get('/', getComics);
router.get('/:id', getComicById);

module.exports = router;
