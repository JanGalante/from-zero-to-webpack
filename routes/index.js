import express from 'express';
const router = express.Router();

//GET about page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'The Pug section' })
});

//GET home page
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About', message: 'This is the Pug about page' })
});

//GET user listing

export default router;