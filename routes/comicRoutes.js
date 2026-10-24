const express = require('express');
const router = express.Router();
const { 
  createComic, 
  getComics, 
  getComicById, 
  updateComic, 
  deleteComic 
} = require('../controllers/comicController');

router.route('/')
  .post(createComic)
  .get(getComics);

router.route('/:id')
  .get(getComicById)
  .put(updateComic)
  .delete(deleteComic);

module.exports = router;