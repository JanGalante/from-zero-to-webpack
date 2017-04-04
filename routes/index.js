import express from 'express';
const router = express.Router();

//GET about page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hey my man' })
});

//GET home page
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Hey', message: 'Hello there!' })
});

//GET user listing

export default router;